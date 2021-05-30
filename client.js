const express = require("express");
const app = express();
const { Client } = require("pg");

app.use(express.json()); //=> req.body

//all todos
app.get("/all", async (req, res) => {
  const fromDate = new Date();

  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "test",
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

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
