"use strict";

const settings = require("./knexfile");
const knex = require("knex")(settings.development);

const name = process.argv[2];

knex
  .select("*")
  .from("famous_people")
  .where("first_name", name)
  .orWhere("last_name", name)
  .then((data) => {
    const person = data[0];
    const birthdate = person.birthdate.toISOString().slice(0,10);
    console.log(`Found 1 person by the name '${name}': \n - ${person.id}: ${person.first_name} ${person.last_name}, born '${birthdate}'`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  })

