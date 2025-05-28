# Starter Kit for API and Client

This repository provides a starter kit for building a full-stack application using **[AdonisJS](https://adonisjs.com/)** for the API and **[React](https://react.dev/)** for the client.

It includes an OAuth2 authentication flow, allowing users to log in with their provider account.

Client-side state management is handled with **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)**.

Shared types are provided to ensure consistency between the API and the client.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [VSCode Tips](#vscode-tips)
- [TypeScript Configuration](#typescript-configuration)
- [License](#license)

## Features

- Ready-to-use OAuth2 authentication
- Shared types and utilities (`/shared`)
- TypeScript monorepo
- Unified development scripts

## Project Structure

```
/api      # AdonisJS backend
/client   # React frontend
/shared   # Shared types
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [Bun](https://bun.sh/) >= 1.x

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd starter-react-adonisjs-api
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Copy the `.env.example` files to create `.env` files in both `/api` and `/client` directories, then adjust them as needed:
   ```bash
   cp api/.env.example api/.env
   cp client/.env.example client/.env
   ```

## Usage

```bash
# Start all services
bun run dev

# Or start only the client
bun run dev:client

# Or start only the API
bun run dev:api

# Or start only the shared (types and utils)
bun run dev:shared
```

Open your browser at:

- [http://localhost:5173](http://localhost:5173) to view the client
- [http://localhost:3333](http://localhost:3333) to view the API

## VSCode Tips

You can use `Run Task` then `dev:all` to start all services at once in integrated terminals and automatically open your default browser when ready.

## TypeScript Configuration

If you want to add a new path in the client's `tsconfig.json`, add it to `tsconfig.app.json` and run:

```bash
bun run merge-tsconfig
```

This will merge the config cleanly with the monorepo root config without overwriting existing `paths`.

## Contribution

Contributions are welcome!

Feel free to open an issue or submit a pull request if you want to improve this project.

## License

This project is distributed under the **GNU General Public License v3.0**.

See the [LICENSE](./LICENSE) file for more information.
