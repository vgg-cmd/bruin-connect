import { useState, useEffect, useRef } from "react";

const COLORS = {
  uclaBlue: "#2774AE",
  uclaGold: "#FFD100",
  white: "#FFFFFF",
  black: "#000000",
  darkestBlue: "#003B5C",
  darkerBlue: "#005587",
  lighterBlue: "#8BB8E8",
  lightestBlue: "#DAEBFE",
  darkestGold: "#FFB81C",
  darkerGold: "#FFC72C",
  goldTint: "rgba(255, 209, 0, 0.13)",
  goldBorder: "rgba(255, 209, 0, 0.65)",
};

const STEPS = { WELCOME: "welcome", NAME: "name", GRAD_YEAR: "grad_year", DEGREE: "degree", IDENTITY: "identity", LOCATION: "location", INTERESTS: "interests", CAREER: "career", RESULTS: "results" };

const IDENTITY_OPTIONS = [
  { id: "black", label: "Black / African American" },
  { id: "latino", label: "Latino / Hispanic" },
  { id: "asian_pacific", label: "Asian / Pacific Islander" },
  { id: "pilipino", label: "Pilipino / Filipino" },
  { id: "american_indian", label: "American Indian / Native" },
  { id: "mixed", label: "Multiracial / Mixed" },
  { id: "lgbtq", label: "LGBTQ+" },
  { id: "muslim", label: "Muslim" },
  { id: "jewish", label: "Jewish" },
  { id: "first_gen", label: "First-Generation Grad" },
  { id: "transfer", label: "Transfer Student" },
  { id: "undocumented", label: "Undocumented" },
  { id: "veteran", label: "Veteran / Military" },
  { id: "disability", label: "Disability Community" },
  { id: "grad_professional", label: "Graduate / Professional Degree" },
  { id: "none", label: "Prefer not to say / None" },
];

const LOCATION_OPTIONS = [
  { id: "la_westside", label: "LA Westside" },
  { id: "la_downtown", label: "LA Downtown" },
  { id: "la_southeast", label: "LA Southeast" },
  { id: "san_fernando", label: "San Fernando Valley" },
  { id: "south_bay", label: "South Bay" },
  { id: "beachside", label: "Beachside" },
  { id: "century_city", label: "Century City" },
  { id: "orange_county", label: "Orange County" },
  { id: "inland_empire", label: "Inland Empire" },
  { id: "san_diego", label: "San Diego" },
  { id: "bay_area", label: "Bay Area / NorCal" },
  { id: "sacramento", label: "Sacramento" },
  { id: "central_valley", label: "Central Valley" },
  { id: "seattle", label: "Seattle / PNW" },
  { id: "colorado", label: "Colorado" },
  { id: "arizona", label: "Arizona" },
  { id: "ny_tristate", label: "New York Tri-State" },
  { id: "dc", label: "Washington D.C." },
  { id: "chicago", label: "Chicago" },
  { id: "atlanta", label: "Atlanta" },
  { id: "dallas", label: "Dallas / Texas" },
  { id: "hawaii", label: "Hawaii" },
  { id: "international", label: "International" },
  { id: "other_us", label: "Other U.S. location" },
];

const INTEREST_OPTIONS = [
  { id: "career_growth", label: "Career Growth & Networking", icon: "💼" },
  { id: "mentorship", label: "Mentoring or Being Mentored", icon: "🧭" },
  { id: "entrepreneurship", label: "Entrepreneurship & Startups", icon: "🚀" },
  { id: "entertainment", label: "Entertainment & Media", icon: "🎬" },
  { id: "community", label: "Community & Social Events", icon: "🎉" },
  { id: "sports", label: "Bruin Sports & Game Watches", icon: "🏈" },
  { id: "travel", label: "Alumni Travel", icon: "✈️" },
  { id: "giving_back", label: "Volunteering & Giving Back", icon: "❤️" },
  { id: "lifelong_learning", label: "Lifelong Learning & Lectures", icon: "📚" },
  { id: "arts_culture", label: "Arts & Culture", icon: "🎨" },
  { id: "health_wellness", label: "Health & Wellness", icon: "🧘" },
  { id: "food_culture", label: "Food & Dining", icon: "🍽️" },
];

const CAREER_OPTIONS = [
  { id: "job_searching", label: "Actively job searching", icon: "🔍" },
  { id: "early_career", label: "Building my early career", icon: "📈" },
  { id: "switching", label: "Considering a career switch", icon: "🔀" },
  { id: "grad_school", label: "Going to grad / professional school", icon: "🎓" },
  { id: "entrepreneur", label: "Starting my own thing", icon: "💡" },
  { id: "settled", label: "Feeling good where I am", icon: "✅" },
];

const DEGREE_OPTIONS = [
  { id: "bachelors", label: "Bachelor's", icon: "📜" },
  { id: "masters", label: "Master's", icon: "📖" },
  { id: "phd", label: "PhD / Doctorate", icon: "🔬" },
  { id: "professional", label: "Professional (JD, MD, MBA)", icon: "⚖️" },
  { id: "certificate", label: "Certificate", icon: "📋" },
];

