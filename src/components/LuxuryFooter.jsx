import React from "react";
import {
    FiArrowRight,
    FiArrowUp,
    FiArrowUpRight,
    FiBriefcase,
    FiCheck,
    FiCode,
    FiCompass,
    
    FiHeart,
    FiMoon,
    FiSearch,
    FiSun,
    FiTarget,
} from "react-icons/fi";

import "./LuxuryFooter.css";

const LuxuryFooter = () => {
    const [darkMode, setDarkMode] =
        React.useState(false);

    /* =========================================
       THEME SYNC
    ========================================= */

    React.useEffect(() => {
        const savedTheme =
            localStorage.getItem(
                "hirenest-theme"
            );

        setDarkMode(
            savedTheme === "dark"
        );

        const handleThemeChange = () => {
            const theme =
                localStorage.getItem(
                    "hirenest-theme"
                );

            setDarkMode(
                theme === "dark"
            );
        };

        window.addEventListener(
            "hirenest-theme-change",
            handleThemeChange
        );

        return () => {
            window.removeEventListener(
                "hirenest-theme-change",
                handleThemeChange
            );
        };
    }, []);


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const scrollToSection = (
        selector
    ) => {
        const target =
            document.querySelector(
                selector
            );

        if (!target) return;

        const navbar =
            document.querySelector(
                "nav"
            );

        const navHeight =
            navbar
                ? navbar.offsetHeight
                : 0;

        const top =
            target.getBoundingClientRect()
                .top +
            window.scrollY -
            navHeight -
            12;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };


    /* =========================================
       BACK TO TOP
    ========================================= */

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    /* =========================================
       NAVIGATION GROUPS
    ========================================= */

    const opportunityLinks = [
        {
            label: "Find Jobs",
            selector: ".featured-jobs",
            icon: FiBriefcase,
        },
        {
            label: "Internships",
            selector: ".career-paths",
            icon: FiCompass,
        },
        {
            label: "Companies",
            selector: ".hiring-orbit",
            icon: FiSearch,
        },
        {
            label: "Smart Matches",
            selector: ".smart-radar",
            icon: FiTarget,
        },
    ];

    const careerLinks = [
        {
            label: "Career Match",
            selector: ".career-match",
        },
        {
            label: "Career Profile",
            selector: ".career-profile",
        },
        {
            label: "Career Playground",
            selector: ".career-playground",
        },
        {
            label: "Career Flow",
            selector: ".career-flow",
        },
    ];

    const companyLinks = [
        {
            label: "About HireNest",
            action: () => {
                console.log(
                    "About HireNest"
                );
            },
        },
        {
            label: "Contact",
            action: () => {
                console.log(
                    "Contact"
                );
            },
        },
        {
            label: "Privacy",
            action: () => {
                console.log(
                    "Privacy"
                );
            },
        },
        {
            label: "Terms",
            action: () => {
                console.log(
                    "Terms"
                );
            },
        },
    ];


    return (
        <footer
            className={`luxury-footer ${darkMode
                    ? "luxury-footer-dark"
                    : "luxury-footer-light"
                }`}
        >

            {/* ==================================================
                BACKGROUND
            ================================================== */}

            <div className="footer-orb footer-orb-one"></div>
            <div className="footer-orb footer-orb-two"></div>

            <div className="footer-grid-lines"></div>


            <div className="luxury-footer-container">

                {/* ==================================================
                    HERO CLOSING
                ================================================== */}

                <div className="footer-closing">

                    <div className="footer-closing-left">

                        <span className="footer-eyebrow">
                            YOUR NEXT CHAPTER
                        </span>

                        <h2>
                            Keep moving
                            <br />
                            <span>
                                forward.
                            </span>
                        </h2>

                        <p>
                            Discover opportunities,
                            build your career and
                            take the next step with
                            HireNest.
                        </p>


                        <div className="footer-main-actions">

                            <button
                                className="footer-primary-btn"
                                onClick={() =>
                                    scrollToSection(
                                        ".featured-jobs"
                                    )
                                }
                            >
                                Explore Jobs

                                <FiArrowUpRight />
                            </button>

                            <button
                                className="footer-secondary-btn"
                                onClick={() =>
                                    scrollToSection(
                                        ".career-profile"
                                    )
                                }
                            >
                                Create Your Profile

                                <FiArrowRight />
                            </button>

                        </div>

                    </div>


                    {/* ==================================================
                        MINI STATEMENT
                    ================================================== */}

                    <div className="footer-closing-right">

                        <div className="footer-quote-mark">
                            “
                        </div>

                        <p>
                            Your career doesn't
                            have to follow a
                            perfect path.
                        </p>

                        <span>
                            Find the path that
                            feels right for you.
                        </span>

                        <div className="footer-heart">
                            <FiHeart />
                        </div>

                    </div>

                </div>


                {/* ==================================================
                    STATUS STRIP
                ================================================== */}

                <div className="footer-status">

                    <div className="footer-status-brand">

                        <div className="footer-status-icon">
                            <FiCheck />
                        </div>

                        <div>
                            <span>
                                HIRENEST
                            </span>

                            <strong>
                                Built for your next move.
                            </strong>
                        </div>

                    </div>


                    <div className="footer-status-items">

                        <div>
                            <FiBriefcase />
                            <span>
                                Find opportunities
                            </span>
                        </div>

                        <div>
                            <FiTarget />
                            <span>
                                Discover your direction
                            </span>
                        </div>

                        <div>
                            <FiCode />
                            <span>
                                Build your future
                            </span>
                        </div>

                    </div>

                </div>


                {/* ==================================================
                    NAVIGATION
                ================================================== */}

                <div className="footer-navigation">

                    {/* BRAND */}

                    <div className="footer-brand-column">

                        <div className="footer-brand">
                            HIRE
                            <span>
                                NEST
                            </span>
                        </div>

                        <p>
                            A place to discover
                            opportunities, explore
                            career paths and move
                            forward with confidence.
                        </p>

                        <div className="footer-theme">

                            {darkMode ? (
                                <FiMoon />
                            ) : (
                                <FiSun />
                            )}

                            <span>
                                {darkMode
                                    ? "Dark mode"
                                    : "Light mode"}
                            </span>

                            <div
                                className={
                                    darkMode
                                        ? "theme-dot dark"
                                        : "theme-dot"
                                }
                            ></div>

                        </div>

                    </div>


                    {/* OPPORTUNITIES */}

                    <div className="footer-column">

                        <span className="footer-column-title">
                            OPPORTUNITIES
                        </span>

                        {opportunityLinks.map(
                            (item) => {
                                const Icon =
                                    item.icon;

                                return (
                                    <button
                                        key={
                                            item.label
                                        }
                                        onClick={() =>
                                            scrollToSection(
                                                item.selector
                                            )
                                        }
                                    >
                                        <Icon />

                                        <span>
                                            {
                                                item.label
                                            }
                                        </span>

                                        <FiArrowUpRight />
                                    </button>
                                );
                            }
                        )}

                    </div>


                    {/* CAREER */}

                    <div className="footer-column">

                        <span className="footer-column-title">
                            BUILD YOUR CAREER
                        </span>

                        {careerLinks.map(
                            (item) => (
                                <button
                                    key={
                                        item.label
                                    }
                                    onClick={() =>
                                        scrollToSection(
                                            item.selector
                                        )
                                    }
                                >
                                    <span>
                                        {
                                            item.label
                                        }
                                    </span>

                                    <FiArrowUpRight />
                                </button>
                            )
                        )}

                    </div>


                    {/* HIRENEST */}

                    <div className="footer-column">

                        <span className="footer-column-title">
                            HIRENEST
                        </span>

                        {companyLinks.map(
                            (item) => (
                                <button
                                    key={
                                        item.label
                                    }
                                    onClick={
                                        item.action
                                    }
                                >
                                    <span>
                                        {
                                            item.label
                                        }
                                    </span>

                                    <FiArrowUpRight />
                                </button>
                            )
                        )}

                    </div>

                </div>


                {/* ==================================================
                    BOTTOM
                ================================================== */}

                <div className="footer-bottom">

                    <div className="footer-copyright">

                        <span>
                            © 2026 HireNest.
                            All rights reserved.
                        </span>

                        <div className="copyright-dot"></div>

                        <span>
                            Made for people
                            building what's next.
                        </span>

                    </div>


                    <div className="footer-bottom-right">

                        <button
                            className="footer-top-btn"
                            onClick={
                                scrollToTop
                            }
                            aria-label="Back to top"
                        >
                            <span>
                                Back to top
                            </span>

                            <FiArrowUp />
                        </button>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default LuxuryFooter;