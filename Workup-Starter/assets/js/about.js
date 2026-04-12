/**
 * About Page Renderer
 * Renders team and school partner cards from structured data.
 */
(function () {
    var TEAM_MEMBERS = [
        {
            name: "Romil",
            role: "Founder",
            bio: "Leads vision, partnerships, and program direction to ensure CurioKids stays aligned with meaningful impact for children.",
            imagePlaceholder: "Romil Photo Placeholder"
        },
        {
            name: "Sachi",
            role: "Co-Founder",
            bio: "Drives operations, planning quality, and experience design so every session runs smoothly and consistently.",
            imagePlaceholder: "Sachi Photo Placeholder"
        },
        {
            name: "Aaryan",
            role: "Event Head",
            bio: "Owns event execution end-to-end, from venue coordination and activity flow to on-ground engagement.",
            imagePlaceholder: "Aaryan Photo Placeholder"
        },
        {
            name: "Yagnik",
            role: "Technical Head",
            bio: "Manages digital systems and technical workflow that support program scheduling, coordination, and communication.",
            imagePlaceholder: "Yagnik Photo Placeholder"
        }
    ];

    var SCHOOL_PARTNERS = [
        {
            name: "Greenfield International School (Mock)",
            description: "A progressive K-10 school focused on experiential learning. CurioKids supports activity-based workshops and engagement events for middle school learners.",
            programFocus: "Grades 3-8",
            format: "Weekly workshops + event days",
            location: "Ahmedabad",
            thumbnailPlaceholder: "School Thumbnail Placeholder",
            gallery: ["Gallery Placeholder 1", "Gallery Placeholder 2", "Gallery Placeholder 3"]
        },
        {
            name: "Shantiniketan Academy (Mock)",
            description: "A values-driven school where CurioKids runs creative expression sessions, confidence-building modules, and thematic celebration events for children.",
            programFocus: "Grades 2-7",
            format: "Monthly events + clubs",
            location: "Ahmedabad",
            thumbnailPlaceholder: "School Thumbnail Placeholder",
            gallery: ["Gallery Placeholder 1", "Gallery Placeholder 2", "Gallery Placeholder 3"]
        },
        {
            name: "Little Steps Public School (Mock)",
            description: "An early-years and primary learning campus where CurioKids delivers age-friendly workshops and curated birthday event formats for young children.",
            programFocus: "Pre-Primary to Grade 5",
            format: "Skill pods + celebration modules",
            location: "Ahmedabad",
            thumbnailPlaceholder: "School Thumbnail Placeholder",
            gallery: ["Gallery Placeholder 1", "Gallery Placeholder 2", "Gallery Placeholder 3"]
        }
    ];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function renderTeam() {
        var teamGrid = document.getElementById("about-team-grid");
        if (!teamGrid) return;

        var html = "";
        TEAM_MEMBERS.forEach(function (member) {
            html += '<div class="team-info col-lg-3 col-md-6 col-12">';
            html += '  <div class="about-team-card">';
            html += '    <div class="about-placeholder-image about-placeholder-image--team">' + escapeHtml(member.imagePlaceholder) + "</div>";
            html += '    <h4><a href="#team">' + escapeHtml(member.name) + "</a></h4>";
            html += '    <p class="about-team-role">' + escapeHtml(member.role) + "</p>";
            html += '    <p class="about-team-bio">' + escapeHtml(member.bio) + "</p>";
            html += "  </div>";
            html += "</div>";
        });

        teamGrid.innerHTML = html;
    }

    function renderSchools() {
        var schoolsGrid = document.getElementById("school-partners-grid");
        if (!schoolsGrid) return;

        var html = "";
        SCHOOL_PARTNERS.forEach(function (school) {
            html += '<div class="col-lg-4 col-md-6">';
            html += '  <article class="school-partner-card">';
            html += '    <div class="about-placeholder-image about-placeholder-image--school-thumb">' + escapeHtml(school.thumbnailPlaceholder) + "</div>";
            html += '    <div class="school-partner-card__body">';
            html += "      <h4>" + escapeHtml(school.name) + "</h4>";
            html += "      <p>" + escapeHtml(school.description) + "</p>";
            html += '      <ul class="school-partner-card__meta">';
            html += '        <li><i class="fas fa-user-graduate"></i>Program Focus: ' + escapeHtml(school.programFocus) + "</li>";
            html += '        <li><i class="fas fa-chalkboard-teacher"></i>Format: ' + escapeHtml(school.format) + "</li>";
            html += '        <li><i class="fas fa-map-marker-alt"></i>Location: ' + escapeHtml(school.location) + "</li>";
            html += "      </ul>";
            html += '      <h6 class="school-partner-card__gallery-title">School Activity Gallery</h6>';
            html += '      <div class="school-gallery">';
            school.gallery.forEach(function (galleryLabel) {
                html += '        <div class="about-placeholder-image about-placeholder-image--school-gallery">' + escapeHtml(galleryLabel) + "</div>";
            });
            html += "      </div>";
            html += "    </div>";
            html += "  </article>";
            html += "</div>";
        });

        schoolsGrid.innerHTML = html;
    }

    renderTeam();
    renderSchools();
})();
