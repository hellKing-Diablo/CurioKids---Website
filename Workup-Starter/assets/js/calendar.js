/**
 * Calendar Renderer
 * Supports compact mode (index.html) and full mode (calendar.html)
 */
var CalendarRenderer = (function () {
    var MONTH_NAMES = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function getEventsForMonth(year, month) {
        var events = window.EVENTS_DATA || [];
        var map = {};
        events.forEach(function (ev) {
            var parts = ev.date.split("-");
            var eYear = parseInt(parts[0], 10);
            var eMonth = parseInt(parts[1], 10) - 1;
            var eDay = parseInt(parts[2], 10);
            if (eYear === year && eMonth === month) {
                if (!map[eDay]) map[eDay] = [];
                map[eDay].push(ev);
            }
        });
        return map;
    }

    function formatDate(dateStr) {
        var parts = dateStr.split("-");
        var d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    function render(selector, options) {
        var container = document.querySelector(selector);
        if (!container) return;

        var opts = options || {};
        var compact = opts.compact !== false;
        var sidebarSelector = opts.sidebarSelector || null;

        var now = new Date();
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth();
        var todayDate = now.getDate();
        var todayMonth = now.getMonth();
        var todayYear = now.getFullYear();

        var viewYear = currentYear;
        var viewMonth = currentMonth;

        function build() {
            var eventsMap = getEventsForMonth(viewYear, viewMonth);
            var firstDay = new Date(viewYear, viewMonth, 1).getDay();
            var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

            var html = '<div class="ec-calendar' + (compact ? ' ec-calendar--compact' : ' ec-calendar--full') + '">';

            // Header
            html += '<div class="ec-calendar__header">';
            html += '<button class="ec-calendar__nav-btn" data-dir="prev"><i class="fas fa-chevron-left"></i></button>';
            html += '<h4 class="ec-calendar__title">' + MONTH_NAMES[viewMonth] + ' ' + viewYear + '</h4>';
            html += '<button class="ec-calendar__nav-btn" data-dir="next"><i class="fas fa-chevron-right"></i></button>';
            html += '</div>';

            // Weekday headers
            html += '<div class="ec-calendar__weekdays">';
            DAY_NAMES.forEach(function (d) {
                html += '<div class="ec-calendar__weekday">' + d + '</div>';
            });
            html += '</div>';

            // Day cells
            html += '<div class="ec-calendar__days">';

            // Empty cells before first day
            for (var e = 0; e < firstDay; e++) {
                html += '<div class="ec-calendar__day ec-calendar__day--empty"></div>';
            }

            for (var day = 1; day <= daysInMonth; day++) {
                var isToday = (day === todayDate && viewMonth === todayMonth && viewYear === todayYear);
                var dayEvents = eventsMap[day] || [];
                var hasEvent = dayEvents.length > 0;

                var classes = 'ec-calendar__day';
                if (isToday) classes += ' ec-calendar__day--today';
                if (hasEvent) classes += ' ec-calendar__day--has-event';

                var dataAttr = hasEvent ? ' data-event-id="' + dayEvents[0].id + '"' : '';

                html += '<div class="' + classes + '"' + dataAttr + '>';
                html += '<span class="ec-calendar__day-number">' + day + '</span>';
                if (hasEvent) {
                    html += '<span class="ec-calendar__day-event">' + dayEvents[0].title.split(' ').slice(0, 2).join(' ') + '</span>';
                }
                html += '</div>';
            }

            html += '</div>'; // days
            html += '</div>'; // calendar

            container.innerHTML = html;

            // Event listeners
            container.querySelectorAll('.ec-calendar__nav-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    if (this.getAttribute('data-dir') === 'prev') {
                        viewMonth--;
                        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
                    } else {
                        viewMonth++;
                        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
                    }
                    build();
                });
            });

            // Day click handlers
            container.querySelectorAll('.ec-calendar__day--has-event').forEach(function (dayEl) {
                dayEl.addEventListener('click', function () {
                    var eventId = this.getAttribute('data-event-id');
                    if (compact) {
                        window.location.href = 'post.html?id=' + eventId;
                    } else if (sidebarSelector) {
                        showEventInSidebar(eventId, sidebarSelector);
                    }
                });
            });
        }

        build();
    }

    function showEventInSidebar(eventId, sidebarSelector) {
        var sidebar = document.querySelector(sidebarSelector);
        if (!sidebar) return;

        var events = window.EVENTS_DATA || [];
        var event = null;
        for (var i = 0; i < events.length; i++) {
            if (events[i].id === parseInt(eventId, 10)) {
                event = events[i];
                break;
            }
        }

        if (!event) {
            sidebar.innerHTML = '<div class="ec-sidebar__placeholder"><i class="far fa-calendar-alt"></i>Event not found</div>';
            return;
        }

        var html = '';
        html += '<img src="' + event.thumbnail + '" alt="' + event.title + '" class="ec-sidebar__event-img">';
        html += '<span class="ec-sidebar__event-type ec-sidebar__event-type--' + event.type + '">' + event.type + '</span>';
        html += '<h4 class="ec-sidebar__event-title">' + event.title + '</h4>';
        html += '<ul class="ec-sidebar__event-meta">';
        html += '<li><i class="far fa-calendar-alt"></i> ' + formatDate(event.date) + '</li>';
        html += '<li><i class="far fa-clock"></i> ' + event.time + '</li>';
        html += '<li><i class="fas fa-map-marker-alt"></i> ' + event.location + '</li>';
        html += '</ul>';
        html += '<p class="ec-sidebar__event-desc">' + event.description + '</p>';
        html += '<a href="post.html?id=' + event.id + '" class="btn btn-style">View Full Details</a>';

        sidebar.innerHTML = html;
    }

    return {
        init: render
    };
})();
