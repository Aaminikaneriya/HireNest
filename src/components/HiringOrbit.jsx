import React from "react";
import {
    FiArrowUpRight,
    FiBriefcase,
    FiCode,
    FiCpu,
    FiDatabase,
    FiDollarSign,
    FiLayers,
    FiX,
   
} from "react-icons/fi";

import "./HiringOrbit.css";

const companies = [
    {
        id: 1,
        name: "Google",
        short: "GO",
        icon: FiCode,
        openings: 128,
        category: "Technology",
        location: "Multiple Locations",
        description:
            "Explore technology, engineering and product opportunities with one of the world's leading companies.",
        roles: [
            ["Engineering", 48],
            ["Product", 26],
            ["Design", 18],
            ["Other Roles", 36],
        ],
    },

    {
        id: 2,
        name: "Microsoft",
        short: "MS",
        icon: FiCpu,
        openings: 94,
        category: "Technology",
        location: "India & Global",
        description:
            "Discover opportunities across software, cloud, AI, design and business teams.",
        roles: [
            ["Engineering", 32],
            ["Cloud & AI", 24],
            ["Design", 14],
            ["Other Roles", 24],
        ],
    },

    {
        id: 3,
        name: "TCS",
        short: "TC",
        icon: FiLayers,
        openings: 210,
        category: "IT Services",
        location: "India",
        description:
            "Build your career with opportunities across technology, consulting and digital services.",
        roles: [
            ["Technology", 82],
            ["Consulting", 42],
            ["Data", 36],
            ["Other Roles", 50],
        ],
    },

    {
        id: 4,
        name: "Adobe",
        short: "AD",
        icon: FiLayers,
        openings: 76,
        category: "Creative Technology",
        location: "India & Global",
        description:
            "Find opportunities where creativity, technology and digital experiences come together.",
        roles: [
            ["Engineering", 28],
            ["Design", 20],
            ["Marketing", 12],
            ["Other Roles", 16],
        ],
    },

    {
        id: 5,
        name: "Infosys",
        short: "IN",
        icon: FiDatabase,
        openings: 156,
        category: "Technology",
        location: "India",
        description:
            "Explore technology and consulting opportunities designed for the next generation of talent.",
        roles: [
            ["Technology", 64],
            ["Consulting", 32],
            ["Data", 24],
            ["Other Roles", 36],
        ],
    },

    {
        id: 6,
        name: "Deloitte",
        short: "DE",
        icon: FiDollarSign,
        openings: 118,
        category: "Consulting",
        location: "India & Global",
        description:
            "Explore consulting, finance, technology and business opportunities.",
        roles: [
            ["Consulting", 42],
            ["Technology", 31],
            ["Finance", 19],
            ["Other Roles", 26],
        ],
    },

    {
        id: 7,
        name: "Accenture",
        short: "AC",
        icon: FiBriefcase,
        openings: 180,
        category: "Consulting & Technology",
        location: "India & Global",
        description:
            "Discover opportunities across technology, strategy, consulting and digital transformation.",
        roles: [
            ["Technology", 72],
            ["Consulting", 41],
            ["Strategy", 25],
            ["Other Roles", 42],
        ],
    },

    {
        id: 8,
        name: "IBM",
        short: "IB",
        icon: FiCpu,
        openings: 86,
        category: "Technology",
        location: "India & Global",
        description:
            "Build meaningful technology solutions across AI, cloud, data and enterprise platforms.",
        roles: [
            ["AI & Data", 26],
            ["Cloud", 23],
            ["Engineering", 20],
            ["Other Roles", 17],
        ],
    },
];

