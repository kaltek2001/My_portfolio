// Your Experience Data
const experiencesData = [
    {
        title: "CNC Operator/Programmer",
        company: "Protectolite Composites Inc.",
        location: "North York, ON",
        period: "Jan 2025 – Present",
        responsibilities: [
            "Program and operate CNC machine using G-code to manufacture precision parts from FRP (Fiberglass Reinforced Plastic) sheets and composite materials.",
            "Produce high-quality components for wastewater systems, electrical insulation applications, and custom vehicle parts, meeting tight tolerances and client specifications.",
            "Interpret engineering drawings, CAD models, and Bills of Materials (BOMs) to plan and execute accurate machining operations.",
            "Perform dimensional inspections using calipers, micrometers, and height gauges, documenting all quality assurance results to maintain production standards.",
            "Collaborate with engineers and production teams to resolve machining challenges, optimize tool paths, and support continuous improvement initiatives.",
            "Maintain a safe, organized, and compliant work environment, ensuring efficient operation of all CNC and shop equipment."
        ]
    },
    {
        title: "Design Assistant (Part-Time)",
        company: "Kris Design & Build",
        location: "Scarborough, ON, Canada",
        period: "June 2024 – Dec 2024",
        responsibilities: [
            "Created precise 2D architectural drawings in AutoCAD, adhering to industry standards and project specifications.",
            "Collaborated with clients and multidisciplinary design teams to integrate feedback and recommend materials and finishes that enhance design functionality and aesthetic quality.",
            "Managed and organized design documentation, including specifications, drawing versions, and schedules, ensuring project consistency.",
            "Supported project delivery and client satisfaction through effective timeline coordination and cross-functional communication.",
            "Maintained compliance with regulatory guidelines and quality standards through consistent version control and internal review processes."
        ]
    },
    {
        title: "Tool Crib Attendant (Machine Shop)",
        company: "Centennial College",
        location: "Scarborough, ON, Canada",
        period: "Jan 2023 – April 2023",
        responsibilities: [
            "Maintained precise inventory records, performed regular audits, and managed procurement to ensure continuous tool availability and operational efficiency.",
            "Oversaw the issuance, tracking, and inspection of tools, performing minor repairs, and coordinating replacements with maintenance teams.",
            "Ensured proper tool storage and safety compliance, generating detailed reports on tool usage, inventory levels, and equipment performance to support data-driven improvements."
        ]
    }
];

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Load experiences when page loads
document.addEventListener('DOMContentLoaded', function() {
    const experienceContainer = document.querySelector('.experience-container');

    if (experienceContainer) {
        // Clear any loading content
        experienceContainer.innerHTML = '';

        // Add each experience to the page
        experiencesData.forEach(experience => {
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.innerHTML = `
                <div class="experience-header">
                    <h2 class="experience-title">${experience.title}</h2>
                    <h3 class="experience-company"><i class="fas fa-building"></i> ${experience.company}</h3>
                    <div class="experience-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${experience.location}</span>
                        <span><i class="fas fa-calendar"></i> ${experience.period}</span>
                    </div>
                </div>
                
                <div class="responsibilities">
                    <ul>
                        ${experience.responsibilities.map(responsibility => `
                            <li>
                                <i class="fas fa-check"></i>
                                <div>${responsibility}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;

            experienceContainer.appendChild(experienceItem);
        });
    }
});