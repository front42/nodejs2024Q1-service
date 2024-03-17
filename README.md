# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png" alt="Node.js" height="23"/>&#8239;Home Library Service&#8239;<img src="https://nestjs.com/logo-small.ede75a6b.svg" alt="NestJS" height="23"/>
Thanks for your attention to this project -  
REST API Home Library Service.  
Made with NestJS.  
<img src="https://rolling-scopes-school.github.io/front42-JSFE2021Q1/presentation/z/front42.jpg" alt="logo" height="23"/>  
Clone this repository - for example with SSH: **git clone** git@github.com:front42/nodejs2024Q1-service.git  
Go to project directory, switch git checkout **develop-rest** and install dependencies - **npm i**  
If needed, make copy of **.env.example** file and rename it to **.env**  
Use these commands to enjoy, for example:
- npm **run start** or npm **start** - runs project in production mode
- npm **run start:dev** - runs project in dev watch mode
- npm **run build** - builds project in dist folder
- npm **run test** or npm **test** - runs project tests for API in **second** terminal **after** npm **start** command

More commands are below in this **README** and in **package.json** file, also you can try them in **swagger** http://localhost:4000/doc/

If you have **ESLint** parsing error: cannot read file tsconfig.json - swap two indicated **comments** in **.eslintrc.js** file  
or add there tsconfigRootDir: __dirname (working with original path or other - and also by itself without them)

Server starts on **http://localhost:4000/**

### Task assignments: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md
### Task base repository: https://github.com/rolling-scopes-school/nodejs-course-template/generate

# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
