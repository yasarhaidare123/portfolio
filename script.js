/* =========================================================
   MUHAMMAD YASAR - PORTFOLIO
   Lightweight & Fast JavaScript
   No Preloader / No Loading Screen
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       SELECTORS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("#navLinks");
    const navLinks = document.querySelectorAll("#navLinks a");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        const setMenuOpen = isOpen => {

            menuToggle.classList.toggle("active", isOpen);
            navMenu.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));

        };

        menuToggle.addEventListener("click", () => {

            setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                setMenuOpen(false);

            });

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    if (navbar) {

        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(() => {

                        if (window.scrollY > 50) {

                            navbar.classList.add("scrolled");

                        } else {

                            navbar.classList.remove("scrolled");

                        }

                        ticking = false;

                    });

                    ticking = true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Full Stack Developer",
            "Web Developer",
            "Web Designer",
            "Web Application Developer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 75;
        const deletingSpeed = 40;
        const pauseTime = 1600;


        function typingEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typingEffect,
                        pauseTime
                    );

                    return;
                }


                setTimeout(
                    typingEffect,
                    typingSpeed
                );

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (
                        wordIndex >=
                        words.length
                    ) {

                        wordIndex = 0;

                    }

                    setTimeout(
                        typingEffect,
                        350
                    );

                    return;
                }


                setTimeout(
                    typingEffect,
                    deletingSpeed
                );

            }

        }


        typingEffect();

    }


    /* =====================================================
       SCROLL REVEAL
       Lightweight IntersectionObserver
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up, .fade-left, .fade-right, .service-card, .project-card, .skill-card"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       SKILL PROGRESS BARS
    ===================================================== */

    const progressBars =
        document.querySelectorAll(
            ".skill-progress, .progress-bar"
        );


    if (
        "IntersectionObserver" in window &&
        progressBars.length
    ) {

        const progressObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const bar =
                                entry.target;

                            const width =
                                bar.dataset.width ||
                                bar.dataset.progress;


                            if (width) {

                                requestAnimationFrame(
                                    () => {

                                        bar.style.width =
                                            `${width}%`;

                                    }
                                );

                            }


                            progressObserver.unobserve(
                                bar
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        progressBars.forEach(bar => {

            progressObserver.observe(bar);

        });

    }


    /* =====================================================
       PROJECT FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn, .project-filter"
        );

    const projectCards =
        document.querySelectorAll(
            ".project-card, .project-item"
        );


    if (
        filterButtons.length &&
        projectCards.length
    ) {

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.filter ||
                        button.dataset.category;


                    projectCards.forEach(card => {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            filter === "*" ||
                            category === filter
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    });

                }
            );

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (sections.length && navLinks.length) {

        const updateActiveNav = () => {

            const scrollPosition =
                window.scrollY + 180;

            let currentSection = "";


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {

                    currentSection =
                        section.id;

                }

            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        };


        let navTicking = false;


        window.addEventListener(
            "scroll",
            () => {

                if (!navTicking) {

                    window.requestAnimationFrame(
                        () => {

                            updateActiveNav();

                            navTicking = false;

                        }
                    );

                    navTicking = true;

                }

            },
            {
                passive: true
            }
        );


        updateActiveNav();

    }


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    let backToTop =
        document.querySelector(
            ".back-to-top"
        );


    if (!backToTop) {

        backToTop =
            document.createElement(
                "button"
            );

        backToTop.className =
            "back-to-top";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backToTop.innerHTML =
            "↑";

        document.body.appendChild(
            backToTop
        );

    }


    let backTopTicking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!backTopTicking) {

                window.requestAnimationFrame(
                    () => {

                        if (
                            window.scrollY >
                            500
                        ) {

                            backToTop.classList.add(
                                "show"
                            );

                        } else {

                            backToTop.classList.remove(
                                "show"
                            );

                        }

                        backTopTicking = false;

                    }
                );

                backTopTicking = true;

            }

        },
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            "#contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const formStatus =
                    contactForm.querySelector("#form-status");

                if (formStatus) {
                    formStatus.textContent =
                        "Your details are valid. This form is not connected to a message service yet.";
                }

            }
        );

    }


    /* =====================================================
       FORM INPUT EFFECT
    ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".contact-form input, .contact-form textarea"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input.parentElement?.classList.add(
                    "focused"
                );

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input.parentElement?.classList.remove(
                    "focused"
                );

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                menuToggle?.classList.remove(
                    "active"
                );

                navMenu?.classList.remove(
                    "active"
                );

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       AUTO CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll(
            "#year, #current-year, .current-year"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "Muhammad Yasar | Full Stack Web Developer"
    );

});
