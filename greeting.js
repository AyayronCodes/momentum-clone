const greeting = document.querySelector(".greeting");
const nameInput = document.querySelector(".name-input");

function getNameLs() {
  return localStorage.getItem("user");
}

function getNameInput() {
  return nameInput.value;
}

function saveName(name) {
  localStorage.setItem("user", name);
}

function clearNameInput() {
  nameInput.value = "";
}

function getTime() {
  return localStorage.getItem("time");
}

function getMessage(time) {
  const [hour, min] = time.split(":").map((el) => parseInt(el));
  if (hour === 0 && min === 0) {
    return "It's midnight already";
  } else if (0 <= hour && hour < 12) {
    return "Good morning";
  } else if (hour === 12 && min === 0) {
    return "It's exactly noon right now";
  } else if (12 <= hour && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

function displayGreeting(sentence) {
  greeting.innerText = sentence;
}

function greetingInit() {
  // check l.s. for user name
  let user = getNameLs();

  // if there is no user name in ls, show name input and get user input
  if (!user) {
    nameInput.classList.remove("hidden");
    // listen for enter, if user entered sth, it goes through
    window.addEventListener("keypress", (event) => {
      if (
        event.key === "Enter" &&
        event.target === nameInput &&
        nameInput.value !== ""
      ) {
        // get input value
        user = getNameInput();
        // save name to l.s.
        saveName(user);
        // clear input
        clearNameInput();
        // hide input display
        nameInput.classList.add("hidden");
        location.reload();
      }
    });
  } else {
    // get time
    const curTime = getTime();
    // check what part of day it is and get appropriate msg
    const message = getMessage(curTime);
    // make a greeting with username
    const sentence = message + ", " + user + ".";
    // display greeting
    displayGreeting(sentence);
  }
}

window.addEventListener("load", greetingInit);
