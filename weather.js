var city;

city = "Barcelona";


var data;

/*
api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml*/

/*
https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&APPID=3a07bd635152fe297149025f63c75bcd"
*/


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
		/*createBody();*/

		separateData();

		var myDate = new Date(data.list[0].dt_txt.slice(0, 10));
		console.log(myDate.getDay());

		/*
		app.weatherInfo=data.list;*/

		console.log(data);
	}).catch(function (error) {
		console.log("Request failed:" + error.message);
	});

}
/*
var weather= document.getElementById("searchBox")
data.weather.description
data.weater
*/


document.getElementById("searchB").addEventListener("click", function () {
	city = document.getElementById("searchBox").value;
	getCity(city);

});


function separateData() {
	app.currentDay = []; // They need to be empty otherwise data duplicates after a search is made
	app.restDays = [];
	
	
	
	
	/*
			var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();
		

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}

		today = yyyy+ '-' + mm + '-' + dd;*/

	
	
	

	for (i = 0; i < data.list.length; i++) {
		var day;


		var jsonDate = new Date(data.list[i].dt_txt.slice(0, 10)); // esto es una fecha 

if(data.list[i].dt_txt.slice(0, 10)==today){ 
console.log(today)}



		switch (jsonDate.getDay()) { // devuelve un numero que corresponde a un día
			case 0:
				day = "Sunday";
				break;
			case 1:
				day = "Monday";
				break;
			case 2:
				day = "Tuesday";
				break;
			case 3:
				day = "Wednesday";
				break;
			case 4:
				day = "Thursday";
				break;
			case 5:
				day = "Friday";
				break;
			case 6:
				day = "Saturday";
		}

		data.list[i].day = day;

		if (i < 8) {

			app.currentDay.push(data.list[i]);

		} else {
			app.restDays.push(data.list[i])
		}

	}

}





/*
function getIcon(){

var icon=("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon+ ".png'>")
document.getElementById("icono").innerHTML= icon;    // no hace falta, estoy usando solo v-for
}
*/

/*
function createBody(){

document.getElementById("desc").innerHTML="Description " + data.weather[0].description;

	
	  var description= document.createElement("p");
        description.textContent= data.list[0].weather[0].description;
        document.getElementById("desc").appendChild(description); 
*/

/*document.getElementById("max").innerHTML=data.main.temp_max;
document.getELementById("temperature").innerHTML= data.main.temp;
document.getElementById("min").innerHTML=data.main.temp_min;*/


/*}*/



///	var statecol = document.createElement("td");
//statecol.textContent = membersHouse[i].state;
//	tr.appendChild(statecol);


var app = new Vue({
	el: '#app',
	data: {
		/*weatherInfo: [],*/



	}


});
