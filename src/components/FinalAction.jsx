import React from "react";
import {
    FiArrowRight,
    FiArrowUpRight,
    FiBriefcase,
    FiCheck,
    FiCompass,
    FiFileText,
    FiMapPin,
    FiTarget,
} from "react-icons/fi";

import "./FinalAction.css";

const FinalAction = () => {
    const [darkMode, setDarkMode] =
        React.useState(false);

    const [profileProgress, setProfileProgress] =
        React.useState(0);

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
       READ PROFILE PROGRESS
    ========================================= */

    const calculateProgress = React.useCallback(() => {
        try {
            const saved =
                localStorage.getItem(
                    "hirenest-career-profile"
                );

            if (!saved) {
                setProfileProgress(0);
                return;
            }

            const profile =
                JSON.parse(saved);

            const sections = [
                "basic",
                "education",
                "skills",
                "experience",
                "preferences",
            ];

            let completed = 0;

            sections.forEach((key) => {
                const section =
                    profile?.[key];

                if (
                    section &&
                    Object.values(section).some(
                        (value) =>
                            String(
                                value
                            ).trim() !== ""
                    )
                ) {
                    completed++;
                }
            });

            setProfileProgress(
                completed * 20
            );
        } catch {
            setProfileProgress(0);
        }
    }, []);

    React.useEffect(() => {
        calculateProgress();

        const updateProgress = () => {
            calculateProgress();
        };

        window.addEventListener(
            "hirenest-profile-update",
            updateProgress
        );

        window.addEventListener(
            "storage",
            updateProgress
        );

        return () => {
            window.removeEventListener(
                "hirenest-profile-update",
                updateProgress
            );

            window.removeEventListener(
                "storage",
                updateProgress
            );
        };
    }, [calculateProgress]);

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
            15;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    /* =========================================
       ACTIONS
    ========================================= */

    const actionItems = [
        {
            id: "job",
            icon: FiBriefcase,
            number: "01",
            title: "Find a Job",
            description:
                "Explore opportunities that fit your goals.",
            action: () =>
                scrollToSection(
                    ".featured-jobs"
                ),
        },

        {
            id: "internship",
            icon: FiCompass,
            number: "02",
            title: "Find an Internship",
            description:
                "Start building experience with the right opportunity.",
            action: () =>
                scrollToSection(
                    ".career-paths"
                ),
        },

        {
            id: "profile",
            icon: FiFileText,
            number: "03",
            title: "Complete My Profile",
            description:
                "Add details and improve your career signal.",
            action: () =>
                scrollToSection(
                    ".career-profile"
                ),
        },

        {
            id: "companies",
            icon: FiMapPin,
            number: "04",
            title: "Explore Companies",
            description:
                "Discover companies hiring for your next move.",
            action: () =>
                scrollToSection(
                    ".hiring-orbit"
                ),
        },
    ];

    const isComplete =
        profileProgress === 100;

    return (
        <section
            className={`final-action ${
                darkMode
                    ? "final-action-dark"
                    : "final-action-light"
            }`}
        >
            {/* BACKGROUND DECORATION */}

            <div className="final-glow final-glow-one"></div>
            <div className="final-glow final-glow-two"></div>

            <div className="final-action-container">

                {/* =================================
                    TOP
                ================================= */}

                <div className="final-line">

                    <span></span>

                    <small>
                        YOUR NEXT MOVE
                    </small>

                    <span></span>

                </div>


                {/* =================================
                    MAIN
                ================================= */}

                <div className="final-action-main">

                    {/* LEFT */}

                    <div className="final-copy">

                        <span className="final-eyebrow">
                            READY WHEN YOU ARE
                        </span>

                        <h2>
                            You’re closer
                            <br />
                            than you{" "}
                            <em>think.</em>
                        </h2>

                        <p>
                            You have explored the tools,
                            discovered companies and
                            built your career direction.
                            Now choose the next move
                            that feels right for you.
                        </p>


                        <div className="final-trust">

                            <div>
                                <FiCheck />
                                <span>
                                    Simple process
                                </span>
                            </div>

                            <div>
                                <FiTarget />
                                <span>
                                    Career-focused
                                </span>
                            </div>

                            <div>
                                <FiArrowUpRight />
                                <span>
                                    Take action
                                </span>
                            </div>

                        </div>

                    </div>


                    {/* RIGHT PANEL */}

                    <div className="final-action-panel">

                        <div className="action-panel-head">

                            <div>
                                <span>
                                    WHAT DO YOU WANT
                                    TO DO?
                                </span>

                                <strong>
                                    Choose your next move
                                </strong>
                            </div>

                            <div className="panel-arrow">
                                <FiArrowRight />
                            </div>

                        </div>


                        <div className="final-action-list">

                            {actionItems.map(
                                (item) => {
                                    const Icon =
                                        item.icon;

                                    return (
                                        <button
                                            key={
                                                item.id
                                            }
                                            className="final-action-item"
                                            onClick={
                                                item.action
                                            }
                                        >

                                            <div className="action-number">
                                                {
                                                    item.number
                                                }
                                            </div>

                                            <div className="action-icon">
                                                <Icon />
                                            </div>

                                            <div className="action-content">

                                                <strong>
                                                    {
                                                        item.title
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        item.description
                                                    }
                                                </span>

                                            </div>

                                            <div className="action-go">
                                                <FiArrowUpRight />
                                            </div>

                                        </button>
                                    );
                                }
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================
                    PROFILE STATUS
                ================================= */}

                <div className="final-status">

                    <div className="status-left">

                        <div className="status-icon">

                            {isComplete ? (
                                <FiCheck />
                            ) : (
                                <FiFileText />
                            )}

                        </div>

                        <div>

                            <span>
                                {isComplete
                                    ? "PROFILE READY"
                                    : "YOUR PROFILE STATUS"}
                            </span>

                            <strong>
                                {isComplete
                                    ? "You're ready to discover your next opportunity."
                                    : `Your career profile is ${profileProgress}% complete.`}
                            </strong>

                        </div>

                    </div>


                    <div className="status-progress">

                        <div className="status-progress-top">

                            <span>
                                PROFILE COMPLETION
                            </span>

                            <strong>
                                {profileProgress}%
                            </strong>

                        </div>

                        <div className="status-track">

                            <span
                                style={{
                                    width:
                                        `${profileProgress}%`,
                                }}
                            />

                        </div>

                    </div>


                    <button
                        className="status-action"
                        onClick={() => {

                            if (
                                profileProgress <
                                100
                            ) {
                                scrollToSection(
                                    ".career-profile"
                                );
                            } else {
                                scrollToSection(
                                    ".smart-radar"
                                );
                            }

                        }}
                    >

                        {isComplete
                            ? "See My Matches"
                            : "Complete Profile"}

                        <FiArrowUpRight />

                    </button>

                </div>


                {/* =================================
                    BOTTOM
                ================================= */}

                <div className="final-bottom">

                    <span>FIND</span>

                    <div></div>

                    <span>BUILD</span>

                    <div></div>

                    <span>GROW</span>

                    <div></div>

                    <span>
                        MOVE FORWARD
                    </span>

                </div>

            </div>
        </section>
    );
};

export default FinalAction;