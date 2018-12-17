# ✅ ANova Labs To Do

- [x] .gitignore config
- [x] setup express JSON API server
- [x] setup Knex project
- [x] setup PostgreSQL
- [x] setup API routes
## 🌱 Migration File Creates The Following
#### authentication

* Google
* Local

#### level

* Middle School
* High School
* Adult School

#### permission

* 1 Admin
* 2 Mentor
*  3 Site Leader
* 4 Student

#### role

* 1 Admin
* 2 Mentor
* 3 Site Leader
*  4 Student

#### school

* 1 College Track
* 2 Downtown Charter Academy
* 3 Montera
* 4 Oakland Technical
* 5 REALM Charter
* 6 Root
* 7 Rudsdale

#### status

* 1 Approved
* 2 Pending
* 3 Rejected

#### style

* 1 Teaching
* 2 Lab Assisting

#### term

* 1 Fall
* 2 Spring

#### week

* 1
* 2
* 3
* 4
* 5
* 6
* 7
* 8
* 9
* 10

#### weekday

1 Monday
2 Tuesday
3 Wednesday
4 Thursday
5 Friday
6 Saturday
7 Sunday

#### Year

-2018
-2019


- [ ] Semester
  * table.integer('term_id');
  * table.integer('year_id');
  * table.timestamp('created_at').defaultTo(knex.fn.now());
  * table.timestamp('updated_at').defaultTo(knex.fn.now());
  * table.foreign('term_id').references('term.id').onDelete('CASCADE');
  * table.foreign('year_id').references('year.id').onDelete('CASCADE');


## 🏓 Tables
Order of creation of tables

- [x] Term - Reference

- [x] Year - Reference

- [x] Weekday - Reference

- [x] School - Reference

- [x] Level  - Reference

- [x] Style - Reference

- [x] Week - Reference

- [x] Roles - Reference

- [x] Permission - Reference

- [x] Status - Reference

- [x] Semester -primary

- [x] Time - primary
- [x] Lesson - primary
- [x] Resource - Primary
- [x] Authentication - Reference
- [x] Account - primary
- [x] local - primary
- [x] google - primary
- [x] Site - primary (join table)
- [x] exit_ticket - primary






Join Tables
- [x] site_time -
- [x] account_time -
- [x] lesson_time -
- [x] site_lesson -
- [x] account_lesson 

- [x] account_site
- [x] account_request

- [x] account_role_permission


- [x] role table

- [x] semester table



## 📝 Tests

## Semesters
- [ ] create, edit, delete semesters
- [ ] create a test semester

## Sites
- [ ] create, edit, delete semesters

## Lessons

## 🔐 Authentication & Authorization

- [x] user can sign up with unique email with password
- [x] user can log-in with email and password
- [ ] user can can log-out
- [ ] user can log-in and access site corresponding to the account_site table

## ⌘ Role Based Access & Control

### Guests
- [ ] Can only visit the homepage and their profile

### Students
- [ ] read-only access to corresponding site + lessons
- [ ] do not have access to class rost  e

### Mentors
- [ ] read-only access to corresponding site + lessons
- [ ] can access & view list of students

### Site Leaders
- [ ] can make appropriate CRUD operations on assigned site
- [ ] Site leaders can create, delete, edit lessons
- [ ] Can add/remove a student to their site

### Admin
- [ ] can create, edit, delete Semesters
- [ ] can create, edit, delete Sites
- [ ] can create, edit, delete Lessons
- [ ] can change the role of an account to either student, mentor or siteleader

## 🥅 Goals for ANova Labs MVP 1.0
- [ ] Create Sites
- [ ] Site Leaders create a Lesson - includes slides, code, exit-ticket
- [ ] Mentors Access slides
- [ ] Mentors + Siteleaders can log-in
- [ ] Setup Heroku
- [ ] Setup postgresql on heroku
- [ ] Setup user permissions for CRUD operations

## 🥅 Goals for ANova Labs MVP 1.1

- [ ] Students can log-in create a profile
- [ ] Students can fill out an exit ticket
- [ ] Site leaders can deploy exit ticket
- [ ] Students can fill out exit tickets
- [ ] Siteleaders can have a dashboard view exit ticket summaries
- [ ] Siteleaders can have a dashboard view of mentor attendance + feedback
- [ ] Mentors can check-in via ANova Labs
