/* =========================================================
   ДАШУЛЬКА — CINEMATIC SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];

    const loader = $("#loader");
    const openGift = $("#openGift");
    const startStory = $("#startStory");
    const restart = $("#restart");

    const giftBox = $("#giftBox");

    const progress = $("#progress");
    const counter = $("#counter");

    const cursorLight = $("#cursorLight");

    const stars = $("#stars");
    const fireflies = $("#fireflies");
    const dust = $("#dust");

    const wishModal = $("#wishModal");
    const closeModal = $("#closeModal");

    const modalSymbol = $("#modalSymbol");
    const modalNumber = $("#modalNumber");
    const modalTitle = $("#modalTitle");
    const modalText = $("#modalText");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let giftOpened = false;
    let ticking = false;
    let lastScroll = 0;

    /* -----------------------------------------------------
       DATA
    ----------------------------------------------------- */

    const wishes = [
        {
            number: "01",
            symbol: "✦",
            title: "Мечты",
            text:
                "Пусть у тебя будет много мечт, которые сначала " +
                "кажутся невозможными, а потом одна за другой " +
                "становятся настоящими. И пусть каждая новая мечта " +
                "делает жизнь ещё интереснее."
        },

        {
            number: "02",
            symbol: "♡",
            title: "Люди",
            text:
                "Пусть рядом будут люди, с которыми можно быть собой. " +
                "Смеяться до слёз, говорить обо всём подряд, " +
                "поддерживать друг друга и создавать воспоминания, " +
                "которые потом захочется пересказывать."
        },

        {
            number: "03",
            symbol: "∞",
            title: "Будущее",
            text:
                "Пусть впереди будет огромное количество событий, " +
                "которые сейчас даже невозможно представить. " +
                "Новых мест, новых историй, неожиданных возможностей " +
                "и моментов, которые заставят улыбнуться."
        },

        {
            number: "04",
            symbol: "☾",
            title: "Счастье",
            text:
                "Пусть счастье будет не только в больших событиях. " +
                "Пусть оно прячется в музыке, вечерних разговорах, " +
                "любимых людях, случайных улыбках и самых простых " +
                "моментах обычного дня."
        }
    ];


    /* -----------------------------------------------------
       HELPERS
    ----------------------------------------------------- */

    const random = (min, max) =>
        Math.random() * (max - min) + min;

    const randomInt = (min, max) =>
        Math.floor(random(min, max + 1));


    /* -----------------------------------------------------
       LOADER
    ----------------------------------------------------- */

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader?.classList.add("loaded");
            document.body.classList.add("page-ready");
        }, 700);

        setTimeout(() => {
            loader?.remove();
        }, 1700);

    });


    /* -----------------------------------------------------
       STAR FIELD
    ----------------------------------------------------- */

    function createStars() {

        if (!stars) return;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 110; i++) {

            const star = document.createElement("span");

            star.className = "generated-star";

            star.style.left = `${random(0, 100)}%`;
            star.style.top = `${random(0, 100)}%`;

            star.style.width =
                `${random(.7, 2.2)}px`;

            star.style.height =
                star.style.width;

            star.style.opacity =
                random(.15, .8);

            star.style.animationDelay =
                `${random(0, 5)}s`;

            star.style.animationDuration =
                `${random(2, 6)}s`;

            fragment.appendChild(star);
        }

        stars.appendChild(fragment);
    }


    /* -----------------------------------------------------
       FIREFLIES
       ----------------------------------------------------- */

    function createFireflies() {

        if (!fireflies) return;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 32; i++) {

            const fly = document.createElement("span");

            fly.className = "generated-firefly";

            fly.style.left =
                `${random(2, 98)}%`;

            fly.style.top =
                `${random(15, 95)}%`;

            fly.style.setProperty(
                "--x",
                `${random(-100, 100)}px`
            );

            fly.style.setProperty(
                "--y",
                `${random(-100, 100)}px`
            );

            fly.style.animationDelay =
                `${random(0, 8)}s`;

            fly.style.animationDuration =
                `${random(5, 12)}s`;

            fragment.appendChild(fly);
        }

        fireflies.appendChild(fragment);
    }


    /* -----------------------------------------------------
       DUST
       ----------------------------------------------------- */

    function createDust() {

        if (!dust) return;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 55; i++) {

            const particle = document.createElement("span");

            particle.className = "generated-dust";

            particle.style.left =
                `${random(0, 100)}%`;

            particle.style.top =
                `${random(0, 100)}%`;

            particle.style.setProperty(
                "--drift",
                `${random(-100, 100)}px`
            );

            particle.style.animationDelay =
                `${random(0, 10)}s`;

            particle.style.animationDuration =
                `${random(8, 18)}s`;

            fragment.appendChild(particle);
        }

        dust.appendChild(fragment);
    }

    createStars();
    createFireflies();
    createDust();


    /* -----------------------------------------------------
       REVEAL OBSERVER
       ----------------------------------------------------- */

    const revealItems = $$(".reveal");

    if (!prefersReducedMotion) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("visible");
        });

    }


    /* -----------------------------------------------------
       LETTER ANIMATION
       ----------------------------------------------------- */

    const paragraphs =
        $$(".letter__paragraph");

    paragraphs.forEach((paragraph, index) => {

        paragraph.style.setProperty(
            "--paragraph-delay",
            `${index * 90}ms`
        );

    });

    if (!prefersReducedMotion) {

        const letterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        letterObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .18
                }
            );

        paragraphs.forEach(paragraph => {
            letterObserver.observe(paragraph);
        });

    } else {

        paragraphs.forEach(paragraph => {
            paragraph.classList.add("visible");
        });

    }


    /* -----------------------------------------------------
       SCROLL ENGINE
       ----------------------------------------------------- */

    function updateScroll() {

        const scrollTop =
            window.scrollY;

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            maxScroll > 0
                ? scrollTop / maxScroll
                : 0;

        if (progress) {
            progress.style.transform =
                `scaleX(${percent})`;
        }

        updateSectionCounter(scrollTop);

        if (!prefersReducedMotion) {
            updateParallax(scrollTop);
        }

        lastScroll = scrollTop;
        ticking = false;
    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(
                updateScroll
            );

            ticking = true;
        }

    }, {
        passive: true
    });


    /* -----------------------------------------------------
       SECTION COUNTER
       ----------------------------------------------------- */

    function updateSectionCounter(scrollTop) {

        const sections =
            $$(".section");

        if (!sections.length || !counter) return;

        let current = 1;

        sections.forEach((section, index) => {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <
                window.innerHeight * .45
            ) {
                current = index + 1;
            }

        });

        current =
            Math.min(current, 7);

        counter.textContent =
            `${String(current).padStart(2, "0")} / 07`;
    }


    /* -----------------------------------------------------
       BACKGROUND PARALLAX
       ----------------------------------------------------- */

    function updateParallax(scrollTop) {

        const moon =
            $(".background__moon");

        const clouds =
            $$(".background__cloud");

        const leaves =
            $$(".background__leaves");

        const glow1 =
            $(".glow--1");

        const glow2 =
            $(".glow--2");

        if (moon) {

            moon.style.transform =
                `translate3d(0, ${scrollTop * .055}px, 0)`;
        }

        clouds.forEach((cloud, index) => {

            const speed =
                .018 + index * .012;

            cloud.style.transform =
                `translate3d(0, ${scrollTop * speed}px, 0)`;
        });

        leaves.forEach((leaf, index) => {

            const speed =
                .025 + index * .02;

            leaf.style.transform =
                `translate3d(${Math.sin(scrollTop * .001) * 10}px,
                             ${scrollTop * speed}px,
                             0)`;
        });

        if (glow1) {

            glow1.style.transform =
                `translate3d(
                    ${Math.sin(scrollTop * .001) * 20}px,
                    ${scrollTop * .02}px,
                    0
                )`;
        }

        if (glow2) {

            glow2.style.transform =
                `translate3d(
                    ${Math.cos(scrollTop * .0012) * 25}px,
                    ${-scrollTop * .015}px,
                    0
                )`;
        }
    }


    /* -----------------------------------------------------
       CURSOR LIGHT
       ----------------------------------------------------- */

    if (
        cursorLight &&
        !prefersReducedMotion
    ) {

        let mouseX = -500;
        let mouseY = -500;

        let currentX = mouseX;
        let currentY = mouseY;

        window.addEventListener(
            "pointermove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            },
            {
                passive: true
            }
        );

        function animateCursor() {

            currentX +=
                (mouseX - currentX) * .12;

            currentY +=
                (mouseY - currentY) * .12;

            cursorLight.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                )`;

            requestAnimationFrame(
                animateCursor
            );
        }

        animateCursor();
    }


    /* -----------------------------------------------------
       GIFT OPENING
       ----------------------------------------------------- */

    function openPresent() {

        if (giftOpened) return;

        giftOpened = true;

        giftBox?.classList.add("opened");

        document.body.classList.add(
            "gift-is-open"
        );

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        setTimeout(() => {

            startStory?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 950);

    }


    openGift?.addEventListener(
        "click",
        openPresent
    );

    giftBox?.addEventListener(
        "click",
        openPresent
    );


    /* -----------------------------------------------------
       START STORY
       ----------------------------------------------------- */

    startStory?.addEventListener(
        "click",
        () => {

            const intro =
                $("#intro");

            intro?.scrollIntoView({
                behavior: "smooth"
            });

            createBurst(
                window.innerWidth / 2,
                window.innerHeight * .65
            );

        }
    );


    /* -----------------------------------------------------
       WISH MODAL
       ----------------------------------------------------- */

    function openWish(index) {

        const wish =
            wishes[index];

        if (!wish || !wishModal) return;

        modalSymbol.textContent =
            wish.symbol;

        modalNumber.textContent =
            wish.number;

        modalTitle.textContent =
            wish.title;

        modalText.textContent =
            wish.text;

        wishModal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
    }


    function closeWish() {

        wishModal?.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );
    }


    $$(".wish-card").forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        card.dataset.wish
                    );

                openWish(index);
            }
        );

    });


    closeModal?.addEventListener(
        "click",
        closeWish
    );


    wishModal?.addEventListener(
        "click",
        event => {

            if (
                event.target === wishModal
            ) {
                closeWish();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {
                closeWish();
            }

        }
    );


    /* -----------------------------------------------------
       CARD TILT
       ----------------------------------------------------- */

    if (!prefersReducedMotion) {

        $$(".wish-card").forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 8;

                    const rotateX =
                        ((y / rect.height) - .5) * -8;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );

            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* -----------------------------------------------------
       MAGNETIC BUTTONS
       ----------------------------------------------------- */

    if (!prefersReducedMotion) {

        $$(".main-button, .outline-button, .restart-button")
            .forEach(button => {

                button.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;

                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;

                        button.style.transform =
                            `translate(
                                ${x * .08}px,
                                ${y * .08}px
                            )`;
                    }
                );

                button.addEventListener(
                    "pointerleave",
                    () => {
                        button.style.transform = "";
                    }
                );

            });

    }


    /* -----------------------------------------------------
       CLICK SPARKS
       ----------------------------------------------------- */

    document.addEventListener(
        "pointerdown",
        event => {

            if (prefersReducedMotion) return;

            createClickSparks(
                event.clientX,
                event.clientY
            );

        }
    );


    function createClickSparks(x, y) {

        const count = 7;

        for (let i = 0; i < count; i++) {

            const spark =
                document.createElement("span");

            spark.className =
                "click-spark";

            const angle =
                (Math.PI * 2 / count) * i;

            const distance =
                random(20, 55);

            spark.style.left =
                `${x}px`;

            spark.style.top =
                `${y}px`;

            spark.style.setProperty(
                "--tx",
                `${Math.cos(angle) * distance}px`
            );

            spark.style.setProperty(
                "--ty",
                `${Math.sin(angle) * distance}px`
            );

            document.body.appendChild(
                spark
            );

            setTimeout(
                () => spark.remove(),
                700
            );
        }
    }


    /* -----------------------------------------------------
       BIG PARTICLE BURST
       ----------------------------------------------------- */

    function createBurst(x, y) {

        if (prefersReducedMotion) return;

        const count = 34;

        for (let i = 0; i < count; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "burst-particle";

            const angle =
                random(0, Math.PI * 2);

            const distance =
                random(80, 300);

            const size =
                random(2, 6);

            particle.style.left =
                `${x}px`;

            particle.style.top =
                `${y}px`;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.setProperty(
                "--tx",
                `${Math.cos(angle) * distance}px`
            );

            particle.style.setProperty(
                "--ty",
                `${Math.sin(angle) * distance}px`
            );

            document.body.appendChild(
                particle
            );

            setTimeout(
                () => particle.remove(),
                1400
            );
        }
    }


    /* -----------------------------------------------------
       HERO TITLE PARALLAX
       ----------------------------------------------------- */

    const heroTitle =
        $(".hero__title");

    if (
        heroTitle &&
        !prefersReducedMotion
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5);

                heroTitle.style.transform =
                    `translate3d(
                        ${x * 14}px,
                        ${y * 10}px,
                        0
                    )`;
            }
        );

    }


    /* -----------------------------------------------------
       HERO MOUSE DEPTH
       ----------------------------------------------------- */

    const heroContent =
        $(".hero__content");

    if (
        heroContent &&
        !prefersReducedMotion
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5);

                heroContent.style.transform =
                    `translate3d(
                        ${x * -5}px,
                        ${y * -4}px,
                        0
                    )`;
            }
        );

    }


    /* -----------------------------------------------------
       RESTART
       ----------------------------------------------------- */

    restart?.addEventListener(
        "click",
        () => {

            closeWish();

            giftOpened = false;

            giftBox?.classList.remove(
                "opened"
            );

            document.body.classList.remove(
                "gift-is-open"
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            createBurst(
                window.innerWidth / 2,
                120
            );

            setTimeout(() => {

                revealItems.forEach(item => {

                    if (
                        item.closest("#hero")
                    ) {
                        item.classList.add(
                            "visible"
                        );
                    }

                });

                updateScroll();

            }, 900);

        }
    );


    /* -----------------------------------------------------
       KEYBOARD NAVIGATION
       ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.matches(
                    "input, textarea, button"
                )
            ) {
                return;
            }

            if (
                event.key === "Home"
            ) {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

            if (
                event.key === "End"
            ) {

                window.scrollTo({
                    top:
                        document.documentElement
                            .scrollHeight,
                    behavior: "smooth"
                });

            }

        }
    );


    /* -----------------------------------------------------
       HOVER GLOW FOR SECTIONS
       ----------------------------------------------------- */

    if (!prefersReducedMotion) {

        $$(".section").forEach(section => {

            section.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        section.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    section.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    section.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

    }


    /* -----------------------------------------------------
       SMOOTH INTERNAL LINKS
       ----------------------------------------------------- */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


    /* -----------------------------------------------------
       VISIBILITY OPTIMIZATION
       ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {
                document.body.classList.add(
                    "page-hidden"
                );
            } else {
                document.body.classList.remove(
                    "page-hidden"
                );
            }

        }
    );


    /* -----------------------------------------------------
       RESIZE
       ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        () => {
            updateScroll();
        },
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       INITIAL STATE
       ----------------------------------------------------- */

    updateScroll();


    /* -----------------------------------------------------
       CONSOLE
       ----------------------------------------------------- */

    console.log(
        "%c✦ Для Дашульки ✦",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cОт Вовочки 🤍",
        "font-size:14px;"
    );

});