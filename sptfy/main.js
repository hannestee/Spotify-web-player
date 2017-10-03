$(document).ready(function () {
	console.log("main.js ready")
	var accessToken = localStorage.getItem("accessToken")
	console.log(accessToken);
	var trackList = [];
	
    $('#searchButton').click(function () {
        var name = $("#musicSearch").val();
        getTracks(name);
    });
	
	function getTracks(name){
	//console.log(name);
	var accessToken = localStorage.getItem("accessToken")
	$.ajax({
			url: 'https://api.spotify.com/v1/search',
			data: {
				q: name,
				type: 'track'
			},
			headers: {
			'Authorization' : 'Bearer ' + accessToken
			},
			success: onGetTracks,
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				document.getElementsByTagName("h4")[0].innerHTML = 'Not logged in';
				document.getElementById("modalmsg").innerHTML = 'You must log in first';
				$('#myModal').modal('show');
			}});
	}
			
	function onGetTracks(data) {
		document.getElementById('demo').innerHTML = "";
		tracksAvailable = data.tracks.items;
		console.log(tracksAvailable);
		console.log("test2");
			
		console.log(tracksAvailable[0].preview_url);
		console.log(tracksAvailable[0].album.images[0].url)
		var counter = 0;
		for (var i in tracksAvailable){
			//console.log(i);
			if (tracksAvailable[i].preview_url) {
				counter = counter + 1;
				trackList.push(tracksAvailable[i].preview_url);
				$( "#demo" ).append("<div style='display:inline-block;width:30em;'><ul id='playlistObject' class='playlistObject' style='max-width:90%;height:3.3em;' onclick='setPlayer(\"" +
				tracksAvailable[i].preview_url + "\",\"" +
				tracksAvailable[i].album.name + "\",\"" +
				tracksAvailable[i].artists[0].name + "\",\"" +
				tracksAvailable[i].album.images[0].url +"\");'><div><img class='aimage' style='display:inline-block;margin-left:-2.45em;margin-right:1em;margin-bottom:1.5em;'alt='Album picture' height='50' width='50' src="+
				tracksAvailable[i].album.images[0].url+"><div style='display:inline-block;width:50%;'><p class='songName' id='songName' style='margin-bottom:0;text-overflow:ellipsis;white-space:nowrap;'>"+
				tracksAvailable[i].name+ " "+"</p>"+"<p id='artistName' style='margin-bottom:0;color:darkcyan;text-overflow:ellipsis;white-space:pre;'>"+
				tracksAvailable[i].artists[0].name+
				"</p>"+"</div>"+
				"</div>"+"</ul></div><p style='display:inline-block'>+</p>"
				);	
			}
		}
		
	}//ongettracks
	
	var pressTimer;
	
	$("demo").mouseup(function(){
	clearTimeout(pressTimer);
	// Clear timeout
	return false;
	}).mousedown(function(){
	// Set timeout
	pressTimer = window.setTimeout(function() { 
		console.log('test');
	},1000);
	return false;
	});
	
});

//+"<span><i class='fa fa-plus' aria-hidden='true' style='margin-left:2em;'></i></span>"

//style='border: 1px solid cyan;border-radius:5px;

//"<button class='btn' style='background-color:cyan;'>Add to playlist</button>"+