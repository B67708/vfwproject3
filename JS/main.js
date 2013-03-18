// John Cardiff-Winchell
// VFW 1303
// Project week 2

// Wait until DOM is loaded
window.addEventListener("DOMContentLoaded",function(){

// Function to get elements by id
function gid(x){
	var element = document.getElementById(x);
	return element;
}
// Creates form for make drop down menu.
function dropDown1(){
	var formTag = document.getElementsByTagName("form"),
		pickLi = gid("make"),
		createSelect = document.createElement("select");
		createSelect.setAttribute("id", "makes");
		for(var i=0, j=makeList.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optionTxt = makeList[i];
			makeOption.setAttribute("value", optionTxt);
			makeOption.innerHTML = optionTxt;
			createSelect.appendChild(makeOption);
		}		
		pickLi.appendChild(createSelect)
}	
	
// Creates form for model drop down menu.
function dropDown2(){
	var formTag = document.getElementsByTagName("form"),
		pickLi = gid("model"),
		createSelect = document.createElement("select");
		createSelect.setAttribute("id", "models");
		for(var i=0, j=modelList.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optionTxt = modelList[i];
			makeOption.setAttribute("value", optionTxt);
			makeOption.innerHTML = optionTxt;
			createSelect.appendChild(makeOption);
		}		
		pickLi.appendChild(createSelect)
}

//Find value of selected radio button
function getRadio(){
	var rad = document.forms[0].newUsed;
		for(var i=0; i<rad.length; i++){
			if(rad[i].checked){
				newUsedValue = rad[i].value;
			}
		}
}

// Making switch case function to toggle links

function toggle(x){
	switch(x){
		case "on":
			gid("vehLib").style.display = "none";
			gid("clear").style.display = "inline";
			gid("display").style.display = "none";
			gid("addCar").style.display = "inline";
			break;
		case "off":
			gid("vehLib").style.display = "block";
			gid("clear").style.display = "inline";
			gid("display").style.display = "inline";
			gid("addCar").style.display = "none";
			gid("item").style.display = "none";
			break;
		default:
			break;
			return false;
		}
	
}

// Making save data function
function submitData(key){
	if(!key){
		var id = Math.floor(Math.random()*5551212);
	}
	else{
		id=key
	}
	
	
// Gathering data in an object. Object has array with form label and input label
	getRadio();
	var item ={};
		item.newUsed =["New or Used: ", newUsedValue];
		item.make =["Make: ", gid("makes").value];
		item.model =["Model: ", gid("models").value];
		item.year =["Year: ", gid("year").value];
		item.mileage =["Mileage: ", gid("mileage").value];
		item.condition =["Condition: ", gid("condition").value];	
		item.date =["Date: ", gid("date").value];
		item.notes =["Notes: ", gid("notes").value];
		
// Use stringify to convert object to string and save data to local storage
	localStorage.setItem(id, JSON.stringify(item));
	alert("Vehicle added!")
		
}

// This function displays data to the browser
function getData(){
	toggle("on");
	if(localStorage.length === 0){
		alert("Local storage is empty.");
	}
	var createDiv = document.createElement("div");
	createDiv.setAttribute("id", "item");
	var createUl = document.createElement("ul");
	createDiv.appendChild(createUl);
	document.body.appendChild(createDiv);
	gid("item").style.display = "block";
	for(var i=0, j=localStorage.length; i<j; i++){
		var createLi = document.createElement("li");
		createUl.appendChild(createLi);
		var key = localStorage.key(i)
		var value = localStorage.getItem(key);
		
// Converts string to object with JSON parse		
		var object = JSON.parse(value);
		var subList = document.createElement("ul");
		createLi.appendChild(subList);
		for(var y in object){
		var createSubLi = document.createElement("li");
		createLi.appendChild(createSubLi);
		var SubText = object[y] [0] +" "+ object[y] [1];
		createSubLi.innerHTML = SubText;
			
		}			
	}
	
	
}

//This function clears local storage data
function clearData(){
	localStorage.clear();
	alert("Vehicle deleted!");
	window.location.reload();
} 
	
//These functions validate the fields.	
	
function validate(eval){
	var getMake = gid("makes"),
		getModel = gid("models"),
		getYear = gid("year");
		
	errorMessage.innerHTML = "";
	getMake.style.border = "1px solid black";
	getModel.style.border = "1px solid black";
	getYear.style.border = "1px solid black";
		
		
	var errorMessage = [];
	
	
	if(getMake.value === "--Choose a make--"){
		var makeError = "Please choose a make!";
		getMake.style.border = "1px solid red";
		errorMessage.push(makeError);
		
	} 
	
	if(getModel.value === "--Choose a model--"){
		var modelError = "Please choose a model!";
		getModel.style.border = "1px solid red";
		errorMessage.push(modelError);
		
	} 
	
	if(getYear.value === ""){
		var yearError = "Please choose a year!";
		getYear.style.border = "1px solid red";
		errorMessage.push(yearError);
		
	} 
	
	if(errorMessage.length >= 1){
		for(var i=0, j=errorMessage.length; i<j; i++){
			var createLi = document.createElement("li");
			createli.innerHTML = errorMessage[i];
			errMess.appendChild(createLi)
		}
		eval.preventDefault();
		return false;
	}
	else{
		submitData(this.key);
	}
	
	
		
} 
	
// Variable Defaults
var makeList = ["--Choose a make--", "Chevrolet", "Ford", "Buick", "Dodge", "Jeep"],
	modelList = ["--Choose a model--", "Cruze", "Impala", "Cobalt", "Camaro", "Focus", "Explorer", "Fusion", "F-150", "Regal", "Lacrosse", "Enclave", "Century", "Viper", "Ram", "Dart", "Durango", "Wrangler", "Liberty", "Patriot", "Compass"],
	newUsedValue,
	errMess = gid("error");
dropDown1();
dropDown2();



// Links and submit button
var display = gid("display");
display.addEventListener("click", getData);

var clear = gid("clear");
clear.addEventListener("click", clearData);

var submit = gid("submit");
submit.addEventListener("click", validate);


	


})