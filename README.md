# Welcome

This is a  [Node.js](https://nodejs.org/en/)  module available through the  [npm registry](https://www.npmjs.com/).

Before installing,  [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

Installation is done using the  [`npm install`  command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):


# # Installation

*---------Please note------------
Before using this module make sure you have installed phpmyadmin or any other mysql database in your local machine. ( xampp, wamp...etc )
-----------------------------------*

 1. clone git repo using following command 
>  git clone https://github.com/dipenparmar12/node-auth.git
 2. goto project directory: 
 > cd node-auth

3. Install the npm packages:
 
> **$** npm install 


#  Quick Start
  
  Before starting project setup your database configuration in **.env** file  ( root directory)
### DB CONFIG ######
DB_TYPE= DBMS (mysql, sqllite, mongodb, etc)
DB_HOST=localhost
DB_USER=root
DB_PASS='secret'
DB_NAME=test

  
 Start the server in debug mode :
> **$** npm dev
 
 Start the server: without debuging mode
> **$** npm devi


View the website at:  [http://localhost:3000/login](http://localhost:3000/login)




## API Routes 


| Host | Method | RoutePath | Middeware | Action |
|--|--|--|--|--|
| localhost:8000 | GET  |`"/index"`  | checkJwt | Index View  |
| localhost:8000 | GET  |`"/login"`  | isLogged | Login View |
| localhost:8000 | POST  |`"/login"`  | loginAuth  | redirected to IndexPage  |
| localhost:8000 | GET  |`"/logout"`  | null | null |
| localhost:8000 | GET  |`"/api/teachers/"`  | checkJwt | Get AllTeachers |
| localhost:8000 | GET  |`"/api/teachers/{:id}"`  | checkJwt | Get OneTeacher 
| localhost:8000 | POST  |`"/api/teachers/"`  | checkJwt | Create Teacher 
| localhost:8000 | PATCH  |`"/api/teachers/{:id}"`  | checkJwt | Update Teacher 
| localhost:8000 | DELETE  |`"/api/teachers/{:id}"`  | checkJwt | Destroy Teacher 




# Features

 -  Robust routing
 -   Focus on high performance
 -   HTTP helpers (redirection, cookies, etc)
 -   View system supported
 -   Executable for generating applications quickly
 -  supports both DataMapper and ActiveRecord (your choice)
-   entities and columns
-   database-specific column types
-   entity manager
-   repositories and custom repositories
-   clean object relational model
-   associations (relations)
-   supports MySQL / MariaDB / Postgres / CockroachDB / SQLite / Microsoft SQL Server / Oracle / sql.js
 -   supports MongoDB NoSQL database
-   TypeScript and JavaScript support
-   follows all possible best practices




# Project Structure
```
ProjectRoot
├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── User.ts  // sample entity
│   ├── controllers  // place where your controllers are stored
│   │   └── teacherController.ts  // API Controller ( Teacher Entity )
│   │   └── authController.ts     // Auth methods (Login, Logout)
│   ├── middlewares  // place where your controllers are stored
│   │   └── checkJwt.ts     // for Sending/Receiving JWT Tokens via Cookies ( is Tokens are valides or not)
│   ├── routes  	 // place where your API Routes are Defined
│   │   └── indexRoutes.ts     // Routes except API
│   │   └── teacherRoutes.ts     // Teacher API Routes
│   ├── views  	 	 // Pug Files (Html Template, Front-end Views)
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options
└── .ENV    // server Configration, environment variables like Database Config, PORT, JWT Secrect Key, BASE_URL etc
```

# Project Dependencies 


**P~~strikethrough text~~rodution Dependencies** 

1. @types/bcryptjs: "^2.4.2",

2. @types/body-parser: "^1.17.1",

3. @types/dotenv: "^6.1.1",

4. @types/helmet: "0.0.43",

5. @types/jsonwebtoken: "^8.3.3",

6. bcryptjs: "^2.4.3",

7. body-parser: "^1.19.0",

8. class-validator: "^0.10.0",

9. cookie-parser: "^1.4.4",

10. dotenv: "^8.1.0",

11. express: "^4.17.1",

12. helmet: "^3.20.0",

13. jsonwebtoken: "^8.5.1",

14. mysql2: "^1.6.5",

15. pug: "^2.0.4",

16. reflect-metadata: "^0.1.13",

17. ts-node-dev: "^1.0.0-pre.41",

18. typeorm: "^0.2.18",

19. typescript: "^3.5.3"


**Dev Dependencies** 

1. nodemon: "^1.19.1"

