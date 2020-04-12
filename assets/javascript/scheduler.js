//train application that incorporates Firebase to house the arrival and departure data
//retrieve and manipulate the information with moment.js
//provide up-to-date information about various trains
//arrival times
//how many minutes remain until they arrive at the station

// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyCCgdsUpFhc4Vz9xlikRAYm8vb-DsVgzgk",
    authDomain: "week7-scheduler.firebaseapp.com",
    databaseURL: "https://week7-scheduler.firebaseio.com",
    projectId: "week7-scheduler",
    storageBucket: "week7-scheduler.appspot.com",
    messagingSenderId: "25269581982",
    appId: "1:25269581982:web:a0ab851caf9ba95c55638f",
    measurementId: "G-07YYPMCVGY"
};
/* // Your web app's Firebase configuration */
// var firebaseConfig = {
//     apiKey: "AIzaSyAo69pU-EG7ldTuJrs4IpM3vvoi_fALyFA",
//     authDomain: "trainscheduler-e858c.firebaseapp.com",
//     databaseURL: "https://trainscheduler-e858c.firebaseio.com",
//     projectId: "trainscheduler-e858c",
//     storageBucket: "trainscheduler-e858c.appspot.com",
//     messagingSenderId: "20057657526",
//     appId: "1:20057657526:web:0b0a6ccc285a24f73e5617",
//     measurementId: "G-9BQBJ2GL5P"
// };
/* // Initialize Firebase */
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Variables
//===============================================================
//get a reference to the database service
var database = firebase.database();

var train;
var destination;
var frequency;
var newTrain;
//snapshot variables
var newDestination;
var newFrequency;
var minutesRemaining;
var trainArrival;
var addTrain;
var refKey;
var key;

// add train form submitted
$("#formGroup").on("formSubmit", function(event) {
        event.preventDefault();
        // get values and push to database
        getValues("#train-name", "#train-destination", "#frequency");
        database.ref().push(addTrain);
        // also set in firebase
        $("train-name").val().trim();
        $("train-destination").val().trim();
        $("frequency").val().trim();
    })
    //create train object
addTrain = {
    trainName: trainName,
    destination: destination,
    frequency: frequency
}

function convertTime(snapshot) {
    newTrain = snapshot.val().train;
    newDestination = snapshot.val().destination;
    newFrequency = snapshot.val().frequency;

    //database finds arrival time and minutes away
    var timeConverted = moment(newTrainTime, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    var timeLeftOver = timeDifference % newFrequency;
    minutesRemaining = newFrequency - timeLeftOver;
    trainArrival = moment().add(minutesRemaining, "minutes").format("hh:mm");
}
// train
function createTrain() {
    var rowElement = $("<div>").attr("data-key", refKey).addClass("row-train");
    var nameCell = $("<div>").addClass("trainItem").text(newTrain);
    var destination = $("<span>").text()
}


//object added to database

database.ref().on("line_added", function(snapshot) {
    refKey = snapshot.key;
    convertTime(snapshot);
    createTrain();
})

database.ref().on("line_changed", function(snapshot) {
    convertTime(snapshot);
    $(".train-row").each(function() {
        if ($(this).attr("data-key") === key) {
            //update html with new form values
            $(this).children(".train-cell").text(newTrain);
            $(this).children(".destination-container").children(".destination-cell").text(newDestination);
            $(this).children(".frequency-cell").text(newFrequency);
            $(this).children(".arrival-cell").attr("data-time", newTrainTime).text(trainArrival);
            $(this).children(".minutes-cell").text(minutesRemaining);
        }
    })
})