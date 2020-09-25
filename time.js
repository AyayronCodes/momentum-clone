const time = document.querySelector(".time");

function getCurrentTime() {
  const date = new Date();
  const hour = date.getHours(),
    min = date.getMinutes();

  return [hour, min];
}

function formatTime(hour, min) {
  const formatHour = "" + (hour % 12);
  const formatMin = min < 10 ? "0" + min : "" + min;
  return formatHour + ":" + formatMin;
}

function displayTime(formattedTime) {
  time.innerText = formattedTime;
}

function saveTime(time) {
  localStorage.setItem("time", time);
}

function hasTimeDiff() {
  const displayMin = parseInt(time.innerText.split(":")[1]);
  // true if time changed
  return !(new Date().getMinutes === displayMin);
}

function timeInit() {
  // if first time (no l.s. data), get current time, save and display
  if (localStorage.getItem("time") === null || hasTimeDiff() === true) {
    // console.log("detected no item or detected time diff");
    // save current hour and min
    const [hour, min] = getCurrentTime();
    // save time to l.s.
    saveTime(hour + ":" + min);
    // format to string
    const formattedTime = formatTime(hour, min);
    // display current time
    displayTime(formattedTime);
  }
}

window.addEventListener("load", () => {
  setInterval(timeInit, 1000);
});
