import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
    FiSearch,
    FiMapPin,
    FiArrowRight,
    FiBriefcase,
    FiBookOpen,
    FiHome,
    FiUsers,
    FiTrendingUp,
} from "react-icons/fi";

import "./Hero.css";

function Hero() {
    const [darkMode, setDarkMode] = React.useState(false);

    /* =========================================
       DARK MODE
    ========================================= */
    React.useEffect(() => {
        const savedTheme = localStorage.getItem("hirenest-theme");

        setDarkMode(savedTheme === "dark");

        const handleThemeChange = () => {
            const theme = localStorage.getItem("hirenest-theme");

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

    return (
        <section className={`hero-section ${darkMode ? "hero-dark" : ""}`}>
            <Container>
                <Row className="align-items-center hero-row">

                    {/* =========================================
              LEFT CONTENT
          ========================================= */}
                    <Col lg={7} md={12} className="hero-content">

                        <div className="hero-badge">
                            <span className="badge-icon">
                                <FiTrendingUp />
                            </span>
                            Your Career Journey Starts Here
                        </div>

                        <h1 className="hero-title">
                            Your Next Opportunity
                            <span> Starts Here.</span>
                        </h1>

                        <p className="hero-description">
                            Discover jobs, internships & career opportunities
                            that match your skills, interests and goals.
                        </p>

                        {/* =========================================
                SEARCH BOX
            ========================================= */}
                        <div className="hero-search-box">

                            <div className="search-tabs">

                                <button className="search-tab active">
                                    <FiBriefcase />
                                    Jobs
                                </button>

                                <button className="search-tab">
                                    <FiBookOpen />
                                    Internships
                                </button>

                                <button className="search-tab">
                                    <FiHome />
                                    Remote
                                </button>

                                <button className="search-tab">
                                    <FiUsers />
                                    Companies
                                </button>

                            </div>

                            <div className="search-fields">

                                <div className="search-input">
                                    <FiSearch />

                                    <Form.Control
                                        type="text"
                                        placeholder="Job title, skills or keywords"
                                    />
                                </div>

                                <div className="location-input">
                                    <FiMapPin />

                                    <Form.Control
                                        type="text"
                                        placeholder="Location"
                                    />
                                </div>

                                <button className="search-button">
                                    Search Jobs
                                    <FiArrowRight />
                                </button>

                            </div>
                        </div>

                        {/* =========================================
                POPULAR SEARCH
            ========================================= */}
                        <div className="popular-search">
                            <span>Popular searches:</span>

                            <button>Software Engineer</button>
                            <button>UI/UX</button>
                            <button>Marketing</button>
                            <button>Internship</button>
                            <button>Remote</button>
                        </div>

                        {/* =========================================
                STATS
            ========================================= */}
                        <div className="hero-stats">

                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FiBriefcase />
                                </div>

                                <div>
                                    <h4>10K+</h4>
                                    <p>Jobs</p>
                                </div>
                            </div>

                            <div className="stat-line"></div>

                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FiUsers />
                                </div>

                                <div>
                                    <h4>2K+</h4>
                                    <p>Companies</p>
                                </div>
                            </div>

                            <div className="stat-line"></div>

                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FiBookOpen />
                                </div>

                                <div>
                                    <h4>5K+</h4>
                                    <p>Internships</p>
                                </div>
                            </div>

                        </div>

                    </Col>

                    {/* =========================================
              RIGHT IMAGE
          ========================================= */}
                    <Col lg={5} md={12} className="hero-image-col">

                        <div className="hero-image-wrapper">

                            <div className="image-glow"></div>

                            <img
                                src="https://media.istockphoto.com/id/2156362775/photo/professional-woman-working-on-laptop-in-modern-office.jpg?s=612x612&w=0&k=20&c=auTJtU1rpb7m9aPAaI88orFqD9zWSR51ACfBGbVAUTg="
                                alt="Career opportunities"
                                className="hero-main-image"
                            />
                            <div className="opportunity-badge">
                                <span className="opportunity-dot"></span>

                                <div>
                                    <strong>New Opportunities</strong>
                                    <small>Waiting for you</small>
                                </div>

                                <span className="opportunity-arrow">↗</span>
                            </div>



                        </div>

                    </Col>

                </Row>
            </Container>
        </section>
    );
}

export default Hero;