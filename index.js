const express = require("express");
const app = express();
const pool = require("./db");
const PORT = process.env.PORT || 5000;

app.use(express.json()); //=> req.body

//all todos
app.get("/all", async (req, res) => {
  var client = await pool.connect();
  try {
    const allTodos = await client.query("select * from todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//create todo
app.post("/todos", async (req, res) => {
  var client = await pool.connect();
  try {
    const { description } = req.body;
    const newTodo = await client.query(
      "INSERT INTO todo(description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//get by id
app.get("/todos/:id", async (req, res) => {
  var client = await pool.connect();
  try {
    const { id } = req.params;
    const todo = await client.query("SELECT * FROM todo WHERE todo_id = ($1)", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    client.release();
  }
});

//update todo
app.put("/todos/:id", async (req, res) => {
  var client = await pool.connect();
  try {
    const { id } = req.params; //where
    const { description } = req.body; //set

    const updateTodo = await client.query(
      "UPDATE todo SET description = ($1) WHERE todo_id = ($2)",
      [description, id]
    );

    res.json("Updated");
  } catch (error) {
    console.log(error.message);
  } finally {
    client.release();
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  var client = await pool.connect();
  try {
    const { id } = req.params;
    const deleteTodo = await client.query(
      "DELETE FROM todo WHERE todo_id = ($1)",
      [id]
    );

    res.json("Deleted");
  } catch (error) {
    console.log(error.message);
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
