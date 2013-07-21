function TalksViewModel(items) {
    this.talk = ko.observableArray(items);

    this.showLightningTalks = ko.observable(true);
    this.showTalks = ko.observable(true);
};

$.ajax({
	url: "talks.json?callback=?",
	dataType: "jsonp",
	jsonpCallback: "devday2013",
	cache: true,
	success: function(data){
		ko.applyBindings(new TalksViewModel(data));
	},
	error: function() {
		alert("Data not found");
	}
});