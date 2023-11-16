let userList = JSON.parse(localStorage.getItem("userList")) || [];
function userAdmin() {
  let text = "";
  for (let i = 0; i < userList.length; i++) {
    let actived = userList[i].status == 1 ? "Đang hoạt động" : "Đang khóa";
    let btn = userList[i].status == 1 ? "Khóa" : "Mở khóa";
    text += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${userList[i].id}</td>
                    <td>${userList[i].name}</td>
                    <td>${userList[i].email}</td>
                    <td>${userList[i].sdt}</td>
                    <td>${actived}</td>
                    <td><button onclick="statusUserClick(${
                      userList[i].id
                    })">${btn}</button></td>
                    <td>${userList[i].time}</td>
                </tr>
    `;
  }
  document.getElementById("userControl").innerHTML = text;
}
userAdmin();

function statusUserClick(id) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id == id) {
      userList[i].status = userList[i].status == 1 ? 0 : 1;
      localStorage.setItem("userList", JSON.stringify(userList));
      userAdmin();
      break;
    }
  }
}

function dropUp() {
  userList.sort(function (a, b) {
    return a.timeSort - b.timeSort;
  });
  userAdmin();
}

function dropDown() {
  userList.sort(function (a, b) {
    return b.timeSort - a.timeSort;
  });
  userAdmin();
}
