/*
 **
 **     CLI
 **
 */
async function runCli(granted) {
  var out = [
    "<br>",
    "Access Granted",
    "<br>",
    "<br>",
    " > SET TERMINAL/admin",
    "<br>",
    "LOADING",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "<br>",
    "TERMINAL/admin",
    "<br>",
    "<br>",
    "<br>",
    "> Launching CLI",
    "<br>"
  ];
  var outD = [
    "<br>",
    "<span style='color: red'>",
    "Access Denied",
    "</span>",
    "<br>",
    "<br>",
    " > SET TERMINAL/LOGON",
    "<br>",
    "<br>",
    "clear",
    "TERMINAL/LOGON",
    "<br>",
    "<br>",
    "> LOGIN AS 'admin'",
    "<br>",
    "> ENTER PASSWORD ",
    "<br>",
    "input"
  ];
  if (granted) {
    await sout(out);
    input(false, "command");
  } else {
    sout(outD);
    input(true, "login");
  }
}

let cmd = "";
async function handleCmd(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    event.target.setAttribute("contenteditable", false);
    event.target.classList.remove("active");
    await execute(event.target.innerHTML);
    cmd = "";
  }
}

async function execute(cmd) {
  var cmdArr = cmd.split(" ");
  switch (cmdArr[0].toLowerCase()) {
    case "help": {
      await sout([
        "barselouna",
        "<br>",
        "freddy",
        "<br>",
        "bober"
      ],
      350);
      break;
    }
    case "barselouna": {
      await sout(
        [
          "Drache:",
          "Was ist dein Lieblingsland?",
          "<br>",
          "Person A",
          ":",
          "Italien.",
          "<br>",
          "Person B",
          ":",
          "Barselounah.",
          "<br>",
          "Drache",
          ":",
          "Barselounah?",
          ",",
          "ok.",
          "<br>",
          "<br>"
        ],
        350
      );
      break;
    }
    case "freddy":{
      await sout([
        "ITZ FREDDY FAZBEAR",
        "<br>",
        "Urr", "uRr", "uRR", "UrR", "Urr", "URr", "URR", "urr", "Urr"
      ],200);
      break;
    }
    case "bober":{
      var bober = `
  ja pierdolę patrzcie co spotkałem!§ bóbr kurwa!§ ja pierdolę!§ jakie bydlę!§ bober!§ ej, kurwa, bober!§ bober, nie spierdalaj, mordo!§
  <br>§
                                              A§<br>§
                ___                          / \\§<br>§
              .="   "=._.---.               /   \\              ____________§<br>§
            ."         c ' Y''p            /     \\            /)  -§<br>§
          /     \\     '\\  w_/             :~~~~~~~:          / )-   .   -§<br>§
          |      )  /     /               |       |         <  )      -- §<br>§
    ______|     /__-\\ \\_=.\\               |       |          \\ )  -      -§<br>§
    (XXXXX/''------)))'=-'\"''\"___________/__/__\\___\\___ _ _ _ \\)___________§<br>§
`
        .replaceAll(" ", "§&nbsp;§")
        .split("§");
      console.log(bober)
      await sout(bober, );
      break;
    }
    default: {
      await sout("unknown command: " + cmd[0], 0);
    }
  }
  input(false, "command");
}
