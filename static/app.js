const $ = id => document.querySelector(id);
const tables = $("data").innerHTML.split("\n").map(g=>g.split(" ").map(p=>+p));
tables.forEach(g => {
	let table = document.createElement('div')
	table.classList.add("table")
	table.innerHTML = "Loader..."
	$('#tables').appendChild(table)
})

setInterval(() => {
    let ms = Date.now()
    document.querySelectorAll(".table").forEach((g,i)=>{
        g.innerHTML = `${Math.round(1e-3*(tables[i][0]-ms),0)}s`
    })
},1000)
