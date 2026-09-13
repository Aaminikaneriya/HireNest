import React from "react";
import {
    FiMapPin,
    FiBookmark,
    FiArrowUpRight,
    FiBriefcase,
    FiClock,
    FiDollarSign,
} from "react-icons/fi";
import "./FeaturedJobs.css";

const jobs = [
    {
        title: "Frontend Developer",
        company: "TechNova",
        location: "Ahmedabad",
        salary: "₹4 - ₹7 LPA",
        type: "Full Time",
        experience: "1-2 Yrs",
        logo: "TN",
        featured: true,
    },
    {
        title: "UI/UX Designer",
        company: "PixelCraft",
        location: "Mumbai",
        salary: "₹3 - ₹6 LPA",
        type: "Full Time",
        experience: "0-2 Yrs",
        logo: "PC",
        featured: false,
    },
    {
        title: "React Developer",
        company: "CodeSphere",
        location: "Bangalore",
        salary: "₹5 - ₹9 LPA",
        type: "Full Time",
        experience: "2-4 Yrs",
        logo: "CS",
        featured: true,
    },
    {
        title: "Digital Marketing",
        company: "GrowthLabs",
        location: "Remote",
        salary: "₹3 - ₹5 LPA",
        type: "Remote",
        experience: "1-3 Yrs",
        logo: "GL",
        featured: false,
    },
    {
        title: "Data Analyst",
        company: "DataCore",
        location: "Pune",
        salary: "₹5 - ₹8 LPA",
        type: "Full Time",
        experience: "1-3 Yrs",
        logo: "DC",
        featured: false,
    },
    {
        title: "Backend Developer",
        company: "CloudPeak",
        location: "Hyderabad",
        salary: "₹6 - ₹10 LPA",
        type: "Full Time",
        experience: "2-4 Yrs",
        logo: "CP",
        featured: true,
    },
    {
        title: "Product Designer",
        company: "DesignHub",
        location: "Delhi",
        salary: "₹4 - ₹8 LPA",
        type: "Hybrid",
        experience: "1-3 Yrs",
        logo: "DH",
        featured: false,
    },
    {
        title: "Software Engineer",
        company: "InnovateX",
        location: "Chennai",
        salary: "₹6 - ₹11 LPA",
        type: "Full Time",
        experience: "2-5 Yrs",
        logo: "IX",
        featured: true,
    },
    {
        title: "HR Executive",
        company: "PeopleFirst",
        location: "Mumbai",
        salary: "₹3 - ₹5 LPA",
        type: "Full Time",
        experience: "1-2 Yrs",
        logo: "PF",
        featured: false,
    },
    {
        title: "Business Analyst",
        company: "NextGen",
        location: "Remote",
        salary: "₹5 - ₹9 LPA",
        type: "Remote",
        experience: "2-4 Yrs",
        logo: "NG",
        featured: true,
    },
];

function FeaturedJobs() {
    const [darkMode, setDarkMode] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState([]);

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

    const toggleBookmark = (index) => {
        setBookmarked((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index]
        );
    };

    return (
        <section
            className={`featured-jobs-section ${
                darkMode ? "featured-dark" : ""
            }`}
        >
            <div className="featured-container">

                {/* ================= HEADING ================= */}

                <div className="featured-heading">

                    <div className="heading-left">
                        <div className="section-label">
                            <span className="label-line"></span>
                            <FiBriefcase />
                            FEATURED OPPORTUNITIES
                        </div>

                        <h2>
                            Featured <span>Jobs</span>
                        </h2>

                        <p>
                            Explore top opportunities from companies
                            looking for talented people.
                        </p>
                    </div>

                    <button className="top-view-btn">
                        View All Jobs
                        <FiArrowUpRight />
                    </button>

                </div>

                {/* ================= JOB GRID ================= */}

                <div className="jobs-grid">

                    {jobs.map((job, index) => (
                        <article className="job-card" key={index}>

                            {/* Card Top */}
                            <div className="card-top">

                                <div className="company-logo">
                                    {job.logo}
                                </div>

                                <button
                                    className={`bookmark-btn ${
                                        bookmarked.includes(index)
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleBookmark(index)
                                    }
                                    aria-label="Bookmark job"
                                >
                                    <FiBookmark />
                                </button>

                            </div>

                            {/* Featured */}
                            {job.featured && (
                                <span className="featured-tag">
                                    Featured
                                </span>
                            )}

                            {/* Job Info */}
                            <div className="job-main">

                                <h3>{job.title}</h3>

                                <p className="company-name">
                                    {job.company}
                                </p>

                                <div className="job-details">

                                    <span>
                                        <FiMapPin />
                                        {job.location}
                                    </span>

                                    <span>
                                        <FiClock />
                                        {job.experience}
                                    </span>

                                </div>

                            </div>

                            {/* Bottom */}
                            <div className="job-footer">

                                <div className="salary">
                                    <FiDollarSign />
                                    <strong>{job.salary}</strong>
                                </div>

                                <span className="job-type">
                                    {job.type}
                                </span>

                            </div>

                            {/* Apply */}
                            <button className="apply-btn">
                                <span>Apply Now</span>
                                <span className="apply-icon">
                                    <FiArrowUpRight />
                                </span>
                            </button>

                        </article>
                    ))}

                </div>

                {/* ================= EXPLORE BUTTON ================= */}

                <div className="explore-wrapper">

                    <button className="explore-btn">

                        <span>
                            Explore More Jobs
                        </span>

                        <span className="explore-icon">
                            <FiArrowUpRight />
                        </span>

                    </button>

                </div>

            </div>
        </section>
    );
}

export default FeaturedJobs;