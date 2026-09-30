const $ = (id) => document.getElementById(id);

function showErr(ms) {
  $("error").textContent = ms;
  $("status").textContent = "";
}

function showOk(ms) {
  $("error").textContent = ms;
  $("status").textContent = "";
}

// 1) Tampilkan daftar buku
function loadBook() {
  fetch("/api/book")
    .then((res) => {
      if (!res.ok)
        throw new Error("Loading failure (status: " + res.status + ")");
      return res.json();
    })
    .then((data) => {
      $("tbody").innerHTML = "";

      data.forEach((book) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>`;
        $("tbody").appendChild(tr);
      });
    })
    .catch((err) => showErr(err.message));
}

// 2) Kirim form (POST)
$("book-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Cegah reload halaman otomatis

  const title = $("title").value;
  const author = $("author").value;

  fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ title, author }),
  })
    .then((res) => {
      if (!res.ok)
        return res.json().then((err) => {
          throw err;
        });

      return res.json();
    })
    .then((newData) => {
      showOk("Add succesfully: " + newData.title);

      $("book-form").reset();
      loadBook();
    })
    .catch((err) => showErr(err.message || "Terjadi kesalahan"));
});

loadBook();
