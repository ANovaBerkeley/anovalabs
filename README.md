# 🚀 ANova Labs
## ANova's Computer Science Education and Mentorship Platform

### Developed with ❤️ from ANova Tech Committee

## 📝 Requirements to Run ANova Labs 
* node 8.12.0 and  npm 6.4.1 
    * https://nodejs.org/ 
* Postgres 10.5
    * Mac
        * brew install postgres
        * brew services start postgres
    * Windows
        * TBD
    * Linux
        * TBD
* Knex.js
    * npm install -g knex
## 📝 Commands to Install ANova Labs
* Run the following command in your terminal to initalize the Postgres DB
    * createdb anovalabs-db
* Inside /server run the following command to install all dependencies 
    *  npm -i 

## 🧠 Commands to Run ANova Labs
* Inside /server run the following command to start ANova Labs server 
    *  npm start
*  Go to http://localhost:3000/ and you will currently see a error page

# ✅ ANova Labs To Do
- [x] .gitignore config 
- [ ] setup express JSON API server 
- [x] setup Knex project 
- [x] setup PostgreSQL 
- [ ] setup API routes 
- [ ] create queries and dummy data 

## 🥅 Goals for ANova Labs MVP 1.0 
- [ ] Site Leaders create a Lesson - includes slides, code, exit-ticket 
- [ ] Mentors Access slides
- [ ] Mentors Access code
- [ ] Mentors + Siteleaders can log-in
- [ ] Mentors can check-in via ANova Labs
- [ ] Setup Heroku
- [ ] Setup postgresql on heroku
- [ ] Setup oAuth for ANova Labs
- [ ] Setup user permissions for CRUD operations 

## 🥅 Goals for ANova Labs MVP 1.1
- [ ] Students can log-in create a profile 
- [ ] Students can fill out an exit ticket 
- [ ] Site leaders can deploy exit ticket 
- [ ] Students can fill out exit tickets 
- [ ] Siteleaders can have a dashboard view exit ticket summaries 
- [ ] Siteleaders can have a dashboard view of mentor attendance + feedback

# 💻 Developer's Notes
## ✨ Making Migrations (Making Changes to the Database)
-  Running the following command creates a migration file which describes changes to the DB that we wish to make 
    -  knex migrate:make create-lesson
-   Running the following command applies the migration to the DB
    -  knex migrate:latest
## ✨ Accessing Postgres through your Terminal via psql
-  Running the following command in your terminal will have you access your Postgres Database
    -  psql anovalabs-db
-  Running the following command inside psql will provide a list of all tables in your database
    - \dt
-  Running the following command inside psql will provide a description of the table
    - \d tablename 
-  Running the following command inside psql will provide you the contents of the table (if seeded) 
    -  select * from lesson; 
-  Running the following command inside psql will allow you to format the columns if they wrap around your screen
    -  \x 
## ✨ Seeding the Database
* Files can be found in server/seeds and server/seedData for reference in regards to seeding the DB 
- Running the following command creates a seed file
    - knex seed:make 01_lesson
    -  seed files are run alphanumeric order, which is why the naming of the files start with 01_ 
## PG Open Source Client
- Postbird https://github.com/Paxa/postbird