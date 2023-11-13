<template>
  <div class="main">
    <div class="password">
      <div class="container">
        <div class="overlay">AV-1</div>
        <p id="terminal" class="terminal">Welcome on Tobe.WebSolutions (TM)<br /><br></p>
        <div id="cursor" class="cursor"></div>

        <div class='cursorInput' v-if="input">
          [ <input
            id="password"
            type="password"
            v-model="inputValue"
            @keypress="updateCursorLeft(), handleKeyPress($event)"
            :autofocus="true"
            @focus="this.onFocus = true"
            ref="inputField"
          /> ]
          <i v-if="onFocus" :style="{ left: cursorLeft }"></i>
</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  props: {
    msg: String,
  },
  data() {
    return {
      input: false,
      inputValue: '',
      cursorLeft: "22px",
      onFocus: false
    };
  },
  methods: {
    async loadText() {
      var terminal = document.querySelector("#terminal");
      var cursor = document.querySelector("#cursor");
      var texts = [
        "> SET TERMINAL/BOOT<br>",
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
        ".",
        ".", 
        ".",
        "<br>",
        "Checking RAM........",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "Checking PCI Busses.",
        ".",
        ".",
        ".",
        "<br>",
        "&nbsp;&nbsp;> bus0 0x00FF00......[ OK ]<br>",
        "&nbsp;&nbsp;> bus1 0x00FF16......[ No Device ]<br>",
        "Checking SATA-Ports.",
        ".",
        ".",
        ".",
        "<br>",
        "&nbsp;&nbsp;> sata0..............[ OK ]<br>",
        "&nbsp;&nbsp;> sata1..............[ OK ]<br>",
        "&nbsp;&nbsp;> sata2..............[ No Drive ]<br>",
        "&nbsp;&nbsp;> sata3..............[ No Drive ]<br><br>",
        "SEARCHING FOR BOOTABLE MEDIUM",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "&nbsp;&nbsp;> sata0..............[ sys ]<br>",
        "MASTER BOOT RECORD..",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "PLEASE WAIT",
        ".",
        ".",
        ".",
        "<br><br>",
        "> SET TERMINAL/SERVICES<br>",
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
        "Starting Floppy Disk Driver.",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "Starting Network Client.....",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "Setting up interface eth0...",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "&nbsp;&nbsp;> connected 192.168.0.126<br>",
        "Checking for Updates........",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "Starting Periphery Driver(s)",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "Detecting Devices...........",
        ".",
        ".",
        ".",
        "[ OK ]<br>",
        "&nbsp;&nbsp;> usb0 0xFF3409<br>",
        "&nbsp;&nbsp;> usb1 0xFF3509<br>",
        "<br><br>",
        "> SET TERMINAL/LOGON<br><br>",
        "clear",
        "TERMINAL/LOGON<br><br>",
        "> LOGIN AS 'admin'<br>",
        "> ENTER PASSWORD <br>",
        "input"
      ];
      for (let i = 0; i < texts.length; i++) {
        let time = Math.random() * 100 + 100;
        if (texts[i] == "clear") {
          time = 5000;
        }else if(texts[i] == "input"){
          time = 0;
        }
        await new Promise((resolve) => setTimeout(resolve, time));
        if (texts[i] == "clear") {
          terminal.innerHTML = "";
          cursor.style.display = "none";
          this.input = true;
        }else if(texts[i] == "input"){
          continue;
        } else {
          terminal.innerHTML += texts[i];
        }
      }
    },
    updateCursorLeft() {
      this.cursorLeft = `${22 + this.inputValue.length*11}px`;
    },
    handleKeyPress(event){
      if(event.key == "Enter"){
        this.$refs.inputField.parentElement.children[1].style.display = "none";
        this.checkPass();
      }
    },
    async checkPass(){
      this.$refs.inputField.disabled = true;
      var pswd = this.$refs.inputField.value;
      this.$refs.inputField.value = "";
      var terminal = document.querySelector("#terminal");
      this.input = false;
      var checking = ["checking", ".", ".", "."];
      for (let i = 0; i < checking.length; i++) {
        let time = Math.random() * 100 + 100;
        await new Promise((resolve) => setTimeout(resolve, time));
        terminal.innerHTML += checking[i];
      }
      if(pswd == "0815"){
        this.passwordTrue();
      }else{
        var texts = [
        "<br><span style='color: red'>Access Denied</span><br>",
        "<br> > SET TERMINAL/LOGON<br><br>",
        "clear",
        "TERMINAL/LOGON<br><br>",
        "> LOGIN AS 'admin'<br>",
        "> ENTER PASSWORD <br>",
        "input"
      ];
      for (let i = 0; i < texts.length; i++) {
        let time = Math.random() * 3 + 2;
        if (texts[i] == "clear") {
          time = 1500;
        }else if(texts[i] == "input"){
          this.$refs.inputField.active = true;
          time = 0;
        }
        await new Promise((resolve) => setTimeout(resolve, time));
        if (texts[i] == "clear") {
          terminal.innerHTML = "";
          this.input = true;
        }else if(texts[i] == "input"){
          continue;
        } else {
          terminal.innerHTML += texts[i];
        }
      }
      }
    },
    async passwordTrue(){
      var cursor = document.querySelector("#cursor");
      cursor.style.display = "";
      var terminal = document.querySelector("#terminal");
      terminal.innerHTML = "";
      var texts = [
        "Access Granted<br>",
        "<br> > SET TERMINAL/admin<br>",
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
        "TERMINAL/admin<br><br><br>",
        "> Launching UI"
      ];
      for (let i = 0; i < texts.length; i++) {
        let time = Math.random() * 200 + 300;
        await new Promise((resolve) => setTimeout(resolve, time));
        terminal.innerHTML += texts[i];
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.open("https://www.tobe-websolutions.de/");
      terminal.innerHTML += "<br>UI Launched. Press (F5) to reboot."
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadText();
    }, 5500);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
$ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
$screen-background: #002001;

.container {
  background: $screen-background;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-align: left;

  // flicker
  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: transparentize($screen-background, 0.9);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
  }
  // scanlines
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        transparentize($screen-background, 1) 50%,
        transparentize(darken($screen-background, 10), 0.75) 50%
      ),
      linear-gradient(
        90deg,
        transparentize(#ff0000, 0.94),
        transparentize(#00ff00, 0.98),
        transparentize(#0000ff, 0.94)
      );
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
}
.container::after {
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  $steps: 10;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      opacity: random();
    }
  }
}

