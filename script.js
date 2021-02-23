const SCHEDULE_HOURS = 8;
var today = moment();

const timeblockEl = $('#timeblock');

// Displays the current date
$('#currentDay').text(today.format('dddd[,] MMMM Do'));


const schedule = {
    hours: [
        {
            hour: '8AM',
            event: 'Do something'
        }
    ],
    updateEvent() {
        // TODO updates the hour event
    }
}

// Displays the time blocks by hour
const displaySchedule = function() {
    // get schedule from localstorage
    let schedule = localStorage.getItem("schedule");
    // if schedule doesn't exist or is empty
    if (!schedule) {
        displayEmptySchedule();
    } else {
        for (var i = 0; i < schedule.hours.length; i++) {
            // create list elements
            // append list el to ul
        }

        // append ul to timeblock div
    }
}

// Needs dynamic am/pm and color coding
const displayEmptySchedule = function() {

    for (var i = 0; i < SCHEDULE_HOURS; i++) {
        let timeblockUl = `
        <ul class="list-group list-group-horizontal d-flex justify-content-between">
        <li class="list-group-item">8AM</li>
        <textarea class="list-group-item w-100 list-group-item-success">Do something</textarea>
        <button class="list-group-item btn btn-primary"></button>
      </ul>`
      
      timeblockEl.append(timeblockUl);
    }
}
    
// TODO 
// Color coded (gray = past, green = current hour, red = future)
// Editable blocks
// Save edits to localstorage
// Event listener to update the timeblock hour colors as time goes by