function getRecommendations({ identity, location, interests, career, gradYear }) {
  const recs = [];

  // Class year page (2022–2025)
  const yr = parseInt(gradYear);
  if (yr >= 2022 && yr <= 2025) {
    recs.push({ name: `Class of ${gradYear}`, url: `https://alumni.ucla.edu/class-of-${gradYear}/`, desc: `Your class page — events, updates, and connections for the Class of ${gradYear}.`, tag: "your class", icon: "🎓" });
  }

  const IN = {
    black: { name: "Black Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/black-alumni-association-2/", desc: "Events, networking, and cultural celebrations with the BAA community.", tag: "diversity network", icon: "✊🏿" },
    latino: { name: "Latino Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/latino-alumni-network/", desc: "Community events, EmPower Hour book talks, and cultural programming.", tag: "diversity network", icon: "🌎" },
    asian_pacific: { name: "Asian Pacific Alumni", url: "https://alumni.ucla.edu/alumni-networks/apaucla/", desc: "Networking and cultural events for Asian and Pacific Islander Bruins.", tag: "diversity network", icon: "🌏" },
    pilipino: { name: "Pilipino Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/pilipino-alumni-association/", desc: "Events and mentorship with the Pilipino Bruin community.", tag: "diversity network", icon: "🇵🇭" },
    american_indian: { name: "American Indian Alumni", url: "https://alumni.ucla.edu/alumni-networks/aiaucla/", desc: "Cultural events and community programming for Indigenous Bruins.", tag: "diversity network", icon: "🪶" },
    mixed: { name: "Mixed Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/mixed-alumni-association/", desc: "Community for multiracial and mixed-heritage Bruins.", tag: "diversity network", icon: "🤝" },
    lgbtq: { name: "Lambda Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/lambda-alumni/", desc: "Social events, pride celebrations, and community building for LGBTQ+ Bruins.", tag: "diversity network", icon: "🏳️‍🌈" },
    muslim: { name: "Muslim Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/ucla-muslim-alumni-association/", desc: "Faith-based and cultural community programming for Muslim Bruins.", tag: "diversity network", icon: "☪️" },
    first_gen: { name: "First Gen Alumni Network", url: "https://alumni.ucla.edu/alumni-networks/first-gen-alumni-network/", desc: "Mentorship, resources, and community for first-generation grads.", tag: "affinity network", icon: "⭐" },
    transfer: { name: "Transfer Student Alumni Network", url: "https://alumni.ucla.edu/alumni-networks/transfer-student-alumni-network/", desc: "Connect with Bruins who share your transfer journey.", tag: "affinity network", icon: "🔄" },
    undocumented: { name: "Undocumented Alumni Association", url: "https://alumni.ucla.edu/alumni-networks/undocumented/", desc: "A supportive network for undocumented and DACAmented Bruins.", tag: "diversity network", icon: "💛" },
    veteran: { name: "VetNet", url: "https://alumni.ucla.edu/alumni-networks/ucla-alumni-veterans-network-vetnet/", desc: "Career resources, community events, and networking for Bruin veterans.", tag: "affinity network", icon: "🎖️" },
    disability: { name: "Disability Alumni Network", url: "https://alumni.ucla.edu/alumni-networks/udan/", desc: "Advocacy and connection for Bruins in the disability community.", tag: "affinity network", icon: "♿" },
    grad_professional: { name: "Graduate & Professional Student Alumni", url: "https://alumni.ucla.edu/alumni-networks/affinity-networks/", desc: "Networking tailored to graduate and professional degree holders.", tag: "affinity network", icon: "🎓" },
  };
  identity.forEach((id) => { if (IN[id]) recs.push(IN[id]); });

  const LN = {
    la_westside: { name: "LA Westside Network", url: "https://alumni.ucla.edu/alumni-networks/los-angeles-westside-network/" },
    la_downtown: { name: "LA Downtown Network", url: "https://alumni.ucla.edu/alumni-networks/los-angeles-downtown-network/" },
    la_southeast: { name: "LA Southeast Network", url: "https://alumni.ucla.edu/alumni-networks/los-angeles-southeast-network/" },
    san_fernando: { name: "San Fernando Valley Network", url: "https://alumni.ucla.edu/alumni-networks/san-fernando-valley-network/" },
    south_bay: { name: "South Bay Network", url: "https://alumni.ucla.edu/alumni-networks/bay-cities-network/" },
    beachside: { name: "Beachside Network", url: "https://alumni.ucla.edu/alumni-networks/beachside-network/" },
    century_city: { name: "Century City Network", url: "https://alumni.ucla.edu/alumni-networks/regional-networks/" },
    orange_county: { name: "Orange County Network", url: "https://alumni.ucla.edu/alumni-networks/orange-county-network/" },
    inland_empire: { name: "Inland Empire Network", url: "https://alumni.ucla.edu/alumni-networks/inland-empire-network/" },
    san_diego: { name: "San Diego Network", url: "https://alumni.ucla.edu/alumni-networks/san-diego-network/" },
    bay_area: { name: "Bay Area Network", url: "https://alumni.ucla.edu/alumni-networks/san-francisco-bay-area-network/" },
    sacramento: { name: "Sacramento Network", url: "https://alumni.ucla.edu/alumni-networks/sacramento-network/" },
    central_valley: { name: "Central Valley Network", url: "https://alumni.ucla.edu/alumni-networks/central-valley-network/" },
    seattle: { name: "Seattle Network", url: "https://alumni.ucla.edu/alumni-networks/seattle-network/" },
    colorado: { name: "Colorado Network", url: "https://alumni.ucla.edu/alumni-networks/colorado-network/" },
    arizona: { name: "Arizona Network", url: "https://alumni.ucla.edu/alumni-networks/arizona-network/" },
    ny_tristate: { name: "New York Tri-State Network", url: "https://alumni.ucla.edu/alumni-networks/new-york-tri-state-network/" },
    dc: { name: "Washington D.C. Network", url: "https://alumni.ucla.edu/alumni-networks/washington-d-c-area-network/" },
    chicago: { name: "Chicago Network", url: "https://alumni.ucla.edu/alumni-networks/chicago-network/" },
    atlanta: { name: "Atlanta Network", url: "https://alumni.ucla.edu/alumni-networks/atlanta-network/" },
    dallas: { name: "Dallas-Fort Worth Network", url: "https://alumni.ucla.edu/alumni-networks/dallas-fort-worth-network/" },
    hawaii: { name: "Hawaii Network", url: "https://alumni.ucla.edu/alumni-networks/hawaii-network/" },
    international: { name: "International Networks", url: "https://alumni.ucla.edu/alumni-networks/regional-networks/#international" },
    other_us: { name: "Regional Networks", url: "https://alumni.ucla.edu/alumni-networks/regional-networks/" },
  };
  if (LN[location]) recs.push({ ...LN[location], desc: "Your local Bruin hub — game watches, networking nights, and community events near you.", tag: "regional network", icon: "📍" });

  // === INTEREST-BASED RESOURCES ===
  if (interests.includes("career_growth") || interests.includes("mentorship")) {
    recs.push({ name: "Alumni Career Engagement", url: "https://alumni.ucla.edu/alumni-career-engagement/", desc: "Resume reviews, career coaching, job boards, and professional development.", tag: "career", icon: "💼" });
    recs.push({ name: "UCLA ONE Platform", url: "https://alumni.ucla.edu/ucla-one/about-us/", desc: "UCLA's official networking and career platform — jobs, mentors, connections.", tag: "career", icon: "🔗" });
    recs.push({ name: "Bruin Professionals Network", url: "https://alumni.ucla.edu/alumni-networks/professional-networks/", desc: "Professional networking events, panels, and workshops for career-focused Bruins.", tag: "professional network", icon: "🤝" });
  }
  if (interests.includes("mentorship")) {
    recs.push({ name: "Alumni Mentor Program", url: "https://alumni.ucla.edu/alumni-mentor-program/", desc: "Get paired with an experienced Bruin mentor — or mentor someone new.", tag: "mentorship", icon: "🧭" });
    recs.push({ name: "Internship Alumni Network", url: "https://alumni.ucla.edu/alumni-networks/internship-alumni-network/", desc: "Supporting student career development through internships and mentoring.", tag: "affinity network", icon: "📋" });
  }
  if (interests.includes("entrepreneurship")) {
    recs.push({ name: "Bruin Angels Investor Network", url: "https://alumni.ucla.edu/bruin-angels-investor-network/", desc: "Angel investing, startup support, and connecting Bruin entrepreneurs.", tag: "professional network", icon: "🚀" });
    recs.push({ name: "Bruin Business Directory", url: "https://alumni.ucla.edu/bruin-business-directory/", desc: "List your business and discover Bruin-owned companies.", tag: "entrepreneurship", icon: "📋" });
  }
  if (interests.includes("entertainment")) {
    recs.push({ name: "Theater, Film & Television Alumni Network", url: "https://alumni.ucla.edu/alumni-networks/professional-networks/", desc: "Connect with Bruins in film, TV, theater, music, gaming, and media.", tag: "professional network", icon: "🎬" });
  }
  if (interests.includes("sports")) {
    recs.push({ name: "UCLA Sports & Game Watches", url: "https://alumni.ucla.edu/ucla-sports/", desc: "Cheer on the Bruins, find local watch parties, and relive the rivalry.", tag: "sports", icon: "🏈" });
    recs.push({ name: "Bruin Varsity Club", url: "https://alumni.ucla.edu/bruin-varsity", desc: "Connecting former student-athletes, trainers, managers, and spirit squad members.", tag: "affinity network", icon: "🏅" });
  }
  if (interests.includes("community")) {
    recs.push({ name: "Dinners for 12", url: "https://alumni.ucla.edu/events-calendar/category/dinners-for-12", desc: "Intimate dinner gatherings with 12 Bruins — real connections, real conversations.", tag: "social", icon: "🍽️" });
    recs.push({ name: "Events Calendar", url: "https://alumni.ucla.edu/events-calendar/", desc: "Browse all upcoming alumni events — mixers, panels, game watches, and more.", tag: "events", icon: "📅" });
    recs.push({ name: "Order of the Blue Shield", url: "https://alumni.ucla.edu/alumni-networks/order-of-the-blue-shield/", desc: "A historic alumni organization dedicated to furthering UCLA's interests and welfare.", tag: "affinity network", icon: "🛡️" });
  }
  if (interests.includes("travel")) {
    recs.push({ name: "Alumni Travel", url: "https://alumni.ucla.edu/travel/", desc: "Explore the world with fellow Bruins on curated group adventures.", tag: "travel", icon: "✈️" });
  }
  if (interests.includes("giving_back")) {
    recs.push({ name: "Volunteer with UCLA Alumni", url: "https://alumni.ucla.edu/get-involved/", desc: "Give back through mentoring, event hosting, scholarships, and service.", tag: "volunteer", icon: "❤️" });
    recs.push({ name: "Bruin Promise", url: "https://alumni.ucla.edu/bruin-promise/", desc: "UCLA's commitment to being there for Bruins at every stage of life.", tag: "community", icon: "🤞" });
    recs.push({ name: "Gold Shield Alumnae", url: "https://alumni.ucla.edu/alumni-networks/gold-shield-alumnae-network/", desc: "Distinguished alumnae advancing the university through philanthropy, mentorship, and service.", tag: "affinity network", icon: "🏆" });
  }
  if (interests.includes("lifelong_learning")) {
    recs.push({ name: "Lifelong Learning", url: "https://alumni.ucla.edu/events-calendar/category/lifelong-learning", desc: "Lectures, book talks, and intellectual programming.", tag: "learning", icon: "📚" });
    recs.push({ name: "Bruin Success Podcast", url: "https://alumni.ucla.edu/bruin-success-podcast/", desc: "Inspiring stories from Bruins making their mark across industries.", tag: "learning", icon: "🎙️" });
    recs.push({ name: "Town & Gown Affiliates", url: "https://alumni.ucla.edu/alumni-networks/the-affiliates-network/", desc: "Lunch and dinner events featuring distinguished faculty lecturers and speakers.", tag: "affinity network", icon: "🎓" });
  }
  if (interests.includes("arts_culture")) {
    recs.push({ name: "Arts & Culture Events", url: "https://alumni.ucla.edu/events-calendar/category/arts-culture", desc: "Gallery tours, performances, film screenings, and creative community.", tag: "arts", icon: "🎨" });
    recs.push({ name: "Daily Bruin Alumni Network", url: "https://alumni.ucla.edu/alumni-networks/daily-bruin-alumni-network/", desc: "Community for former Daily Bruin staff — networking, mentorship, and scholarships.", tag: "affinity network", icon: "📰" });
  }
  if (interests.includes("food_culture")) {
    recs.push({ name: "Food & Culture Events", url: "https://alumni.ucla.edu/events-calendar/category/food-culture", desc: "Culinary experiences, Bruin-owned restaurant spotlights, and food networking.", tag: "food & culture", icon: "🍜" });
  }

  // === CAREER-STAGE RESOURCES ===
  if (career === "job_searching" || career === "early_career") {
    if (!recs.find((r) => r.name === "Alumni Career Engagement")) recs.push({ name: "Alumni Career Engagement", url: "https://alumni.ucla.edu/alumni-career-engagement/", desc: "Resume reviews, career coaching, job boards, and professional development.", tag: "career", icon: "💼" });
    if (!recs.find((r) => r.name === "Bruin Professionals Network")) recs.push({ name: "Bruin Professionals Network", url: "https://alumni.ucla.edu/alumni-networks/professional-networks/", desc: "Professional networking events, panels, and workshops.", tag: "professional network", icon: "🤝" });
  }
  if (career === "switching") recs.push({ name: "2nd Act Programming", url: "https://alumni.ucla.edu/events-calendar/category/2nd-act", desc: "For Bruins reinventing their careers — workshops, stories, and support.", tag: "career transition", icon: "🔀" });
  if (career === "grad_school") recs.push({ name: "Professional Programs & Services", url: "https://alumni.ucla.edu/professional-programs-and-services/", desc: "Continuing education, certificates, and development through UCLA.", tag: "education", icon: "🎓" });

  // Always include
  recs.push({ name: "Bruin Stories", url: "https://alumni.ucla.edu/storyof/", desc: "Read inspiring stories from the Bruin community — and share your own.", tag: "community", icon: "📖" });

  const seen = new Set();
  return recs.filter((r) => { if (seen.has(r.name)) return false; seen.add(r.name); return true; });
}

