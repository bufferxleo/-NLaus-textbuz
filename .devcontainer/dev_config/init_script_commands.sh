#!/bin/bash

# Configuration variables

# Display a message with emoji indicating the configuration is starting
echo "🚀 Starting configuration..."

echo "🌟 Current directory: $(pwd) "

# Change permissions of the install_oh_my_zsh.sh script
 sudo chmod a+x .devcontainer/dev_config/install_oh_my_zsh.sh

# Run the install_oh_my_zsh.sh script
.devcontainer/dev_config/install_oh_my_zsh.sh

# Run the db_init.sh script
.devcontainer/dev_config/db_init.sh

# Change permissions of the db_init.sh script
sudo chmod a+x .devcontainer/dev_config/db_init.sh

echo "⚙️  If needed, run: npm install in a new console to install project npm packages."

# npm run start:dev