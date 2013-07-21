function TalksViewModel(items) {
	this.talk = ko.observableArray(items);
	this.showLightningTalks = ko.observable(true);
	this.showTalks = ko.observable(true);
};

window.fbAsyncInit = function() {
	FB.init({appId: 622586384427029, status: true, cookie: true, xfbml: true});
	$.ajax({
		url: "talks.json?callback=?",
		dataType: "jsonp",
		jsonpCallback: "devday2013",
		cache: true,
		success: function(data){
			console.log(data);
			ko.applyBindings(new TalksViewModel(data));
		},
		error: function() {
			alert("Data not found");
		}
	});
}