// ─── LOGO ───
function UCLAAlumLogo({ size = "small" }) {
  const s = size === "large" ? 1.4 : size === "medium" ? 1 : 0.7;
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <div style={{ background: COLORS.uclaBlue, padding: `${3*s}px ${6*s}px`, display: "flex", alignItems: "center" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: `${16*s}px`, color: COLORS.white, letterSpacing: "-0.02em" }}>UCLA</span>
      </div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: `${16*s}px`, color: COLORS.black, marginLeft: `${5*s}px` }}>alum</span>
    </div>
  );
}

// ─── CHAT COMPONENTS ───
function BotMessage({ text, children, animate }) {
  const [visible, setVisible] = useState(!animate);
  useEffect(() => { if (animate) { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t); } }, [animate]);
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)", marginBottom: 20 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.uclaBlue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 2px 8px rgba(39,116,174,0.25)" }}>
        🐻
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {text && <div style={{ background: COLORS.lightestBlue, borderRadius: "2px 16px 16px 16px", padding: "14px 18px", fontSize: 15, lineHeight: 1.6, color: COLORS.black, fontFamily: "'Inter', sans-serif", textAlign: "left" }}>{text}</div>}
        {children && <div style={{ marginTop: text ? 14 : 0, textAlign: "left" }}>{children}</div>}
      </div>
    </div>
  );
}

