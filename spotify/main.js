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
	$.ajax({
			url: 'https://api.spotify.com/v1/search',
			data: {
				q: name,
				type: 'track'
			},
			headers: {
			'Authorization' : 'Bearer ' + accessToken
			},
			success: onGetTracks
			});
	}
			
	function onGetTracks(data) {
		document.getElementById('demo').innerHTML = "";
		tracksAvailable = data.tracks.items;
		console.log(tracksAvailable);
		console.log("test2");
			
		console.log(tracksAvailable[0].preview_url);
		console.log(tracksAvailable[0].album.images)
		var counter = 0;
		for (var i in tracksAvailable){
			//console.log(i);
			counter = counter + 1;
			trackList.push(tracksAvailable[i].preview_url);
			$( "#demo" ).append("<ul><a href="+tracksAvailable[i].preview_url+">Track "+counter+"</a></ul>");
		}
		console.log(trackList);
	}
});