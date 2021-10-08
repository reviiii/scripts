// ==UserScript==
// @name         Slime Chunks
// @namespace    https://github.com/reviiii/scripts
// @version      0.2.2
// @description  Adds slimechunk layer to the dynmap
// @author       Reviiii
// @match        https://map.villagercraft.nl/*
// @grant        none
// ==/UserScript==

// note: je moet op localhost een server hebben die een 4001x4001 chunks plaatje van de slimechunks geeft op /_markers_/slimechunks.png

(function() {
    'use strict';
    var markerURL = "http://localhost/"
    var imageSize = 4001;
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
            var size = imageSize*dynmap.map.options.crs.scale(dynmap.map.getZoom())
            bigMarkerStyle.innerHTML = `.dynmap .mapMarker .markerIconBig {
                transform: translate(50%, 50%);
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
        $(window.map).on("zoomanim", function() { bigMarkerStyle.innerHTML = `.dynmap .mapMarker .markerIconBig {
            display: none;
        }
        .dynmap .mapMarker .markerNameBig {
            display: none;
        }`});
        $(dynmap).bind('zoomchanged', updateBigMarkerStyle)

        // add the bigMarker markerset
        var bigMarkers = {msg:"setupdated", hide: true, id: "bigMarkers", label: "Slime Chunks", layerprio: -10, maxzoom: -1, minzoom: -1, showlabels: false, timestamp: Date.now()}
        $(dynmap).trigger("component.markers", bigMarkers);
        let o = window.dynmapmarkersets.bigMarkers
        o.lines={};o.circles={};o.areas={};o.hide=true;

        // overwrite concatURL function
        var oldConcatURL = window.concatURL
        window.concatURL = function(base, addition) {
            var magic = "overwrite:\n"
            if (addition.split(magic).length>1) {
                return addition.split(magic)[1]
            }
            return oldConcatURL.call(window, ...arguments)
        }

        // add the slimechunksmarker
        let startCoords = -(imageSize-1)/2*16
        $(dynmap).trigger("component.markers", {"msg":"markerupdated","x":startCoords+1.5,"y":68,"z":startCoords+0.5,"id":"slimeChunks","label":"","icon":"overwrite:\n"+markerURL+"_markers_/slimechunks","set":"bigMarkers","markup":false,"desc":null,"dim":"Big","minzoom":-1,"maxzoom":-1,"ctype":"markers","type":"component","timestamp":Date.now()})

        // make sure all bigMarkers arent clickable
        var bigMarkerElements = document.getElementsByClassName("markerIconBig")
        for (let i=0;i<bigMarkerElements.length;i++) {
            bigMarkerElements[i].parentElement.classList.remove("leaflet-clickable")
            bigMarkerElements[i].parentElement.style.pointerEvents = "none"
        }

        // uncheck the " Slime Chunks" checkbox in the layer control, because the hide: true doesn't work for some reason
        let controls = document.getElementsByClassName("leaflet-control-layers-overlays")[0].children
        for (let i=0;i<controls.length;i++) {
            if (controls[i].children[0].children[1].innerHTML===" Slime Chunks"&&controls[i].children[0].children[0].checked) controls[i].children[0].children[0].click()
        }
    }
})();
