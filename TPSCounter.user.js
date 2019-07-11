// ==UserScript==
// @name         TPSCounter
// @namespace    https://github.com/reviiii/scripts
// @version      1.9
// @description  Voegt een TPSCounter toe aan de dynmap van villagercraft
// @author       Reviiii
// @match        http://mc.villagercraft.nl:8050/*
// @grant        none
// ==/UserScript==
// als je de dynmap wilt overclocken kan je dynmap.options.updaterate veranderen
(function() {
var checkInterval = setInterval(checkLoaded, 100);
function checkLoaded() {
    if (document.getElementsByClassName("coord-control").length>0) {
       setTimeout(start, 100);
       clearInterval(checkInterval);
    }
}
function start() {
var label = document.createElement("span");
label.innerHTML = 'TPS:';
label.className = "coord-control-label"
var tpsvalue = document.createElement("span");
tpsvalue.innerHTML = "--";
tpsvalue.className = "coord-control-value";
tpsvalue.id = "tps";
var coord = document.getElementsByClassName("coord-control")[0];
coord.appendChild(document.createElement("br"));
coord.appendChild(label);
coord.appendChild(document.createElement("br"));
coord.appendChild(tpsvalue);

$(dynmap).bind('worldupdated', function(event, update) {
    window.TPSCounter.update(update.servertime, update.timestamp);
});

var arrSize = 100000;
window.TPSCounter = {
    arrSize: arrSize,
    dateArr: new Float64Array(arrSize),
    timeArr: new Float64Array(arrSize),
    oldCounter: arrSize-1, // prevent triggering of underflow detection
    newCounter: 0,
    day: 0,
    period: 60000,
    update: function(time, d) {
        // var d = new Date();
        // d = d.getTime();
        this.dateArr[this.newCounter] = d;
        time += this.day*24000;
        if (time<this.timeArr[this.newCounter-1]) {
            this.day++;
            time += 24000;
        }
        this.timeArr[this.newCounter] = time;
        if (this.oldCounter===this.newCounter) { // make sure that oldCounter  doesn't underflow
            this.oldCounter++;
            this.oldCounter %= this.arrSize;
        }
        var newDate = d-this.period;
        while (this.dateArr[this.oldCounter]<newDate) {
            this.oldCounter++;
            this.oldCounter %= this.arrSize;
        }
        var tps = Math.round(((this.timeArr[this.newCounter]-this.timeArr[this.oldCounter])/(this.dateArr[this.newCounter]-this.dateArr[this.oldCounter]))*100000)/100;
        if (!Number.isNaN(tps)) {
            document.getElementById("tps").innerHTML = tps.toString();
            // document.getElementById("tps").title = ((this.dateArr[this.newCounter]-this.dateArr[this.oldCounter])/1000).toString()+"s";
        } else {
            document.getElementById("tps").innerHTML = "--"
        }
        this.newCounter++;
        this.newCounter %= this.arrSize;
    }
}
}
})()
