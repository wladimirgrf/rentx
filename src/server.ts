import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  const { name } = request.query;

  return response.json({ name });
});

app.listen(3333, () => {
  console.log("Server running");
});
