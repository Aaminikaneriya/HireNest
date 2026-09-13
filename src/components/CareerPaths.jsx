import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    FiBriefcase,
    FiBookOpen,
    FiTrendingUp,
    FiArrowUpRight,
    FiCheckCircle,
} from "react-icons/fi";

import "./CareerPaths.css";

function CareerPaths() {

    const [darkMode, setDarkMode] = React.useState(
        localStorage.getItem("hirenest-theme") === "dark"
    );

    React.useEffect(() => {

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


    const careerPaths = [
        {
            id: 1,
            number: "01",
            icon: <FiBriefcase />,
            title: "Find a Job",
            description:
                "Explore opportunities that match your skills, experience and career goals.",
            tags: ["Full Time", "Part Time", "Remote"],
            count: "8,500+",
            countText: "Open Positions",
        },

        {
            id: 2,
            number: "02",
            icon: <FiBookOpen />,
            title: "Find an Internship",
            description:
                "Start building real-world experience with internships from growing companies.",
            tags: ["Students", "Freshers", "Paid"],
            count: "2,100+",
            countText: "Internships",
        },

        {
            id: 3,
            number: "03",
            icon: <FiTrendingUp />,
            title: "Build Your Career",
            description:
                "Get the tools, resources and guidance you need to take your career forward.",
            tags: ["Resume", "Skills", "Guidance"],
            count: "500+",
            countText: "Career Resources",
        },
    ];


    return (
        <section
            className={`career-paths-section ${darkMode ? "career-dark" : ""
                }`}
        >

            {/* Decorative background */}
            <div className="career-bg-circle circle-one"></div>
            <div className="career-bg-circle circle-two"></div>


            <Container>

                {/* =====================================
                    SECTION HEADER
                ===================================== */}

                <div className="career-heading">

                    <div className="career-mini-label">
                        <span></span>
                        EXPLORE YOUR POSSIBILITIES
                    </div>

                    <h2>
                        Find What’s
                        <span> Next For You.</span>
                    </h2>

                    <p>
                        Whether you're looking for your first internship,
                        your next job, or a better career path — start here.
                    </p>

                </div>


                {/* =====================================
                    CAREER CARDS
                ===================================== */}

                <Row className="career-cards-row">

                    {careerPaths.map((item) => (

                        <Col
                            lg={4}
                            md={6}
                            sm={12}
                            key={item.id}
                            className="career-card-col"
                        >

                            <div className="career-card">

                                {/* Top */}
                                <div className="career-card-top">

                                    <span className="career-number">
                                        {item.number}
                                    </span>

                                    <div className="career-icon">
                                        {item.icon}
                                    </div>

                                </div>


                                {/* Content */}
                                <div className="career-card-content">

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <p>
                                        {item.description}
                                    </p>


                                    {/* Tags */}
                                    <div className="career-tags">

                                        {item.tags.map((tag) => (

                                            <span key={tag}>
                                                <FiCheckCircle />
                                                {tag}
                                            </span>

                                        ))}

                                    </div>

                                </div>


                                {/* Bottom */}
                                <div className="career-card-bottom">

                                    <div className="career-count">

                                        <strong>
                                            {item.count}
                                        </strong>

                                        <small>
                                            {item.countText}
                                        </small>

                                    </div>


                                    <button className="career-arrow">
                                        <FiArrowUpRight />
                                    </button>

                                </div>


                                {/* Hover shape */}
                                <div className="card-hover-circle"></div>

                            </div>

                        </Col>

                    ))}

                </Row>


                {/* =====================================
                    BOTTOM LINE
                ===================================== */}

                <div className="career-bottom-text">

                    <span>
                        <FiCheckCircle />
                        Built for students, professionals & dreamers
                    </span>

                    <span>
                        Start exploring →
                    </span>

                </div>

            </Container>

        </section>
    );
}

export default CareerPaths;