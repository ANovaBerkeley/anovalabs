# 🚀 ANova Labs

## ANova's Computer Science Education and Mentorship Platform

- Purpose of ANova Labs is to provide the necessary tools for our mentors carrying out ANova's mission statement of improving computer science education in under-resourced communinities across the Bay Area by combining technology and mentorsip. And to make resources and mentorship more accessible to ANova mentees.

### Developed with ❤️ from ANova Tech Committee

## 🗂 File Structure

- README.md
  - This file will describe in general how to run and start the application and provide developer notes on tests and database management
- TODO.md
  - This file will describe the tasks that are still work in progress and need to be done
- /anovalabs_server
  - This folder contains logic for accessing DATABASE information and AUTHENTICATION and AUTHERIZATION logic

- /anovalabs_client
  - This folder contains the front-end components for ANova Labs

## 📝 Requirements to Run ANova Labs

- node 8.12.0 and npm 6.4.1
  - https://nodejs.org/
- Postgres 10.5
  - Mac
    - brew install postgres
    - brew services start postgres
  - Windows
    - TBD
  - Linux
    - TBD
- Knex.js
  - npm install -g knex

## 📝 Mac Commands to Install ANova Labs

- Run the following command in your terminal to initalize the Postgres DB
  - createdb anovalabs-db
- Inside /anovalabs_server run the following command to install all dependencies
  - npm -i
- Inside /anovalabs_client run the following command to install all dependencies
  - npm -i


## 🧠 Commands to Run ANova Labs

- /anovalabs_server 
  - run the following command to start ANova Labs server
  - npm run dev 
- Go to http://localhost:5000/api/v1/lessons
  - You will see a json output of lessons 
- /anovalabs_client 
  - npm start
    - This will take you to http://localhost:8080/ 
      - You will see the main page

# 💻 Developer's Notes

## ✨ Making Migrations (Making Changes to the Database)

- Running the following command creates a migration file which describes changes to the DB that we wish to make
  - knex migrate:make create-lesson
- Running the following command applies the migration to the DB
  - knex migrate:latest

## ✨ Accessing Postgres through your Terminal via psql

- Running the following command in your terminal will have you access your Postgres Database
  - psql anovalabs-db
- Running the following command inside psql will provide a list of all tables in your database
  - \dt
- Running the following command inside psql will provide a description of the table
  - \d tablename
- Running the following command inside psql will provide you the contents of the table (if seeded)
  - select \* from lesson;
- Running the following command inside psql will allow you to format the columns if they wrap around your screen
  - \x

## ✨ Seeding the Database
- Seeding the Database with the following command after running the knex migrate:latest command
  -  knex seed:run 

- Files can be found in server/seeds and server/seedData for reference in regards to seeding the DB

* Running the following command creates a seed file
  - knex seed:make 01_lesson
  - seed files are run alphanumeric order, which is why the naming of the files start with 01\_

## PG Open Source Client

- Postbird https://github.com/Paxa/postbird
