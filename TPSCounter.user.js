// ==UserScript==
// @name         TPSCounter
// @namespace    https://github.com/reviiii/scripts
// @version      2.0
// @description  Voegt een TPSCounter toe aan de dynmap van villagercraft
// @author       Reviiii
// @match        https://map.villagercraft.nl/*
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
    precision: 100,
    update: function(time, d) {
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
        var tps = Math.round(((this.timeArr[this.newCounter]-this.timeArr[this.oldCounter])/(this.dateArr[this.newCounter]-this.dateArr[this.oldCounter]))*1000*this.precision)/this.precision;
        if (!Number.isNaN(tps)) {
            document.getElementById("tps").innerHTML = tps.toString();
            // document.getElementById("tps").title = ((this.dateArr[this.newCounter]-this.dateArr[this.oldCounter])/1000).toString()+"s";
        } else {
            document.getElementById("tps").innerHTML = "--"
        }
        this.newCounter++;
        this.newCounter %= this.arrSize;
    },
    setOption: function(option, value) {
        if (Number.isNaN(value)||typeof value!=="number") {
            throw new Error("Value is Not a Number");
        }
        switch (option) {
            case "period":
                if (value<0) {
                    throw new Error("Time travel isn't possible");
                    return;
                }
                this.period = value;
                var d = this.dateArr[(this.newCounter-1+this.arrSize)%this.arrSize]-value;
                if (d>0) {
                    while (this.dateArr[this.oldCounter]>d) { // change oldCounter to speed up period change
                        this.oldCounter += this.arrSize-1;
                        this.oldCounter %= this.arrSize;
                    }
                    this.oldCounter += 1; // correct oldCounter, as it is now 1 too low
                    this.oldCounter %= this.arrSize;
                } else if (this.dateArr[this.newCounter]===0) {
                    this.oldCounter = 0;
                } else {
                    this.oldCounter = this.newCounter
                }
                return "period set to "+value.toString()+" ms and oldCounter to "+this.oldCounter;
                break;
            case "precision":
                this.precision = value;
                return "precision set to "+value.toString()+" ("+Math.log10(value).toString()+" digits)";
                break;
        }
    },
    toggleGUI: function() { // currently no GUI element is present
        if (document.getElementById("TPSCounter_GUI").style.visibility==="visible") {
            document.getElementById("TPSCounter_GUI").style.visibility = "hidden";
        } else {
            document.getElementById("TPSCounter_GUI").style.visibility = "visible";
        }
    }
} // end of object
} // end of function start
})()
