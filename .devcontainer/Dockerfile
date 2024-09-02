# Use the base image of Debian 11 Bullseye
ARG VARIANT="bullseye-slim"
ARG NODE_MAJOR=20
FROM debian:${VARIANT}

# Create the user vscode
ARG ZSH_THEME="/home/vscode/zsh"
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME &&\
    useradd --uid $USER_UID --gid $USER_GID -m $USERNAME &&\
    mkdir -p /etc/sudoers.d/ &&\
    echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME &&\
    chmod 0440 /etc/sudoers.d/$USERNAME &&\
    chown -R $USERNAME:$USERNAME /home/$USERNAME

# Update the system and install necessary packages
RUN apt-get update &&\
    apt-get install -y apt-utils git software-properties-common ca-certificates lsb-release apt-transport-https &&\
    apt-get install -y curl wget gnupg2 gnupg libzip-dev zip unzip xsel &&\
    apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update&&\
    apt-get install nodejs -y
RUN npm install -g npm@10.8.2
RUN npm install -g @nestjs/cli
RUN npm install -g pnpm
RUN npm install -g commitizen
RUN npm install -g semantic-release-cli


# Set the source and destination file for the PostgreSQL repository list
RUN echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
# Download and add the PostgreSQL authentication key
RUN wget -qO - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - &&\
    apt-get update &&\ 
    apt-get -y install postgresql-16 &&\
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Oh-My-Zsh
RUN apt-get update &&\
    apt-get install -y zsh &&\
    apt-get clean -y &&\
    rm -rf /var/lib/apt/lists/*

ENV ZSH_THEME=${ZSH_THEME}
RUN touch /home/vscode/.zshrc &&\
    wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O - | zsh &&\
    sed -i "s#ZSH_THEME=.*#ZSH_THEME=\"$ZSH_THEME\"#" /home/vscode/.zshrc 

RUN usermod -s /bin/zsh $USERNAME

RUN date > /cache-break.txt
USER $USERNAME