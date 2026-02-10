/**
 * Services Page Logic
 * Handles category view / filtered listing view toggling
 */
(function () {
    var categoriesEl = document.querySelector('.services-categories');
    var listingContainer = document.querySelector('.event-listing-container');
    if (!categoriesEl || !listingContainer) return;

    function formatDate(dateStr) {
        var parts = dateStr.split("-");
        var d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }

    function showCategories() {
        categoriesEl.classList.remove('hidden');
        listingContainer.classList.remove('active');
    }

    function showListing(type) {
        var events = (window.EVENTS_DATA || []).filter(function (ev) {
            return ev.type === type;
        });

        var typeLabel = type === 'workshop' ? 'Workshops' : 'Events';

        var html = '<div class="event-listing">';
        html += '<div class="event-listing__header">';
        html += '<h3 class="event-listing__title">All ' + typeLabel + '</h3>';
        html += '<button class="event-listing__back-btn" id="listing-back"><i class="fas fa-arrow-left"></i> Back</button>';
        html += '</div>';

        html += '<div class="event-listing__grid">';

        events.forEach(function (ev) {
            html += '<div class="event-listing__card">';
            html += '<img src="' + ev.thumbnail + '" alt="' + ev.title + '" class="event-listing__card-img">';
            html += '<div class="event-listing__card-body">';
            html += '<span class="event-listing__card-type event-listing__card-type--' + ev.type + '">' + ev.type + '</span>';
            html += '<h4 class="event-listing__card-title"><a href="post.html?id=' + ev.id + '">' + ev.title + '</a></h4>';
            html += '<p class="event-listing__card-date"><i class="far fa-calendar-alt"></i>' + formatDate(ev.date) + '</p>';
            html += '<p class="event-listing__card-desc">' + ev.description + '</p>';
            html += '<a href="post.html?id=' + ev.id + '" class="event-listing__card-link">Read more</a>';
            html += '</div>';
            html += '</div>';
        });

        if (events.length === 0) {
            html += '<p style="color: var(--font-color); grid-column: 1 / -1; text-align: center; padding: 40px 0;">No ' + typeLabel.toLowerCase() + ' found.</p>';
        }

        html += '</div>'; // grid
        html += '</div>'; // listing

        listingContainer.innerHTML = html;
        categoriesEl.classList.add('hidden');
        listingContainer.classList.add('active');

        // Back button
        var backBtn = document.getElementById('listing-back');
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                history.pushState({}, '', 'services.html');
                showCategories();
            });
        }
    }

    function handleRoute() {
        var params = new URLSearchParams(window.location.search);
        var type = params.get('type');
        if (type === 'workshop' || type === 'event') {
            showListing(type);
        } else {
            showCategories();
        }
    }

    // "Explore All" button clicks
    document.querySelectorAll('[data-type]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var type = this.getAttribute('data-type');
            history.pushState({}, '', 'services.html?type=' + type);
            showListing(type);
        });
    });

    // Browser back/forward
    window.addEventListener('popstate', handleRoute);

    // Initial load
    handleRoute();
})();
