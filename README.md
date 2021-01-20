# 🚀 ANova Labs

updated: March 19th, 2020
## ANova's Computer Science Education and Mentorship Platform

- Purpose of ANova Labs is to provide the necessary tools for our mentors carrying out ANova's mission statement of improving computer science education in under-resourced communinities across the Bay Area by combining technology and mentorsip. And to make resources and mentorship more accessible to ANova mentees.

### Developed with ❤️ from ANova Tech Committee

## 🗂 File + Directory Structure

- README.md
  - This file will describe in general how to run and start the application and provide developer notes on tests and database management

- /client
  - This folder contains the front-end components for ANova Labs

- app.js
  - This file holds all the components to make our express server

- index.js
  - This file launches our server! You can see it being called in our package.json. We keep our express server app and our file that kickstarts the server seperately for clarity and incase we have to switch out a different express app. It's nice to have the express app and server components seperated for such occasions.

- /db
  - This folder contains implementation and configuration files for the Knex.js database. It also contains files that provide a friendly abstraction over knex queries.

- /db/migrations
  - These files describe changes to the database in chronological order, when you run a migration you are asking a program to go through and apply each change that was made to the database in order to make the Database have the tables,columns it has in present day.

- /controllers
  - This is where we write most of our implementation logic for our routes.

- /routes
  - This is where we list out all of the routing for the application along with their respective controllers and middleware

- /test
  - This is where we put our tests, where we test it with a test knex db

- .prettierrc.js
  - This is our prettier config file, we love prettier, we love auto formatting our code, we love consistency, we love saving time, we love code quality

- knexfile.js
  - This is the Knex configuration file for different deployment environments, to develop locally you don't need to modify it unless troubleshooting says otherwise.

- TODO.md
  - This file will describe the tasks that are still work in progress and need to be done



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
- Inside the root directory
  - you can type `pwd` in your terminal and if you see that the path ends with `anovalabs` you're in the right place to execute the following command
  - npm i
- Inside the /client directory run the following command to install all dependencies
  - npm i

## 🧠 Steps to Run ANova Labs

### Create a .env file
- Inside the anovalabs root directory there should be a file called .env.example
  - most likely you won't be able to view it in your Finder or File Explorer, but you will be able to see it if you open the anovalabs folder in your code editor.
- Create a file called .env and copy the contents of .env.example inside it
  - assign a small integer value (anything less than 10 should be fine) to SALT_ROUNDS and any string value to JWT_SECRET
  - get the Google OAuth client ID and put it in as well (you'll also need to fill in the `clientId` variables in the frontend)

### Create the Database
- make sure you ran the following command in your terminal to initalize the Postgres DB
  - createdb anovalabs-db

### Run Migrations on the Database
We need to tell the anovalabs-db what tables and columns we need to have, for ANova Labs, we are using Knex.js to make our queries using javascript! And to let anovalabs-db what tables, columns we need, we need to run some migrations by typing the following command in the root directory

- Running the following command to apply all the latest migrations to the DB
  - knex migrate:latest

### ✨ Seeding the Database
Now that we have communicated with our Postgres DB what tables and columns we need through our migration files and the knex migration command, it's now time to populate our local db with seed data.

- You can seed the Database with the following command after running the knex migrate:latest command
  - knex seed:run

### 🚀 Launch the client && the server
For this portion I recommend opening up two seperate tabs on your terminal -- one for the client and one for the server

- Go to the root directory of the anovalabs repository
  - run the following command to start ANova Labs server
  - npm run dev
- Go to http://localhost:5000/api/v1/site/allSites
  - And you will be able to see see a json output of all the school names
- Next in a separate terminal go to the /client inside of the ANovalabs repository
  - and you can run npm start
    - This will start the ANova labs client which is a react application
    - Go to http://localhost:3000/
      - And you will see the main page and be able to register/login

# 😲ANova Labs Reseting The Database
If you want to reset your database you can do the following in the root directory
- dropdb anovalabs-db // this will drop your current database
- createdb anovalabs-db // this will re-create your current database
- knex migrate:latest //this will run all the migration files
- knex seed:run //this will run the seeds file

for helpful commands, look at package.json in the root directory for migrating, rolling back and seeding the Database

# 🧪 ANova Labs Running Tests
- in the root directory of the ANovaLabs directory type the following command
- `npm run test` and you will run a series of tests

# 🚀 ANova Labs: Testing Production Build Locally
- You will need to first make the build version of the client
- cd into `/client` and run `npm run build` and the react scripts will produce a build folder
- cd back into the root directory and type `npm run dev`
- go to localhost:5000 and you will be able to access the same pages and routing as before

# 💻 ANova Labs Reference Material
The following is for reference to help you in your journey in developing on ANova Labs

## PG Open Source Client

- Postbird https://github.com/Paxa/postbird

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

  - knex seed:run

- Files can be found in server/seeds and server/seedData for reference in regards to seeding the DB

* Running the following command creates a seed file
  - knex seed:make 01_lesson
  - seed files are run alphanumeric order, which is why the naming of the files start with 01\_


