import React, { useEffect, useMemo, useState } from "react";
import {
    Award,
    BriefcaseBusiness,
    ExternalLink,
    FileText,

    Globe2,
    GraduationCap,

    MapPin,
    Pencil,
    Plus,
    Save,
    Sparkles,
    Upload,
    UserRound,
    X,
    Check,
} from "lucide-react";
import "./Profile.css";

const KEY = "hirenest-profile-page";

const blank = {
    name: "Your Name",
    stage: "Frontend Developer",
    location: "India",
    about: "Tell recruiters about yourself, what you enjoy building and the kind of opportunity you are looking for.",
    profileImage: "",
    openToWork: true,
    experience: { years: "", months: "" },
    education: { degree: "", field: "", institution: "", year: "", grade: "" },
    projects: [],
    skills: [],
    certifications: [],
    links: { linkedin: "", github: "", portfolio: "", resume: "" },
};

const stages = [
    "Full Stack Developer", "Frontend Developer", "Backend Developer",
    "UI/UX Designer", "Animation / Video Editor", "iOS Developer",
    "Android Developer", "Game Developer", "Data Analyst", "Data Scientist",
    "DevOps Engineer", "Cybersecurity", "Product Designer", "Digital Marketer",
    "Business Analyst",
];

function loadProfile() {
    try {
        const saved = JSON.parse(localStorage.getItem(KEY) || "null");
        if (!saved) return blank;
        return {
            ...blank,
            ...saved,
            experience: { ...blank.experience, ...(saved.experience || {}) },
            education: { ...blank.education, ...(saved.education || {}) },
            links: { ...blank.links, ...(saved.links || {}) },
            projects: Array.isArray(saved.projects) ? saved.projects : [],
            skills: Array.isArray(saved.skills) ? saved.skills : [],
            certifications: Array.isArray(saved.certifications) ? saved.certifications : [],
        };
    } catch {
        return blank;
    }
}

