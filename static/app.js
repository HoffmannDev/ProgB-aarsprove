const $ = id => document.querySelector(id);

CanvasRenderingContext2D.prototype.bg = function() {
    this.fillStyle = "#111"
    this.fillRect(0,0,this.canvas.width,this.canvas.height)
}

function map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}

// const tables = $("data").innerHTML.split("\n").map(g=>g.split(" ").map(p=>+p));
// tables.forEach(g => {
// 	let table = document.createElement('div')
// 	table.classList.add("table")
// 	table.innerHTML = "Loader..."
// 	$('#tables').appendChild(table)
// })

// setInterval(() => {
//     let ms = Date.now()
//     document.querySelectorAll(".table").forEach((g,i)=>{
//         g.innerHTML = `${Math.round(1e-3*(tables[i][0]-ms),0)}s`
//     })
// },1000)

const canvas = $('#canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
const ctx = canvas.getContext('2d')

function rtable(timeleft,px,py) {
    if (timeleft < 60000) {
        ctx.fillStyle = "#c11"
    } else {
        ctx.fillStyle = "#1c1"
    }
    ctx.fillRect(px, py, 20, 20)
    ctx.fillStyle = "#fff"

    if (timeleft > 0) {
        ctx.fillText(`${Math.round(1e-3*(timeleft),0)}s`,px+30,py)
    } else {
        ctx.fillText("Ready", px+30, py)
    }
}

function call(res) {
    ctx.bg()
    if (!res) {
        ctx.fillStyle = "#fff"
        ctx.font= "30px Arial"
        ctx.fillText("Loading...", 10, 50)
        return
    }

    res = res.split("\n")
    let server_time = res.shift()
    
    console.log(res, server_time)

    let tables = res.map(g => g.split(" ").map(p=>Number(p)))
    for (let i = 0; i < tables.length; i++) {
        let timeleft = tables[i][0] - server_time
        let px = map(tables[i][1], 0, 100, 20, canvas.width-20)
        let py = map(tables[i][2], 0 , 100, 20, canvas.height-20)
        rtable(timeleft, px, py)

    }

    console.log(tables)

}

call(null)

setInterval(function(){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "/tables")
    xhr.onload = () => call(xhr.status==200?xhr.response:null)
    xhr.send()
}, 5000)