const HiringOrbit = () => {
    const [activeCompany, setActiveCompany] =
        React.useState(null);

    const [darkMode, setDarkMode] =
        React.useState(false);

    /* ============================
       THEME SYNC
    ============================ */

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

    /* ============================
       BODY LOCK
    ============================ */

    React.useEffect(() => {
        document.body.style.overflow =
            activeCompany ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [activeCompany]);

    /* ============================
       ESC CLOSE
    ============================ */

    React.useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setActiveCompany(null);
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

    return (
        <>
            <section
                className={`hiring-orbit ${darkMode
                        ? "hiring-orbit-dark"
                        : ""
                    }`}
            >
                <div className="hiring-orbit-container">

                    {/* ======================
                        HEADER
                    ====================== */}

                    <div className="hiring-orbit-header">

                        <div>
                            <span className="orbit-eyebrow">
                                COMPANIES HIRING NOW
                            </span>

                            <h2>
                                Your next workplace
                                <br />
                                <span>is out there.</span>
                            </h2>
                        </div>

                        <div className="orbit-header-right">
                            <p>
                                Discover companies hiring
                                talent across technology,
                                business, design and more.
                            </p>

                            <button className="orbit-all-btn">
                                Explore all companies
                                <FiArrowUpRight />
                            </button>
                        </div>

                    </div>


                    {/* ======================
                        ORBIT AREA
                    ====================== */}

                    <div className="orbit-stage">

                        {/* decorative rings */}

                        <div className="orbit-ring ring-one"></div>
                        <div className="orbit-ring ring-two"></div>
                        <div className="orbit-ring ring-three"></div>


                        {/* connecting lines */}

                        <div className="orbit-line line-one"></div>
                        <div className="orbit-line line-two"></div>
                        <div className="orbit-line line-three"></div>
                        <div className="orbit-line line-four"></div>


                        {/* CENTER */}

                        <div className="orbit-center">

                            <div className="center-pulse"></div>

                            <div className="center-logo">
                                H
                            </div>

                            <span>HIRENEST</span>

                            <small>
                                YOUR NEXT MOVE
                            </small>

                        </div>


                        {/* COMPANY 1 */}

                        <button
                            className="company-node node-one"
                            onClick={() =>
                                setActiveCompany(
                                    companies[0]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[0].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[0].name}
                            </span>

                            <small>
                                {companies[0].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 2 */}

                        <button
                            className="company-node node-two"
                            onClick={() =>
                                setActiveCompany(
                                    companies[1]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[1].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[1].name}
                            </span>

                            <small>
                                {companies[1].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 3 */}

                        <button
                            className="company-node node-three"
                            onClick={() =>
                                setActiveCompany(
                                    companies[2]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[2].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[2].name}
                            </span>

                            <small>
                                {companies[2].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 4 */}

                        <button
                            className="company-node node-four"
                            onClick={() =>
                                setActiveCompany(
                                    companies[3]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[3].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[3].name}
                            </span>

                            <small>
                                {companies[3].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 5 */}

                        <button
                            className="company-node node-five"
                            onClick={() =>
                                setActiveCompany(
                                    companies[4]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[4].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[4].name}
                            </span>

                            <small>
                                {companies[4].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 6 */}

                        <button
                            className="company-node node-six"
                            onClick={() =>
                                setActiveCompany(
                                    companies[5]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[5].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[5].name}
                            </span>

                            <small>
                                {companies[5].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 7 */}

                        <button
                            className="company-node node-seven"
                            onClick={() =>
                                setActiveCompany(
                                    companies[6]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[6].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[6].name}
                            </span>

                            <small>
                                {companies[6].openings} openings
                            </small>
                        </button>


                        {/* COMPANY 8 */}

                        <button
                            className="company-node node-eight"
                            onClick={() =>
                                setActiveCompany(
                                    companies[7]
                                )
                            }
                        >
                            <span className="company-node-icon">
                                {React.createElement(
                                    companies[7].icon
                                )}
                            </span>

                            <span className="company-node-name">
                                {companies[7].name}
                            </span>

                            <small>
                                {companies[7].openings} openings
                            </small>
                        </button>

                    </div>


                    {/* ======================
                        STATS
                    ====================== */}

                    <div className="orbit-stats">

                        <div className="orbit-stat">
                            <strong>2.5K+</strong>
                            <span>Companies</span>
                        </div>

                        <div className="stat-divider"></div>

                        <div className="orbit-stat">
                            <strong>18K+</strong>
                            <span>Open Roles</span>
                        </div>

                        <div className="stat-divider"></div>

                        <div className="orbit-stat">
                            <strong>50+</strong>
                            <span>Industries</span>
                        </div>

                    </div>


                    {/* ======================
                        MOBILE COMPANY STRIP
                    ====================== */}

                    <div className="mobile-company-list">

                        {companies.map((company) => {
                            const Icon = company.icon;

                            return (
                                <button
                                    key={company.id}
                                    onClick={() =>
                                        setActiveCompany(
                                            company
                                        )
                                    }
                                    className="mobile-company-item"
                                >
                                    <span className="mobile-company-icon">
                                        <Icon />
                                    </span>

                                    <span className="mobile-company-info">
                                        <strong>
                                            {company.name}
                                        </strong>

                                        <small>
                                            {company.openings} open roles
                                        </small>
                                    </span>

                                    <FiArrowUpRight />
                                </button>
                            );
                        })}

                    </div>

                </div>
            </section>


            {/* ==================================================
                COMPANY MODAL
            ================================================== */}

            {activeCompany && (
                <div
                    className="company-modal-overlay"
                    onMouseDown={() =>
                        setActiveCompany(null)
                    }
                >
                    <div
                        className={`company-modal ${darkMode
                                ? "company-modal-dark"
                                : ""
                            }`}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* CLOSE */}

                        <button
                            className="company-modal-close"
                            onClick={() =>
                                setActiveCompany(null)
                            }
                        >
                            <FiX />
                        </button>


                        {/* COMPANY HEADER */}

                        <div className="company-modal-header">

                            <div className="modal-company-logo">
                                {React.createElement(
                                    activeCompany.icon
                                )}
                            </div>

                            <div>
                                <span>
                                    HIRING NOW
                                </span>

                                <h3>
                                    {activeCompany.name}
                                </h3>
                            </div>

                        </div>


                        {/* META */}

                        <div className="company-modal-meta">

                            <span>
                                {activeCompany.category}
                            </span>

                            <span>
                                {activeCompany.location}
                            </span>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="company-modal-description">
                            {activeCompany.description}
                        </p>


                        {/* OPENINGS */}

                        <div className="company-openings-title">

                            <strong>
                                Open positions
                            </strong>

                            <span>
                                {activeCompany.openings}
                            </span>

                        </div>


                        {/* ROLE BARS */}

                        <div className="company-role-list">

                            {activeCompany.roles.map(
                                ([role, count]) => (
                                    <div
                                        className="company-role"
                                        key={role}
                                    >
                                        <div className="role-top">
                                            <span>
                                                {role}
                                            </span>

                                            <strong>
                                                {count}
                                            </strong>
                                        </div>

                                        <div className="role-bar">
                                            <span
                                                style={{
                                                    width: `${Math.min(
                                                        count /
                                                        activeCompany.openings *
                                                        100,
                                                        100
                                                    )}%`,
                                                }}
                                            ></span>
                                        </div>
                                    </div>
                                )
                            )}

                        </div>


                        {/* CTA */}

                        <button className="company-modal-btn">
                            View Open Positions
                            <FiArrowUpRight />
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default HiringOrbit;