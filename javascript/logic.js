$(document).ready(function() {
    // Initialize Firebase
  


  // Initialize Firebase
 
 var config = {
    apiKey: "AIzaSyAjjgtPOD0KxwAmov0MYjkehxTY5XwadqA",
    authDomain: "train-station-10828.firebaseapp.com",
    databaseURL: "https://train-station-10828.firebaseio.com",
    projectId: "train-station-10828",
    storageBucket: "train-station-10828.appspot.com",
    messagingSenderId: "473466966590"
  };
  firebase.initializeApp(config);


    var database = firebase.database();
    // Capture button Click
    $("#addTrain").on("click",function (event) {
        event.preventDefault();

// values from text boxes
var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var firstTrain = $("#firstTrain").val().trim();
var freq  = $("#interval").val().trim();

// code for the push
database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: freq
});
    });

    // Firebase watcher + initial loader 
    database.ref().on("child_added", function (childSnapshot){
        var newTrain= childSnapshop.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirstTrain = childSnapshop.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;

// first Time (pushed back 1 year to make sure it comes before current time)
var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1,"years");

// Current Time
var currentTime = moment();

//  difference between the times
var diffTime = moment().diff(moment(startTimeConverted), "minutes");

// time apart (remainder)
var tRemainder = diffTime % newFreq;
//  Minute (s) Until Train
var tMinutesTillTrain = newFreq - tRemainder;

//  Next Train
var nexTrain = moment().add(tMinutesTillTrain, "minutes");
var catchTrain = moment(nextTrain).format("HH:mm");

// Display on Page
$("#all-display").append(
    '<tr><td>' + newTrain +
    '</td><td>' + newLocation +
    '</td><td>' + newFreq +
    ' </td><td>' + catchTrain +
    ' </td><td>' + tMinutesTillTrain +  ' </td><td>');

    // clearing input fields
    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
},
// error handling
function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
});  

