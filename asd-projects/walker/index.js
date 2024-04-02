/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
 
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
 
  // Game Item Objects
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,  
  };

  var KEY2 = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };

  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }

  // one-time setup

  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                            // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /*
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    newColor();
    wallCollision();
    redrawGameItem();
  }
 
  /*
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      console.log("left pressed")
      walker.speedX = -5
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed")
      walker.speedX = 5
    } else if (event.which === KEY.UP) {
      console.log("up pressed")
      walker.speedY = -5
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed")
      walker.speedY = 5
    }
  }
 
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = 0
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 0
    } else if (event.which === KEY.UP) {
      walker.speedY = 0
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function repositionGameItem() {
    walker.positionX += walker.speedX
    walker.positionY += walker.speedY
  }

  function wallCollision() {
    if (walker.positionX >= $("#board").width()-50) {
      walker.positionX = $("#board").width()-50
      walker.speedX = 0
    } else if (walker.positionX <= 0) {
      walker.positionX = 0
      walker.speedX = 0
    }

    if (walker.positionY >= $("#board").height()-50) {
      walker.positionY = $("#board").height()-50;
      walker.speedY = 0;
    } else if (walker.positionY <= 0) {
      walker.positionY = 0;
      walker.speedY = 0;
    }
  }

  function newColor() {
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    $("#walker1").css("background-color",randomColor)
 
  }
  function redrawGameItem() {
    $("#walker1").css("left", walker.positionX)
    $("#walker1").css("top", walker.positionY)
  }

 

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
 
}