import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router";

import {
    ArrowUpRight,
    Bell,
    BriefcaseBusiness,
    Building2,
    ChevronRight,
    Compass,
    GraduationCap,
    Heart,
    Home,
    Laptop,
    Menu,
    Moon,
    Search,
    Sparkles,
    Sun,
    TrendingUp,
    UserRound,
    X,
} from "lucide-react";

import "./Navbar.css";


/* =========================================================
   MAIN NAVIGATION
========================================================= */

const mainNavigation = [
    {
        id: "home",
        label: "Home",
        route: "/",
    },
    {
        id: "jobs",
        label: "Jobs",
        route: "/jobs",
    },
    {
        id: "internships",
        label: "Internships",
        route: "/internships",
    },
    {
        id: "match",
        label: "Career Match",
        route: "/career-match",
    },
    {
        id: "flow",
        label: "Career Flow",
        route: "/career-flow",
    },
    {
        id: "companies",
        label: "Companies",
        route: "/companies",
    },
];


/* =========================================================
   MOBILE / SECONDARY LINKS
========================================================= */

const secondaryNavigation = [
    {
        id: "paths",
        label: "Career Paths",
        icon: GraduationCap,
        target: ".career-paths",
    },
    {
        id: "radar",
        label: "Smart Radar",
        icon: Laptop,
        target: ".smart-radar",
    },
    {
        id: "playground",
        label: "Career Playground",
        icon: Sparkles,
        target: ".career-playground",
    },
];


