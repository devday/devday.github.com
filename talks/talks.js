function TalksViewModel(items) {
    this.talk = ko.observableArray(items);

    this.showLightningTalks = ko.observable(true);
    this.showTalks = ko.observable(true);
    
    ko.bindingHandlers.likeButton = {
    	update: function (element, valueAccessor) {
    		var url = 'http://devday.devisland.com/talks/' + valueAccessor() + '.html';
    		console.log(url);
    		$(element).attr('data-href', url);
    		FB.XFBML.parse();
  		}
	}
};

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