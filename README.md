# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png" alt="Node.js" height="23"/>&#8239;Home Library Service&#8239;<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/NestJS.svg/621px-NestJS.svg.png?20221211225055" alt="NestJS" height="23"/>
Thanks for your attention to this project -  
REST API Home Library Service.  
Made with NestJS.  
<img src="https://rolling-scopes-school.github.io/front42-JSFE2021Q1/presentation/z/front42.jpg" alt="logo" height="23"/>  
Clone this repository - for example with SSH: **git clone** git@github.com:front42/nodejs2024Q1-service.git  
Go to project directory, switch git checkout **develop-logging-handling-auth** and install dependencies - **npm i**  

If you have **ESLint** parsing error: cannot read file tsconfig.json - swap two indicated **comments** in **.eslintrc.js** file  
or use there **tsconfigRootDir: __dirname** (working with original path or other - and also by itself without them)  

If needed, make copy of **.env.example** file and rename it to **.env**  

Run **Docker** (nice to clean it with Troubleshoot **Clean/Purge data**) and use these commands to enjoy, e.g. for Windows:
- npm run **docker:build** - runs project in dev watch mode (this takes a lot of time and more - use all your patience)
- npm run **docker:up** - when project is built runs it fast in dev watch mode
- npm run **docker:stop** - stops project saving its container
- npm run **docker:down** - stops project removing its container
- npm run test:**auth** - runs project tests for API in **second** terminal **after** server start

Server works on http://localhost:4000/ - **unguarded** route.  

Run **Postman** and try to GET http://localhost:4000/user - or other **guarded** routes: it must return **401** Unauthorized.  
Create user: POST http://localhost:4000/auth/signup with credentials you like, e.g. { "login": "user", "password": "qwerty" }.  
Copy **accessToken** from request and try again GET http://localhost:4000/user, but add in **Headers** key **Authorization** -  
print in its value: **Bearer** and after **whitespace** insert **accessToken**. This request will be processed successfully.  

To check **handling & logging** (which also visible in the terminal during test:**auth** running) change request in Postman,  
e.g. set unexisting endpoint or damage accessToken - status, time & route of error will be shown in Postman and terminal.  
To check **500** server error handling - get users with correct credentials, then **uncomment** row in users/users.service.ts -  
and try again: you'll get correct response and still be able to work with other routes. Comment it - and get success again!  

Task assignments: https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/logging-error-authentication-authorization  
Task base repository: https://github.com/rolling-scopes-school/nodejs-course-template/generate
