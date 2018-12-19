#!/bin/bash
knex migrate:rollback
knex migrate:latest
knex seed:run
npm run dev