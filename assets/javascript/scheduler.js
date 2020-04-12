//train application that incorporates Firebase to house the arrival and departure data
//retrieve and manipulate the information with moment.js
//provide up-to-date information about various trains
//arrival times
//how many minutes remain until they arrive at the station

// Initialize Firebase


/* // Your web app's Firebase configuration */
var firebaseConfig = {
    apiKey: "AIzaSyAo69pU-EG7ldTuJrs4IpM3vvoi_fALyFA",
    authDomain: "trainscheduler-e858c.firebaseapp.com",
    databaseURL: "https://trainscheduler-e858c.firebaseio.com",
    projectId: "trainscheduler-e858c",
    storageBucket: "trainscheduler-e858c.appspot.com",
    messagingSenderId: "20057657526",
    appId: "1:20057657526:web:0b0a6ccc285a24f73e5617",
    measurementId: "G-9BQBJ2GL5P"
};
/* // Initialize Firebase */
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Variables
//===============================================================
//get a reference to the database service
var database = firebase.database();

var train;
var destination;
var frequency;
var newTrain;
//snapshot varialbes
var newDestination;
var newFrequency;
var minutes;
var trainArrival;
var addTrain;
var refKey;
var key;

// add train form submitted
$("#formGroup").on("formSubmit",
    function(event) {
        event.preventDefault();
        // get values and push to database
        getValues("#train-name", "#train-destination", "#frequency");
        database.ref().push(addTrain);
        // also set in firebase
        var trainName = $("train-name").val().trim();
        var destination = $("train-destination").val().trim();
        var frequency = $("frequency").val().trim();

        database.ref().set({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
        });

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#frequency").val("");

        // return false;
    });

database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {


    // var firstTime = childSnapshot.val().firstTime;
    // var tFrequency = parseInt(childSnapshot.val().frequency);
    var firstTrain = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTrain);
    console.log(firstTime);
    var currentTime = moment();
    var currentTimeCalc = moment().subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minutesRemaining = tFrequency - tRemainder;
    var nextTRain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
    var beforeCalc = moment(firstTrain).diff(currentTimeCalc, "minutes");
    var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());

    if ((currentTimeCalc - firstTrain) < 0) {
        nextTrain = childSnapshot.val().firstTime;
        console.log("Before First Train");
        minutesRemaining = beforeMinutes;
    } else {
        nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
        minutesRemaining = tFrequency - tRemainder;
        console.log("Working");
    }


    var newRow = $("<tr>");
    newRow.addClass("row-" + index);
    var cell1 = $("<td>").append(updateButton);
    var cell2 = $("<td>").text(childSnapshot.val().name);
    var cell3 = $("<td>").text(childSnapshot.val().destination);
    var cell4 = $("<td>").text(childSnapshot.val().frequency);
    var cell5 = $("<td>").text(nextTrain);
    var cell6 = $("<td>").text(minutesRemaining);
    var cell7 = $("<td>").append(removeButton);

    newRow
        .append(cell1)
        .append(cell2)
        .append(cell3)
        .append(cell4)
        .append(cell5)
        .append(cell6)
        .append(cell7);

    $("#tableContent").append(newRow);

    index++;

}, function(error) {

    alert(error.code);

});

function removeRow() {
    $(".row-" + $(this).attr("data-index")).remove();
    database.ref().child($(this).attr("data-key")).remove();
};

function editRow() {
    $(".row-" + $(this).attr("data-index")).children().eq(1).html("<textarea class='newName'></textarea>");
    $(".row-" + $(this).attr("data-index")).children().eq(2).html("<textarea class='newDestination'></textarea>");
    $(".row-" + $(this).attr("data-index")).children().eq(3).html("<textarea class='newFrequency' type='number'></textarea>");
    $(this).toggleClass("updateButton").toggleClass("submitButton");
};

function submitRow() {
    var newName = $(".newName").val().trim();
    var newDestination = $(".newDestination").val().trim();
    var newFrequency = $(".newFrequency").val().trim();

    database.ref().child($(this).attr("data-key")).child("name").set(newName);
    database.ref().child($(this).attr("data-key")).child("destination").set(newDestination);
    database.ref().child($(this).attr("data-key")).child("frequency").set(newFrequency);

    $(".row-" + $(this).attr("data-index")).children().eq(1).html(newName);
    $(".row-" + $(this).attr("data-index")).children().eq(2).html(newDestination);
    $(".row-" + $(this).attr("data-index")).children().eq(3).html(newFrequency);
    $(this).toggleClass("updateButton").toggleClass("submitButton");
};

$(document).on("click", ".removeButton", removeRow);
$(document).on("click", ".updateButton", editRow);
$(document).on("click", ".submitButton", submitRow);

// Functions
// ==================================================



// On Cick
// $("").on("click", function() {

// });

// Get inputs 
// name = $("#").val().trim();
// destination = $("destination").val().trim();
// frequency = $("Frequency").val().trim();
// nextArrival = $("Next Arrival").val().trim();
// minAway = $("Minutes Away").val().trim();

//change what is saved in firebase


// })
//date formats with moment.js for time only, no date
// moment().format('LTS');

// // When user clicks the submit button
// $("submit").on("click", function(event) {
//     event.preventDefault();
//     // get the input values

// })





// database.ref("/users").set({
//     username: "trainscheduler"
// });