const timeblockEl = $('#timeblock');
const today = moment();

// Displays the current date
$('#currentDay').text(today.format('dddd[,] MMMM Do'));

// Reference
// const schedule = {
//     events: [
//         {
//             displayedHour: '8AM', 
//             event: 'Do something'
//         }
// }

// Creates an array of the displayed hours ex. (8AM - 5PM)
const getDisplayHours = function(startHour, maxHours) {
    let hours = [];
    let hour = startHour

    while (hour < 12) {
        hours.push(hour + 'AM');
        hour++;
    }

    hours.push('12PM');
    hour = 1;
    
    while (hour < maxHours) {
        hours.push(hour + 'PM');
        hour++;
    }

    return hours;
}

// Creates an empty schedule object and returns it
const getEmptySchedule = function() {

    let events = [];
    let displayedHours = getDisplayHours(8, 6);
    
    for (var i = 0; i < displayedHours.length; i++) {
        let event = {
            displayedHour: displayedHours[i],
            event: ''
        }
        events.push(event);
    }

    let schedule = {
        events
    }

    return schedule;
}

const storeSchedule = function(schedule) {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// Gets/creates the schedule from localstorage
const getSchedule = function() {
    // get schedule from localstorage
    let schedule = localStorage.getItem("schedule");
    // if schedule doesn't exist
    if (!schedule) {
        // create a new empty schedule
        let emptySchedule = getEmptySchedule();

        storeSchedule(emptySchedule);

        return emptySchedule;
    } else {
        schedule = JSON.parse(schedule);
    }

    return schedule;
}

// Creates the timeblock element for the display
const displaySchedule = function(schedule) {

    let events = schedule.events;

    for (var i = 0; i < events.length; i++) {

        let currEvent = events[i];
        
        timeblockEl.append(
            `<ul class="list-group list-group-horizontal d-flex justify-content-between">
            <li class="list-group-item">${currEvent.displayedHour}</li>
            <textarea class="list-group-item w-100 list-group-item-success">${currEvent.event}</textarea>
            <button class="list-group-item btn btn-primary btn-save"></button>
            </ul>`
      );

    }
}

displaySchedule(getSchedule());
    
// TODO 
// Color coded (gray = past, green = current hour, red = future)

const getSchedulefromDisplay = function() {

    // initialize new schedule object
    let newSchedule = {
        events: []
    };

    let timeBlockList = timeblockEl.children('ul');
    var item = timeBlockList[0];
    console.log($(timeBlockList[0]).find('li').text());
    
    // loop through all the timeblock lists
    for (var i = 0; i < timeBlockList.length; i++) {
        // initialize event object with displayed hour and textarea values
        let item = $(timeBlockList[i]);
        let event = {
            displayedHour: item.find('li').text(),
            event: item.find('textarea').val()
        }
        // push event to the events array
        newSchedule.events.push(event);
    }

    return newSchedule
}

const handleSaveSchedule = function() {
    console.log("you clicked save!");
    let newSchedule = getSchedulefromDisplay();
    storeSchedule(newSchedule);
}

timeblockEl.on('click', '.btn-save', handleSaveSchedule);
 
// TODO
// Event listener to update the timeblock hour colors as time goes by