function UserBubble({ text }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18, animation: "slideRight 0.3s ease-out" }}>
      <div style={{ background: COLORS.darkerBlue, color: COLORS.white, borderRadius: "16px 2px 16px 16px", padding: "11px 18px", fontSize: 15, maxWidth: "75%", lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>{text}</div>
    </div>
  );
}

function OptionGrid({ options, selected, onToggle, multi = true, columns = 2 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8, maxWidth: 520 }}>
      {options.map((opt) => {
        const isSelected = multi ? selected.includes(opt.id) : selected === opt.id;
        return (
          <button key={opt.id} onClick={() => onToggle(opt.id)} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "11px 13px", borderRadius: 8,
            border: isSelected ? `2px solid ${COLORS.goldBorder}` : "2px solid #D4D9E1",
            background: isSelected ? COLORS.goldTint : COLORS.white,
            cursor: "pointer", fontSize: 13,
            fontFamily: "'Inter', sans-serif",
            color: isSelected ? COLORS.darkestBlue : "#2D3748",
            fontWeight: isSelected ? 600 : 400,
            transition: "all 0.15s ease", textAlign: "left", lineHeight: 1.3,
          }}>
            {opt.icon && <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1 }}>{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function BrandButton({ onClick, disabled, label = "continue", gold = false }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      marginTop: 14, padding: "11px 30px", borderRadius: 6, border: "none",
      background: disabled ? "#C4CDD5" : gold ? COLORS.uclaGold : COLORS.uclaBlue,
      color: disabled ? COLORS.white : gold ? COLORS.black : COLORS.white,
      fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em",
      fontFamily: "'Inter', sans-serif",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s ease",
      boxShadow: disabled ? "none" : gold ? "0 2px 8px rgba(255,209,0,0.35)" : "0 2px 8px rgba(39,116,174,0.25)",
    }}>{label}</button>
  );
}

