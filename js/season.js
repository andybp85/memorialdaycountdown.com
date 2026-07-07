// Runs blocking in <head> so the season theme is set before first paint.
// Memorial Day = last Monday of May; Labor Day = first Monday of September.
// Summer runs from Memorial Day through the end of Labor Day.
// Preview either theme with ?season=summer or ?season=off.
(function () {
    const lastMondayOfMay = (year) => {
        const may31 = new Date(year, 4, 31);
        return new Date(year, 4, 31 - ((may31.getDay() + 6) % 7));
    };

    const firstMondayOfSeptember = (year) => {
        const sep1 = new Date(year, 8, 1);
        return new Date(year, 8, 1 + (8 - sep1.getDay()) % 7);
    };

    const dayAfter = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    const override = new URLSearchParams(window.location.search).get("season");

    const isSummer = (now) => {
        if (override === "summer" || override === "off") {
            return override === "summer";
        }
        return now >= lastMondayOfMay(now.getFullYear())
            && now < dayAfter(firstMondayOfSeptember(now.getFullYear()));
    };

    const PANORAMA_LABELS = {
        summer: "Illustration of the Asbury Park boardwalk in summer: a turning Ferris wheel,"
            + " a beach-pass pavilion, striped umbrellas on the sand, and the sea",
        off: "Illustration of the Asbury Park boardwalk in the off-season: a still Ferris wheel,"
            + " a boarded-up beach-pass pavilion with a closed-for-the-season sign, furled umbrellas,"
            + " gulls on the railing, and a gray sea under a crescent moon and stars",
    };

    const applySeason = (now) => {
        const season = isSummer(now) ? "summer" : "off";
        const root = document.documentElement;
        if (root.dataset.season !== season) {
            root.dataset.season = season;
            document.querySelector('meta[name="theme-color"]').content =
                season === "summer" ? "#8fd0ce" : "#101b26";
            document.querySelector('meta[name="color-scheme"]').content =
                season === "summer" ? "light" : "dark";
            const panorama = document.querySelector(".panorama");
            if (panorama) {
                panorama.setAttribute("aria-label", PANORAMA_LABELS[season]);
            }
        }
        return season === "summer";
    };

    applySeason(new Date());

    window.season = { applySeason, dayAfter, firstMondayOfSeptember, lastMondayOfMay };
}());
