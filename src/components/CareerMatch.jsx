import React from "react";
import {
    FiBriefcase,
   
    FiChevronDown,
    FiArrowUpRight,
    FiCheck,
    FiTarget,
    FiZap,
    FiClock,
    FiPlay,
} from "react-icons/fi";
import "./CareerMatch.css";

const workOptions = [
    "Full Time",
    "Internship",
    "Remote",
    "Hybrid",
];

const experienceOptions = [
    "Fresher",
    "1–2 Years",
    "3–5 Years",
    "5+ Years",
];

const fields = [
    "Software Development",
    "UI/UX Design",
    "Marketing",
    "Data & Analytics",
    "Finance",
    "Human Resources",
];

const salaryOptions = [
    "Any Salary",
    "₹2–4 LPA",
    "₹4–7 LPA",
    "₹7–12 LPA",
    "₹12+ LPA",
];

function CareerMatch() {
    const [darkMode, setDarkMode] = React.useState(false);

    const [workType, setWorkType] = React.useState("Full Time");
    const [experience, setExperience] = React.useState("Fresher");
    const [field, setField] = React.useState("Software Development");
    const [salary, setSalary] = React.useState("Any Salary");

    const [match, setMatch] = React.useState(82);
    const [showResult, setShowResult] = React.useState(false);

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

    const findMatch = () => {
        let score = 78;

        if (workType === "Remote") score += 4;
        if (experience === "Fresher") score += 3;
        if (field === "Software Development") score += 5;
        if (salary !== "Any Salary") score += 2;

        setMatch(Math.min(score, 96));
        setShowResult(true);
    };

    return (
        <section
            className={`career-match-section ${
                darkMode ? "career-match-dark" : ""
            }`}
        >
            <div className="career-match-container">

                {/* ================= TOP HEADING ================= */}

                <div className="career-match-heading">

                    <div className="match-label">
                        <span></span>
                        <FiTarget />
                        CAREER MATCH
                    </div>

                    <h2>
                        Find the work that{" "}
                        <strong>fits you.</strong>
                    </h2>

                    <p>
                        Tell us what you're looking for and discover
                        opportunities that match your career goals.
                    </p>

                </div>


                {/* ================= MAIN AREA ================= */}

                <div className="career-match-layout">

                    {/* ================= LEFT ================= */}

                    <div className="match-form-area">

                        {/* Work Type */}

                        <div className="match-field">

                            <label>
                                <FiBriefcase />
                                What are you looking for?
                            </label>

                            <div className="choice-group">

                                {workOptions.map((option) => (
                                    <button
                                        key={option}
                                        className={
                                            workType === option
                                                ? "choice active"
                                                : "choice"
                                        }
                                        onClick={() =>
                                            setWorkType(option)
                                        }
                                    >
                                        {workType === option && (
                                            <FiCheck />
                                        )}

                                        {option}
                                    </button>
                                ))}

                            </div>

                        </div>


                        {/* Experience */}

                        <div className="match-field">

                            <label>
                                <FiZap />
                                Your experience
                            </label>

                            <div className="choice-group">

                                {experienceOptions.map((option) => (
                                    <button
                                        key={option}
                                        className={
                                            experience === option
                                                ? "choice active"
                                                : "choice"
                                        }
                                        onClick={() =>
                                            setExperience(option)
                                        }
                                    >
                                        {experience === option && (
                                            <FiCheck />
                                        )}

                                        {option}
                                    </button>
                                ))}

                            </div>

                        </div>


                        {/* Dropdown Row */}

                        <div className="select-row">

                            {/* Field */}

                            <div className="select-field">

                                <label>
                                    Preferred field
                                </label>

                                <div className="custom-select">

                                    <select
                                        value={field}
                                        onChange={(e) =>
                                            setField(e.target.value)
                                        }
                                    >
                                        {fields.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>

                                    <FiChevronDown />

                                </div>

                            </div>


                            {/* Salary */}

                            <div className="select-field">

                                <label>
                                    Salary preference
                                </label>

                                <div className="custom-select">

                                    <select
                                        value={salary}
                                        onChange={(e) =>
                                            setSalary(e.target.value)
                                        }
                                    >
                                        {salaryOptions.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>

                                    <FiChevronDown />

                                </div>

                            </div>

                        </div>


                        {/* Find Button */}

                        <button
                            className="find-match-btn"
                            onClick={findMatch}
                        >
                            <span>
                                Find My Match
                            </span>

                            <span className="find-btn-icon">
                                <FiArrowUpRight />
                            </span>
                        </button>


                        {/* Quiz */}

                        <button className="career-quiz-btn">

                            <span className="quiz-play">
                                <FiPlay />
                            </span>

                            <span>
                                Not sure what suits you?
                                <strong>
                                    Take our 30-sec Career Quiz
                                </strong>
                            </span>

                            <FiArrowUpRight />

                        </button>

                    </div>


                    {/* ================= RIGHT RESULT ================= */}

                    <div className="match-result-area">

                        <div className="result-glow"></div>

                        <div className="result-content">

                            <div className="result-top">

                                <span>
                                    YOUR CAREER MATCH
                                </span>

                                <FiTarget />

                            </div>


                            {/* Circle */}

                            <div className="match-circle">

                                <div className="circle-inner">

                                    <strong>
                                        {showResult ? match : 82}%
                                    </strong>

                                    <span>
                                        Great Fit
                                    </span>

                                </div>

                            </div>


                            <h3>
                                {showResult
                                    ? `${field} looks great for you`
                                    : "Your next opportunity is waiting"}
                            </h3>

                            <p>
                                Based on your preferences, we found
                                opportunities that could be a strong
                                match for your career goals.
                            </p>


                            <div className="result-stats">

                                <div>
                                    <strong>
                                        120+
                                    </strong>
                                    <span>
                                        Matching Jobs
                                    </span>
                                </div>

                                <div className="result-divider"></div>

                                <div>
                                    <strong>
                                        45+
                                    </strong>
                                    <span>
                                        Companies
                                    </span>
                                </div>

                            </div>


                            <button className="explore-match-btn">
                                Explore Matching Jobs
                                <FiArrowUpRight />
                            </button>

                        </div>

                        {/* Decorative dots */}

                        <div className="decor-dot dot-one"></div>
                        <div className="decor-dot dot-two"></div>
                        <div className="decor-line"></div>

                    </div>

                </div>


                {/* ================= TRUST LINE ================= */}

                <div className="match-trust">

                    <div>
                        <FiClock />
                        Takes less than 30 seconds
                    </div>

                    <span></span>

                    <div>
                        <FiCheck />
                        No sign-up required
                    </div>

                    <span></span>

                    <div>
                        <FiBriefcase />
                        Thousands of opportunities
                    </div>

                </div>

            </div>
        </section>
    );
}

export default CareerMatch;