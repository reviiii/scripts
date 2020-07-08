// ==UserScript==
// @name         PlayerCoords
// @namespace    https://github.com/reviiii/scripts
// @version      0.1.2
// @description  Voegt coördinaten toe aan de playermarkers (de y-coördinaat is de y-coördinaat van het hoofd, niet van de voeten)
// @author       Reviiii
// @match        https://map.villagercraft.nl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $=window.$, dynmap=window.dynmap;
    $(dynmap).bind('worldupdating', checkLoaded)
    function checkLoaded() {
        if (document.getElementsByClassName("coord-control").length>0) { // this should always evaluate to true
            start();
            $(dynmap).unbind('worldupdating', checkLoaded)
        }
    }
    function start() {
        $(dynmap).bind('playerupdated', function(event, player) {
	        if (player.namefield) {
	            player.namefield.html(player.name+"<br>"+player.location.x+","+player.location.y+","+player.location.z) // this isn't the best solution as it causes a lot of DOM changes to be made
            }
	    });
        var css = ".dynmap .playerNameNoHealth { top: -16px }"
        var style = document.createElement("style")
        style.innerHTML = css
        document.head.appendChild(style)
    }
})();
