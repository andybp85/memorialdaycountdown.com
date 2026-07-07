// Memorial Day is the last Monday of May; Labor Day is the first Monday of September.
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

const lastMondayOfMay = (year) => {
    const may31 = new Date(year, 4, 31);
    return new Date(year, 4, 31 - ((may31.getDay() + 6) % 7));
};

const nextMemorialDay = (now) => {
    const thisYear = lastMondayOfMay(now.getFullYear());
    return now < thisYear ? thisYear : lastMondayOfMay(now.getFullYear() + 1);
};

const fields = ["days", "hours", "minutes", "seconds"].map((id) => document.getElementById(id));

const render = () => {
    const now = new Date();
    const distance = nextMemorialDay(now) - now;
    const [days, hours, minutes, seconds] = [
        Math.floor(distance / MS_PER_DAY),
        Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR),
        Math.floor((distance % MS_PER_HOUR) / MS_PER_MINUTE),
        Math.floor((distance % MS_PER_MINUTE) / MS_PER_SECOND),
    ];
    [days, hours, minutes, seconds].forEach((value, i) => {
        fields[i].textContent = value;
    });
};

render();
setInterval(render, MS_PER_SECOND);
