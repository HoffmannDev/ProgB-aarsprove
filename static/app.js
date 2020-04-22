const $ = id => document.querySelector(id);
const tables = $("data").innerHTML.split("\n").map(g=>g.split(" ").map(p=>+p));
tables.forEach(g => {
	let table = document.createElement('div')
	table.classList.add("table")
	table.innerHTML = g[0]
	$('#tables').appendChild(table)
})
