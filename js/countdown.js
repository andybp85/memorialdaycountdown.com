// Ticks the marquee clock. Summer counts down to the end of Labor Day; the
// off-season counts down to Memorial Day. Re-applies the season each tick so
// the page flips itself at a boundary without a reload.
(function () {
    const { applySeason, dayAfter, firstMondayOfSeptember, lastMondayOfMay } = window.season;

    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;

    const nextMemorialDay = (now) => {
        const thisYear = lastMondayOfMay(now.getFullYear());
        return now < thisYear ? thisYear : lastMondayOfMay(now.getFullYear() + 1);
    };

    const fields = ["days", "hours", "minutes", "seconds"].map((id) => document.getElementById(id));
    const dateSpans = document.querySelectorAll(".next-memorial-day");

    const render = () => {
        const now = new Date();
        const summer = applySeason(now);
        const target = summer
            ? dayAfter(firstMondayOfSeptember(now.getFullYear()))
            : nextMemorialDay(now);
        const distance = Math.max(0, target - now);
        [
            Math.floor(distance / MS_PER_DAY),
            Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR),
            Math.floor((distance % MS_PER_HOUR) / MS_PER_MINUTE),
            Math.floor((distance % MS_PER_MINUTE) / MS_PER_SECOND),
        ].forEach((value, i) => {
            fields[i].textContent = i === 0 ? value : String(value).padStart(2, "0");
        });
        const nextDate = nextMemorialDay(now).toLocaleDateString("en-US",
            { month: "long", day: "numeric", year: "numeric" });
        dateSpans.forEach((span) => {
            if (span.textContent !== nextDate) {
                span.textContent = nextDate;
            }
        });
    };

    render();
    setInterval(render, MS_PER_SECOND);

    // The panorama flexes to fill the space left over by the fixed-height
    // content. When its box is wider than the drawing's 3:1 aspect, slice
    // (full-bleed, crops sky); when narrower, meet (full width, sky gap).
    // Either way it stays bottom-anchored and never leaves side gaps.
    const panorama = document.querySelector(".panorama");
    const PANORAMA_ASPECT = 3;

    const fitPanorama = () => {
        const box = panorama.getBoundingClientRect();
        if (box.height > 0) {
            panorama.setAttribute("preserveAspectRatio",
                box.width / box.height > PANORAMA_ASPECT ? "xMidYMax slice" : "xMidYMax meet");
        }
    };

    fitPanorama();
    window.addEventListener("resize", fitPanorama);
}());
