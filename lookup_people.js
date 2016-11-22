"use strict";

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2]

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  const query = `SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1;`

  client.query(query,[name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    //Original
    // const birthdate = result.rows[0].birthdate.toISOString().slice(0,10);
    // const id = result.rows[0].id;
    // const fullName = `${result.rows[0].first_name} ${result.rows[0].last_name}`;
    // console.log(`Found 1 person by the name ${name}: \n - ${id}: ${fullName}, born '${birthdate}'`); //output: 1
    // client.end();

    //Refactored
    const person = result.rows[0];
    const birthdate = result.rows[0].birthdate.toISOString().slice(0,10);
    console.log(`Found 1 person by the name '${name}': \n - ${person.id}: ${person.first_name} ${person.last_name}, born '${birthdate}'`); //output: 1
    client.end();

  });
});

