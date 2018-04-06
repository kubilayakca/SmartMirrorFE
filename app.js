var stompClient = null;
var webSocketConnected = false;
var numberOfConnectionTry = 0;

var currentUser = "";
var lastUser = "";

setInterval(tryToConnect,10000);

setInterval(toggleSections,10000);


$("#notificationTable").hide();
$("#headerSection").hide();

function toggleSections(){
	
	if(currentUser == null || currentUser == undefined || currentUser == ""){
		$("#headerSection").hide(1500);
		$("#notificationTable").fadeOut(1500);
	}
	else if(lastUser != "" && lastUser != currentUser){
		lastUser = currentUser;
		$("#headerSection").hide(500);
		$("#notificationTable").fadeOut(500);
		$("#userName").html(currentUser);
		$("#headerSection").show(1000, function() {
			$("#notificationTable").fadeIn(1000);
		});
	}
	else{
		lastUser = currentUser;
		$("#userName").html(currentUser);
		$("#headerSection").show(1000, function() {
			$("#notificationTable").fadeIn(1000);
		});
	}
}


function tryToConnect(){
	if(!webSocketConnected){
		connect();
		$("#headerSection").hide(500);
		$("#notificationTable").fadeOut(500);
		currentUser = "";
		lastUser = "";
	}
	else{
		$("#websocketStatus").html("WebSocket connected");
	}
}

function setConnected(connected) {
	webSocketConnected = connected;
}

function connect() {
    var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
			currentUser = greeting.body;
			console.log(greeting.body)
			toggleSections();
            //showGreeting(greeting.body);
        });
    },function(error){
		$("#websocketStatus").html("Connection failed. Trying to connect to WebSocket...# of try " + (++numberOfConnectionTry));
		setConnected(false); 
	});
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

/*
function showGreeting(message) {
    $("#greetings").html("<tr><td>" + message + "</td></tr>");
}
*/

	updateCryptocurrencyData();
	setInterval(updateCryptocurrencyData, 1000*30); //Update cryptocurrency  data every 30 seconds


	function updateCryptocurrencyData(){
		$.get( "https://api.coinmarketcap.com/v1/ticker/?limit=10", function( data ) {
		console.log(data);


		

		
		$( "#bitcoin" ).html(data[0].price_usd);
		$( "#bitcoinPercent" ).html(data[0].percent_change_24h + "%");
		if(data[0].percent_change_24h>0){
			$("#bitcoinPercent").css("color", "green");
		}
		else{
			$("#bitcoinPercent").css("color", "red");
		}
		
		$( "#ethereum" ).html(data[1].price_usd);
		$( "#ethereumPercent" ).html(data[1].percent_change_24h + "%");
		if(data[1].percent_change_24h>0){
			$("#ethereumPercent").css("color", "green");
		}
		else{
			$("#ethereumPercent").css("color", "red");
		}
		
		
		$( "#ripple" ).html(data[2].price_usd);
		$( "#ripplePercent" ).html(data[2].percent_change_24h + "%");
		if(data[2].percent_change_24h>0){
			$("#ripplePercent").css("color", "green");
		}
		else{
			$("#ripplePercent").css("color", "red");
		}
		
		$( "#litecoin" ).html(data[4].price_usd);
		$( "#litecoinPercent" ).html(data[4].percent_change_24h + "%");
		if(data[4].percent_change_24h>0){
			$("#litecoinPercent").css("color", "green");
		}
		else{
			$("#litecoinPercent").css("color", "red");
		}
	});
};
	
	
	updateWheatherData();
	setInterval(myTimer, 1000*60*60); //Update wheather info every hour
	function updateWheatherData(){
		$.get( "http://api.openweathermap.org/data/2.5/forecast?id=745042&APPID=c3d990765deb823d0f90aa1f03346ec0", function( data ) {
		console.log(data);
		$( "#weatherIconContainer" ).html('<img id="weatherIcon" src="http://openweathermap.org/img/w/'+data.list[0].weather[0].icon+'.png">');
		$( "#weatherDescription" ).html(data.list[0].weather[0].description);

		var tempatureInF = data.list[0].main.temp;
		var tempatureInC = tempatureInF - 273.15;
		$( "#weatherLocationAndTempature" ).html(data.city.name +", " + Math.round(tempatureInC) + " °C");
	});
};

var myVar = setInterval(myTimer, 1000);

function myTimer() {
	var currentdate = new Date(); 


	var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":";
	if(currentdate.getMinutes() < 10){
		datetime += "0";
	}
	
	 datetime +=  currentdate.getMinutes() + ":";
	 
	 if(currentdate.getSeconds() < 10){
		datetime =  datetime + "0" + currentdate.getSeconds();
		}else{
		datetime += currentdate.getSeconds();
		}
		document.getElementById("dateTime").innerHTML = datetime;
}