function Profile() {
    const [profile, setProfile] = useState(loadProfile);
    const [dark, setDark] = useState(localStorage.getItem("hirenest-theme") === "dark");
    const [editor, setEditor] = useState(null);
    const [toast, setToast] = useState(false);

    useEffect(() => {
        const sync = () => setDark(localStorage.getItem("hirenest-theme") === "dark");
        window.addEventListener("hirenest-theme-change", sync);
        return () => window.removeEventListener("hirenest-theme-change", sync);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("hirenest-dark", dark);
    }, [dark]);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(profile));
        window.dispatchEvent(new Event("hirenest-profile-update"));
    }, [profile]);

    useEffect(() => {
        document.body.style.overflow = editor ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [editor]);

    const completion = useMemo(() => {
        const items = [
            profile.profileImage,
            profile.name !== "Your Name" && profile.name,
            profile.stage,
            profile.about && !profile.about.startsWith("Tell recruiters"),
            profile.location,
            profile.experience.years || profile.experience.months,
            profile.education.degree,
            profile.projects.length,
            profile.skills.length,
            profile.certifications.length,
            profile.links.linkedin || profile.links.github || profile.links.portfolio || profile.links.resume,
        ];
        return Math.round((items.filter(Boolean).length / items.length) * 100);
    }, [profile]);

    

    const save = (next) => {
        setProfile(next);
        setEditor(null);
        setToast(true);
        window.setTimeout(() => setToast(false), 1600);
    };

    const uploadImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => save({ ...profile, profileImage: reader.result });
        reader.readAsDataURL(file);
    };

    const experienceText = profile.experience.years || profile.experience.months
        ? `${profile.experience.years || 0} yr${profile.experience.years === "1" ? "" : "s"}${profile.experience.months ? ` ${profile.experience.months} mo${profile.experience.months === "1" ? "" : "s"}` : ""}`
        : "Add experience";

    return (
        <div className={`hnp-page ${dark ? "hnp-dark" : "hnp-light"}`}>
            <div className="hnp-shell">
                <header className="hnp-page-head">
                    <div>
                        <span className="hnp-eyebrow">HIRENEST / MY PROFILE</span>
                        <h1>Your professional identity, in one place.</h1>
                        <p>Build a profile that is easy to understand for recruiters and useful across your HireNest career tools.</p>
                    </div>
                    <button className="hnp-main-btn" onClick={() => setEditor("about")}><Pencil size={15} /> Edit Profile</button>
                </header>

                <section className="hnp-hero">
                    <div className="hnp-hero-orb" />
                    <div className="hnp-hero-grid">
                        <div className="hnp-photo-col">
                            <div className="hnp-photo-box">
                                {profile.profileImage ? (
                                    <img src={profile.profileImage} alt={profile.name} />
                                ) : (
                                    <span className="hnp-default-avatar">
                                        <UserRound size={52} strokeWidth={1.7} />
                                    </span>
                                )}
                                <label className="hnp-photo-edit" title="Change profile picture">
                                    <Upload size={14} /><input type="file" accept="image/*" onChange={uploadImage} />
                                </label>
                            </div>
                            <small>PROFILE PHOTO</small>
                        </div>

                        <div className="hnp-identity">
                            <div className="hnp-open-line">
                                <span className="hnp-open"><i />{profile.openToWork ? "Open to work" : "Profile active"}</span>
                                <span>HIRENEST PROFESSIONAL PROFILE</span>
                            </div>
                            <h2>{profile.name}</h2>
                            <button className="hnp-stage" onClick={() => setEditor("about")}>{profile.stage}<Pencil size={13} /></button>
                            <div className="hnp-location"><MapPin size={14} /> {profile.location}</div>
                            <p className="hnp-about-preview">{profile.about}</p>
                            <div className="hnp-hero-links">
                                {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><span className="hnp-social-text">in</span> LinkedIn</a>}
                                {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer"><span className="hnp-social-text hnp-social-gh">GH</span> GitHub</a>}
                                {profile.links.portfolio && <a href={profile.links.portfolio} target="_blank" rel="noreferrer"><Globe2 size={14} /> Portfolio</a>}
                                {profile.links.resume && <a href={profile.links.resume} target="_blank" rel="noreferrer"><FileText size={14} /> Resume</a>}
                            </div>
                        </div>

                        <div className="hnp-strength">
                            <div className="hnp-ring" style={{ "--progress": `${completion * 3.6}deg` }}>
                                <div><strong>{completion}%</strong><span>Complete</span></div>
                            </div>
                            <small>PROFILE STRENGTH</small>
                            <p>{completion >= 80 ? "Recruiter-ready" : "Keep building your profile"}</p>
                        </div>
                    </div>
                </section>

                <div className="hnp-layout">
                    <main>
                        <Section number="01" icon={<Sparkles size={15} />} title="About"
                            text={profile.about} edit={() => setEditor("about")} />

                        <Section number="02" icon={<BriefcaseBusiness size={15} />} title="Experience"
                            text={experienceText} edit={() => setEditor("experience")} />

                        <Section number="03" icon={<GraduationCap size={15} />} title="Education"
                            text={profile.education.degree ? `${profile.education.degree}${profile.education.field ? ` • ${profile.education.field}` : ""}` : "Add degree, field and completion details."}
                            sub={profile.education.institution ? `${profile.education.institution}${profile.education.year ? ` • ${profile.education.year}` : ""}` : ""}
                            edit={() => setEditor("education")} />

                        <Section number="04" icon={<ArrowIcon />} title="Projects"
                            text={profile.projects.length ? `${profile.projects.length} project${profile.projects.length === 1 ? "" : "s"} added` : "Add a project name, link and description."}
                            edit={() => setEditor("projects")}>
                            {profile.projects.map((p, i) => (
                                <div className="hnp-project-row" key={i}>
                                    <div><strong>{p.title}</strong><p>{p.description}</p></div>
                                    {p.link && <a href={p.link} target="_blank" rel="noreferrer"><ExternalLink size={14} /></a>}
                                </div>
                            ))}
                        </Section>

                        <Section number="05" icon={<Check size={15} />} title="Skills"
                            text={profile.skills.length ? `${profile.skills.length} skills added` : "Add only the skills you actually have."}
                            edit={() => setEditor("skills")}>
                            <div className="hnp-skill-list">{profile.skills.map((s, i) => <span key={`${s}-${i}`}>{s}</span>)}</div>
                        </Section>

                        <Section number="06" icon={<Award size={15} />} title="Certifications"
                            text={profile.certifications.length ? `${profile.certifications.length} certification${profile.certifications.length === 1 ? "" : "s"} added` : "Add certification and credential details."}
                            edit={() => setEditor("certifications")} />

                        <Section number="07" icon={<Globe2 size={15} />} title="Professional Links"
                            text={profile.links.linkedin || profile.links.github || profile.links.portfolio || profile.links.resume ? "Your professional links are connected." : "LinkedIn, GitHub, portfolio and resume."}
                            edit={() => setEditor("links")} />
                    </main>

                    <aside className="hnp-sidebar">
                        <div className="hnp-side-card">
                            <span className="hnp-side-label">PROFILE STRENGTH</span>
                            <div className="hnp-progress"><span style={{ width: `${completion}%` }} /></div>
                            <strong>{completion}% complete</strong>
                            <p>{completion >= 80 ? "Your profile is in a strong place." : "Add a few more details to make your profile stronger."}</p>
                        </div>
                        <div className="hnp-side-card">
                            <span className="hnp-side-label">SNAPSHOT</span>
                            <div className="hnp-snap"><span>Stage</span><b>{profile.stage}</b></div>
                            <div className="hnp-snap"><span>Experience</span><b>{experienceText}</b></div>
                            <div className="hnp-snap"><span>Skills</span><b>{profile.skills.length}</b></div>
                            <div className="hnp-snap"><span>Projects</span><b>{profile.projects.length}</b></div>
                        </div>
                        <div className="hnp-side-card hnp-note-card">
                            <Sparkles size={18} />
                            <div><strong>One profile, many opportunities.</strong><p>This profile can power Career Match, Smart Job Radar and future resume tools.</p></div>
                        </div>
                    </aside>
                </div>
            </div>

            {toast && <div className="hnp-toast"><Check size={14} /> Changes saved</div>}
            {editor && <Editor type={editor} profile={profile} onClose={() => setEditor(null)} onSave={save} />}
        </div>
    );
}

