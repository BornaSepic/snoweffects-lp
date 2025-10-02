# Deployment

The project uses Vercel GitHub integration for automatic deployments.

Vercel should be configured to have three deployment environments and
corresponding domains:

| Branch       | Environment  | Vercel Domain                                                                  |
| ------------ | ------------ | ------------------------------------------------------------------------------ |
| `main`       | `qa`         | `[project-name]-qa.vercel.app`                                                 |
| `release`    | `release`    | `[project-name]-release.vercel.app`                                            |
| `production` | `production` | `[project-name]-production.vercel.app` and `[project-name].vercel.app`         |

Developers should create feature branches from the `main` branch and create
pull-requests back to `main` when they are ready to merge the feature.

Developers should never push commits directly to the `main` branch.

## How To Initiate Deployments

To initiate deployment to release or production environment:

1. Navigate to Actions tab of the repository.
1. Select "Deploy to release" or "Deploy to production" workflow in the sidebar.
1. Tap "Run workflow" action and confirm. All workflows should be initiated from
   the main branch.

![How to initiate deployment to production](/devops/docs/how-to-initiate-deployment-to-production.png)

# Development

### To start developing:

1. Install [Docker CE][download docker]. Only Linux and Mac platforms are supported.

1. Duplicate `.env.template` file and rename it to `.env`.

1. To start the container, open a terminal window. Change the working directory to the project folder and type:

   ```
   ./web-up
   ```

   The container shell prompt will appear after Docker builds an image and starts the `web` container.

1. To start Next in development mode, type in the container shell prompt:

   ```
   pnpm dev
   ```

1. Navigate to `http://localhost:2000` in your browser to preview your changes.

1. To finish working on the project:

   1. stop the dev processes with `Ctrl + C`;
   1. type `exit` in the container shell
   1. type `./down` to stop the containers

> Avoid using the built-in terminal feature in your editor because it usually shuts down or
> restarts with the editor process. Do use a standalone terminal app, e.g.,
> Terminal (Mac), iTerm (Mac), Tilix (Linux), Kitty (Linux).

# Development environment

The Docker container includes required versions of Node.js and other development dependencies.

You're not expected to install anything on your computer besides Docker and Docker Compose.

## Node Modules

This project uses pnpm to manage dependencies. **Do not use npm**.

Please use [pnpm CLI commands][pnpm_cli] *within the container shell* to manage dependencies.

For performance, the `node_modules` folder is stored inside a Docker volume and the folder
contents are available within the container only.

[Attach Visual Studio Code editor to the running container][attach to container]
for full Typescript autocomplete support.

## Typescript

### Type Definitions for CSS Modules

Use `pnpm run codegen` command to automatically generate type definitions for CSS
module files (`*.module.scss`) for improved Typescript experience.

# Deployment

This project is ready for deployment to Vercel. To configure deployments:

1. Create new project on Vercel by importing Git repository.

1. Select `Next.js` framework preset.

1. Set Root Directory to `./web`.

1. Keep Build and Output Settings unchanged.

1. Commence deployment by tapping the Deploy button.

> **Important!** The author email in your git commits must match the email of your Vercel account.

# DatoCMS Migrations

Use shell scripts from [`/web/datocms`](/web/datocms) folder to create and apply content model migrations.

**Avoid making changes to the content models directly. Always use migrations.**

**NEVER apply migrations to the primary environment directly.**

Always apply migrations to a new sandbox; avoid applying migrations in-place.

# Troubleshooting

## Apple Silicon (M1/M1X) Macs

This project fully supports Intel and Apple Silicon Macs.

## Node Modules

If you're experiencing issues with the `node_modules` or webpack cache, run the following command in your terminal:

```shell
docker compose down --volumes
```

## Docker for Mac Performance

If you experience slowdowns with Docker for Mac, try the following in the app preferences:

1. Update Docker for Mac to the latest version.
1. Increase the number of CPUs to at least 4.
1. Increase memory to at least 2GB; 4GB or more is preferrred, but no more than 30% of your total available memory.
1. In Resources --> File Sharing, keep only `/private` and `/tmp` directory entries; then add the folder where you keep your development code.

> To maximize performance, keep your code in a separate folder outside of Documents, e.g., `~/dev`.

# Versioning

The project follows `[YEAR]w[WEEK_NUMBER]` release naming convention, e.g., `2021w08` or `2021w52`, to mark weekly cumulative releases.

[attach to container]: https://code.visualstudio.com/docs/remote/attach-container
[download docker]: https://www.docker.com/community-edition#/download/
[pnpm_cli]: https://pnpm.io/pnpm-cli
