const $ = id => document.querySelector(id);

CanvasRenderingContext2D.prototype.bg = function() {
    this.fillStyle = "#111"
    this.fillRect(0,0,this.canvas.width,this.canvas.height)
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
    
    console.log(res)

    let tables = res.map(g => g.split(" ").map(p=>Number(p)))
    console.log(tables)

}

call(null)

setInterval(function(){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "/tables")
    xhr.onload = () => call(xhr.status==200?xhr.response:null)
    xhr.send()
}, 5000)
