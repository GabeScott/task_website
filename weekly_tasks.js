let globalday=0
let globalname="gabe"

function addTask(){
	document.getElementsByClassName("close")[0].click()

	divID = globalname+globalday;

	numTasks = getNumTasksForDay(globalname, globalday)

	checked = getCheckedBoxes(globalname, globalday)

	newCheckboxId = `task${numTasks}day${globalday+1}${globalname}`

	tableId = name+"table";
	document.getElementById(divID).innerHTML += `<input type="checkbox" id="${newCheckboxId}" onclick="updatePercent('${globalname}', ${globalday})">
        <label for="${newCheckboxId}" title="Task ${numTasks+1} description">Task ${numTasks+1}</label><br>`

    preserveChecks(globalname, globalday, checked)
    updatePercent(globalname, globalday)
}


function getCheckedBoxes(name, day){
	numInputs = document.getElementById(name+day).getElementsByTagName('input').length;
	checked = [];
	for(var i = 0; i < numInputs; i++){
		if(document.getElementById(name+day).getElementsByTagName('input')[i].checked)
			checked.push(i);
	}

	return checked;
}


function preserveChecks(name, day, checked){
	for(var i = 0; i < checked.length; i++)
		document.getElementById(name+day).getElementsByTagName('input')[checked[i]].checked = true;
}

function getNumTasksForDay(name, day){
	tableId = name+"table";

	tableCell = document.getElementById(tableId).rows[1].cells[day];
	numTasks = tableCell.getElementsByTagName('label').length;

	return numTasks
}

function openTaskMenu(name, day){
	globalday = day;
	globalname = name;
	document.getElementById("addTaskModal").style.display="block"

	window.onclick = function(event) {
	  if (event.target == document.getElementById("addTaskModal")) {
	    document.getElementById("addTaskModal").style.display = "none";
	  }
	}

	document.getElementsByClassName("close")[0].onclick = function() {
	  document.getElementById("addTaskModal").style.display = "none";
	}
}


function updatePercent(name, day){
	numInputs = document.getElementById(name+day).getElementsByTagName('input').length;
	total = 0;
	for(var i = 0; i < numInputs; i++){
		if(document.getElementById(name+day).getElementsByTagName('input')[i].checked)
			total += 1
	}

	tableId = name+"table";

	tableCell = document.getElementById(tableId).rows[2].cells[day];

	tableCell.innerHTML = Math.round(total/numInputs*100.0)+"%"
}