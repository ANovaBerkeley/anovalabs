Seed File Contents

- [ ] **semester** Primary Table

  - [ ]   type fk // field **term_id**
  - [ ] type fk // field **year_id**

- [ ] **Site** Primary Table

  - [ ] type fk // field **semester_id**
  - [ ] type fk // field **style_id**
  - [ ] type fk // field **level_id**
  - [ ] type fk // field **school_id**

- [ ] **TIME** Primary Table

  - [ ] type time // field **start_time**
  - [ ] type time // field **end_time**
  - [ ] type fk // field **weekday_id**

- [ ] **site_time** Inner Table

  - [ ] type fk // field **site_id**
  - [ ] type fk // field **time_id**

- [ ] **Account** Primary Table

  - [ ] type string // field **first_name**
  - [ ] type string // field **last_name**
  - [ ] type string // field **email**
  - [ ] type fk integer // field **authentication_id**

- [ ] **Local** Primary Table 

  - [ ] type string email // field email
  - [ ] type string // field password
  - [ ] type integer **unique** fk // field **account_id**

- [ ] **account_role_permissions**

  - [ ] type fk integer unique // **account_id**
  - [ ] type fk integer // **role_id**
  - [ ] type fk integer // **permission_id**

- [ ] **Account_time**

  - [ ] type fk integer // **account_id**
  - [ ] type fk integer // **time_id**

- [ ] **lesson**

  - [ ] type string // field **title**
  - [ ] type string // field **summary**
  - [ ] type string // field **guide**
  - [ ] type string // field **plan**
  - [ ] type fk integer // field **week_id**
  - [ ] type fk integer // field **write_id** (Draft or Publish)

- [ ] **site_lesson** (what site does this lesson get used at)

  - [ ] type fk integer // field **site_id**
  - [ ] type fk integer // field **lesson_id**

- [ ] **account_lesson** (who is the/are authors of the lesson - created when lesson is crerated)

  - [ ] type fk integer // field **account_id**
  - [ ] type fk integer // field **lesson_id**

- [ ]  **lesson_time** (what day of the week and time is this lesson associated with)

  - [ ] type fk integer // field **Lesson_id**
  - [ ] type fk integer // field **Time_id**

- [ ] **Site_lesson** (what lessons/sites are connected to one another)

  - [ ] type fk integer // field **site_id**
  - [ ] type fk integer // field **lesson_id**