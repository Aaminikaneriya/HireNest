import React from "react";
import {
    FiArrowRight,
    FiArrowUpRight,
    FiAward,
    FiBriefcase,
    FiCheck,
    FiChevronRight,
    FiEdit3,
  
    FiMapPin,
    FiPlus,
    FiRefreshCw,
    FiTarget,
    FiUser,
    FiX,
} from "react-icons/fi";

import "./CareerProfile.css";

const profileSections = [
    {
        id: "basic",
        number: "01",
        title: "Basic Profile",
        short: "Tell us who you are",
        icon: FiUser,
        fields: [
            {
                id: "headline",
                label: "Professional headline",
                placeholder: "e.g. Frontend Developer",
            },
            {
                id: "city",
                label: "Current city",
                placeholder: "e.g. Ahmedabad",
            },
            {
                id: "field",
                label: "Career field",
                placeholder: "e.g. Technology",
            },
        ],
    },

    {
        id: "education",
        number: "02",
        title: "Education",
        short: "Add your academic background",
        icon: FiAward,
        fields: [
            {
                id: "degree",
                label: "Highest qualification",
                placeholder: "e.g. BCA",
            },
            {
                id: "institute",
                label: "Institute",
                placeholder: "e.g. ABC University",
            },
            {
                id: "year",
                label: "Graduation year",
                placeholder: "e.g. 2026",
            },
        ],
    },

    {
        id: "skills",
        number: "03",
        title: "Skills",
        short: "Show what you can do",
        icon: FiTarget,
        fields: [
            {
                id: "skills",
                label: "Your skills",
                placeholder:
                    "e.g. React, JavaScript, CSS",
            },
        ],
    },

    {
        id: "experience",
        number: "04",
        title: "Experience & Projects",
        short: "Show what you've worked on",
        icon: FiBriefcase,
        fields: [
            {
                id: "experience",
                label: "Experience / project",
                placeholder:
                    "e.g. Internship, Freelance project",
            },
            {
                id: "role",
                label: "Role",
                placeholder:
                    "e.g. Frontend Intern",
            },
        ],
    },

    {
        id: "preferences",
        number: "05",
        title: "Career Preferences",
        short: "Tell us what you want next",
        icon: FiMapPin,
        fields: [
            {
                id: "role",
                label: "Preferred role",
                placeholder:
                    "e.g. Frontend Developer",
            },
            {
                id: "workType",
                label: "Work type",
                placeholder:
                    "e.g. Full Time / Remote",
            },
            {
                id: "location",
                label: "Preferred location",
                placeholder:
                    "e.g. Ahmedabad / Remote",
            },
        ],
    },
];

const emptyProfile = {
    basic: {
        headline: "",
        city: "",
        field: "",
    },

    education: {
        degree: "",
        institute: "",
        year: "",
    },

    skills: {
        skills: "",
    },

    experience: {
        experience: "",
        role: "",
    },

    preferences: {
        role: "",
        workType: "",
        location: "",
    },
};

