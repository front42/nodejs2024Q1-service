# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png" alt="Node.js" height="23"/>&#8239;Home Library Service&#8239;<img src="https://nestjs.com/logo-small.ede75a6b.svg" alt="NestJS" height="23"/>
Thanks for your attention to this project -  
REST API Home Library Service.  
Made with NestJS.  
<img src="https://rolling-scopes-school.github.io/front42-JSFE2021Q1/presentation/z/front42.jpg" alt="logo" height="23"/>  
Clone this repository - for example with SSH: **git clone** git@github.com:front42/nodejs2024Q1-service.git  
Go to project directory, switch git checkout **develop-logging-handling-auth** and install dependencies - **npm i**  
If needed, make copy of **.env.example** file and rename it to **.env**  
Run **Docker** and use these commands to enjoy, for example:
- npm run **docker:build** - runs project in dev watch mode (this takes a lot of time - use all your patience)
- npm run **docker:up** - when project is built runs it fast in dev watch mode
- npm run **docker:stop** - stops project saving its container
- npm run **docker:down** - stops project removing its container
- npm run **docker:scan-app** - scans app image for vulnerabilities
- npm run **docker:scan-postgres** - scans database image for vulnerabilities
- npm run **test:auth** - runs project tests for API in **second** terminal **after** server start

More commands are in **package.json** file, also you can try them in **swagger** http://localhost:4000/doc/  
Server starts on http://localhost:4000/  
Images also can be pulled from Docker Hub https://hub.docker.com/repositories/front42 -  
https://hub.docker.com/r/front42/nodejs2024q1-service-app & https://hub.docker.com/r/front42/nodejs2024q1-service-postgres

If you have **ESLint** parsing error: cannot read file tsconfig.json - swap two indicated **comments** in **.eslintrc.js** file  
or use there **tsconfigRootDir: __dirname** (working with original path or other - and also by itself without them)

Task assignments: https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/logging-error-authentication-authorization  
Task base repository: https://github.com/rolling-scopes-school/nodejs-course-template/generate
