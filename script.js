let enableImg=document.getElementById("img");
const currentTime = document.getElementById("time");
let content = document.querySelector(".content");
let selectMenu = document.querySelectorAll("select");
let alarmButton = document.getElementById("btn");

//setSnooze=document.getElementById("snooze");

let alarmTime, isAlarmSet,
ringtone = new Audio("./files/Ambient.wav");
//set the value of hour
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
//set the value of minute
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
//set the value of Am/Pm
for (let i = 2; i > 0; i--) {
    let zone = i == 1 ? "AM" : "PM";
    let option = `<option value="${zone}">${zone}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
// //this is for the snooze
// for (let i = 59; i >= 0; i--) {
//     i = i < 10 ? `0${i}` : i;
//     let option = `<option value="${i}">${i}</option>`;
//     selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
// }

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    zone = "AM";
    if(h >= 12) {
        h = h - 12;
        zone = "PM";
    }
    h = (h == 0) ? (h = 12) : h;
    h = (h < 10) ? ("0" + h) : h;
    m = (m < 10) ? ("0" + m) : m;
    s = (s < 10) ? ("0" + s) : s;
    currentTime.innerText = `${h}:${m}:${s} ${zone}`;
//to play the alarm sound
    if (alarmTime === `${h}:${m} ${zone}`) {
        ringtone.play();
        ringtone.loop = true;
        enableImg.style.display='inline';
    }
});

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        alarmButton.innerText = "Set Alarm";
        enableImg.style.display='none';
        return isAlarmSet = false;
        
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, Enter a valid time");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    alarmButton.innerText = "stop Alarm";
    //setSnooze.style.display="inline";
}



alarmButton.addEventListener("click", setAlarm);
//setSnooze.addEventListener("click",resetAlarmTime);