function ArrowIcon() { return <span className="hnp-arrow-icon">↗</span>; }

function Section({ number, icon, title, text, sub, edit, children }) {
    return (
        <section className="hnp-section">
            <div className="hnp-section-head">
                <div className="hnp-section-title"><span>{number}</span><i>{icon}</i><div><h3>{title}</h3>{sub && <small>{sub}</small>}</div></div>
                <button onClick={edit}><Pencil size={13} /> Edit</button>
            </div>
            <p className="hnp-section-text">{text}</p>
            {children}
        </section>
    );
}

function Modal({ eyebrow, title, desc, children, onClose, onSave }) {
    return (
        <div className="hnp-modal-bg" onMouseDown={onClose}>
            <div className="hnp-modal" onMouseDown={e => e.stopPropagation()}>
                <header className="hnp-modal-head"><div><span>{eyebrow}</span><h2>{title}</h2><p>{desc}</p></div><button onClick={onClose}><X size={18} /></button></header>
                <div className="hnp-modal-body">{children}</div>
                <footer><button className="hnp-cancel" onClick={onClose}>Cancel</button><button className="hnp-save" onClick={onSave}><Save size={14} /> Save Changes</button></footer>
            </div>
        </div>
    );
}

function Field({ label, children, full }) {
    return <div className={`hnp-field ${full ? "full" : ""}`}><label>{label}</label>{children}</div>;
}

function Editor({ type, profile, onClose, onSave }) {
    if (type === "about") return <AboutEditor profile={profile} onClose={onClose} onSave={onSave} />;
    if (type === "experience") return <ExperienceEditor profile={profile} onClose={onClose} onSave={onSave} />;
    if (type === "education") return <EducationEditor profile={profile} onClose={onClose} onSave={onSave} />;
    if (type === "projects") return <ProjectsEditor profile={profile} onClose={onClose} onSave={onSave} />;
    if (type === "skills") return <SkillsEditor profile={profile} onClose={onClose} onSave={onSave} />;
    if (type === "certifications") return <CertEditor profile={profile} onClose={onClose} onSave={onSave} />;
    return <LinksEditor profile={profile} onClose={onClose} onSave={onSave} />;
}

