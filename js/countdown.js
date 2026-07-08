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
    // content. Fit by the box's aspect ratio vs the drawing's 3:1:
    //   > 3:1  — slice: full-bleed, crops sky from the top
    //   1.65–3 — meet: full width, a modest sky gap above the scene
    //   < 1.65 — slice: portrait; fill the space by cropping the sides
    //            (.cropped shifts the sun/moon inward so they stay visible)
    // Always bottom-anchored, never side gaps, never a giant void.
    const panorama = document.querySelector(".panorama");

    const fitPanorama = () => {
        const box = panorama.getBoundingClientRect();
        if (box.height === 0) {
            return;
        }
        const aspect = box.width / box.height;
        const cropped = aspect < 1.65;
        panorama.setAttribute("preserveAspectRatio",
            cropped || aspect > 3 ? "xMidYMax slice" : "xMidYMax meet");
        panorama.classList.toggle("cropped", cropped);
    };

    fitPanorama();
    window.addEventListener("resize", fitPanorama);
}());
