"use strict";

const settings = require("./knexfile");
const knex = require("knex")(settings.development);

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthday = process.argv[4];

knex("famous_people")
  .insert([{first_name: firstName, last_name: lastName, birthdate: birthday}])
  .then((data) => {
    console.log("Succesful Insertion Bro!");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  })
