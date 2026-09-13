import React from "react";
import {
    FiFileText,
    FiMic,
    FiDollarSign,
    FiAward,
    FiBell,
    FiBookmark,
    FiArrowUpRight,
    FiCheck,
    FiX,
} from "react-icons/fi";

import "./CareerFlow.css";

const careerOptions = [
    {
        id: 1,
        number: "01",
        icon: FiFileText,
        title: "Build Your Resume",
        short: "Create a resume that gets noticed.",
        description:
            "Create a clean and professional resume that highlights your skills, experience and strengths.",
        steps: [
            "Choose a professional resume format",
            "Add your education and experience",
            "Highlight your important skills",
            "Download and start applying",
        ],
        button: "Start Resume Builder",
    },

    {
        id: 2,
        number: "02",
        icon: FiMic,
        title: "Practice Interviews",
        short: "Prepare before the real interview.",
        description:
            "Build confidence by practicing common interview questions before you face the real hiring process.",
        steps: [
            "Select your preferred job role",
            "Practice common interview questions",
            "Improve your answers and confidence",
            "Get ready for the real interview",
        ],
        button: "Start Interview Practice",
    },

    {
        id: 3,
        number: "03",
        icon: FiDollarSign,
        title: "Know Your Market Value",
        short: "Understand what your skills are worth.",
        description:
            "Get a better idea of your expected salary and understand your value before applying or accepting an offer.",
        steps: [
            "Select your job role",
            "Choose your experience level",
            "Explore salary expectations",
            "Understand your market value",
        ],
        button: "Check Salary Insights",
    },

    {
        id: 4,
        number: "04",
        icon: FiAward,
        title: "Grow Your Skills",
        short: "Learn skills employers actually need.",
        description:
            "Discover the skills that can make your profile stronger and help you move towards better opportunities.",
        steps: [
            "Choose your career field",
            "Discover important skills",
            "Find your skill gaps",
            "Build your learning direction",
        ],
        button: "Explore Skill Builder",
    },

    {
        id: 5,
        number: "05",
        icon: FiBell,
        title: "Create Job Alerts",
        short: "Never miss a matching opportunity.",
        description:
            "Set your preferences once and get notified when jobs or internships matching your interests become available.",
        steps: [
            "Select your preferred job type",
            "Choose your preferred location",
            "Select your career field",
            "Receive matching job alerts",
        ],
        button: "Create Job Alert",
    },

    {
        id: 6,
        number: "06",
        icon: FiBookmark,
        title: "Save Your Opportunities",
        short: "Keep interesting jobs in one place.",
        description:
            "Save jobs and internships that interest you and easily come back to them whenever you're ready to apply.",
        steps: [
            "Find an interesting opportunity",
            "Save it to your collection",
            "Review your saved opportunities",
            "Apply whenever you're ready",
        ],
        button: "View Opportunities",
    },
];

const CareerFlow = () => {
    const [activeOption, setActiveOption] = React.useState(null);
    const [darkMode, setDarkMode] = React.useState(false);

    /* ================================
       THEME
    ================================= */

    React.useEffect(() => {
        const savedTheme =
            localStorage.getItem("hirenest-theme");

        setDarkMode(savedTheme === "dark");

        const handleThemeChange = () => {
            const theme =
                localStorage.getItem("hirenest-theme");

            setDarkMode(theme === "dark");
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

    /* ================================
       LOCK BACKGROUND SCROLL
    ================================= */

    React.useEffect(() => {
        if (activeOption) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [activeOption]);

    /* ================================
       ESC CLOSE
    ================================= */

    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setActiveOption(null);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    const openOption = (option) => {
        setActiveOption(option);
    };

    const closeOption = () => {
        setActiveOption(null);
    };

    return (
        <>
            <section
                className={`career-flow ${
                    darkMode ? "career-flow-dark" : ""
                }`}
            >
                <div className="career-flow-container">

                    {/* HEADER */}
                    <div className="career-flow-header">
                        <div>
                            <span className="career-flow-label">
                                CAREER FLOW
                            </span>

                            <h2>
                                One Career.
                                <br />
                                <span>Many Ways Forward.</span>
                            </h2>
                        </div>

                        <p>
                            Take the next step whenever you're
                            ready. Explore the tools that can
                            help you move forward.
                        </p>
                    </div>

                    {/* OPTIONS */}
                    <div className="career-flow-line">

                        {careerOptions.map(
                            (option, index) => {
                                const Icon = option.icon;

                                return (
                                    <button
                                        key={option.id}
                                        className={`career-flow-item ${
                                            index % 2 === 0
                                                ? "flow-left"
                                                : "flow-right"
                                        }`}
                                        onClick={() =>
                                            openOption(option)
                                        }
                                    >
                                        <div className="flow-number">
                                            {option.number}
                                        </div>

                                        <div className="flow-icon">
                                            <Icon />
                                        </div>

                                        <div className="flow-content">
                                            <h3>
                                                {option.title}
                                            </h3>

                                            <p>
                                                {option.short}
                                            </p>
                                        </div>

                                        <div className="flow-arrow">
                                            <FiArrowUpRight />
                                        </div>
                                    </button>
                                );
                            }
                        )}

                    </div>

                    {/* FOOTER */}
                    <div className="career-flow-footer">
                        <span></span>

                        <p>
                            Click any path to explore
                        </p>

                        <span></span>
                    </div>
                </div>
            </section>

            {/* =================================
                MINI MODAL
            ================================= */}

            {activeOption && (
                <div
                    className="career-modal-overlay"
                    onMouseDown={closeOption}
                >
                    <div
                        className={`career-modal ${
                            darkMode
                                ? "career-modal-dark"
                                : ""
                        }`}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* CLOSE */}
                        <button
                            className="career-modal-close"
                            onClick={closeOption}
                            aria-label="Close"
                        >
                            <FiX />
                        </button>

                        {/* TOP */}
                        <div className="career-modal-top">

                            <div className="career-modal-icon">
                                {React.createElement(
                                    activeOption.icon
                                )}
                            </div>

                            <div>
                                <span className="modal-step">
                                    STEP {activeOption.number}
                                </span>

                                <span className="modal-mini-text">
                                    HireNest Career Tool
                                </span>
                            </div>

                        </div>

                        {/* TITLE */}
                        <h2>
                            {activeOption.title}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="career-modal-description">
                            {activeOption.description}
                        </p>

                        {/* PROCESS */}
                        <div className="career-process">

                            <div className="process-heading">
                                <span>
                                    HOW IT WORKS
                                </span>

                                <small>
                                    4 steps
                                </small>
                            </div>

                            <div className="process-list">

                                {activeOption.steps.map(
                                    (step, index) => (
                                        <div
                                            className="process-step"
                                            key={index}
                                        >
                                            <div className="process-check">
                                                <FiCheck />
                                            </div>

                                            <div className="process-text">
                                                <small>
                                                    0
                                                    {index + 1}
                                                </small>

                                                <p>
                                                    {step}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}

                            </div>
                        </div>

                        {/* BUTTON */}
                        <button className="career-modal-btn">
                            <span>
                                {activeOption.button}
                            </span>

                            <FiArrowUpRight />
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default CareerFlow;