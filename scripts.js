'use strict';

const RESOLUTION = 50
const TEAM_A_COLOR = 'blue'
const TEAM_B_COLOR = 'white'

const mobile = window.innerWidth < window.innerHeight
let grid = []


function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}
function setTeam(col) {
    // TODO : init color as it should be
    return randn_bm(0, RESOLUTION - 1, 1) < col ? TEAM_A_COLOR : TEAM_B_COLOR
}
function getRelative(row, col, x, y) {
    let n = $(`${row + x}-${col + y}`)
    console.log(n)
}

let thresold = randn_bm(0, RESOLUTION - 1, 1)
for (let row = 0; row < RESOLUTION; row++) {
    let _row = []
    thresold = randn_bm(0, RESOLUTION - 1, 1) < thresold ? thresold - 1 : thresold + 1

    for (let col = 0; col < RESOLUTION; col++) {
        _row.push(thresold < col ? TEAM_A_COLOR : TEAM_B_COLOR)
    }
    grid.push(_row)
}

const app = $('#app')

grid.forEach((row, i) => {
    let $row = $(document.createElement("div"))
    $row.addClass(`r r-${i}`)  
    row.forEach((col, j) => {
        let $col = $(document.createElement("div")).attr('id', `${i}-${j}`)
        $col.addClass(`c c-${j} team-${col}`)
        $col.css("height", `calc(100${mobile ? 'vw' : 'vh'} / ${RESOLUTION})`)
        $col.css("width", `calc(100${mobile ? 'vw' : 'vh'} / ${RESOLUTION})`)
        $col.css("background-color", col)      
        $row.append($col)
    })
    app.append($row)
})

getRelative(5, 5, 0, 0)

console.log(grid)
