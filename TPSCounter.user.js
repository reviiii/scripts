// ==UserScript==
// @name         TPSCounter
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Voegt een TPSCounter toe aan de dynmap van villagercraft
// @author       Reviiii
// @match        http://mc.villagercraft.nl:8050/
// @grant        none
// ==/UserScript==
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
    window.TPSCounter.update(update.servertime);
});

window.TPSCounter = {
    dateArr: [],
    timeArr: [],
    oldCounter: 0,
    newCounter: 0,
    day: 0,
    period: 60000,
    update: function(time) {
        var d = new Date();
        d = d.getTime();
        this.dateArr[this.newCounter] = d;
        time += this.day*24000;
        if (time<this.timeArr[this.newCounter-1]) {
            this.day++;
            time += 24000;
        }
        this.timeArr[this.newCounter] = time;
        var newDate = d-this.period;
        while (this.dateArr[this.oldCounter]<newDate) {
            this.oldCounter++;
        }
        var tps = Math.round(((this.timeArr[this.newCounter]-this.timeArr[this.oldCounter])/(this.dateArr[this.newCounter]-this.dateArr[this.oldCounter]))*100000)/100;
        if (this.newCounter>0) {
            document.getElementById("tps").innerHTML = tps.toString();
            // document.getElementById("tps").title = ((this.dateArr[this.newCounter]-this.dateArr[this.oldCounter])/1000).toString()+"s";
        }
        this.newCounter++;
    }
}
}
})()