function AboutEditor({ profile, onClose, onSave }) {
    const [f, setF] = useState({ name: profile.name, stage: profile.stage, custom: "", location: profile.location, about: profile.about, openToWork: profile.openToWork });
    const custom = !stages.includes(profile.stage) || f.custom;
    const stage = f.custom.trim() || f.stage;
    return <Modal eyebrow="01 / ABOUT" title="Tell your story." desc="Your name, professional stage and introduction appear directly in your profile header." onClose={onClose} onSave={() => onSave({ ...profile, name: f.name.trim() || "Your Name", stage: stage || "Frontend Developer", location: f.location.trim() || "India", about: f.about.trim() || blank.about, openToWork: f.openToWork })}>
        <div className="hnp-form-grid">
            <Field label="Your name"><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Your full name" /></Field>
            <Field label="Professional stage"><select value={custom ? "__custom__" : f.stage} onChange={e => setF({ ...f, stage: e.target.value, custom: e.target.value === "__custom__" ? "" : f.custom })}>{stages.map(s => <option key={s}>{s}</option>)}<option value="__custom__">Add another stage...</option></select>{custom && <input className="hnp-custom-stage" value={f.custom} onChange={e => setF({ ...f, custom: e.target.value })} placeholder="e.g. Motion Designer" />}</Field>
            <Field label="Location"><input value={f.location} onChange={e => setF({ ...f, location: e.target.value })} placeholder="City, Country" /></Field>
            <label className="hnp-check"><input type="checkbox" checked={f.openToWork} onChange={e => setF({ ...f, openToWork: e.target.checked })} /><span />Open to work</label>
            <Field label="About yourself" full><textarea rows="7" value={f.about} onChange={e => setF({ ...f, about: e.target.value })} placeholder="Write a paragraph about yourself, your strengths, interests, what you build and what opportunity you want..." /></Field>
        </div>
    </Modal>;
}

function ExperienceEditor({ profile, onClose, onSave }) {
    const [f, setF] = useState(profile.experience);
    return <Modal eyebrow="02 / EXPERIENCE" title="How much experience do you have?" desc="Only your total experience duration is stored in this section." onClose={onClose} onSave={() => onSave({ ...profile, experience: { years: f.years.replace(/\D/g, "").slice(0, 2), months: f.months.replace(/\D/g, "").slice(0, 2) } })}>
        <div className="hnp-exp-box"><div><small>YEARS</small><input inputMode="numeric" value={f.years} onChange={e => setF({ ...f, years: e.target.value })} placeholder="0" /></div><strong>+</strong><div><small>MONTHS</small><input inputMode="numeric" value={f.months} onChange={e => setF({ ...f, months: e.target.value })} placeholder="0" /></div></div>
        <div className="hnp-help"><BriefcaseBusiness size={16} />Example: 2 years + 4 months</div>
    </Modal>;
}

