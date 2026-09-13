import React from "react";
import {
    FiArrowUpRight,
    FiBookmark,
    FiBriefcase,
    FiCheck,
    FiChevronDown,
   
    FiCode,
    FiDollarSign,
    
    FiInfo,
    FiMapPin,
   
    FiTarget,
    FiTrendingUp,
    FiX,
} from "react-icons/fi";

import "./SmartJobRadar.css";


/* =========================================================
   DEMO OPPORTUNITIES
   Aa later API/backend mathi aavi shake.
========================================================= */

const opportunities = [
    {
        id: 1,
        company: "TechNova",
        role: "Frontend Developer",
        type: "Full Time",
        location: "Ahmedabad",
        mode: "Hybrid",
        salary: "₹4.5L – ₹7L",
        match: 96,
        experience: "Fresher",
        skills: [
            "React",
            "JavaScript",
            "CSS",
        ],
        reason: [
            ["Role match", 100],
            ["Skills match", 96],
            ["Location match", 92],
            ["Work preference", 100],
        ],
        description:
            "Build modern user interfaces and work closely with product and engineering teams.",
        posted: "2 days ago",
    },

    {
        id: 2,
        company: "PixelWorks",
        role: "UI Developer",
        type: "Full Time",
        location: "Ahmedabad",
        mode: "Remote",
        salary: "₹4L – ₹6.5L",
        match: 91,
        experience: "Fresher",
        skills: [
            "JavaScript",
            "React",
            "CSS",
        ],
        reason: [
            ["Role match", 95],
            ["Skills match", 90],
            ["Location match", 88],
            ["Work preference", 92],
        ],
        description:
            "Create responsive interfaces and collaborate with designers to deliver polished experiences.",
        posted: "1 day ago",
    },

    {
        id: 3,
        company: "CloudCore",
        role: "React Developer",
        type: "Full Time",
        location: "Remote",
        mode: "Remote",
        salary: "₹5L – ₹8L",
        match: 88,
        experience: "1–2 Years",
        skills: [
            "React",
            "JavaScript",
            "API",
        ],
        reason: [
            ["Role match", 98],
            ["Skills match", 87],
            ["Location match", 100],
            ["Work preference", 95],
        ],
        description:
            "Work on scalable web applications with React and modern frontend technologies.",
        posted: "3 days ago",
    },

    {
        id: 4,
        company: "BrightLabs",
        role: "Frontend Intern",
        type: "Internship",
        location: "Ahmedabad",
        mode: "On-site",
        salary: "₹15K – ₹25K / month",
        match: 84,
        experience: "Fresher",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
        ],
        reason: [
            ["Role match", 92],
            ["Skills match", 82],
            ["Location match", 96],
            ["Work preference", 70],
        ],
        description:
            "Learn and contribute to real product work with an experienced frontend team.",
        posted: "5 days ago",
    },
];


/* =========================================================
   DEFAULT PROFILE
========================================================= */

