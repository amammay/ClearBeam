import clock from "clock";
import document from "document";
import userActivity from "user-activity";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
import { locale } from "user-settings";

import * as util from "../common/utils";

// Update the clock every second
clock.granularity = "seconds";
//Clock preferences 12h/24h
const clockPref = preferences.clockDisplay;
// Counter for switching colors by click
let counter = 0;
// Switch for RestingHeartRate
let switcher = false;

// Get a handle on the various elements
let myHour = document.getElementById("myHour");
let myMinute = document.getElementById("myMinute");
let mySecond = document.getElementById("mySecond");
let myDate = document.getElementById("myDate");
let myDay = document.getElementById("myDay");
let dailysteps = document.getElementById("mySteps");
let dailystairs = document.getElementById("myStairs");
let dailycals = document.getElementById("myCals");
let dailymins = document.getElementById("myMins");
let leftsection = document.getElementById("leftSide");
let rightsection = document.getElementById("rightSide");
let currentheart = document.getElementById("myHR");
let restingheart = document.getElementById("myRestHR");
let heartRing = document.getElementById("hrtArc");
let stepRect = document.getElementById("stepsRect");
let calRect = document.getElementById("calsRect");
let stairRect = document.getElementById("stairsRect");
let minRect = document.getElementById("minsRect");
let stepBeam = document.getElementById("stepsBeam");
let calBeam = document.getElementById("calsBeam");
let stairBeam = document.getElementById("stairsBeam");
let activeBeam = document.getElementById("activeBeam");
let stepgrad = document.getElementById("stepGradient");
let calgrad = document.getElementById("calGradient");
let stairgrad = document.getElementById("stairGradient");
let activegrad = document.getElementById("activeGradient");
let colBtn = document.getElementById("colorBtn");

function updateStats() {
  // Get Goals to reach and current values
  const distanceGoal = userActivity.goals.distance;
  const metricSteps = "steps";
  const amountSteps = userActivity.today.adjusted[metricSteps] || 0;
  const stepsGoal = userActivity.goals[metricSteps];
  const metricCals = "calories";
  const amountCals = userActivity.today.adjusted[metricCals] || 0;
  const caloriesGoal = userActivity.goals[metricCals];
  const metricActive = "activeMinutes";
  const amountActive = userActivity.today.adjusted[metricActive] || 0;
  const activeGoal = userActivity.goals[metricActive];
  const metricElevation = "elevationGain";
  const amountElevation = userActivity.today.adjusted[metricElevation] || 0
  const elevationGoal = userActivity.goals[metricElevation];
  let stepString = util.thsdDot(amountSteps);
  let calString = util.thsdDot(amountCals);
  // The delivered values for caloriesGoal and elevationGoal are strange... thus a (personal) correction - if necessary
  if (caloriesGoal > 5000) {
    caloriesGoal = 3029;
  }
  if (elevationGoal > 80) {
    elevationGoal = 10;
  }
  if (activeGoal > 180) {
    activeGoal = 30;
  }
  dailysteps.innerText = stepString; 
  let stepWidth = Math.floor(100-100*(amountSteps/stepsGoal));
  if ( stepWidth < 0 ) {
    stepWidth = 0;
  }
  stepRect.width = stepWidth;
  dailycals.innerText = calString; 
  let calWidth = Math.floor(100-100*(amountCals/caloriesGoal));
  if ( calWidth < 0 ) {
    calWidth = 0;
  }
  calRect.width = calWidth;
  dailystairs.innerText = amountElevation; 
  let stairWidth = Math.floor(100-100*(amountElevation/elevationGoal));
  if ( stairWidth < 0 ) {
    stairWidth = 0;
  }
  stairRect.width = stairWidth;
  dailymins.innerText = amountActive; 
  let activeWidth = Math.floor(100-100*(amountActive/activeGoal));
  if ( activeWidth < 0 ) {
    activeWidth = 0;
  }
  minRect.width = activeWidth;
}

var hrm = new HeartRateSensor();

hrm.onreading = function () {
  currentheart.innerText=(hrm.heartRate || "--");
  let heartAngle = Math.floor(360*(hrm.heartRate/190));
  if ( heartAngle > 360 ) {
    heartAngle = 360;
  }
  heartRing.sweepAngle = heartAngle;
}
hrm.start();

// Update the display
function updateClock() {
  let lang = locale.language;
  let today = new Date();
  let day = today.getDate();
  let wday = today.getDay();
  let month = today.getMonth();
  let year = today.getFullYear();
  let hours = util.monoDigits(util.zeroPad(util.formatHour(today.getHours(), clockPref)));
  let mins = util.monoDigits(util.zeroPad(today.getMinutes()));
  let secs = util.zeroPad(today.getSeconds());
  let rest = (user.restingHeartRate || "--");
  if ( (util.monthName[lang][month] == null) || (util.weekday[lang][wday] == null) ) {
    lang = "en-US";
  }
  myHour.innerText = `${hours}`;
  myMinute.innerText = `${mins}`;
  mySecond.innerText = `${secs}`;
  myDate.innerText = `${day}. ${util.monthName[lang][month].toUpperCase()}`;
  myDay.innerText = `${util.weekday[lang][wday].toUpperCase()}`;
  restingheart.innerText = "R:"+`${rest}`;
  updateStats();
}

// Apply theme colors to elements
function applyTheme(background, foreground) {
  myMinute.style.fill = background;
  mySecond.style.fill = background;
  leftsection.style.fill = background;
  stepBeam.style.fill = background;
  calBeam.style.fill = background;
  stairBeam.style.fill = background;
  activeBeam.style.fill = background;
  stepgrad.style.fill = foreground;
  calgrad.style.fill = foreground;
  stairgrad.style.fill = foreground;
  activegrad.style.fill = foreground;
}

colBtn.onactivate = function(evt) {
  console.log("Activated!");
  switch (counter) {
      case 0:
        applyTheme("#5b4cff", "#17f30c"); //blau
        counter = 1;
        break;
      case 1:
        applyTheme("#ff9d00", "#ffff00"); //orange
        counter = 2;
        break;
      case 2:
        applyTheme("#b400ff", "#003aff"); //violett
        counter = 3;
        break;
      case 3:
        applyTheme("#008888", "#00eeee"); //cyan
        counter =4;
        break;
      case 4:
        applyTheme("#776600", "#eedd00"); //gold
        counter = 5;
        break;
      case 5:
        applyTheme("#cc0000", "#ffd900"); //red
        counter = 0;
        break;
      default:
        applyTheme("#cc0000", "#ff9d00"); //red
        counter = 0;
    }
}

// Update the clock every tick event
clock.ontick = () => updateClock();

// Don't start with a blank screen
updateClock();