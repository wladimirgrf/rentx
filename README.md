### rentx

[![](https://img.shields.io/github/repo-size/wladimirgrf/rentx?color=%238257E5&labelColor=000000)]()
[![](https://img.shields.io/github/last-commit/wladimirgrf/rentx?color=%238257E5&labelColor=000000)](https://github.com/wladimirgrf/certification/commits/master)
[![](https://img.shields.io/github/issues/wladimirgrf/rentx?color=%238257E5&labelColor=000000)](https://github.com/wladimirgrf/certification/issues)
[![](https://img.shields.io/github/license/wladimirgrf/rentx?color=%238257E5&labelColor=000000)]()

Project developed for the Rocketseat Ignite (_Node.js Path_). This application is a simple REST API and It was built to manage car rental routines.

## 🌍 Ecosystem

Below the technologies, used to build this API:

|                      Name                                   |                         Status                          |
|:-----------------------------------------------------------:|:-------------------------------------------------------:|
|<img height="58" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"> | <img alt="node version" src="https://img.shields.io/badge/nodejs-v14.17-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src="https://www.vectorlogo.zone/logos/docker/docker-tile.svg"> | <img alt="docker-compose version" src="https://img.shields.io/badge/docker_compose-v1.29-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg"> | <img alt="express version" src="https://img.shields.io/badge/express-v4.17-blue?color=%238257E5&labelColor=000000">|
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"> | <img alt="typescript version" src="https://img.shields.io/badge/typescript-v4.3-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg"> | <img alt="jwt version" src="https://img.shields.io/badge/jwt-v8.5-blue?color=%238257E5&labelColor=000000"> |
|<img height="55" src=".github/assets/typeorm.png"> | <img alt="typeorm version" src="https://img.shields.io/badge/typeorm-v0.2-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/postgresql.svg"> | <img alt="postgresql version" src="https://img.shields.io/badge/postgresql-v8.7-blue?color=%238257E5&labelColor=000000"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/redis.svg"> | <img alt="redis version" src="https://img.shields.io/badge/redis-v4.0-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/aws-ses.svg"> | <img alt="aws-ses version" src="https://img.shields.io/badge/aws_ses-v2.10-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src=".github/assets/aws-s3.svg"> | <img alt="aws-s3 version" src="https://img.shields.io/badge/aws_s3-v2.10-blue?color=%238257E5&labelColor=000000"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg"> | <img alt="eslint version" src="https://img.shields.io/badge/eslint-v7.32-blue?color=%238257E5&labelColor=000000"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/prettier-2.svg"> | <img alt="prettier version" src="https://img.shields.io/badge/prettier-v2.3-blue?color=%238257E5&labelColor=000000"> |
|<img height="55" src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg"> | <img alt="jest version" src="https://img.shields.io/badge/jest-v27.2-blue?color=%238257E5&labelColor=000000"> |
|<img height="60" src="https://www.vectorlogo.zone/logos/handlebarsjs/handlebarsjs-ar21.svg"> | <img alt="handlebars version" src="https://img.shields.io/badge/handlebars-v4.7-blue?color=%238257E5&labelColor=000000"> |
|<img height="85" src=".github/assets/swagger.svg"> | <img alt="swagger version" src="https://img.shields.io/badge/swagger-v4.3-blue?color=%238257E5&labelColor=000000"> |

## ⚙️ Services
![](.github/assets/services.jpg)

## 🧱 ERM

![](.github/assets/diagram.png)

## ▶️ Getting started

**Requirements**

- [Node.js](https://nodejs.org/en/)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Clone the project**
```bash
$ git clone https://github.com/wladimirgrf/rentx.git && cd rentx
```

**Install the Project dependencies**
```bash
$ npm install
```

**Environment configuration**
```bash
# Make a copy of '.env.sample'
# Fill both files with YOUR environment variables.
$ cp .env.sample .env
$ cp .env.sample .env.test
```

**Run the containers**
```bash
$ docker-compose up -d
```

**Migrations**
```bash
$ npm run typeorm migration:run
```

**Launch the Application**
```bash
$ npm run dev
```

>The API will be launch at `http://localhost:3333/`<br>
>Documentation available at `http://localhost:3333/api-docs`


## 🤝 Contributing

**Fork the repository and clone your fork**

```bash
$ git clone fork-url && cd rentx
```

**Create a branch for your edits**
```bash
$ git checkout -b new-feature
```

**Make the commit with your changes**
```bash
$ git commit -m 'feat: New feature'
```

**Send the code to your remote branch**
```bash
$ git push origin new-feature
```

Create a pull request with your version. <br>
After your pull request is merged, you can delete your branch.


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