/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(false);

    const [showMobileMenu, setShowMobileMenu] =
        useState(false);

    const [searchOpen, setSearchOpen] =
        useState(false);

    const [activeItem, setActiveItem] =
        useState("home");
        

    /* =====================================================
       THEME INITIALIZATION
    ===================================================== */

    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                "hirenest-theme"
            );

        const isDark =
            savedTheme === "dark";

        setDarkMode(isDark);

        if (isDark) {

            document.body.classList.add(
                "hirenest-dark"
            );

        } else {

            document.body.classList.remove(
                "hirenest-dark"
            );
        }


        const handleThemeChange = () => {

            const theme =
                localStorage.getItem(
                    "hirenest-theme"
                );

            const nextDark =
                theme === "dark";

            setDarkMode(nextDark);

            if (nextDark) {

                document.body.classList.add(
                    "hirenest-dark"
                );

            } else {

                document.body.classList.remove(
                    "hirenest-dark"
                );
            }
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
       ACTIVE NAVIGATION — SYNC WITH CURRENT ROUTE
    ===================================================== */

    useEffect(() => {

        const currentPath = location.pathname;

        if (currentPath === "/") {
            setActiveItem("home");
        } else if (currentPath === "/jobs") {
            setActiveItem("jobs");
        } else if (currentPath === "/internships") {
            setActiveItem("internships");
        } else if (currentPath === "/career-match") {
            setActiveItem("match");
        } else if (currentPath === "/career-flow") {
            setActiveItem("flow");
        } else if (currentPath === "/companies") {
            setActiveItem("companies");
        } else if (currentPath === "/profile") {
            setActiveItem("profile");
        } else {
            setActiveItem(null);
        }

    }, [location.pathname]);


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const toggleTheme = () => {

        const newMode =
            !darkMode;

        setDarkMode(newMode);


        if (newMode) {

            document.body.classList.add(
                "hirenest-dark"
            );

            localStorage.setItem(
                "hirenest-theme",
                "dark"
            );

        } else {

            document.body.classList.remove(
                "hirenest-dark"
            );

            localStorage.setItem(
                "hirenest-theme",
                "light"
            );
        }


        window.dispatchEvent(
            new Event(
                "hirenest-theme-change"
            )
        );
    };


    /* =====================================================
       MOBILE + SEARCH BODY LOCK
    ===================================================== */

    useEffect(() => {

        if (
            showMobileMenu ||
            searchOpen
        ) {

            document.body.style.overflow =
                "hidden";

        } else {

            document.body.style.overflow =
                "";
        }


        return () => {

            document.body.style.overflow =
                "";
        };

    }, [
        showMobileMenu,
        searchOpen,
    ]);


    /* =====================================================
       ESCAPE
    ===================================================== */

    useEffect(() => {

        const handleEscape = (event) => {

            if (
                event.key === "Escape"
            ) {

                if (searchOpen) {

                    setSearchOpen(false);
                }

                if (showMobileMenu) {

                    setShowMobileMenu(false);
                }
            }
        };


        document.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, [
        searchOpen,
        showMobileMenu,
    ]);


    /* =====================================================
       SCROLL HELPER
    ===================================================== */

    const goToSection = (
        id,
        target,
        route
    ) => {

        setActiveItem(id);

        // Route navigation for separate pages
        if (route) {
            navigate(route);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setShowMobileMenu(false);
            setSearchOpen(false);
            return;
        }

        // Section scroll for homepage-only items
        if (!target) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            const element =
                document.querySelector(target);

            if (element) {
                const nav =
                    document.querySelector(
                        ".hirenest-navbar"
                    );

                const announcement =
                    document.querySelector(
                        ".hn-announcement"
                    );

                const secondary =
                    document.querySelector(
                        ".hn-secondary-nav"
                    );

                const offset =
                    (announcement?.offsetHeight || 0) +
                    (nav?.offsetHeight || 0) +
                    (secondary?.offsetHeight || 0) +
                    14;

                const top =
                    element.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: Math.max(top, 0),
                    behavior: "smooth",
                });
            }
        }

        setShowMobileMenu(false);
        setSearchOpen(false);
    };


    /* =====================================================
       HOME
    ===================================================== */
    const goHome = () => {
        setActiveItem("home");

        navigate("/");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        setShowMobileMenu(false);
        setSearchOpen(false);
    };


    /* =====================================================
       PROFILE
    ===================================================== */

    const goProfile = () => {

        setActiveItem("profile");

        setShowMobileMenu(false);

        setSearchOpen(false);

        navigate("/profile");
    };


    /* =====================================================
       MOBILE TOGGLE
    ===================================================== */

    const toggleMobileMenu = () => {

        setSearchOpen(false);

        setShowMobileMenu(
            (prev) => !prev
        );
    };


    /* =====================================================
       SEARCH TOGGLE
    ===================================================== */

    const openSearch = () => {

        setShowMobileMenu(false);

        setSearchOpen(true);
    };


    const closeSearch = () => {

        setSearchOpen(false);
    };


    return (
        <>

            {/* =================================================
                TOP ANNOUNCEMENT BAR
            ================================================= */}

            <div className="hn-announcement">

                <div className="hn-announcement-left">

                    <Sparkles
                        size={13}
                    />

                    <span>
                        YOUR NEXT OPPORTUNITY STARTS HERE
                    </span>

                </div>


                <div className="hn-announcement-center">

                    <span className="announcement-dot">
                        •
                    </span>

                    <span>
                        NEW JOBS & INTERNSHIPS ADDED DAILY
                    </span>

                    <span className="announcement-dot">
                        •
                    </span>

                </div>


                <div className="hn-announcement-right">

                    <span>
                        BUILD YOUR CAREER
                    </span>

                    <ArrowUpRight
                        size={13}
                    />

                </div>

            </div>



            {/* =================================================
                MAIN NAVBAR
            ================================================= */}

            <nav
                className={`hirenest-navbar ${darkMode
                    ? "hirenest-navbar-dark"
                    : "hirenest-navbar-light"
                    }`}
            >

                <div className="hirenest-navbar-inner">


                    {/* =========================================
                        BRAND
                    ========================================= */}

                    <button
                        type="button"
                        className="hirenest-brand"
                        onClick={
                            goHome
                        }
                    >

                        <span className="brand-mark">

                            <span className="brand-mark-outline"></span>

                            <span className="brand-arrow">

                                <ArrowUpRight
                                    size={21}
                                    strokeWidth={2.3}
                                />

                            </span>

                        </span>


                        <span className="brand-text">

                            <span className="brand-name">
                                HireNest
                            </span>

                            <span className="brand-tagline">
                                CAREER • OPPORTUNITY
                            </span>

                        </span>

                    </button>



                    {/* =========================================
                        DESKTOP NAVIGATION
                    ========================================= */}

                    <div className="desktop-navigation">

                        {mainNavigation.map(
                            (item) => (

                                <button
                                    key={
                                        item.id
                                    }
                                    type="button"
                                    className={`nav-link-custom ${activeItem ===
                                        item.id
                                        ? "active-link"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        goToSection(
                                            item.id,
                                            item.target,
                                            item.route
                                        )
                                    }
                                >

                                    {item.label}

                                </button>

                            )
                        )}

                    </div>



                    {/* =========================================
                        RIGHT ACTIONS
                    ========================================= */}

                    <div className="navbar-actions">


                        {/* SEARCH */}

                        <button
                            type="button"
                            className="icon-button search-trigger"
                            onClick={
                                openSearch
                            }
                            aria-label="Open search"
                        >

                            <Search size={19} />

                        </button>



                        {/* SAVED */}

                        <button
                            type="button"
                            className="icon-button desktop-action"
                            aria-label="Saved jobs"
                        >

                            <Heart size={19} />

                        </button>



                        {/* NOTIFICATION */}

                        <button
                            type="button"
                            className="icon-button notification-button desktop-action"
                            aria-label="Notifications"
                        >

                            <Bell size={19} />

                            <span className="notification-badge">
                                3
                            </span>

                        </button>



                        {/* THEME */}

                        <button
                            type="button"
                            className="theme-button"
                            onClick={
                                toggleTheme
                            }
                            aria-label="Toggle theme"
                        >

                            <span
                                className={
                                    darkMode
                                        ? "theme-circle dark"
                                        : "theme-circle"
                                }
                            >

                                {darkMode ? (
                                    <Moon size={15} />
                                ) : (
                                    <Sun size={15} />
                                )}

                            </span>

                        </button>



                        {/* PROFILE — JUST ROUND AVATAR */}

                        <button
                            type="button"
                            className={`profile-button ${activeItem ===
                                "profile"
                                ? "active"
                                : ""
                                }`}
                            onClick={
                                goProfile
                            }
                            aria-label="Open profile"
                        >

                            <span className="profile-avatar">

                                <UserRound
                                    size={19}
                                />

                            </span>

                        </button>



                        {/* MOBILE MENU */}

                        <button
                            type="button"
                            className="mobile-menu-button"
                            onClick={
                                toggleMobileMenu
                            }
                            aria-label={
                                showMobileMenu
                                    ? "Close menu"
                                    : "Open menu"
                            }
                            aria-expanded={
                                showMobileMenu
                            }
                        >

                            {showMobileMenu ? (
                                <X size={21} />
                            ) : (
                                <Menu size={21} />
                            )}

                        </button>

                    </div>

                </div>

            </nav>



            {/* =================================================
                SECONDARY NAVIGATION
            ================================================= */}

            <div className="hn-secondary-nav">

                <div className="secondary-inner">


                    <button
                        type="button"
                        className="secondary-link"
                        onClick={() =>
                            goToSection(
                                "jobs",
                                ".featured-jobs"
                            )
                        }
                    >

                        <BriefcaseBusiness
                            size={14}
                        />

                        Jobs

                    </button>


                    <button
                        type="button"
                        className="secondary-link"
                        onClick={() =>
                            goToSection(
                                "paths",
                                ".career-paths"
                            )
                        }
                    >

                        <GraduationCap
                            size={14}
                        />

                        Internships

                    </button>


                    <button
                        type="button"
                        className="secondary-link"
                        onClick={() =>
                            goToSection(
                                "radar",
                                ".smart-radar"
                            )
                        }
                    >

                        <Laptop
                            size={14}
                        />

                        Smart Radar

                    </button>


                    <button
                        type="button"
                        className="secondary-link"
                        onClick={() =>
                            goToSection(
                                "companies",
                                ".hiring-orbit"
                            )
                        }
                    >

                        <Building2
                            size={14}
                        />

                        Companies

                    </button>


                    <button
                        type="button"
                        className="secondary-link"
                        onClick={() =>
                            goToSection(
                                "playground",
                                ".career-playground"
                            )
                        }
                    >

                        <Sparkles
                            size={14}
                        />

                        Career Playground

                    </button>


                    <div className="secondary-spacer"></div>


                    <button
                        type="button"
                        className="employer-link"
                        onClick={
                            goProfile
                        }
                    >

                        <UserRound
                            size={14}
                        />

                        My Profile

                        <ArrowUpRight
                            size={13}
                        />

                    </button>

                </div>


                {/* MOBILE / TABLET OPPORTUNITY STRIP */}

                <div className="mobile-opportunity-strip">

                    <div className="mobile-opportunity-message">

                        <Sparkles size={14} />

                        <span>
                            1,200+ NEW OPPORTUNITIES THIS WEEK
                        </span>

                    </div>


                    <button
                        type="button"
                        className="mobile-opportunity-action"
                        onClick={() =>
                            goToSection(
                                "jobs",
                                ".featured-jobs"
                            )
                        }
                    >

                        Explore Now

                        <ArrowUpRight
                            size={14}
                        />

                    </button>

                </div>

            </div>



            {/* =================================================
                CENTER SEARCH MODAL
            ================================================= */}

            {searchOpen && (

                <div
                    className="search-modal-overlay"
                    onClick={
                        closeSearch
                    }
                >

                    <div
                        className="search-modal-card"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >


                        {/* SEARCH HEADER */}

                        <div className="search-modal-header">

                            <div className="search-modal-title">

                                <span className="search-modal-icon">

                                    <Search
                                        size={19}
                                    />

                                </span>


                                <div>

                                    <small>
                                        HIRENEST SEARCH
                                    </small>

                                    <h3>
                                        Find your next opportunity
                                    </h3>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="search-modal-close"
                                onClick={
                                    closeSearch
                                }
                                aria-label="Close search"
                            >

                                <X
                                    size={20}
                                />

                            </button>

                        </div>



                        {/* SEARCH FIELD */}

                        <div className="search-modal-field">

                            <Search
                                size={19}
                            />

                            <input
                                type="text"
                                autoFocus
                                placeholder="Search jobs, companies, roles..."
                            />

                            <span>
                                ↵
                            </span>

                        </div>



                        {/* QUICK SEARCH */}

                        <div className="search-modal-quick">

                            <span>
                                POPULAR SEARCHES
                            </span>


                            <div>

                                <button
                                    type="button"
                                >
                                    Frontend Developer
                                </button>

                                <button
                                    type="button"
                                >
                                    UI/UX Designer
                                </button>

                                <button
                                    type="button"
                                >
                                    Marketing
                                </button>

                                <button
                                    type="button"
                                >
                                    Internships
                                </button>

                            </div>

                        </div>



                        {/* SEARCH FOOTER */}

                        <div className="search-modal-footer">

                            <span>
                                Search across jobs,
                                internships and companies.
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    goToSection(
                                        "jobs",
                                        ".featured-jobs"
                                    )
                                }
                            >

                                Explore Jobs

                                <ArrowUpRight
                                    size={15}
                                />

                            </button>

                        </div>

                    </div>

                </div>

            )}



            {/* =================================================
                MOBILE CENTER MENU
            ================================================= */}

            {showMobileMenu && (

                <div
                    className="mobile-menu-overlay"
                    onClick={() =>
                        setShowMobileMenu(
                            false
                        )
                    }
                >

                    <div
                        className="mobile-menu-panel"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >


                        {/* MOBILE HEADER */}

                        <div className="mobile-panel-header">

                            <div className="mobile-brand">

                                <span className="mobile-brand-mark">

                                    <ArrowUpRight
                                        size={18}
                                    />

                                </span>


                                <div>

                                    <strong>
                                        HireNest
                                    </strong>

                                    <small>
                                        CAREER • OPPORTUNITY
                                    </small>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="mobile-close-button"
                                onClick={() =>
                                    setShowMobileMenu(
                                        false
                                    )
                                }
                            >

                                <X size={20} />

                            </button>

                        </div>



                        {/* SEARCH */}

                        <div
                            className="mobile-search"
                            onClick={
                                openSearch
                            }
                        >

                            <Search
                                size={17}
                            />

                            <span>
                                Search opportunities...
                            </span>

                        </div>



                        {/* MAIN NAV */}

                        <div className="mobile-navigation-group">

                            <span className="mobile-label">
                                NAVIGATION
                            </span>


                            {mainNavigation.map(
                                (item) => {

                                    return (

                                        <button
                                            key={
                                                item.id
                                            }
                                            type="button"
                                            className={`mobile-navigation-link ${activeItem ===
                                                item.id
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                goToSection(
                                                    item.id,
                                                    item.target,
                                                    item.route
                                                )
                                            }
                                        >

                                            <span>

                                                {item.id ===
                                                    "home" ? (
                                                    <Home
                                                        size={17}
                                                    />
                                                ) : item.id ===
                                                    "jobs" ? (
                                                    <BriefcaseBusiness
                                                        size={17}
                                                    />
                                                ) : item.id ===
                                                    "internships" ? (
                                                    <GraduationCap
                                                        size={17}
                                                    />
                                                ) : item.id ===
                                                    "match" ? (
                                                    <Compass
                                                        size={17}
                                                    />
                                                ) : item.id ===
                                                    "flow" ? (
                                                    <TrendingUp
                                                        size={17}
                                                    />
                                                ) : (
                                                    <Building2
                                                        size={17}
                                                    />
                                                )}

                                                {item.label}

                                            </span>


                                            <ChevronRight
                                                size={16}
                                            />

                                        </button>

                                    );

                                }
                            )}

                        </div>



                        {/* CAREER TOOLS */}

                        <div className="mobile-navigation-group">

                            <span className="mobile-label">
                                CAREER TOOLS
                            </span>


                            {secondaryNavigation.map(
                                (item) => {

                                    const Icon =
                                        item.icon;

                                    return (

                                        <button
                                            key={
                                                item.id
                                            }
                                            type="button"
                                            className="mobile-navigation-link"
                                            onClick={() =>
                                                goToSection(
                                                    item.id,
                                                    item.target
                                                )
                                            }
                                        >

                                            <span>

                                                <Icon
                                                    size={17}
                                                />

                                                {item.label}

                                            </span>


                                            <ChevronRight
                                                size={16}
                                            />

                                        </button>

                                    );

                                }
                            )}

                        </div>



                        {/* MOBILE PROFILE */}

                        <button
                            type="button"
                            className="mobile-profile-card"
                            onClick={
                                goProfile
                            }
                        >

                            <span className="profile-avatar">

                                <UserRound
                                    size={19}
                                />

                            </span>


                            <div>

                                <strong>
                                    My Profile
                                </strong>

                                <small>
                                    Your career identity
                                </small>

                            </div>


                            <ArrowUpRight
                                size={17}
                            />

                        </button>



                        {/* MOBILE BOTTOM */}

                        <div className="mobile-bottom">

                            <button
                                type="button"
                                className="mobile-theme-button"
                                onClick={
                                    toggleTheme
                                }
                            >

                                <span>

                                    {darkMode ? (
                                        <Moon
                                            size={17}
                                        />
                                    ) : (
                                        <Sun
                                            size={17}
                                        />
                                    )}

                                    {darkMode
                                        ? "Dark Mode"
                                        : "Light Mode"}

                                </span>


                                <span
                                    className={`mobile-switch ${darkMode
                                        ? "active"
                                        : ""
                                        }`}
                                >

                                    <i></i>

                                </span>

                            </button>


                            <span className="mobile-signature">
                                HIRENEST • FIND • BUILD • GROW
                            </span>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}


export default Navbar;