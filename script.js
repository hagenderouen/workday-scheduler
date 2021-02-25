const timeblockEl = $('#timeblock');  

// Displays the current date
$('#currentDay').text(moment().format('dddd[,] MMMM Do'));

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

// Evaluates hour and returns color class
const getItemColorClass = function(hour) {
    let currHour = moment().format('hA');

    // If it's the current hour, returns green class
    if (currHour === hour) {
        return 'list-group-item-success';
    }
    // If it's in the past, returns gray class
    if (moment(hour, 'hA').fromNow().includes('ago')) {
        return 'list-group-item-secondary';
    }
    // If it's in the future, returns red class
    if (moment(hour, 'hA').fromNow().includes('in')) {
        return 'list-group-item-danger';
    }
}

// Creates an empty schedule object and returns it
const getEmptySchedule = function() {

    let events = [];
    let hours = getDisplayHours(8, 6);
    
    for (var i = 0; i < hours.length; i++) {
        let event = {
            hour: hours[i],
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

// Gets the schedule from localstorage. If it doesn't exist it creates an empty schedule and stores it in localstorage
const getSchedule = function() {
    let schedule = localStorage.getItem("schedule");
    
    if (!schedule) {
        let emptySchedule = getEmptySchedule();

        storeSchedule(emptySchedule);

        return emptySchedule;
    } else {
        schedule = JSON.parse(schedule);
    }

    return schedule;
}

// Displays the timeblock element
const displaySchedule = function(schedule) {

    let events = schedule.events;

    for (var i = 0; i < events.length; i++) {

        let currEvent = events[i];
        let itemColorClass = getItemColorClass(currEvent.hour);
        
        timeblockEl.append(
            `<ul class="list-group list-group-horizontal d-flex justify-content-between">
            <li class="list-group-item">${currEvent.hour}</li>
            <textarea class="list-group-item w-100 ${itemColorClass}">${currEvent.event}</textarea>
            <button class="list-group-item btn btn-primary btn-save"></button>
            </ul>`
      );

    }
}

// Parses the schedule from the DOM then initializes and returns a new schedule object
const getSchedulefromDisplay = function() {

    let newSchedule = {
        events: []
    };

    let timeBlockList = timeblockEl.children('ul');
    var item = timeBlockList[0];
    
    // Loops through elements and creates and event object from values. Pushes event to the new Schedule object.
    for (var i = 0; i < timeBlockList.length; i++) {
        let item = $(timeBlockList[i]);
        let event = {
            hour: item.find('li').text(),
            event: item.find('textarea').val()
        }

        newSchedule.events.push(event);
    }

    return newSchedule
}

const handleSaveSchedule = function() {
    let newSchedule = getSchedulefromDisplay();
    storeSchedule(newSchedule);
}

timeblockEl.on('click', '.btn-save', handleSaveSchedule);

displaySchedule(getSchedule());