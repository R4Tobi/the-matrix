/*
 **
 **     Input / Output
 **
 */
async function input(pw, type) {
  let terminal = document.querySelector(".terminal");
  let input = document.createElement("div");
  input.setAttribute("id", "input");
  input.classList.add("active");
  input.setAttribute("contenteditable", true);
  input.addEventListener("keydown", (event) => {
    parse(event, pw, type);
  });
  terminal.appendChild(input);
  input.focus();
}

async function parse(event, pw, type) {
  if (type == "login") {
    login(event, pw, type);
  } else if (type == "command") {
    handleCmd(event, pw, type);
  }
}

function clear() {
  document.getElementById("terminal").innerHTML = "";
}

var inputArr = [];

async function login(event, pw, type) {
  event.preventDefault();

  if (event.key == "Enter" && type == "login") {
    checkPass(inputArr.join(""));
    inputArr = [];
    event.target.setAttribute("contenteditable", false);
    event.target.classList.remove("active");
  } else if (pw && event.keyCode >= 48) {
    inputArr.push(event.key);
    event.target.innerHTML = "";
    var str = "";
    for (let i = 1; i <= inputArr.length; i++) {
      str += "*";
    }
    event.target.innerHTML = str;
  } else if (event.key == "Backspace") {
    // Handle backspace key
    inputArr.pop();
    var str = "";
    for (let i = 0; i < inputArr.length; i++) {
      str += "*";
    }
    event.target.innerHTML = str;
  }
}

async function sout(content, t = 50) {
  var terminal = document.getElementById("terminal");
  for (let i = 0; i < content.length; i++) {
    time = Math.random() * 50 + t;
    if (content[i] == "clear") {
      await pause(2000);
      clear();
    } else if (content[i] == "input") {
      input(true, "login");
    } else if (content[i].startsWith("<") || content[i] == "&nbsp;") {
      console.log(content[i]);
      terminal.innerHTML += content[i];
    } else {
      let cnt = content[i].split("");
      for (let j = 0; j < cnt.length; j++) {
        await pause(time);
        terminal.innerHTML += cnt[j];
      }
    }
  }
}

function checkPass(pswd) {
  if (pswd == "Alex") {
    clear();
    runCli(true);
  } else {
    runCli(false);
  }
}
