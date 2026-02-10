/**
 * Post Detail Page Loader
 * Reads ?id=X from URL and populates event/workshop detail page
 */
(function () {
    var params = new URLSearchParams(window.location.search);
    var eventId = parseInt(params.get('id'), 10);
    var events = window.EVENTS_DATA || [];

    var postContent = document.getElementById('post-content');
    var postComments = document.getElementById('post-comments');
    var postSidebar = document.getElementById('post-sidebar');
    var breadcrumbTitle = document.getElementById('breadcrumb-title');

    if (!postContent) return;

    // Find the event
    var event = null;
    for (var i = 0; i < events.length; i++) {
        if (events[i].id === eventId) {
            event = events[i];
            break;
        }
    }

    if (!event) {
        postContent.innerHTML =
            '<div class="post-not-found">' +
            '<i class="far fa-frown"></i>' +
            '<h3>Event Not Found</h3>' +
            '<p>The event you are looking for does not exist or may have been removed.</p>' +
            '<a href="services.html" class="btn btn-style">Browse Events</a>' +
            '</div>';
        if (postComments) postComments.style.display = 'none';
        if (postSidebar) postSidebar.innerHTML = '';
        return;
    }

    // Update breadcrumb
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = event.title;
    }

    // Update page title
    document.title = event.title + ' - Workup Events';

    function formatDate(dateStr) {
        var parts = dateStr.split("-");
        var d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }

    // Build post detail
    var html = '<div class="post-detail">';

    // Type badge
    html += '<span class="post-detail__type post-detail__type--' + event.type + '">' + event.type + '</span>';

    // Title
    html += '<h1 class="post-detail__title">' + event.title + '</h1>';

    // Meta info
    html += '<ul class="post-detail__meta">';
    html += '<li><i class="far fa-calendar-alt"></i> ' + formatDate(event.date) + '</li>';
    html += '<li><i class="far fa-clock"></i> ' + event.time + '</li>';
    html += '<li><i class="fas fa-map-marker-alt"></i> ' + event.location + '</li>';
    html += '</ul>';

    // Image Gallery
    if (event.images && event.images.length > 0) {
        html += '<div class="post-gallery">';
        html += '<img src="' + event.images[0] + '" alt="' + event.title + '" class="post-gallery__main" id="gallery-main">';
        if (event.images.length > 1) {
            html += '<div class="post-gallery__thumbs">';
            event.images.forEach(function (img, idx) {
                html += '<img src="' + img + '" alt="Thumbnail ' + (idx + 1) + '" class="post-gallery__thumb' + (idx === 0 ? ' post-gallery__thumb--active' : '') + '" data-src="' + img + '">';
            });
            html += '</div>';
        }
        html += '</div>';
    }

    // Full content
    html += '<div class="post-detail__content">' + event.fullContent + '</div>';

    // Tags
    if (event.tags && event.tags.length > 0) {
        html += '<div class="post-detail__tags">';
        event.tags.forEach(function (tag) {
            html += '<span class="post-detail__tag">#' + tag + '</span>';
        });
        html += '</div>';
    }

    html += '</div>'; // post-detail

    postContent.innerHTML = html;

    // Gallery thumbnail click handler
    var mainImg = document.getElementById('gallery-main');
    if (mainImg) {
        document.querySelectorAll('.post-gallery__thumb').forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                mainImg.src = this.getAttribute('data-src');
                document.querySelectorAll('.post-gallery__thumb').forEach(function (t) {
                    t.classList.remove('post-gallery__thumb--active');
                });
                this.classList.add('post-gallery__thumb--active');
            });
        });
    }

    // Build comments section
    if (postComments && event.comments && event.comments.length > 0) {
        var commentsHtml = '<div class="post-comments">';
        commentsHtml += '<h3 class="post-comments__title">' + event.comments.length + ' Comment' + (event.comments.length !== 1 ? 's' : '') + '</h3>';
        commentsHtml += '<ul class="post-comments__list">';

        event.comments.forEach(function (comment) {
            commentsHtml += '<li class="post-comments__item">';
            commentsHtml += '<img src="' + comment.avatar + '" alt="' + comment.name + '" class="post-comments__avatar">';
            commentsHtml += '<div class="post-comments__body">';
            commentsHtml += '<div class="post-comments__header">';
            commentsHtml += '<span class="post-comments__name">' + comment.name + '</span>';
            commentsHtml += '<span class="post-comments__date">' + formatDate(comment.date) + '</span>';
            commentsHtml += '</div>';
            commentsHtml += '<p class="post-comments__text">' + comment.text + '</p>';
            commentsHtml += '</div>';
            commentsHtml += '</li>';
        });

        commentsHtml += '</ul>';
        commentsHtml += '</div>';

        postComments.innerHTML = commentsHtml;
    }

    // Build related events sidebar
    if (postSidebar) {
        // Same type first, then others, exclude current
        var related = events
            .filter(function (ev) { return ev.id !== event.id; })
            .sort(function (a, b) {
                if (a.type === event.type && b.type !== event.type) return -1;
                if (a.type !== event.type && b.type === event.type) return 1;
                return 0;
            })
            .slice(0, 3);

        if (related.length > 0) {
            var sidebarHtml = '<div class="related-events">';
            sidebarHtml += '<h4 class="related-events__title">Related Events</h4>';

            related.forEach(function (rel) {
                sidebarHtml += '<a href="post.html?id=' + rel.id + '" class="related-events__item">';
                sidebarHtml += '<img src="' + rel.thumbnail + '" alt="' + rel.title + '" class="related-events__item-img">';
                sidebarHtml += '<div class="related-events__item-info">';
                sidebarHtml += '<h5 class="related-events__item-title">' + rel.title + '</h5>';
                sidebarHtml += '<span class="related-events__item-date"><i class="far fa-calendar-alt"></i> ' + formatDate(rel.date) + '</span>';
                sidebarHtml += '</div>';
                sidebarHtml += '</a>';
            });

            sidebarHtml += '</div>';
            postSidebar.innerHTML = sidebarHtml;
        }
    }
})();