const CareerProfile = () => {
    const [profile, setProfile] =
        React.useState(emptyProfile);

    const [activeSection, setActiveSection] =
        React.useState(null);

    const [viewingSection, setViewingSection] =
        React.useState(null);

    const [darkMode, setDarkMode] =
        React.useState(false);

    React.useEffect(() => {
        const savedTheme =
            localStorage.getItem(
                "hirenest-theme"
            );

        setDarkMode(savedTheme === "dark");

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

    React.useEffect(() => {
        document.body.style.overflow =
            activeSection || viewingSection
                ? "hidden"
                : "";

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [
        activeSection,
        viewingSection,
    ]);

    React.useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setActiveSection(null);
                setViewingSection(null);
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    const isSectionComplete = (section) => {
        const sectionData =
            profile[section.id];

        return Object.values(
            sectionData
        ).some(
            (value) =>
                String(value).trim() !== ""
        );
    };

    /*
       Each completed profile section = 20%
    */
    const completedSections =
        profileSections.filter(
            isSectionComplete
        ).length;

    const progress =
        completedSections *
        20;

    const remainingSections =
        profileSections.filter(
            (section) =>
                !isSectionComplete(section)
        );

    const nextSection =
        remainingSections[0] || null;

    const updateField = (
        sectionId,
        fieldId,
        value
    ) => {
        setProfile((prev) => ({
            ...prev,

            [sectionId]: {
                ...prev[sectionId],

                [fieldId]: value,
            },
        }));
    };

    const openSection = (
        section
    ) => {
        setViewingSection(null);
        setActiveSection(section);
    };

    const saveSection = () => {
        localStorage.setItem(
            "hirenest-career-profile",
            JSON.stringify(profile)
        );

        window.dispatchEvent(
            new Event(
                "hirenest-profile-update"
            )
        );

        setActiveSection(null);
    };

    const resetProfile = () => {
        setProfile(
            JSON.parse(
                JSON.stringify(
                    emptyProfile
                )
            )
        );

        setActiveSection(null);
        setViewingSection(null);
    };

    return (
        <>
            <section
                className={`career-profile ${darkMode
                        ? "career-profile-dark"
                        : ""
                    }`}
            >
                <div className="career-profile-container">

                    {/* =================================
                        HEADER
                    ================================= */}

                    <div className="profile-header">

                        <div>
                            <span className="profile-eyebrow">
                                CAREER PROFILE
                            </span>

                            <h2>
                                Build your profile.
                                <br />
                                <span>
                                    Unlock better opportunities.
                                </span>
                            </h2>
                        </div>

                        <p>
                            Add a few details about
                            yourself. The more you tell
                            HireNest, the better your
                            opportunity recommendations
                            can become.
                        </p>

                    </div>


                    {/* =================================
                        PROGRESS HERO
                    ================================= */}

                    <div className="profile-progress-box">

                        <div className="progress-main">

                            <div className="progress-circle">

                                <div className="progress-circle-inner">
                                    <strong>
                                        {progress}%
                                    </strong>

                                    <small>
                                        COMPLETE
                                    </small>
                                </div>

                                <svg
                                    className="progress-svg"
                                    viewBox="0 0 120 120"
                                >
                                    <circle
                                        className="progress-track-circle"
                                        cx="60"
                                        cy="60"
                                        r="52"
                                    />

                                    <circle
                                        className="progress-value-circle"
                                        cx="60"
                                        cy="60"
                                        r="52"
                                        style={{
                                            strokeDashoffset:
                                                327 -
                                                (327 *
                                                    progress) /
                                                100,
                                        }}
                                    />
                                </svg>

                            </div>


                            <div className="progress-copy">

                                <span>
                                    YOUR PROFILE
                                </span>

                                <h3>
                                    {progress ===
                                        100
                                        ? "You're ready to move."
                                        : progress ===
                                            0
                                            ? "Let's get started."
                                            : "You're making progress."}
                                </h3>

                                <p>
                                    {progress === 100
                                        ? "Your career profile is complete. You can now focus on discovering opportunities."
                                        : `${completedSections} of ${profileSections.length} sections completed. Add more details to unlock your next step.`}
                                </p>

                            </div>

                        </div>


                        <div className="progress-side">

                            <div className="progress-side-label">
                                <span>
                                    CAREER READINESS
                                </span>

                                <strong>
                                    {progress}%
                                </strong>
                            </div>

                            <div className="linear-progress">
                                <span
                                    style={{
                                        width:
                                            `${progress}%`,
                                    }}
                                />
                            </div>

                            <small>
                                {100 - progress === 0
                                    ? "Everything is complete"
                                    : `${100 - progress}% remaining`}
                            </small>

                        </div>

                    </div>


                    {/* =================================
                        ADD YOUR DETAILS TITLE
                    ================================= */}

                    <div className="profile-section-heading">

                        <div>
                            <span>
                                STEP BY STEP
                            </span>

                            <h3>
                                Complete your profile
                            </h3>
                        </div>

                        <button
                            className="profile-reset"
                            onClick={
                                resetProfile
                            }
                        >
                            <FiRefreshCw />
                            Reset
                        </button>

                    </div>


                    {/* =================================
                        PROFILE SECTIONS
                    ================================= */}

                    <div className="profile-sections">

                        {profileSections.map(
                            (section) => {
                                const Icon =
                                    section.icon;

                                const complete =
                                    isSectionComplete(
                                        section
                                    );

                                return (
                                    <div
                                        className={`profile-section-row ${complete
                                                ? "section-complete"
                                                : ""
                                            }`}
                                        key={
                                            section.id
                                        }
                                    >

                                        <div className="section-index">
                                            {complete ? (
                                                <FiCheck />
                                            ) : (
                                                section.number
                                            )}
                                        </div>


                                        <div className="section-icon">
                                            <Icon />
                                        </div>


                                        <div className="section-info">

                                            <div className="section-title-line">

                                                <h4>
                                                    {
                                                        section.title
                                                    }
                                                </h4>

                                                {complete && (
                                                    <span>
                                                        COMPLETED
                                                    </span>
                                                )}

                                            </div>

                                            <p>
                                                {
                                                    section.short
                                                }
                                            </p>

                                        </div>


                                        <div className="section-actions">

                                            {complete && (
                                                <button
                                                    className="view-details-btn"
                                                    onClick={() =>
                                                        setViewingSection(
                                                            section
                                                        )
                                                    }
                                                >
                                                    View Details
                                                </button>
                                            )}

                                            <button
                                                className={`section-action-btn ${complete
                                                        ? "edit"
                                                        : ""
                                                    }`}
                                                onClick={() =>
                                                    openSection(
                                                        section
                                                    )
                                                }
                                            >
                                                {complete ? (
                                                    <>
                                                        <FiEdit3 />
                                                        Edit
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiPlus />
                                                        Add Details
                                                    </>
                                                )}

                                                <FiChevronRight />
                                            </button>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>


                    {/* =================================
                        NEXT STEP / COMPLETE CARD
                    ================================= */}

                    {progress < 100 ? (
                        <div className="next-action-box">

                            <div className="next-action-icon">
                                <FiTarget />
                            </div>

                            <div className="next-action-copy">

                                <span>
                                    RECOMMENDED NEXT STEP
                                </span>

                                <strong>
                                    {nextSection?.title}
                                </strong>

                                <p>
                                    {nextSection?.short}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    openSection(
                                        nextSection
                                    )
                                }
                            >
                                Complete this step
                                <FiArrowUpRight />
                            </button>

                        </div>
                    ) : (
                        <div className="profile-complete-box">

                            <div className="complete-badge">
                                <FiCheck />
                            </div>

                            <div className="complete-copy">

                                <span>
                                    PROFILE COMPLETE
                                </span>

                                <h3>
                                    You're ready for
                                    your next opportunity.
                                </h3>

                                <p>
                                    Your HireNest profile
                                    is complete. Now use
                                    it to discover
                                    opportunities that
                                    fit your direction.
                                </p>

                            </div>

                            <div className="complete-actions">

                                <button
                                    onClick={() =>
                                        setViewingSection(
                                            profileSections[0]
                                        )
                                    }
                                >
                                    Review Profile
                                    <FiArrowRight />
                                </button>

                                <button className="secondary-complete-btn">
                                    Find My Matches
                                    <FiArrowUpRight />
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            </section>


            {/* =====================================================
                ADD / EDIT MODAL
            ===================================================== */}

            {activeSection && (
                <div
                    className="profile-modal-overlay"
                    onMouseDown={() =>
                        setActiveSection(null)
                    }
                >

                    <div
                        className={`profile-modal ${darkMode
                                ? "profile-modal-dark"
                                : ""
                            }`}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="profile-modal-close"
                            onClick={() =>
                                setActiveSection(null)
                            }
                        >
                            <FiX />
                        </button>


                        <div className="modal-profile-heading">

                            <div className="modal-profile-icon">
                                {React.createElement(
                                    activeSection.icon
                                )}
                            </div>

                            <div>
                                <span>
                                    STEP{" "}
                                    {
                                        activeSection.number
                                    }
                                </span>

                                <small>
                                    Profile Information
                                </small>
                            </div>

                        </div>


                        <h3>
                            {activeSection.title}
                        </h3>

                        <p className="modal-profile-description">
                            {activeSection.short}.
                            Add your details below so
                            your profile becomes more
                            useful.
                        </p>


                        <div className="profile-form">

                            {activeSection.fields.map(
                                (field) => (
                                    <label
                                        className="profile-field"
                                        key={
                                            field.id
                                        }
                                    >
                                        <span>
                                            {field.label}
                                        </span>

                                        <input
                                            type="text"
                                            value={
                                                profile[
                                                activeSection
                                                    .id
                                                ][
                                                field
                                                    .id
                                                ] || ""
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                updateField(
                                                    activeSection.id,
                                                    field.id,
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder={
                                                field.placeholder
                                            }
                                        />
                                    </label>
                                )
                            )}

                        </div>


                        <div className="profile-modal-footer">

                            <span>
                                {isSectionComplete(
                                    activeSection
                                )
                                    ? "Details saved in this session"
                                    : "Add at least one detail to complete this section"}
                            </span>

                            <button
                                onClick={
                                    saveSection
                                }
                            >
                                {isSectionComplete(
                                    activeSection
                                )
                                    ? "Save Changes"
                                    : "Save Details"}

                                <FiCheck />
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* =====================================================
                VIEW DETAILS MODAL
            ===================================================== */}

            {viewingSection && (
                <div
                    className="profile-modal-overlay"
                    onMouseDown={() =>
                        setViewingSection(null)
                    }
                >

                    <div
                        className={`profile-view-modal ${darkMode
                                ? "profile-modal-dark"
                                : ""
                            }`}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="profile-modal-close"
                            onClick={() =>
                                setViewingSection(null)
                            }
                        >
                            <FiX />
                        </button>


                        <div className="view-modal-top">

                            <div className="view-modal-icon">
                                {React.createElement(
                                    viewingSection.icon
                                )}
                            </div>

                            <div>
                                <span>
                                    {viewingSection.title}
                                </span>

                                <small>
                                    YOUR DETAILS
                                </small>
                            </div>

                        </div>


                        <div className="detail-list">

                            {viewingSection.fields.map(
                                (field) => {
                                    const value =
                                        profile[
                                        viewingSection
                                            .id
                                        ][
                                        field.id
                                        ];

                                    return (
                                        <div
                                            className="detail-item"
                                            key={
                                                field.id
                                            }
                                        >
                                            <span>
                                                {
                                                    field.label
                                                }
                                            </span>

                                            <strong>
                                                {value ||
                                                    "Not added yet"}
                                            </strong>
                                        </div>
                                    );
                                }
                            )}

                        </div>


                        <div className="view-modal-footer">

                            <button
                                className="view-edit-btn"
                                onClick={() => {
                                    setViewingSection(
                                        null
                                    );

                                    setActiveSection(
                                        viewingSection
                                    );
                                }}
                            >
                                <FiEdit3 />
                                Edit Details
                            </button>

                            <button
                                className="view-close-btn"
                                onClick={() =>
                                    setViewingSection(
                                        null
                                    )
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
};

export default CareerProfile;