function parseName(name) {
	newName = name.split(" ");
	
	return newName[0] + "+" + newName[1];
}

function addRateDOM(parentDOM, quality, difficulty, takeAgain) {
	$(parentDOM).append(`
	<p>
		<strong>Quality:</strong> ${quality} | 
		<strong>Difficulty:</strong> ${difficulty} | 
		<strong>Would Take Again:</strong> ${takeAgain}
	</p>
	`, 
	);
}

function displayProfessorInfo(professorName) {
	var req = new XMLHttpRequest();
	const Http = new XMLHttpRequest();
	const url = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&queryoption=HEADER&facetSearch=true'
	+ '&query=' + parseName(professorName)
	+ '&schoolName=university+of+new+hampshire'
	console.log("FINDING URLS FOR " + professorName);
	console.log("ORIG URL: " + url);
	
	chrome.runtime.sendMessage({query: url}, function(response) {
		var findURLwrapper= document.createElement('div');
		findURLwrapper.innerHTML = response["source"];
		findURLwrapper.innerHTML = $(findURLwrapper).find(".PROFESSOR").html();
		var newUrl = "https://www.ratemyprofessors.com" + $(findURLwrapper).find("a").attr("href");
		
		console.log("NEW URL FOR " + professorName + ": " + newUrl);
		
		chrome.runtime.sendMessage({query: newUrl}, function(newResponse) {			
			var newWrapper = document.createElement('div');
			newWrapper.innerHTML = newResponse["source"];
			
			var quality = $(newWrapper).find(".breakdown-container .grade").text().trim();
			var difficulty  = $(newWrapper).find(".difficulty .grade").text().trim();
			var takeAgain = $(newWrapper).find(".takeAgain .grade").text().trim();
			
			addRateDOM(parent, quality, difficulty, takeAgain);
		});
	});
}

$(".instructors").each(function(){
	var parent = this;
	var instructors = $(this).children("a").text();
	for (var i = 0; i < instructors.length; i++) {
		console.log(instructors);
		displayProfessorInfo(instructors[i]);
	}	
});