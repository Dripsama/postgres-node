const express = require("express");
const app = express();
const { Client } = require("pg");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json()); //=> req.body

//all todos
app.get("/all", async (req, res) => {
  const fromDate = new Date();

  const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
  });

  //connect
  await client.connect();
  //return all rows
  const results = await client.query("select * from todo");
  console.table(results.rows);
  //end
  client.end();

  const toDate = new Date();
  const elapsed = toDate.getTime() - fromDate.getTime();

  //send it to the wire
  res.send({ rows: results.rows, elapsed: elapsed, method: "old" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
