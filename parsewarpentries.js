function parseEntry(entry, entryNum) {
    entry = entry.split("\t")
    if (entry.length!==2) throw new Error("Invalid entry")
    let coords = entry[1].split(" ").map(Number)
    if (coords.length!==3) throw new Error("Invalid number of coords, expected 3 got "+coords.length)
    for (let i=0;i<coords.length;i++) {
        if (Number.isNaN(coords[i])) throw new Error("Coordinate is not a number")
    }
    return {name: entry[0], x: coords[0], y: coords[1], z: coords[2]}
}
function parseEntries(entries) {
    return entries.split("\n").map(parseEntry)
}
