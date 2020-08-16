<h1 align="center">
  Pineapple
</h1>

<div align="center">

  Track times and manage your attendance to Helping Hands events
</div>

<div align="center">

  ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/decentm/pineapple/latest?style=for-the-badge)
  ![GitHub repo size](https://img.shields.io/github/repo-size/helpinghandsvr/pineapple?style=for-the-badge)
</div>

<hr>

## What is this?

Pineapple is the combination of a backend and frontend project build
specifically for the Helping Hands VR community. It allows users to keep track
of their time spent learning Sign Language, as well as it houses a number of
convenience features, like automatic invites and linking of a Discord account.

## Getting started

> This is a guide for developers. If you need help using Pineapple, refer to the
> help menu inside the app, or ask a staff member [in our Discord server](https://discord.com/helpinghands).

This is a description on how you can set this project up locally on your
machine. You will need Git, the latest LTS version of NodeJS, Yarn, Docker and docker-compose
installed.

### Preparation

You will need an IDE or text editor that supports the Editorconfig standard. A
lot of IDEs support it out of the box, and there are plugins for a bunch more.
Find your editor [here and install the plugin if necessary](https://editorconfig.org/#download).

If you're using VS Code, you can open the project very easily by choosing
`File > Open Workspace` and opening the `pineapple.code-workspace` file inside
the cloned repo.

If you're on Windows, you will need the `windows-build-tools` package
(`npm i -g windows-build-tools` in an administrator PowerShell window). The `-g`
switch is important, as it's not a project scoped package. It takes a while to
install, please be patient.

### Running the project

1. Clone the repository | `git clone https://github.com/HelpingHandsVR/pineapple
   && cd pineapple`
2. Install dependencies | `yarn --frozen-lockfile && yarn lerna bootstrap`
3. Copy env files from `.example.env` to `.env` in both packages
   - `cd packages/backend && cp .example.env .env && cd -`
   - `cd packages/frontend && cp .example.env .env && cd -`
   > Change the values in your new `.env` files as you need. Pay attention that
   > the URL for the backend needs to match the API URL in the frontend .env
   > file
4. For the backend, start Redis and Postgres | `cd packages/backend &&
   docker-compose up -d && cd -`
   > This won't start the backend, only a Redis and a Postgres container, both
   > of which are a required dependency
5. You should be able to start both the backend and the frontend now
   - `cd packages/backend && yarn dev`
   - `cd packages/frontend && yarn dev`
