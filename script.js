function loadUsers(users) {
  const userList = document.createElement("div");
  userList.className = "user-list";
  users.forEach((user) => {
    const userContainer = document.createElement("div");
    userContainer.className = "user-container";

    userContainer.innerHTML = `
      <div>
      <p class="user-id" >User ID: ${user.id}</p>
        <h3 class="user-name"> Name: ${user.name}</h3>
        <p class="user-email">Email ID:${user.email}</p>
      </div>
      `;

    userList.append(userContainer);
  });

  document.body.append(userList);
}

getUsers();

function formReset() {
  document.querySelector(".submit-users").innerText = "Add Users";
  document.querySelector(".new-user-name").value = "";
  document.querySelector(".new-profile-pic").value = "";
  localStorage.removeItem("userId");
}

async function getUsers() {
  const data = await fetch(
    "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json",
    {
      method: "GET",
    }
  );

  const users = await data.json();
  const noOfPages = Math.ceil(users.length / 10);

  const pagination = document.querySelector(".pagination");

  for (let i = 1; i <= noOfPages; i++) {
    const page = document.createElement("button");
    page.innerText = i;
    // page
    page.onclick = function () {
      console.log("Clicked", i);
      const pageUsers = users.filter((user, index) =>
        filterUsers(index, (i - 1) * 10, i * 10)
      );
      document.querySelector(".user-list").remove();
      loadUsers(pageUsers);
    };
    pagination.append(page);
  }

  const firstTenUsers = users.slice(0, 10);
  console.log(firstTenUsers);

  console.log("No of users are ", users.length);

  loadUsers(firstTenUsers);
}

function filterUsers(index, startIdx, endIdx) {
  return index >= startIdx && index < endIdx;
}