@keyframes turn-on {
  0% {
    transform: scale(1, 0.8) translate3d(0, 0, 0);
    -webkit-filter: brightness(30);
    filter: brightness(30);
    opacity: 1;
  }
  3.5% {
    transform: scale(1, 0.8) translate3d(0, 100%, 0);
  }

  3.6% {
    transform: scale(1, 0.8) translate3d(0, -100%, 0);
    opacity: 1;
  }

  9% {
    transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
    -webkit-filter: brightness(30);
    filter: brightness(30);
    opacity: 0;
  }

  11% {
    transform: scale(1, 1) translate3d(0, 0, 0);
    -webkit-filter: contrast(0) brightness(0);
    filter: contrast(0) brightness(0);
    opacity: 0;
  }

  100% {
    transform: scale(1, 1) translate3d(0, 0, 0);
    -webkit-filter: contrast(1) brightness(1.2) saturate(1.3);
    filter: contrast(1) brightness(1.2) saturate(1.3);
    opacity: 1;
  }
}
@keyframes turn-off {
  0% {
    transform: scale(1, 1.3) translate3d(0, 0, 0);
    -webkit-filter: brightness(1);
    filter: brightness(1);
    opacity: 1;
  }
  60% {
    transform: scale(1.3, 0.001) translate3d(0, 0, 0);
    -webkit-filter: brightness(10);
    filter: brightness(10);
  }
  100% {
    animation-timing-function: $ease-in-quint;
    transform: scale(0, 0.0001) translate3d(0, 0, 0);
    -webkit-filter: brightness(50);
    filter: brightness(50);
  }
}
.screen {
  width: 100%;
  height: 100%;
  border: none;
}
.container .screen {
  animation: turn-on 4s linear;
  animation-fill-mode: forwards;
}

@keyframes overlay-anim {
  0% {
    visibility: hidden;
  }
  20% {
    visibility: hidden;
  }
  21% {
    visibility: visible;
  }
  100% {
    visibility: hidden;
  }
}

@keyframes terminal-anim {
  0% {
    visibility: hidden;
  }
  99% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
}

@keyframes cursor-blink {
  0%   { background: #6eff6e }
  47%  { background: #6eff6e }
  50%  { background: rgba(0,0,0,0) }
  97%  { background: rgba(0,0,0,0) }
  100% { background: #6eff6e }
}

.overlay {
  color: #00ff00;
  position: relative;
  top: 20px;
  left: 20px;
  font-size: 60px;
  text-shadow: 2px 2px black, -2px -2px black, -2px 2px black, 2px -2px black;
  pointer-events: none;
}
.container .terminal {
  animation: terminal-anim 3s linear;
  visibility: visible;
  color: #00ff00;
  position: relative;
  top: 5px;
  left: 20px;
  font-size: 18px;
  //text-shadow:2px 2px black,-2px -2px black, -2px 2px black, 2px -2px black;
  pointer-events: none;
}

.container .cursor {
  height: 18px;
  width: 10px;
  top: 20px;
  margin-left: 20px;
  background: #6eff6e;
  opacity: 1;
  animation: terminal-anim 3s linear, cursor-blink 0.4s linear infinite;
}

.container .overlay {
  animation: overlay-anim 3s linear;
  animation-fill-mode: forwards;
}

.container .cursorInput{
  position: relative;
  z-index: 100;
  margin-left: 20px;
  margin-top: 10px;
  animation: terminal-anim 3s linear;
  font-size: 18px; color: #00ff00;

  input{
    background: rgba(0,0,0,0);
    width: 250px;
    border: none;
    outline: none;
    height: 20px;
    font-size: 18px;
    color: #00ff00;
    caret-color: rgba(0,0,0,0);
    font-family: 'Courier New', Courier, monospace;

  }

  i {
    display: inline-block;
    width: 10px;
    height: 18px;
    background-color: #6eff6e;
    animation: cursor-blink 0.4s linear infinite; //terminal-anim 3s linear;
    display: inline-block;
    position: absolute;
    pointer-events: none;
  }
}

.main {
  background: #1f1f1f;
  height: 100vh;
  font-family: "Courier New", Courier, monospace;
}
</style>
