// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');

// Setting up the time
const updateTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString();
}
setInterval(updateTime, 1000);
updateTime();