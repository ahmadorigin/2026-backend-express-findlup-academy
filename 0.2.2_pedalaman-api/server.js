import express from "express";

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Bismillah from server" });
});

// 'database' sementara -- array di memory
let books = [];
let nextId = 1;

// 1) CREATE -- POST /api/buku
app.post("/api/book", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author)
    return res.status(400).json({ ms: "Title or Author wasn't inputed" });

  const newBook = { id: nextId++, title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});

// 2) LIST -- GET /api/book
app.get("/api/book", (req, res) => {
  res.json(books);
});

// 3) DETAIL -- GET /api/book/:id
app.get("/api/book/:id", (req, res) => {
  const id = Number(req.params.id);
  const finded = books.find((b) => b.id === id);

  if (!finded) return res.status(404).json({ ms: "The book is not find" });
  res.json(finded);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server jalan: http://localhost:${port}`));
