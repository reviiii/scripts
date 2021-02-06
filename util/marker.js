function createMarkerset({hide=true, id, label, layerprio=0, maxzoom=-1, minzoom=-1, showlabels=false, timestamp=Date.now()}) {
    $(dynmap).trigger("component.markers", {msg:"setupdated", hide, id, label, layerprio, maxzoom, minzoom, showlabels, timestamp});
    var o = window.dynmapmarkersets[id];
    o.lines={};o.circles={};o.areas={};o.hide=hide;
    return o;
}

function createMarker({x, y=68, z, id, label, icon, iconBase=dynmap.options.url.markers, set="markers", markup=false, desc=null, dim="16x16", minzoom=-1, maxzoom=-1, timestamp=Date.now()}) {
    var oldBase = dynmap.options.url.markers;
    dynmap.options.url.markers = iconBase;
    $(dynmap).trigger("component.markers", {msg:"markerupdated", x, y, z, id, label, icon, set, markup, desc, dim, minzoom, maxzoom, ctype:"markers", type:"components", timestamp});
    dynmap.options.url.markers = oldBase;
    return window.dynmapmarkersets[set][id];
}