function ResultCard({ rec, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={rec.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", background: COLORS.white, borderRadius: 8, padding: "14px 16px",
        border: `1px solid ${hovered ? COLORS.lighterBlue : "#E2E8F0"}`,
        textDecoration: "none", color: "inherit", transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 6px 20px rgba(39,116,174,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
        animation: `fadeIn 0.35s ease-out ${index * 0.05}s both`,
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: 22, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{rec.icon || "🔗"}</span>
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, textTransform: "lowercase", letterSpacing: "0.04em", padding: "2px 7px", borderRadius: 4, background: COLORS.lightestBlue, color: COLORS.darkerBlue, marginBottom: 6 }}>{rec.tag}</span>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.black, marginBottom: 3, fontFamily: "'Inter', sans-serif" }}>{rec.name}</div>
          <div style={{ fontSize: 12.5, color: "#4A5568", lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>{rec.desc}</div>
        </div>
        <span style={{ fontSize: 16, color: hovered ? COLORS.uclaBlue : "#CBD5E0", transition: "color 0.2s", marginTop: 14, flexShrink: 0 }}>→</span>
      </div>
    </a>
  );
}

// ─── PDF DOWNLOAD ───
function downloadResultsPDF(name, gradYear, results) {
  const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const resourceRows = results.map((r) =>
    `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;vertical-align:top;">
        <span style="font-size:18px;">${r.icon || ""}</span>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;vertical-align:top;">
        <div style="font-weight:600;font-size:13px;color:#000;margin-bottom:2px;">${r.name}</div>
        <div style="font-size:11px;color:#4A5568;line-height:1.4;">${r.desc}</div>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;vertical-align:top;">
        <span style="display:inline-block;font-size:9px;font-weight:600;text-transform:lowercase;letter-spacing:0.04em;padding:2px 7px;border-radius:3px;background:#DAEBFE;color:#005587;">${r.tag}</span>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;vertical-align:top;word-break:break-all;">
        <a href="${r.url}" style="font-size:11px;color:#2774AE;text-decoration:underline;">${r.url.replace("https://alumni.ucla.edu/", "alumni.ucla.edu/")}</a>
      </td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>Bruin Connect - ${name}'s Resources</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Helvetica Neue', sans-serif; color: #000; background: #fff; padding: 40px 48px; max-width: 800px; margin: 0 auto; }
  @page { size: letter; margin: 0.6in 0.65in; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 0; } }
</style>
</head><body>

<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #2774AE;padding-bottom:14px;margin-bottom:24px;">
  <div>
    <div style="font-size:22px;font-weight:700;letter-spacing:-0.02em;text-transform:lowercase;color:#000;">bruin connect</div>
    <div style="font-size:11px;color:#718096;margin-top:2px;">your personalized alumni resource guide</div>
  </div>
  <div style="display:inline-flex;align-items:center;">
    <div style="background:#2774AE;padding:3px 7px;display:flex;align-items:center;">
      <span style="font-weight:800;font-size:13px;color:#fff;letter-spacing:-0.02em;">UCLA</span>
    </div>
    <span style="font-weight:400;font-size:13px;color:#000;margin-left:5px;">alum</span>
  </div>
</div>

<div style="background:#DAEBFE;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
  <div style="font-size:16px;font-weight:700;color:#003B5C;margin-bottom:4px;">Welcome, ${name}!</div>
  <div style="font-size:12px;color:#005587;line-height:1.5;">
    Class of ${gradYear} &middot; Generated ${now}<br/>
    We matched you with <strong>${results.length} networks &amp; resources</strong> based on your identity, location, interests, and career stage.
  </div>
</div>

<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
  <thead>
    <tr style="background:#F7FAFC;">
      <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#718096;border-bottom:2px solid #2774AE;width:36px;"></th>
      <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#718096;border-bottom:2px solid #2774AE;">Resource</th>
      <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#718096;border-bottom:2px solid #2774AE;width:100px;">Type</th>
      <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#718096;border-bottom:2px solid #2774AE;width:200px;">Link</th>
    </tr>
  </thead>
  <tbody>${resourceRows}</tbody>
</table>

<div style="background:#DAEBFE;border-radius:8px;padding:14px 20px;border-left:4px solid #FFD100;margin-bottom:20px;">
  <div style="font-size:12px;font-weight:700;color:#005587;margin-bottom:4px;">Quick Links</div>
  <div style="font-size:11px;color:#000;line-height:1.8;">
    All Networks: <a href="https://alumni.ucla.edu/alumni-networks/" style="color:#2774AE;">alumni.ucla.edu/alumni-networks</a><br/>
    Events Calendar: <a href="https://alumni.ucla.edu/events-calendar/" style="color:#2774AE;">alumni.ucla.edu/events-calendar</a><br/>
    Diversity Programs: <a href="https://alumni.ucla.edu/diversity-programs-and-initiatives/" style="color:#2774AE;">alumni.ucla.edu/diversity-programs-and-initiatives</a><br/>
    Career Resources: <a href="https://alumni.ucla.edu/alumni-career-engagement/" style="color:#2774AE;">alumni.ucla.edu/alumni-career-engagement</a>
  </div>
</div>

<div style="border-top:2px solid #2774AE;padding-top:12px;display:flex;justify-content:space-between;align-items:center;">
  <div style="font-size:10px;color:#718096;line-height:1.5;">
    UCLA Alumni Association &middot; alumni.ucla.edu<br/>
    Bruins are powerful individually, but even more powerful together.
  </div>
  <div style="display:inline-flex;align-items:center;">
    <div style="background:#2774AE;padding:2px 5px;display:flex;align-items:center;">
      <span style="font-weight:800;font-size:10px;color:#fff;">UCLA</span>
    </div>
    <span style="font-weight:400;font-size:10px;color:#000;margin-left:4px;">alum</span>
  </div>
</div>

</body></html>`;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 600);
  } else {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bruin-connect-${name.toLowerCase().replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// ─── MAIN ───
export default function UCLAAlumChatbot() {
  const [step, setStep] = useState(STEPS.WELCOME);
  const [name, setName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [degree, setDegree] = useState("");
  const [identity, setIdentity] = useState([]);
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState([]);
  const [career, setCareer] = useState("");
  const [history, setHistory] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }); }, [step]);

  const addH = (t) => setHistory((h) => [...h, { user: t }]);
  const toggleMulti = (id, setter, current) => {
    if (id === "none") setter(current.includes("none") ? [] : ["none"]);
    else setter(current.includes(id) ? current.filter((i) => i !== id) : [...current.filter((i) => i !== "none"), id]);
  };

  const results = step === STEPS.RESULTS ? getRecommendations({ identity, location, interests, career, gradYear }) : [];
  const lastUser = history[history.length - 1]?.user;

  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', 'Helvetica Neue', system-ui, sans-serif", background: COLORS.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        input::placeholder { color: #A0AEC0; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.lighterBlue}; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ background: COLORS.white, padding: "14px 20px", borderBottom: `3px solid ${COLORS.uclaBlue}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🐻</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.black, letterSpacing: "-0.02em", lineHeight: 1.1, textTransform: "lowercase" }}>bruin connect</div>
            <div style={{ fontSize: 11, color: "#718096", fontWeight: 400, marginTop: 1 }}>find your alumni community</div>
          </div>
        </div>
        <UCLAAlumLogo size="small" />
      </div>

      {/* Chat */}
      <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "24px 16px", display: "flex", flexDirection: "column" }}>

        {step === STEPS.WELCOME && (
          <BotMessage text={<><strong>Welcome to Bruin Connect.</strong><br /><br />Bruins are powerful individually, but even more powerful together. We'll match you with alumni networks, programs, and resources based on who you are, where you're headed, and what matters to you.<br /><br />This takes about 2 minutes.</>} animate>
            <button onClick={() => setStep(STEPS.NAME)} style={{
              padding: "13px 36px", borderRadius: 6, border: "none",
              background: COLORS.uclaGold, color: COLORS.black,
              fontSize: 15, fontWeight: 700, fontFamily: "'Inter', sans-serif",
              cursor: "pointer", letterSpacing: "-0.01em",
              boxShadow: "0 3px 12px rgba(255,209,0,0.35)",
              textTransform: "lowercase",
            }}>get started</button>
          </BotMessage>
        )}

        {step === STEPS.NAME && (
          <BotMessage text="First, what should we call you?" animate>
            <div style={{ display: "flex", gap: 8, maxWidth: 360 }}>
              <input autoFocus type="text" placeholder="Your first name" value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) { addH(name); setStep(STEPS.GRAD_YEAR); } }}
                style={{ flex: 1, padding: "11px 14px", borderRadius: 6, border: "2px solid #D4D9E1", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none" }} />
              <BrandButton onClick={() => { addH(name); setStep(STEPS.GRAD_YEAR); }} disabled={!name.trim()} label="next" />
            </div>
          </BotMessage>
        )}

        {step === STEPS.GRAD_YEAR && (
          <>
            <UserBubble text={name} />
            <BotMessage text={<>Good to meet you, <strong>{name}</strong>. When did you (or will you) graduate?</>} animate>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["2024", "2025", "2026"].map((yr) => (
                  <button key={yr} onClick={() => { setGradYear(yr); addH(`Class of ${yr}`); setStep(STEPS.DEGREE); }}
                    style={{ padding: "9px 22px", borderRadius: 6, border: "2px solid #D4D9E1", background: COLORS.white, fontSize: 14, fontFamily: "'Inter', sans-serif", cursor: "pointer", fontWeight: 600, color: COLORS.black, transition: "all 0.15s" }}>{yr}</button>
                ))}
                <input type="text" placeholder="Other" value={gradYear}
                  onChange={(e) => setGradYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  onKeyDown={(e) => { if (e.key === "Enter" && gradYear) { addH(`Class of ${gradYear}`); setStep(STEPS.DEGREE); } }}
                  style={{ width: 90, padding: "9px 12px", borderRadius: 6, border: "2px solid #D4D9E1", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
              </div>
            </BotMessage>
          </>
        )}

        {step === STEPS.DEGREE && (
          <>
            <UserBubble text={`Class of ${gradYear}`} />
            <BotMessage text="What type of degree?" animate>
              <OptionGrid options={DEGREE_OPTIONS} selected={degree} onToggle={(id) => { setDegree(id); addH(DEGREE_OPTIONS.find(o=>o.id===id)?.label); setStep(STEPS.IDENTITY); }} multi={false} columns={2} />
            </BotMessage>
          </>
        )}

        {step === STEPS.IDENTITY && (
          <>
            <UserBubble text={lastUser} />
            <BotMessage text={<>UCLA has a wide range of identity-based alumni networks. Select any that resonate with you <span style={{ color: "#718096" }}>(as many as you'd like)</span>.</>} animate>
              <OptionGrid options={IDENTITY_OPTIONS} selected={identity} onToggle={(id) => toggleMulti(id, setIdentity, identity)} columns={2} />
              <BrandButton onClick={() => { addH(identity.length ? identity.map((id) => IDENTITY_OPTIONS.find((o) => o.id === id)?.label).join(", ") : "Skipped"); setStep(STEPS.LOCATION); }}
                label={identity.length ? "continue" : "skip"} />
            </BotMessage>
          </>
        )}

        {step === STEPS.LOCATION && (
          <>
            <UserBubble text={lastUser} />
            <BotMessage text="Where are you based, or where are you heading after graduation?" animate>
              <OptionGrid options={LOCATION_OPTIONS} selected={location} onToggle={(id) => setLocation(id)} multi={false} columns={2} />
              <BrandButton onClick={() => { addH(LOCATION_OPTIONS.find((o) => o.id === location)?.label || "Skipped"); setStep(STEPS.INTERESTS); }} disabled={!location} label="continue" />
            </BotMessage>
          </>
        )}

        {step === STEPS.INTERESTS && (
          <>
            <UserBubble text={lastUser} />
            <BotMessage text={<>What are you most interested in as an alum? <span style={{ color: "#718096" }}>(select up to 4)</span></>} animate>
              <OptionGrid options={INTEREST_OPTIONS} selected={interests}
                onToggle={(id) => { if (interests.includes(id)) setInterests(interests.filter((i) => i !== id)); else if (interests.length < 4) setInterests([...interests, id]); }} columns={2} />
              <BrandButton onClick={() => { addH(interests.map((id) => INTEREST_OPTIONS.find((o) => o.id === id)?.label).join(", ")); setStep(STEPS.CAREER); }} disabled={interests.length === 0} label="continue" />
            </BotMessage>
          </>
        )}

        {step === STEPS.CAREER && (
          <>
            <UserBubble text={lastUser} />
            <BotMessage text="Last question — where are you at career-wise right now?" animate>
              <OptionGrid options={CAREER_OPTIONS} selected={career} onToggle={(id) => setCareer(id)} multi={false} columns={1} />
              <BrandButton onClick={() => { addH(CAREER_OPTIONS.find((o) => o.id === career)?.label || ""); setStep(STEPS.RESULTS); }} disabled={!career} label="show my results" gold />
            </BotMessage>
          </>
        )}

        {step === STEPS.RESULTS && (
          <>
            <UserBubble text={lastUser} />
            <BotMessage text={<><strong>your personalized bruin toolkit, {name}.</strong><br />We matched you with <strong>{results.length} networks and resources</strong> based on your selections. Tap any card to explore.</>} animate>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
                {results.map((rec, i) => <ResultCard key={rec.name} rec={rec} index={i} />)}
              </div>
              <div style={{ marginTop: 20, padding: "14px 18px", background: COLORS.lightestBlue, borderRadius: 8, borderLeft: `4px solid ${COLORS.uclaGold}` }}>
                <div style={{ fontSize: 13, color: COLORS.black, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
                  <strong style={{ color: COLORS.darkerBlue }}>quick links</strong><br />
                  <a href="https://alumni.ucla.edu/alumni-networks/regional-networks/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.uclaBlue, textDecoration: "underline" }}>Regional Networks</a>{" · "}
                  <a href="https://alumni.ucla.edu/diversity-programs-and-initiatives/networks/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.uclaBlue, textDecoration: "underline" }}>Diversity Networks</a>{" · "}
                  <a href="https://alumni.ucla.edu/alumni-networks/affinity-networks/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.uclaBlue, textDecoration: "underline" }}>Affinity Networks</a>{" · "}
                  <a href="https://alumni.ucla.edu/alumni-networks/professional-networks/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.uclaBlue, textDecoration: "underline" }}>Professional Networks</a>{" · "}
                  <a href="https://alumni.ucla.edu/events-calendar/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.uclaBlue, textDecoration: "underline" }}>Events Calendar</a>{" · "}
                  <a href="https://alumni.ucla.edu/alumni-career-engagement/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.uclaBlue, textDecoration: "underline" }}>Career Resources</a>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                <button onClick={() => downloadResultsPDF(name, gradYear, results)}
                  style={{
                    padding: "11px 24px", borderRadius: 6, border: "none",
                    background: COLORS.uclaBlue, color: COLORS.white,
                    fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
                    boxShadow: "0 2px 8px rgba(39,116,174,0.25)",
                    transition: "all 0.2s ease",
                  }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  download my resources
                </button>
                <button onClick={() => { setStep(STEPS.WELCOME); setName(""); setGradYear(""); setDegree(""); setIdentity([]); setLocation(""); setInterests([]); setCareer(""); setHistory([]); }}
                  style={{ padding: "11px 20px", borderRadius: 6, border: "2px solid #D4D9E1", background: COLORS.white, fontSize: 13, fontFamily: "'Inter', sans-serif", cursor: "pointer", color: "#718096", fontWeight: 500 }}>↺ start over</button>
              </div>
              <a href="https://account.alumni.ucla.edu/" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  marginTop: 16, padding: "14px 18px",
                  background: COLORS.uclaGold, borderRadius: 8,
                  textDecoration: "none", color: COLORS.black,
                  transition: "all 0.2s ease",
                }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003B5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkestBlue }}>update your alumni information</div>
                  <div style={{ fontSize: 12, color: COLORS.darkerBlue, marginTop: 1 }}>Keep your profile current at the UCLA Alumni portal</div>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 16, color: COLORS.darkestBlue }}>→</span>
              </a>
            </BotMessage>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 18px", borderTop: "1px solid #EDF2F7", background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexShrink: 0 }}>
        <UCLAAlumLogo size="small" />
        <span style={{ fontSize: 11, color: "#A0AEC0" }}>· alumni.ucla.edu</span>
      </div>
    </div>
  );
}

