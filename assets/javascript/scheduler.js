//train application that incorporates Firebase to house the arrival and departure data
//retrieve and manipulate the information with moment.js
//provide up-to-date information about various trains
//arrival times
//how many minutes remain until they arrive at the station
$(document).ready(function() {

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
    /* // Original Firebase configuration. Created a new one, above because it isn't reading*/
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


    // add train form submitted
    $("#formSubmit").on("click", function(event) {
        event.preventDefault();
        console.log("Why ME?")
            // get values from html
        var train = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var frequency = $("#frequency").val().trim();
        var firstTrainTime = $("#train-time").val().trim();

        //clear user input after submission
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#frequency").val("");
        $("#train-time").val("");

        // move variables into the firebase
        database.ref().push({
            trainName: train,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime
        });
        console.log(train + destination + frequency + firstTrainTime);
    });

    // define function



    //call functions if a child is added to database

    database.ref().on("child_added", function(snapshot) {
        console.log("made it!");
        // var refKey = snapshot.key;
        var train = snapshot.val().trainName;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrainTime = snapshot.val().firstTrainTime;

        //database finds arrival time and minutes away
        var timeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(timeConverted), "minutes");
        var timeLeftOver = timeDifference % frequency;
        var minutesAway = frequency - timeLeftOver;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");

        $("#tableContent").prepend("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" +
            nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    }, function(err) {
        console.log("Firebase Sucks!");
    });

});