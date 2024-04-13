let box = document.querySelector(".box");
let add = document.querySelector(".add");
let addModal = document.querySelector(".addModal");
let close = document.querySelector(".close");
let title = document.querySelector(".title");
let text = document.querySelector(".text");
let save = document.querySelector(".save");
let cancel = document.querySelector(".cancel");
let addForm = document.querySelector(".addForm");
let editModal = document.querySelector(".editModal");
let editForm = document.querySelector(".editForm");
let editClose = document.querySelector(".editClose");
let editCancel = document.querySelector(".editCancel");

// get
const API = "https://6604048c2393662c31d0607c.mockapi.io/api/card/todoList";
async function get() {
  try {
    let response = await fetch(API);
    let data = await response.json();
    getData(data);
  } catch (error) {
    console.error(error);
  }
}
get();

// delete Card
async function delCard(id) {
  try {
    let response = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    get();
  } catch (error) {
    console.error(error);
  }
}

add.onclick = () => {
  addModal.showModal();
};
addForm.onsubmit = (e) => {
  e.preventDefault();
  let list = {
    title: addForm["title"].value,
    text: addForm["text"].value,
  };
  postUser(list);
  addForm["title"].value = "";
  addForm["text"].value = "";
  addModal.close();
};

// addModal close
close.onclick = () => {
  addModal.close();
};

// addModal close
cancel.onclick = () => {
  addModal.cancel();
};

// post
async function postUser(list) {
  try {
    let response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    get();
  } catch (error) {
    console.error(error);
  }
}

// edit list
async function editList(id, list) {
  try {
    let response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    get();
  } catch (error) {
    console.error(error);
  }
}

// getData
function getData(data) {
  box.innerHTML = "";
  data.forEach((el) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let title = document.createElement("h1");
    title.innerHTML = "The first task title";
    title.style.marginBottom = "16px";
    let text = document.createElement("p");
    let bottomCard = document.createElement("div");
    bottomCard.style.display = "flex";
    bottomCard.style.justifyContent = "space-between";
    let firstElemnt = document.createElement("div");
    let endElement = document.createElement("div");
    let edit = document.createElement("img");
    let del = document.createElement("img");
    del.src = "Delete.svg";
    edit.style.marginRight = "5px";
    edit.src = "edit.svg";
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = el.complited;
    check.style.zoom = "1.5px";
    check.style.marginRight = "10px";
    title.innerHTML = el.title;
    text.innerHTML = el.text;
    text.classList.add("styleText");
    text.style.marginBottom = "20px";
    let checkText = document.createElement("p");
    checkText.innerHTML = "done";
    firstElemnt.append(edit, del);
    endElement.append(check, checkText);
    firstElemnt.style.display = "flex";
    endElement.style.display = "flex";
    bottomCard.append(firstElemnt, endElement);

    // delete
    del.onclick = () => {
      delCard(el.id);
    };

    // edit
    edit.onclick = () => {
      editModal.showModal();
      editForm["title"].value = el.title;
      editForm["text"].value = el.text;
      editForm.onsubmit = (e) => {
        e.preventDefault();
        let list = {
          title: editForm["title"].value,
          text: editForm["text"].value,
        };
        editList(el.id, list);
        editModal.close();
      };
    };
    editClose.onclick = () => {
      editModal.close();
    };
    editCancel.onclick = () => {
      editModal.close();
    };

    check.onclick = () => {
      el.complited = !el.complited;
      editList(el.id, el);
    };

    if (el.complited == true) {
      title.classList.add("line");
    }

    card.append(title, text, bottomCard);
    box.append(card);
  });
}
