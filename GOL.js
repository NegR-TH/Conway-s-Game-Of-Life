var StartBtn = document.getElementById('startBtn');
var table = document.getElementById('tab');

var row = 23;
var colum = 70;
var people = new Array(row * colum);

const board = [];

for (let i = 0; i < row; i++) {
    tr = document.createElement('tr');
    const rowA = []
    for (let j = 0; j < colum; j++) {
        td = document.createElement('td')
        td.setAttribute("id", "td-" + i + "-" + j);
        const cell = {
            td, i, j, populate: 0
        }
        var isLive = td.classList.contains('live');
        if (cell.i === 12 && cell.j === 36) {
            td.classList.add('live')
        }
        if (cell.i === 13 && cell.j === 37) {
            td.classList.add('live')
        }
        if (cell.i === 14 && cell.j === 37) {
            td.classList.add('live')
        }
        if (cell.i === 14 && cell.j === 36) {
            td.classList.add('live')
        }
        if (cell.i === 14 && cell.j === 35) {
            td.classList.add('live')
        }
        tr.append(td);
        rowA.push(cell)
        people[i * j];
    }
    table.append(tr);
    board.push(rowA)
}
var allTds = document.querySelectorAll('#tab td');
for (let i = 0; i < allTds.length; i++) {
    allTds[i].addEventListener('click', function () {
        var td = this;
        var isLive = td.classList.contains('live');
        if (isLive) {
            td.classList.remove('live');
        }
        else {
            td.classList.add('live');
        }
        console.log(isLive)
    });
}

StartBtn.addEventListener('click', function () {
    var x = setInterval(() => {
        // make cell.populate null
        board.forEach(rowA => {
            rowA.forEach(cell => {
                cell.populate = 0;
            })
        })
        // make check cell.populate of all cells
        board.forEach(rowA => {
            rowA.forEach(cell => {
                checkNeighbour(cell)
            })
        })
        // finde which will born,
        board.forEach(rowA => {
            rowA.forEach(cell => {
                var td = cell.td;
                var isLive = td.classList.contains('live');
                if (!isLive && cell.populate === 3) {
                    td.classList.add('live')
                    console.log('new born');
                }
            })
        })
        // finde which will survive
        board.forEach(rowA => {
            rowA.forEach(cell => {
                var td = cell.td;
                var isLive = td.classList.contains('live');
                if (isLive && (cell.populate === 2 || cell.populate === 3)) {
                    console.log('survive');
                }
            })
        })
        // finde which will survive or die
        board.forEach(rowA => {
            rowA.forEach(cell => {
                var td = cell.td;
                var isLive = td.classList.contains('live');
                if (isLive && (cell.populate === 0 || cell.populate === 1 || cell.populate >= 4)) {
                    td.classList.remove('live')
                    console.log('Dead');
                }
            })
        })
    }, 500);
})

function checkNeighbour(cel) {
    // cel.populate = 0;
    const nearies = []
    for (let iOf = -1; iOf <= 1; iOf++) {
        for (let jOf = -1; jOf <= 1; jOf++) {
            if (iOf == 0 && jOf == 0) {
                continue;
            }
            if (cel.i + iOf >= 0 && cel.i + iOf < row && cel.j + jOf >= 0 && cel.j + jOf < colum) {
                const neary = board[cel.i + iOf][cel.j + jOf]
                nearies.push(neary)
                var td = neary.td;
                var isLive = td.classList.contains('live');
                if (isLive) {
                    cel.populate++
                }
            }
        }
    }
    console.log(cel.populate);
    console.log(nearies)
}
