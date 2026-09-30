const $ = (id) => document.getElementById(id);

fetch("/api/book")
  .then((res) => res.json())
  .then((data) => console.log("Books List: " + JSON.stringify(data)))
  .catch((err) => {
    console.log("Gagal menghubungi server: " + err);
  });

fetch("/api/book", {
  method: "POST",
  headers: { "Content-Type": "Application/json" },
  body: JSON.stringify({ title: "Sabu Keju Nge-drift", author: "doa muji" }),
})
  .then((res) => {
    if (res.status >= 200 && res.status < 300) return res.json();
    if (res.status >= 400 && res.status < 500) {
      throw new Error("Client error ( " + res.status + " ): " + res.statusText);
    }
    throw new Error("Server error ( " + res.status + " ): " + res.statusText);
  })
  .then((data) => console.log("New data: " + JSON.stringify(data)))
  .catch((err) => console.error(err.message));
