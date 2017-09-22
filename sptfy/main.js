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
		console.log(tracksAvailable[0].album.images[0].url)
		var counter = 0;
		for (var i in tracksAvailable){
			//console.log(i);
			if (tracksAvailable[i].preview_url) {
				counter = counter + 1;
				trackList.push(tracksAvailable[i].preview_url);
				$( "#demo" ).append("<ul><img alt='Album picture' height='100' width='100' src="+
				tracksAvailable[i].album.images[0].url+" onclick='setPlayer(\"" +
				tracksAvailable[i].preview_url + "\",\"" +
				tracksAvailable[i].album.name + "\",\"" +
				tracksAvailable[i].artists[0].name + "\",\"" +
				tracksAvailable[i].album.images[0].url +"\");' ><a href="+
				tracksAvailable[i].preview_url+">"+
				tracksAvailable[i].album.name+"</a></ul>");
			}
		}
		//console.log(trackList);
	}
	
});