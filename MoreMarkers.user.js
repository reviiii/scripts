// ==UserScript==
// @name         MoreMarkers
// @namespace    https://github.com/reviiii/scripts
// @version      0.1.1
// @description  Voegt extra markers toe aan de dynmap
// @author       Reviiii
// @match        https://map.villagercraft.nl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var config = {
        warps: true
    };
    var markers = {
        warps: JSON.parse('[{"name":"Alpenhotel","x":-5115.559,"y":63,"z":2436.451},{"name":"Antigua","x":-725.535,"y":66,"z":4510.399},{"name":"Artmuseum","x":-2612.997,"y":64,"z":2859.986},{"name":"Blazefarm","x":3439.04,"y":59,"z":5334.657},{"name":"BuddhaTempel","x":1387.294,"y":72,"z":380.342},{"name":"Cake","x":-776.136,"y":25,"z":-3539.3},{"name":"Casino","x":-2152.483,"y":67.0625,"z":-3797.42},{"name":"CheapShop","x":-4279.706,"y":63,"z":-1165.512},{"name":"City","x":-2233.007,"y":63,"z":-3746.058},{"name":"Claim","x":-4150.799,"y":66,"z":1602.65},{"name":"D4C","x":462.7,"y":78,"z":4636.327},{"name":"DivinityTown","x":-2496.735,"y":65.0625,"z":-3197.732},{"name":"Dumpplaats","x":467.3,"y":69,"z":3409.405},{"name":"Enchant","x":2381.49,"y":120,"z":-3229.39},{"name":"End_Portal","x":4231.7,"y":37,"z":-3180.7},{"name":"Flying_City","x":1536.646,"y":128,"z":-186.782},{"name":"Flying__City","x":3.003,"y":99,"z":707.57},{"name":"Games","x":-2154.569,"y":150,"z":2586.428},{"name":"Globalfarm","x":909.573,"y":78.17517,"z":3616.353},{"name":"Grand_Café","x":-2996.873,"y":74,"z":1022.562},{"name":"GratisMobDrops","x":2251.7,"y":6,"z":-363.54},{"name":"Gravel","x":-1127.411,"y":102,"z":1404.594},{"name":"Hide And Seek","x":-1332.972,"y":71,"z":-4335.669},{"name":"IJsbaan","x":4533.518,"y":63,"z":-4539.233},{"name":"Jillapark","x":3070.392,"y":68,"z":-4632.717},{"name":"Keukengang","x":4631.927,"y":130,"z":1842.513},{"name":"Mawsky","x":-2312.551,"y":11,"z":1836.439},{"name":"Mesa_Town","x":1788.554,"y":88,"z":6086.569},{"name":"Midusa","x":-1155.351,"y":71,"z":2200.577},{"name":"Mine","x":4993.554,"y":11,"z":-1696.521},{"name":"MiniGames","x":-249.488,"y":135,"z":-4280.401},{"name":"Mobfarm","x":2247.441,"y":38,"z":-359.608},{"name":"Paarden_race_baan","x":-4406.907,"y":70,"z":-1097.293},{"name":"Palais du Prisma","x":3718.163,"y":64,"z":1895.7},{"name":"Parijs","x":3481,"y":69,"z":-3064.017},{"name":"Pretpark","x":-567.294,"y":63,"z":-4874.91},{"name":"PurpleGang","x":2594.136,"y":11,"z":2715.421},{"name":"Randosia_pray2win__caviasas","x":-437.19,"y":71,"z":-1404.052},{"name":"Retro","x":-3755.38,"y":63,"z":4001.018},{"name":"Schietbaan","x":-566.27,"y":63,"z":-4875.135},{"name":"Shop","x":-2311.175,"y":33,"z":1836.576},{"name":"Slime","x":-2314.681,"y":33,"z":1836.509},{"name":"String","x":2252.511,"y":6,"z":-337.478},{"name":"Spawner_Room","x":30.247,"y":50,"z":-2915.144},{"name":"Sugarcane","x":2235.396,"y":38,"z":-383.063},{"name":"SurvivalHub","x":2998.54,"y":67,"z":3327.521},{"name":"UpHouse","x":-2963.92,"y":88,"z":953.809},{"name":"Verstoppertje","x":431.52,"y":69,"z":3426.061},{"name":"VillagerCraftTown","x":2173.199,"y":68,"z":1654.3},{"name":"Voorbeeld Outlaw","x":-558.308,"y":62.9375,"z":-4924.627},{"name":"Winkel","x":-2087.514,"y":68,"z":2665.589},{"name":"Winkelcentrum","x":-565.413,"y":63,"z":-4924.521},{"name":"XP_farm","x":2870.585,"y":30,"z":1731.876},{"name":"Zaak","x":3789.4,"y":74,"z":-988.7},{"name":"beds","x":-45.7,"y":61,"z":-688},{"name":"blaze","x":3497.047,"y":24,"z":-3031.897},{"name":"cactus","x":-3954.476,"y":66,"z":-1481.102},{"name":"firemutantbull","x":-2671.108,"y":64,"z":2789.418},{"name":"giveaway1","x":-2267.885,"y":25,"z":-3632.088},{"name":"kasteel","x":2355.714,"y":153,"z":4494.338},{"name":"maxhight","x":2316.5,"y":255.5,"z":4876.5},{"name":"mcdonalds","x":5791.827,"y":64,"z":-4671.864},{"name":"opslag","x":911.155,"y":64.5,"z":-683.949},{"name":"parkour","x":-3902.319,"y":65,"z":-949.347},{"name":"rank","x":3321.506,"y":94.78409,"z":-5459.685},{"name":"ruimtes","x":-1087.7,"y":10,"z":-715.7},{"name":"sand","x":5173.265,"y":72,"z":-1256.087},{"name":"spleef","x":-3209.996,"y":63,"z":-1202.027},{"name":"villa","x":1306.549,"y":89,"z":5489.503},{"name":"village","x":-3367.327,"y":63,"z":5089.839},{"name":"vissen","x":1355.999,"y":63,"z":-2847.829},{"name":"vuurtoren","x":-3885.478,"y":86,"z":-33.356},{"name":"vuurwerkshop","x":1306.369,"y":68,"z":2050.275}]');
    };
    var $ = window.$, dynmap = window.dynmap;
    setTimeout(()=>$(dynmap).bind('worldupdating', start), 500); // this way the first worldupdate is missed, so that the markers won't flicker
    function start() {
        if (window.dynmapmarkersets&&window.dynmapmarkersets.markers) {
            $(dynmap).unbind('worldupdating', start);
            if (config.warps) {
                let warps = markers.warps;
                for (let i=0;i<warps.length;i++) {
                    let warp = warps[i];
                    $(dynmap).trigger("component.markers", {msg:"markerupdated", x: warp.x, y: warp.y, z: warp.z, id: "warp."+warp.name, label: "/warp "+warp.name, icon: "lighthouse", set: "markers", markup: false, desc:null, dim: "16x16", minzoom: -1, maxzoom: -1, ctype: "markers", type: "component", timestamp:1595930400000});
                }
            }
        } else {
            console.log("Adding of markers failed, dynmapmarkersets:", window.dynmapmarkersets);
        }
    }
})();
