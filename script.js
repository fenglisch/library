const library = [];

const gridDiv = document.querySelector(".grid");

const modal = document.querySelector(".modal");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

document.querySelector(".close").addEventListener("click", () => {
  modal.classList.toggle("hidden");
  document.querySelector("form").reset();
});

document.querySelector(".add").addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

document.querySelector(".submit").addEventListener("click", (e) => {
  e.preventDefault();
  if (!document.querySelector("#form-title").value) {
    document.querySelector(".warn-box-title").classList.remove("hidden");
    return;
  }
  document.querySelector(".warn-box-title").classList.add("hidden");

  if (!document.querySelector("#form-author").value) {
    document.querySelector(".warn-box-author").classList.remove("hidden");
    return;
  }
  document.querySelector(".warn-box-author").classList.add("hidden");
  const status = document.querySelector("#form-status").checked
    ? "Already read"
    : "Not yet read";
  const newBook = new Book(
    document.querySelector("#form-title").value,
    document.querySelector("#form-author").value,
    document.querySelector("#form-pages").value,
    status
  );
  library.push(newBook);
  addBookCard();
  document.querySelector("form").reset();
  modal.classList.toggle("hidden");
  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      gridDiv.removeChild(e.path[2]);
    });
  });
  document.querySelectorAll(".status-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.target.classList.toggle("read");
      if (e.target.textContent === "Not yet read") {
        e.target.textContent = "Already read";
      } else {
        e.target.textContent = "Not yet read";
      }
    });
  });
});

function addBookCard() {
  const lastBook = library[library.length - 1];
  const flexCon = document.createElement("div");
  flexCon.classList.add("flex-container");
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("book");
  const title = document.createElement("h3");
  const info = document.createElement("p");
  const btnStatus = document.createElement("button");
  btnStatus.classList.add("status-button");
  title.textContent = lastBook.title;
  info.textContent = `By ${lastBook.author}`;
  btnStatus.textContent = lastBook.status;
  if (lastBook.status === "Already read") {
    btnStatus.classList.add("read");
  }
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("delete");
  btnDelete.textContent = "Delete";
  newBookCard.appendChild(title);
  if (lastBook.pages) {
    info.textContent += `, ${lastBook.pages} pages`;
  }
  newBookCard.appendChild(info);
  newBookCard.appendChild(btnStatus);
  newBookCard.appendChild(btnDelete);
  flexCon.appendChild(newBookCard);
  gridDiv.appendChild(flexCon);
}
