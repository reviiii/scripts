// ==UserScript==
// @name         Big Spawn
// @namespace    https://github.com/reviiii/scripts
// @version      0.1.5
// @description  Adds bigger spawn icon to the dynmap
// @author       Reviiii
// @match        https://map.villagercraft.nl/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $=window.$, dynmap=window.dynmap;
    $(dynmap).bind('worldupdating', start)
    function start() {
        $(dynmap).unbind('worldupdating', start)
        // add new styles
        var bigMarkerStyle = document.createElement("style")
        document.head.appendChild(bigMarkerStyle)
        updateBigMarkerStyle()

        // make sure all bigMarkers are the right size
        function updateBigMarkerStyle() {
            var size = 1001*2/dynmap.map.getZoomScale()
            bigMarkerStyle.innerHTML = `.dynmap .mapMarker .markerIconBig {
                transform: translate(-50%, -50%);
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
                opacity: 0.9;
            }
            .dynmap .mapMarker .markerNameBig {
                top: ${2-2*Math.log2(size)}px;
                left: ${size/2+2}px;
            }`
        }
        $(dynmap).bind('zoomchanged', updateBigMarkerStyle)

        // add the bigMarker markerset
        var bigMarkers = {msg:"setupdated", hide: true, id: "bigMarkers", label: "Big Spawn Icon", layerprio: -10, maxzoom: -1, minzoom: -1, showlabels: false, timestamp: Date.now()}
        $(dynmap).trigger("component.markers", bigMarkers);
        let o = window.dynmapmarkersets.bigMarkers
        o.lines={};o.circles={};o.areas={};o.hide=true;

        // add the icon
        $(dynmap).trigger("component.markers", {"msg":"markerupdated","x":8,"y":68,"z":8,"id":"_big_spawn","label":"","icon":"world","set":"bigMarkers","markup":false,"desc":null,"dim":"Big","minzoom":-1,"maxzoom":-1,"ctype":"markers","type":"component","timestamp":Date.now()})

        // make sure all bigMarkers arent clickable
        var bigMarkerElements = document.getElementsByClassName("markerIconBig")
        for (let i=0;i<bigMarkerElements.length;i++) {
            bigMarkerElements[i].parentElement.classList.remove("leaflet-clickable")
            bigMarkerElements[i].parentElement.style.pointerEvents = "none"
        }

        // uncheck the " Big Spawn" checkbox in the layer control, because the hide: true doesn't work for some reason
        let controls = document.getElementsByClassName("leaflet-control-layers-overlays")[0].children
        for (let i=0;i<controls.length;i++) {
            if (controls[i].children[1].innerHTML===" Big Spawn"&&controls[i].children[0].checked) controls[i].children[0].click()
        }
    }
})();
