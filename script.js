const peoples = [];
const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=4";
const url1 = "https://dummy-apis.netlify.app/api/contact-suggestions?count=1";
const list = document.querySelector("#people-list");

loadListData();

function loadListData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.forEach((el) => peoples.push(el));
      renderList();
    });
}

function updateListData() {
  fetch(url1)
    .then((response) => response.json())
    .then((data1) => {
      data1.forEach((el) => peoples.push(el));
      renderList();
    });
}

function renderList() {
  console.log(peoples);
  list.innerHTML = "";
  let result = "";
  peoples.forEach((people) => {
    const listEl = document.createElement("li");
    listEl.classList.add("list");

    const { title, last, first } = people.name;
    result += `<li class="container"> 
      <button class="delete-btn">
      x
      </button>
      <div class="profil-block">
        <img class="profil-pic" src=" ${people.picture} " alt="">
        <p class="name">
          name = ${title}${first}${last}
        </p>
        <p class="job">
          ${people.title}
        </p>
        <p class ="mutual-connections">
        ${people.mutualConnections} mutualConnections
        </p>
      </div>
      <button class="connect-btn">
      Connect
      </button>
    </li>\n`;
  });
  list.innerHTML = result;

  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(peoples[index]);
      peoples.splice(index, 1);
      updateListData();
    });
  });

  const pendingBtns = document.querySelectorAll(".connect-btn");
  pendingBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.className == "connect-btn") {
        button.innerText = "Pending";
        button.className = "pending-btn";
        count += 1;

        updateDisplay();
      } else if ((button.className = "pending-btn")) {
        button.innerText = "Connect";
        button.className = "connect-btn";
        count -= 1;

        updateDisplay();
      }
    });
  });

  pendingList = document.querySelector(".pending-inv");
  let count = 0;
  updateDisplay();
  function updateDisplay() {
    pendingList.innerHTML = count + " " + "pending invitation";
    if (count == 0) {
      pendingList.innerHTML = "No pending invitation";
    }
  }
}
