(function() {
  var currentYear = 2015;

  var tmplCalendar = _.template($('#tmpl-calendar').html());
  var tmplChronological = _.template($('#tmpl-chronological').html());

  var NAMES_OF_MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var getNameOfMonth = function(month) {
    return NAMES_OF_MONTHS[month];
  }

  var getNamesAndDaysOfMonths = function(year) {
    var monthNameWithNumberOfDays = function(name, index) {
      var lastDayOfMonth = new Date(year, index + 1, 0);
      return [name, lastDayOfMonth.getDate()];
    };

    return NAMES_OF_MONTHS.map(monthNameWithNumberOfDays);
  };

  var sortEventByDate  = function(eventA, eventB) {
    if(eventA.year != eventB.year) return eventA.year - eventB.year;
    if(eventA.month != eventB.month) return eventA.month - eventB.month;
    return eventA.day - eventB.day;
  };

  var getDateOfFirstEventOfYear = function(year) {
    // Get the first event of the year.
    var event = _.find(data.events, function(event) {
      return event.year === year;
    });

    if(event) {
      return [event.year, event.month, event.day].join('-');
    }

    // Otherwise we didn't find a match.
    return '';
  };

  var renderCalendar = function() {
    // For each event, set dateHasEvent[month][day] to true.
    var dateHasEvent = [];
    _.each(_.range(12), function(month) {dateHasEvent[month] = [];});
    _.each(data.events, function(event) {
      if(event.year === currentYear) {
        dateHasEvent[event.month - 1][event.day] = true; // Store the months zero-indexed.
      }
    });

    var context = {
      year: currentYear,
      prevYearLink: getDateOfFirstEventOfYear(currentYear - 1),
      nextYearLink: getDateOfFirstEventOfYear(currentYear + 1),
      monthsWithNameAndDays: getNamesAndDaysOfMonths(currentYear),
      dateHasEvent: dateHasEvent
    };

    $('#calendar').html(tmplCalendar(context));

    $('#PrevYear').click(function() {
      currentYear--;
      renderCalendar();
    });
 
    $('#NextYear').click(function() {
      currentYear++;
      renderCalendar();
    });
  };

  var renderChronological = function() {
    var context = {
      events: data.events,
      getNameOfMonth: getNameOfMonth 
    };

    $('#chronological').html(tmplChronological(context));
  };

  data.events.sort(sortEventByDate);
  renderChronological();
  renderCalendar();
})();

