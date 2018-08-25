var city;
city = "Barcelona";

var data;

var app = new Vue({
	el: '#app',
	data: {

		currentDay: [],
		restDays: [],
		secondDay: [],
		thirdDay: [],
		fourthDay: [],
		fifthDay: [],
		cityName: ""

	}
});


function getCity(city) {
	fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&APPID=3a07bd635152fe297149025f63c75bcd", {
		method: "GET",

	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.statusText);

	}).then(function (json) {

		console.log(json)

		data = json;
		
		separateData();
		separateDays();

		app.cityName = data.city.name;


		console.log(data);
	}).catch(function (error) {
		console.log("Request failed:" + error.message);
	});
}


document.getElementById("searchB").addEventListener("click", function () {
	city = document.getElementById("searchBox").value;
	getCity(city);

});


// The separateData function will first transform the date so that it matches with the format of the jSON. Afterwards, the values will be separated into two: currentDay and restDays. 

function separateData() {
	app.currentDay = []; //empy the arrays after a search is made
	app.restDays = [];
	app.secondDay = [];
	app.thirdDay = [];
	app.fourthDay = [];
	app.fifthDay = [];

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0 
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	today = yyyy + '-' + mm + '-' + dd;

	for (i = 0; i < data.list.length; i++) {
		var day;

		var jsonDate = new Date(data.list[i].dt_txt.slice(0, 10)); //The date in the jSon corresponds to the first 10 digits. We need to compare this tade with todays date. 

		if (data.list[i].dt_txt.slice(0, 10) == today) {
			console.log(today)
		}

		data.list[i].day = getNumberDay(jsonDate.getDay()); // adds days to the json
		console.log(data.list[i].day)
	
		//The values correspoding with current day 
		if (data.list[i].day == data.list[0].day) {
			console.log(data.list[i].day);
			app.currentDay.push(data.list[i]);
			
		// The rest of the values 
		} else {
			app.restDays.push(data.list[i])
		}
		}
}

// The information regarding the rest of the days will be split into specific days. 

function separateDays() {

	for (var i = 0; i < app.restDays.length; i++) {

		if (i < 8) {
			app.secondDay.push(app.restDays[i])
		} else if (i >= 8 && i < 16) {

			app.thirdDay.push(app.restDays[i])
			
		} else if (i >= 16 && i < 24) {
			app.fourthDay.push(app.restDays[i])
			
		} else {
			app.fifthDay.push(app.restDays[i])
		}

	}
}


function getNumberDay(number) {
	switch (number) { //It will return a number that will correspond to an specific date
		case 0:
			return "Sunday";
			break;
		case 1:
			return "Monday";
			break;
		case 2:
			return "Tuesday";
			break;
		case 3:
			return "Wednesday";
			break;
		case 4:
			return "Thursday";
			break;
		case 5:
			return "Friday";
			break;
		case 6:
			return "Saturday";
	}
}

// Execute the search by pressing enter as well, instead of clicking on searchB

document.getElementById('searchBox').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('searchB').click();
    }
}