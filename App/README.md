# PokeDex

Input the name of a pokemon or the dex number to get the picture of the Pokemon

## Env setup

Install Node.js (which includes npm - Node Package Manager)

### Expo

Expo is a set of tools to enhance development environment. It allows you to access your app during development via a phone on emulator

Install expo-cli

```
npm config set prefix ~/.npm-global

export PATH=~/.npm-global/bin:$PATH

npm install -g expo-cli
```

These set of commands worked for me when installing Expo

The following command allows you to create a project

```
expo init [name_of_project]
```

This command will start the server for your app to run

```
npx expo start
```

I'll then press Shift I to select the iOS simulator I want to use. For this, you need XCode installed.
