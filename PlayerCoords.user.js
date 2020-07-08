// ==UserScript==
// @name         PlayerCoords
// @namespace    https://github.com/reviiii/scripts
// @version      0.1.5
// @description  Voegt coördinaten toe aan de playermarkers (de y-coördinaat is de y-coördinaat van het hoofd, niet van de voeten)
// @author       Reviiii
// @match        https://map.villagercraft.nl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $=window.$, dynmap=window.dynmap;
    $(dynmap).bind('worldupdating', start)
    function start() {
        $(dynmap).unbind('worldupdating', start)
        function main(event, player) {
            if (player.namefield) {
                player.namefield.html(player.name+"<br>"+player.location.x+","+player.location.y+","+player.location.z) // this isn't the best solution as it causes a lot of DOM changes to be made
            }
        }
        $(dynmap).bind('playeradded', main);
        $(dynmap).bind('playerupdated', main);
        var style = document.createElement("style")
        style.innerHTML = ".dynmap .playerNameNoHealth { top: -19px }"
        document.head.appendChild(style)
    }
})();