function EducationEditor({ profile, onClose, onSave }) {
    const [f, setF] = useState(profile.education);
    return <Modal eyebrow="03 / EDUCATION" title="Show your academic path." desc="Add the qualification details recruiters actually need." onClose={onClose} onSave={() => onSave({ ...profile, education: f })}>
        <div className="hnp-form-grid">
            <Field label="Degree"><input value={f.degree} onChange={e => setF({ ...f, degree: e.target.value })} placeholder="e.g. B.Tech" /></Field>
            <Field label="Field"><input value={f.field} onChange={e => setF({ ...f, field: e.target.value })} placeholder="e.g. Computer Engineering" /></Field>
            <Field label="College / University" full><input value={f.institution} onChange={e => setF({ ...f, institution: e.target.value })} placeholder="Institution name" /></Field>
            <Field label="Degree completion year"><input inputMode="numeric" value={f.year} onChange={e => setF({ ...f, year: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="2026" /></Field>
            <Field label="Grade / CGPA"><input value={f.grade} onChange={e => setF({ ...f, grade: e.target.value })} placeholder="Optional" /></Field>
        </div>
    </Modal>;
}

function ProjectsEditor({ profile, onClose, onSave }) {
    const [items, setItems] = useState(profile.projects.length ? profile.projects : [{ title: "", link: "", description: "" }]);
    const update = (i, key, value) => setItems(items.map((x, n) => n === i ? { ...x, [key]: value } : x));
    return <Modal eyebrow="04 / PROJECTS" title="Show what you built." desc="Each project only needs a name, link and description." onClose={onClose} onSave={() => onSave({ ...profile, projects: items.filter(x => x.title.trim() || x.description.trim()) })}>
        <div className="hnp-list">{items.map((p, i) => <div className="hnp-entry" key={i}><div className="hnp-entry-top"><b>PROJECT {String(i + 1).padStart(2, "0")}</b>{items.length > 1 && <button onClick={() => setItems(items.filter((_, n) => n !== i))}><X size={14} /></button>}</div><div className="hnp-form-grid"><Field label="Project name"><input value={p.title} onChange={e => update(i, "title", e.target.value)} placeholder="e.g. HireNest" /></Field><Field label="Project link"><input value={p.link} onChange={e => update(i, "link", e.target.value)} placeholder="https://..." /></Field><Field label="Description" full><textarea rows="4" value={p.description} onChange={e => update(i, "description", e.target.value)} placeholder="What does the project do? What did you build?" /></Field></div></div>)}</div>
        <button className="hnp-add-btn" onClick={() => setItems([...items, { title: "", link: "", description: "" }])}><Plus size={14} /> Add another project</button>
    </Modal>;
}

function SkillsEditor({ profile, onClose, onSave }) {
    const [skills, setSkills] = useState(profile.skills); const [value, setValue] = useState("");
    const add = () => { const v = value.trim(); if (!v) return; if (!skills.some(s => s.toLowerCase() === v.toLowerCase())) setSkills([...skills, v]); setValue(""); };
    return <Modal eyebrow="05 / SKILLS" title="Keep your skills focused." desc="Add only the skills you genuinely have." onClose={onClose} onSave={() => onSave({ ...profile, skills })}>
        <div className="hnp-skill-entry"><input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Type a skill and press Enter" /><button onClick={add}><Plus size={14} /> Add</button></div>
        <div className="hnp-edit-skills">{skills.map((s, i) => <span key={`${s}-${i}`}>{s}<button onClick={() => setSkills(skills.filter((_, n) => n !== i))}>×</button></span>)}</div>
    </Modal>;
}

function CertEditor({ profile, onClose, onSave }) {
    const [items, setItems] = useState(profile.certifications.length ? profile.certifications : [{ title: "", issuer: "", year: "", link: "" }]);
    const update = (i, key, value) => setItems(items.map((x, n) => n === i ? { ...x, [key]: value } : x));
    return <Modal eyebrow="06 / CERTIFICATIONS" title="Back your skills with proof." desc="Add certificate information and its credential link." onClose={onClose} onSave={() => onSave({ ...profile, certifications: items.filter(x => x.title.trim()) })}>
        <div className="hnp-list">{items.map((c, i) => <div className="hnp-entry" key={i}><div className="hnp-entry-top"><b>CERTIFICATION {String(i + 1).padStart(2, "0")}</b>{items.length > 1 && <button onClick={() => setItems(items.filter((_, n) => n !== i))}><X size={14} /></button>}</div><div className="hnp-form-grid"><Field label="Certification"><input value={c.title} onChange={e => update(i, "title", e.target.value)} placeholder="e.g. React Developer" /></Field><Field label="Issuing organization"><input value={c.issuer} onChange={e => update(i, "issuer", e.target.value)} placeholder="Organization" /></Field><Field label="Year"><input value={c.year} onChange={e => update(i, "year", e.target.value)} placeholder="2026" /></Field><Field label="Credential link"><input value={c.link} onChange={e => update(i, "link", e.target.value)} placeholder="https://..." /></Field></div></div>)}</div>
        <button className="hnp-add-btn" onClick={() => setItems([...items, { title: "", issuer: "", year: "", link: "" }])}><Plus size={14} /> Add another certification</button>
    </Modal>;
}

function LinksEditor({ profile, onClose, onSave }) {
    const [f, setF] = useState(profile.links);
    const item = (icon, label, key, placeholder) => <div className="hnp-link-input"><div className="hnp-link-icon">{icon}</div><div><b>{label}</b><small>Professional link</small></div><input value={f[key]} onChange={e => setF({ ...f, [key]: e.target.value })} placeholder={placeholder} /></div>;
    return <Modal eyebrow="07 / PROFESSIONAL LINKS" title="Connect your professional world." desc="Keep LinkedIn, GitHub, portfolio and resume links together." onClose={onClose} onSave={() => onSave({ ...profile, links: f })}>
        <div className="hnp-link-stack">
            {item(<span className="hnp-social-text">in</span>, "LinkedIn", "linkedin", "https://linkedin.com/in/...")}
            {item(<span className="hnp-social-text hnp-social-gh">GH</span>, "GitHub", "github", "https://github.com/...")}
            {item(<Globe2 size={16} />, "Portfolio", "portfolio", "https://yourportfolio.com")}
            {item(<FileText size={16} />, "Resume", "resume", "https://.../resume.pdf")}
        </div>
    </Modal>;
}

export default Profile;
