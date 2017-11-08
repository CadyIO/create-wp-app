# ${name}

## Dependencies

Install **Docker**, **Node JS / NPM**, **PHP Composer**, and optionally **Yarn**.

On Mac OS X and Windows, **docker-compose** is installed with Docker. Depending how Docker is installed on Linux, docker-compose may need to be installed seperately with:

For Ubuntu / Debian:

    sudo apt install docker-compose

For reasons of Uploads directory permissions, on Mac OS X and Ubuntu / Debian, either **Apache2** has to be installed as well or a user / group combo of www-data must be created to match the shared volume with the WordPress instances.

> NOTE: Either Yarn or NPM commands can be used, but only one can be used at a time. To switch between them, `./node_modules/` must be deleted and reinstalled with the desired package manager (can use `yarn clean`).

To visually view Docker instances on Mac OS X or Windows, install Kitematic after Docker is installed.

## Build and Run Commands

| Yarn | NPM | Description |
| ---- | --- | ----- |
| `yarn` | `npm i` | Install Node.js and Composer dependencies. |
| | | |
| `yarn start` | `npm run start` | Spin up Docker database and website. |
| `yarn stop` | `npm run stop` | Shut down Docker instance and clean up volumes. |
| `yarn backup` | `npm run backup` | Backup database. NOTE: Must be run while Docker is running. |
| `yarn logs` | `npm run logs` | Open Docker logs for instance. |
| `yarn mysql` | `npm run mysql` | Connect to MariaDB to run MySQL commands. |
| `yarn bash` | `npm run bash` | Connect to instance to run bash commands. |
| | | |
| `yarn compile` | `npm compile` | OPTIONAL. Rebuild Docker Image. Only necessary if Dockerfile changes. |
| | | |
| `yarn build` | `npm run build` | Compile SCSS from `./styles/` folder into CSS in `./theme/` folder. |
| `yarn clean` | `npm run clean` | Remove `./dist/` directory. |
| `yarn package` | `npm run package` | Package the `./theme/` directory to a zip file in `./dist/`. |
| `yarn purge` | `npm run purge` | Remove all transient directories including `./dist/`, `./node_modules/`, and `./vendor/`. |
| `yarn watch` | `npm run watch` | Watch the `./styles/` folder for changes and compile SCSS into CSS in `./theme/` folder. |
| | | |
| `yarn permissions` | `npm run permissions` | Ensure all files are owned by current user. |