# TB-WEB-UI

Frontend for the TextBux Web Application

## Dev Container configuration

Local development environment is configured using devcontainer. Inside .devcontainer folder copy the .env.example file to .env and update the values as needed.

## Installation

## Local Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run dev

# production mode
$ pnpm run start
```

## Test

## Project Structure

tb-web-ui/
├── app/
tb-web-ui/
├── app/
│ ├── routes/
│ │ ├── login.tsx
│ │ └── signup.tsx
│ ├── ui/
│ │ ├── components that are used in login and signup
│ ├── utilities/
│ └── CountryCodes.ts
│ └── root.tsx
├── public/
│ ├── images/
│ └── textBuzLogo.png
├── properties/
│ ├── colors.ts
│ └── fonts.ts
