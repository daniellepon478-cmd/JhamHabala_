// ==============================
// TYPING EFFECT
// ==============================

const nameText = "Jhamila R. Habala";

const typingName = document.getElementById("typingName");

let typeIndex = 0;

function typeName() {

    if (typeIndex < nameText.length) {

        typingName.textContent += nameText.charAt(typeIndex);

        typeIndex++;

        setTimeout(typeName, 90);
    }
}

typeName();


// ==============================
// DARK / LIGHT MODE
// ==============================

const themeButton = document.getElementById("themeToggle");
const themeButtonTop = document.getElementById("themeToggleTop");

function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    if (themeButton) {

        themeButton.textContent =
            isLight ? "☾ Dark Mode" : "☀ Light / Dark";

    }

    if (themeButtonTop) {

        themeButtonTop.textContent =
            isLight ? "☾" : "☀";

    }

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );
}

if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
}

if (themeButtonTop) {
    themeButtonTop.addEventListener("click", toggleTheme);
}


// Remember selected theme

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    if (themeButton) {
        themeButton.textContent = "☾ Dark Mode";
    }

    if (themeButtonTop) {
        themeButtonTop.textContent = "☾";
    }
}


// ==============================
// FADE SECTIONS WHEN SCROLLING
// ==============================

const revealItems =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                }

            });

        },

        {
            threshold: 0.12
        }

    );

revealItems.forEach(function(item) {

    revealObserver.observe(item);

});


// ==============================
// ACTIVE MENU
// ==============================

const sections =
    document.querySelectorAll("main section");

const navLinks =
    document.querySelectorAll(".nav-link");

const sectionObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    navLinks.forEach(function(link) {

                        link.classList.toggle(

                            "active",

                            link.getAttribute("href")
                            === "#" + entry.target.id

                        );

                    });

                }

            });

        },

        {
            threshold: 0.45
        }

    );

sections.forEach(function(section) {

    sectionObserver.observe(section);

});


// ==============================
// HIGHLIGHT TODAY'S CLASSES
// ==============================

function highlightToday() {

    const day = new Date().getDay();

    const dayMap = {

        0: "SUN",
        1: "M",
        2: "TUE",
        3: "W",
        4: "THU",
        5: "F",
        6: "SAT"

    };

    const today = dayMap[day];

    const rows =
        document.querySelectorAll(
            "#scheduleTable tbody tr"
        );

    rows.forEach(function(row) {

        const scheduleDay =
            row.dataset.day;

        let isToday = false;

        // Tuesday classes

        if (
            scheduleDay === "TUE"
            &&
            today === "TUE"
        ) {

            isToday = true;
        }

        // Monday, Wednesday and Friday classes

        if (
            scheduleDay === "MWF"
            &&
            ["M", "W", "F"].includes(today)
        ) {

            isToday = true;
        }

        row.classList.toggle(
            "today",
            isToday
        );

    });
}

highlightToday();


// ==============================
// CONTACT FORM
// ==============================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name")
            .value.trim();

        const email =
            document.getElementById("email")
            .value.trim();

        const message =
            document.getElementById("message")
            .value.trim();


        // Check if fields are empty

        if (
            !name ||
            !email ||
            !message
        ) {

            formMessage.textContent =
                "Please fill in all fields.";

            formMessage.style.color =
                "#f08da1";

            return;
        }


        // Successful form

        formMessage.textContent =
            "Message form completed successfully!";

        formMessage.style.color =
            "#7ed6a1";

        contactForm.reset();

    }
);