const defaultProfile = {
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


/* =========================================================
   HELPERS
========================================================= */

const getProfile = () => {
    try {
        const saved =
            localStorage.getItem(
                "hirenest-career-profile"
            );

        if (!saved) {
            return defaultProfile;
        }

        return {
            ...defaultProfile,
            ...JSON.parse(saved),
        };
    } catch {
        return defaultProfile;
    }
};


const hasProfileDetails = (profile) => {
    return Object.values(profile).some(
        (section) =>
            Object.values(section).some(
                (value) =>
                    String(value).trim() !== ""
            )
    );
};


const getUserSkills = (profile) => {
    const raw =
        profile?.skills?.skills || "";

    return raw
        .split(",")
        .map((skill) =>
            skill
                .trim()
                .toLowerCase()
        )
        .filter(Boolean);
};


/* =========================================================
   COMPONENT
========================================================= */

const SmartJobRadar = () => {
    const [profile, setProfile] =
        React.useState(getProfile);

    const [selectedJob, setSelectedJob] =
        React.useState(null);

    const [savedJobs, setSavedJobs] =
        React.useState([]);

    const [filter, setFilter] =
        React.useState("Best Match");

    const [darkMode, setDarkMode] =
        React.useState(false);

    const [showHowItWorks, setShowHowItWorks] =
        React.useState(false);


    /* =====================================================
       THEME
    ===================================================== */

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


    /* =====================================================
       READ CAREER PROFILE
    ===================================================== */

    React.useEffect(() => {
        const readProfile = () => {
            setProfile(
                getProfile()
            );
        };

        readProfile();

        /*
          CareerProfile save kare tyare aa event fire thase.
        */

        window.addEventListener(
            "hirenest-profile-update",
            readProfile
        );

        window.addEventListener(
            "storage",
            readProfile
        );

        return () => {
            window.removeEventListener(
                "hirenest-profile-update",
                readProfile
            );

            window.removeEventListener(
                "storage",
                readProfile
            );
        };
    }, []);


    /* =====================================================
       MODAL BODY LOCK
    ===================================================== */

    React.useEffect(() => {
        document.body.style.overflow =
            selectedJob || showHowItWorks
                ? "hidden"
                : "";

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [
        selectedJob,
        showHowItWorks,
    ]);


    /* =====================================================
       ESCAPE
    ===================================================== */

    React.useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setSelectedJob(null);
                setShowHowItWorks(false);
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


    /* =====================================================
       PROFILE INFO
    ===================================================== */

    const profileExists =
        hasProfileDetails(profile);

    const userSkills =
        getUserSkills(profile);

    const userRole =
        profile.preferences?.role ||
        profile.basic?.headline ||
        "Your preferred role";

    const userLocation =
        profile.preferences?.location ||
        profile.basic?.city ||
        "Any location";

    

    /* =====================================================
       FILTER
    ===================================================== */

    const filteredJobs =
        [...opportunities]
            .sort((a, b) => {
                if (
                    filter ===
                    "Highest Match"
                ) {
                    return (
                        b.match -
                        a.match
                    );
                }

                if (
                    filter ===
                    "Newest"
                ) {
                    return (
                        a.id -
                        b.id
                    );
                }

                return (
                    b.match -
                    a.match
                );
            });


    /* =====================================================
       SAVE JOB
    ===================================================== */

    const toggleSave = (jobId) => {
        setSavedJobs((prev) =>
            prev.includes(jobId)
                ? prev.filter(
                    (id) =>
                        id !== jobId
                )
                : [
                    ...prev,
                    jobId,
                ]
        );
    };


    /* =====================================================
       MATCH BENEFITS
    ===================================================== */

    const profileSignals = [
        {
            label: "Role",
            value:
                profile.preferences
                    ?.role ||
                profile.basic
                    ?.headline ||
                "Not added",
            icon: FiTarget,
            active: Boolean(
                profile.preferences
                    ?.role ||
                profile.basic
                    ?.headline
            ),
        },

        {
            label: "Skills",
            value:
                userSkills.length
                    ? `${userSkills.length} skills added`
                    : "Not added",
            icon: FiCode,
            active:
                userSkills.length >
                0,
        },

        {
            label: "Location",
            value:
                profile.preferences
                    ?.location ||
                profile.basic?.city ||
                "Not added",
            icon: FiMapPin,
            active: Boolean(
                profile.preferences
                    ?.location ||
                profile.basic
                    ?.city
            ),
        },

        {
            label: "Work type",
            value:
                profile.preferences
                    ?.workType ||
                "Not added",
            icon: FiBriefcase,
            active: Boolean(
                profile.preferences
                    ?.workType
            ),
        },
    ];


    return (
        <>
            <section
                className={`smart-radar ${darkMode
                        ? "smart-radar-dark"
                        : ""
                    }`}
            >

                <div className="smart-radar-container">

                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <div className="radar-header">

                        <div>
                            <span className="radar-eyebrow">
                                SMART JOB RADAR
                            </span>

                            <h2>
                                Your profile.
                                <br />

                                <span>
                                    Your best matches.
                                </span>
                            </h2>
                        </div>

                        <div className="radar-header-right">

                            <p>
                                Your matches are based
                                on the details you add
                                to your HireNest career
                                profile.
                            </p>

                            <button
                                className="how-radar-works"
                                onClick={() =>
                                    setShowHowItWorks(
                                        true
                                    )
                                }
                            >
                                <FiInfo />

                                How matching works

                                <FiArrowUpRight />
                            </button>

                        </div>

                    </div>


                    {/* ==================================================
                        NO PROFILE STATE
                    ================================================== */}

                    {!profileExists ? (
                        <div className="radar-empty">

                            <div className="empty-visual">

                                <div className="empty-radar-ring ring-a"></div>
                                <div className="empty-radar-ring ring-b"></div>
                                <div className="empty-radar-center">
                                    <FiTarget />
                                </div>

                            </div>

                            <div className="empty-copy">

                                <span>
                                    YOUR RADAR IS WAITING
                                </span>

                                <h3>
                                    Add your profile
                                    details first.
                                </h3>

                                <p>
                                    Complete your Career
                                    Profile and your
                                    information will
                                    automatically appear
                                    here to create smarter
                                    job matches.
                                </p>

                                <button>
                                    Complete My Profile
                                    <FiArrowUpRight />
                                </button>

                            </div>

                        </div>
                    ) : (
                        <>
                            {/* ==================================================
                                PROFILE CONNECTED
                            ================================================== */}

                            <div className="radar-connected">

                                <div className="connected-left">

                                    <div className="radar-signal">

                                        <span className="signal-core">
                                            <FiTarget />
                                        </span>

                                        <span className="signal-wave wave-one"></span>
                                        <span className="signal-wave wave-two"></span>

                                    </div>

                                    <div>
                                        <span>
                                            RADAR ACTIVE
                                        </span>

                                        <strong>
                                            Matching from
                                            your profile
                                        </strong>

                                        <small>
                                            Your latest saved
                                            details are being
                                            used automatically.
                                        </small>
                                    </div>

                                </div>


                                <div className="profile-mini-preview">

                                    <div className="mini-profile-field">
                                        <FiTarget />

                                        <div>
                                            <small>
                                                ROLE
                                            </small>

                                            <strong>
                                                {userRole}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="mini-profile-field">
                                        <FiMapPin />

                                        <div>
                                            <small>
                                                LOCATION
                                            </small>

                                            <strong>
                                                {userLocation}
                                            </strong>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            window.scrollTo({
                                                top: 0,
                                                behavior:
                                                    "smooth",
                                            })
                                        }
                                    >
                                        Profile
                                        <FiArrowUpRight />
                                    </button>

                                </div>

                            </div>


                            {/* ==================================================
                                MATCH SUMMARY
                            ================================================== */}

                            <div className="radar-summary">

                                <div className="summary-score">

                                    <div className="score-circle">

                                        <strong>
                                            96%
                                        </strong>

                                        <small>
                                            BEST
                                            MATCH
                                        </small>

                                    </div>

                                </div>


                                <div className="summary-copy">

                                    <span>
                                        YOUR MATCH QUALITY
                                    </span>

                                    <h3>
                                        We found opportunities
                                        that fit your profile.
                                    </h3>

                                    <p>
                                        Your role, skills,
                                        location and work
                                        preferences are being
                                        used to improve your
                                        recommendations.
                                    </p>

                                </div>


                                <div className="summary-signals">

                                    {profileSignals.map(
                                        ({
                                            label,
                                            value,
                                            icon: Icon,
                                            active,
                                        }) => (
                                            <div
                                                className={`signal-item ${active
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                key={label}
                                            >
                                                <div className="signal-item-icon">
                                                    <Icon />
                                                </div>

                                                <div>
                                                    <small>
                                                        {
                                                            label
                                                        }
                                                    </small>

                                                    <strong>
                                                        {
                                                            value
                                                        }
                                                    </strong>
                                                </div>
                                            </div>
                                        )
                                    )}

                                </div>

                            </div>


                            {/* ==================================================
                                FILTER BAR
                            ================================================== */}

                            <div className="radar-toolbar">

                                <div>
                                    <span>
                                        MATCHED
                                    </span>

                                    <strong>
                                        {filteredJobs.length} opportunities
                                    </strong>
                                </div>

                                <div className="radar-filter">

                                    <span>
                                        Sort by
                                    </span>

                                    <select
                                        value={
                                            filter
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setFilter(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                    >
                                        <option>
                                            Best Match
                                        </option>

                                        <option>
                                            Highest Match
                                        </option>

                                        <option>
                                            Newest
                                        </option>
                                    </select>

                                    <FiChevronDown />

                                </div>

                            </div>


                            {/* ==================================================
                                JOB SIGNALS
                            ================================================== */}

                            <div className="radar-jobs">

                                {filteredJobs.map(
                                    (job) => {
                                        const isSaved =
                                            savedJobs.includes(
                                                job.id
                                            );

                                        return (
                                            <div
                                                className="radar-job"
                                                key={
                                                    job.id
                                                }
                                            >

                                                {/* MATCH */}

                                                <div className="job-match">

                                                    <div className="match-orbit">
                                                        <strong>
                                                            {
                                                                job.match
                                                            }
                                                        </strong>

                                                        <small>
                                                            %
                                                        </small>
                                                    </div>

                                                    <span>
                                                        MATCH
                                                    </span>

                                                </div>


                                                {/* JOB INFO */}

                                                <div className="job-main">

                                                    <div className="job-company-line">

                                                        <span className="job-company">
                                                            {
                                                                job.company
                                                            }
                                                        </span>

                                                        <span className="new-job-dot">
                                                            NEW
                                                        </span>

                                                    </div>

                                                    <h3>
                                                        {
                                                            job.role
                                                        }
                                                    </h3>

                                                    <div className="job-meta">

                                                        <span>
                                                            <FiBriefcase />
                                                            {
                                                                job.type
                                                            }
                                                        </span>

                                                        <span>
                                                            <FiMapPin />
                                                            {
                                                                job.location
                                                            }
                                                        </span>

                                                        <span>
                                                            {
                                                                job.mode
                                                            }
                                                        </span>

                                                        <span>
                                                            <FiDollarSign />
                                                            {
                                                                job.salary
                                                            }
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* WHY MATCH */}

                                                <div className="job-reasons">

                                                    <span>
                                                        WHY THIS
                                                        MATCHES
                                                    </span>

                                                    <div>
                                                        {job.skills.map(
                                                            (
                                                                skill
                                                            ) => (
                                                                <small
                                                                    key={
                                                                        skill
                                                                    }
                                                                >
                                                                    <FiCheck />
                                                                    {
                                                                        skill
                                                                    }
                                                                </small>
                                                            )
                                                        )}
                                                    </div>

                                                </div>


                                                {/* ACTIONS */}

                                                <div className="job-actions">

                                                    <button
                                                        className={`save-job ${isSaved
                                                                ? "saved"
                                                                : ""
                                                            }`}
                                                        onClick={() =>
                                                            toggleSave(
                                                                job.id
                                                            )
                                                        }
                                                        aria-label="Save job"
                                                    >
                                                        <FiBookmark />
                                                    </button>

                                                    <button
                                                        className="view-job"
                                                        onClick={() =>
                                                            setSelectedJob(
                                                                job
                                                            )
                                                        }
                                                    >
                                                        View Match
                                                        <FiArrowUpRight />
                                                    </button>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                        </>
                    )}

                </div>
            </section>


            {/* ==================================================
                JOB DETAIL MODAL
            ================================================== */}

            {selectedJob && (
                <div
                    className="radar-modal-overlay"
                    onMouseDown={() =>
                        setSelectedJob(null)
                    }
                >

                    <div
                        className={`radar-modal ${darkMode
                                ? "radar-modal-dark"
                                : ""
                            }`}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="radar-modal-close"
                            onClick={() =>
                                setSelectedJob(
                                    null
                                )
                            }
                        >
                            <FiX />
                        </button>


                        <div className="modal-match-header">

                            <div className="modal-score">
                                <strong>
                                    {
                                        selectedJob.match
                                    }
                                    %
                                </strong>

                                <span>
                                    MATCH
                                </span>
                            </div>

                            <div>
                                <span>
                                    HIRENEST MATCH
                                </span>

                                <h3>
                                    {
                                        selectedJob.role
                                    }
                                </h3>

                                <small>
                                    {
                                        selectedJob.company
                                    }
                                </small>
                            </div>

                        </div>


                        <div className="modal-job-meta">

                            <span>
                                <FiBriefcase />
                                {
                                    selectedJob.type
                                }
                            </span>

                            <span>
                                <FiMapPin />
                                {
                                    selectedJob.location
                                }
                            </span>

                            <span>
                                {
                                    selectedJob.mode
                                }
                            </span>

                            <span>
                                <FiDollarSign />
                                {
                                    selectedJob.salary
                                }
                            </span>

                        </div>


                        <p className="modal-job-description">
                            {
                                selectedJob.description
                            }
                        </p>


                        {/* WHY MATCH */}

                        <div className="match-explanation">

                            <div className="explanation-title">
                                <span>
                                    WHY THIS JOB
                                    MATCHES YOU
                                </span>

                                <FiTrendingUp />
                            </div>


                            {selectedJob.reason.map(
                                ([
                                    label,
                                    score,
                                ]) => (
                                    <div
                                        className="match-reason"
                                        key={
                                            label
                                        }
                                    >
                                        <div>
                                            <span>
                                                {
                                                    label
                                                }
                                            </span>

                                            <strong>
                                                {
                                                    score
                                                }
                                                %
                                            </strong>
                                        </div>

                                        <div className="reason-bar">
                                            <span
                                                style={{
                                                    width: `${score}%`,
                                                }}
                                            ></span>
                                        </div>
                                    </div>
                                )
                            )}

                        </div>


                        {/* MATCH STATUS */}

                        <div className="modal-ready">

                            <FiCheck />

                            <div>
                                <strong>
                                    Your profile is being
                                    used automatically.
                                </strong>

                                <span>
                                    Add more details in
                                    Career Profile to make
                                    this match even more
                                    accurate.
                                </span>
                            </div>

                        </div>


                        <div className="modal-job-actions">

                            <button
                                className="modal-save"
                                onClick={() =>
                                    toggleSave(
                                        selectedJob.id
                                    )
                                }
                            >
                                <FiBookmark />

                                {savedJobs.includes(
                                    selectedJob.id
                                )
                                    ? "Saved"
                                    : "Save Job"}
                            </button>

                            <button className="modal-apply">
                                Apply Now

                                <FiArrowUpRight />
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* ==================================================
                HOW MATCHING WORKS MODAL
            ================================================== */}

            {showHowItWorks && (
                <div
                    className="radar-modal-overlay"
                    onMouseDown={() =>
                        setShowHowItWorks(
                            false
                        )
                    }
                >

                    <div
                        className={`how-match-modal ${darkMode
                                ? "radar-modal-dark"
                                : ""
                            }`}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="radar-modal-close"
                            onClick={() =>
                                setShowHowItWorks(
                                    false
                                )
                            }
                        >
                            <FiX />
                        </button>


                        <div className="how-match-top">

                            <div className="how-match-icon">
                                <FiTarget />
                            </div>

                            <div>
                                <span>
                                    SMART MATCHING
                                </span>

                                <h3>
                                    How does it work?
                                </h3>
                            </div>

                        </div>


                        <div className="how-steps">

                            <div className="how-step">
                                <strong>
                                    01
                                </strong>

                                <div>
                                    <b>
                                        Add your details
                                    </b>

                                    <p>
                                        Complete your
                                        Career Profile
                                        with your role,
                                        skills, location
                                        and preferences.
                                    </p>
                                </div>
                            </div>


                            <div className="how-step">
                                <strong>
                                    02
                                </strong>

                                <div>
                                    <b>
                                        HireNest reads your
                                        profile
                                    </b>

                                    <p>
                                        The information
                                        you save is
                                        automatically
                                        connected to your
                                        job radar.
                                    </p>
                                </div>
                            </div>


                            <div className="how-step">
                                <strong>
                                    03
                                </strong>

                                <div>
                                    <b>
                                        Matches are calculated
                                    </b>

                                    <p>
                                        Each opportunity
                                        receives a match
                                        score based on
                                        different profile
                                        signals.
                                    </p>
                                </div>
                            </div>


                            <div className="how-step">
                                <strong>
                                    04
                                </strong>

                                <div>
                                    <b>
                                        Add more details →
                                        better signal
                                    </b>

                                    <p>
                                        The more relevant
                                        information you
                                        provide, the more
                                        useful your
                                        recommendations
                                        can become.
                                    </p>
                                </div>
                            </div>

                        </div>


                        <button
                            className="how-close-btn"
                            onClick={() =>
                                setShowHowItWorks(
                                    false
                                )
                            }
                        >
                            Got it

                            <FiCheck />
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default SmartJobRadar;