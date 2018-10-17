//global variables
var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate().toString().padStart(2, "0");
var year = dateObj.getUTCFullYear();
var monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var indexMonth = month;
var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
today = year + "-" + month + "-" + day;

var eventList = [];

// ------ set default events -------
function defaultEvents(dataDay, dataName, dataNotes, classTag) {
  var date = $('*[data-day=' + dataDay + ']');
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);
}

// defaultEvents(today, 'YEAH!', 'Today is your day', 'important');
// defaultEvents('2018-12-25', 'MERRY CHRISTMAS', 'A lot of gift!!!!', 'festivity');
// defaultEvents('2018-10-04', "LUCA'S BIRTHDAY", 'Another gifts...?', 'birthday');
// defaultEvents('2018-10-08', "MY LADY'S BIRTHDAY 1", 'A lot of money to spent!!!!', 'birthday');
// defaultEvents('2018-10-10', "MY LADY'S BIRTHDAY 2", 'A lot of money to spent!!!!<br><br><img class="ui small image" src="https://semantic-ui.com/images/avatar2/large/matthew.png">', 'event');
// defaultEvents(today, 'YEAH!', 'Today is your day', 'important');

// ------ functions control -------

//button of the current day
todayBtn.on("click", function () {
  if (month < indexMonth) {
    var step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.each(function () {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});

//window event creator
// addBtn.on("click", function () {
//   winCreator.addClass("isVisible");
//   $("body").addClass("overlay");
//   dataCel.each(function () {
//     if ($(this).hasClass("isSelected")) {
//       today = $(this).data("day");
//       document.querySelector('input[type="date"]').value = today;
//     } else {
//       document.querySelector('input[type="date"]').value = today;
//     }
//   });
// });
// closeBtn.on("click", function () {
//   winCreator.removeClass("isVisible");
//   $("body").removeClass("overlay");
// });
// saveBtn.on("click", function () {
//   var inputName = $("input[name=name]").val();
//   var inputDate = $("input[name=date]").val();
//   var inputNotes = $("textarea[name=notes]").val();
//   var inputTag = $("select[name=tags]")
//     .find(":selected")
//     .text();

//   dataCel.each(function () {
//     if ($(this).data("day") === inputDate) {
//       if (inputName != null) {
//         $(this).attr("data-name", inputName);
//       }
//       if (inputNotes != null) {
//         $(this).attr("data-notes", inputNotes);
//       }
//       $(this).addClass("event");
//       if (inputTag != null) {
//         $(this).addClass("event--" + inputTag);
//       }
//       fillEventSidebar($(this));
//     }
//   });

//   winCreator.removeClass("isVisible");
//   $("body").removeClass("overlay");
//   $("#addEvent")[0].reset();
// });

function filterEventByDate(date) {
  return eventList.filter((event) => {
    return event.date == date;
  });
}
$.getJSON("./data/eventDetail.json", (file) => {
  eventList = file;
  findUniqueDateNaddClass();
  console.log(eventList[1]);
});

// findUniqueDate and add class event
function findUniqueDateNaddClass() {
  uniqueDays = $.unique(eventList.map(function (e) {
    return e.date;
  }));
  uniqueDays.forEach((dataDay) => {
    var date = $('*[data-day=' + dataDay + ']');
    date.addClass("event");
  });
}

// fillDayEvents 
function fillDayEvents(e) {
  var thisName = e.work;
  var thisNotes = e.note;
  var thisImage = (e.image == '') ? '' : '<br><br><img src="' + e.image + '">';
  console.log(thisImage);
  var thisImportant = (e.work == 'phyto');
  var thisBirthday = ((e.work == 'toxicology') || (e.work == 'Interlab'));
  var thisFestivity = (e.work == 'micro');
  var thisEvent = true;
  var thisParagraph = thisNotes + thisImage;
  console.log(thisParagraph);
  switch (true) {
    case thisImportant:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--important'>" +
        thisName +
        ":<br><span> • " +
        thisParagraph +
        "</span></p>"
      );
      break;
    case thisBirthday:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--birthday'>" +
        thisName +
        ":<br><span> • " +
        thisParagraph +
        "</span></p>"
      );
      break;
    case thisFestivity:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--festivity'>" +
        thisName +
        ":<br><span> • " +
        thisParagraph +
        "</span></p>"
      );
      break;
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +
        ":<br><span> • " +
        thisParagraph +
        "</span></p>"
      );
      break;
  }
}



//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisDay = self.attr("data-day");
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisImportant = self.hasClass("event--important");
  var thisBirthday = self.hasClass("event--birthday");
  var thisFestivity = self.hasClass("event--festivity");
  var thisEvent = self.hasClass("event");

  eventsOnDay = filterEventByDate(thisDay);
  console.log(eventsOnDay);
  eventsOnDay.forEach((e) => { fillDayEvents(e) });
};
dataCel.on("click", function () {
  var thisEl = $(this);
  var thisDay = $(this)
    .attr("data-day")
    .slice(8);
  var thisMonth = $(this)
    .attr("data-day")
    .slice(5, 7);

  fillEventSidebar($(this));

  $(".c-aside__num").text(thisDay);
  $(".c-aside__month").text(monthText[thisMonth - 1]);

  dataCel.removeClass("isSelected");
  thisEl.addClass("isSelected");

});

//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function () {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function () {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);
