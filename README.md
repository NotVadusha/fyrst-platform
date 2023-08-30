# Project name

Project description

---

#### For Windows users:

- WSL is mandatory for running this project.

- Project is to be cloned to WSL disk. If you're seeing `/mnt/` path prefix in your terminal it
  means the project **isn't** on the WSL disk. **This is required for hot reloading with docker**.

---

#### 0.1. What's shipped with this boilerplate?

- React (CRA) + NestJS applications
- Configured sequelize for PostgreSQL
- Storybook
- Tailwind
- React Redux (+Saga)
- React Router
- docker-compose

#### 0.2. Reference

- [Backend folder structure](./docs/backend.md)
- [Frontend folder structure](./docs/frontend.md)
- `shared` is a directory where common code is located in order to avoid duplication. Its build is
  automatically mounted to the `node_modules` folders of the frontend and the backend development
  containers. To use the shared code you have to just import it from a module called `shared` like
  you import code from `react`, `@nestjs/common`, etc. After you have changed the source from the
  `shared` directory you have to run `npm run build:shared` to rebuild the shared module.

#### 0.3. Eslint

- To follow project code style you should use Eslint that is already configured
- To enable linting, you need to use an extension for your code editor
- [Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
  If you want to integrate Eslint with other code editors you can find information on how to do it
  [here](https://eslint.org/docs/user-guide/integrations#editors)

#### 0.4. Swagger

- For testing app, you can use Swagger / Open API. To access the project API, open
  `http://localhost:8000/api/v1/` url.

---

#### 1. Project init

- Run `npm run init` after git clone. This command might need root access because of `npm link`, so
  feel free to add `sudo` before the command if you get an error related to permissions. Also you
  can resolve this error by updating the global npm context or by using
  [nvm](https://github.com/nvm-sh/nvm).
- Create a `.env.dev` file. Here is an example of a minimal required configuration:

```
FRONTEND_PORT=3000
BACKEND_PORT=8000
DB_PORT=5432

POSTGRES_DB=db
POSTGRES_USER=user
POSTGRES_PASSWORD=user

REDIS_PORT=6380
REDIS_PASS=user
REDIS_URI=redis://default:${REDIS_PASS}@redis:${REDIS_PORT}

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRATION_TIME=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:${BACKEND_PORT}/api/v1/auth/google/callback
GOOGLE_AUTH_SUCCESS_URL=http://localhost:${FRONTEND_PORT}/auth/google-success

MAIL_DOMAIN=
MAIL_API_KEY=
JWT_VERIFICATION_TOKEN_SECRET=
JWT_VERIFICATION_TOKEN_EXPIRATION_TIME=
RESET_PASSWORD_URL=http://localhost:${FRONTEND_PORT}/auth/reset
EMAIL_CONFIRMATION_URL=http://localhost:${BACKEND_PORT}/api/v1/email-confirmation/confirm
LOGIN_URL=http://localhost:${FRONTEND_PORT}/auth/signin

REACT_APP_API_URL=http://localhost:${BACKEND_PORT}/api/v1

BUCKET_PROJECT_ID=
BUCKET_PRIVATE_KEY=
BUCKET_CLIENT_EMAIL=
BUCKET_NAME=
```

---

#### 2. Bootstrap project using Docker Compose

- To build (rebuild) `npm run start:build`
- To start without building `npm run start`
- To stop `npm run stop`

---

#### 3. Version control

- To make any change in the project you should create separate branch from develop
- Branch name should start with `fix/` or `feature/`
- Commit names should
  - Be short (10-12 words)
  - Describe the changes that were done specifically
  - Follow
    [best practices](https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53#commit-message-guidelines)
- Once you finish with changes you should create a pull request
- Then you should request approval from your colleague and one of your mentors
- If your pull request approved by these people you can squash & merge into develop branch
- It's a good thing to keep your branch in sync with develop, so once in a while you should merge
  develop into your branch
- Prefer small but frequent pull requests over infrequent and huge ones
