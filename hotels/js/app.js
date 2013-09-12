function AppViewModel() {
    var self = this;
 
    self.hotels = ko.observableArray();
 
    self.addHotel = function(array) {
        var hotel = new Hotel();
        hotel.Name = array[0];
        hotel.Description = array[1];
        hotel.Distance = array[2];
        hotel.Address = array[3];
        hotel.Telephone = array[4];
        hotel.Website = array[5];
        hotel.Directions = array[6];

        self.hotels.push(hotel);
    };
}

var Hotel = function() {
   var self = this;

   self.Name = ko.observable();
   self.Description = ko.observable();
   self.Distance = ko.observable();
   self.Address = ko.observable();
   self.Telephone = ko.observable();
   self.Website = ko.observable();
   self.Directions = ko.observable();
};

window.vm = new AppViewModel();
ko.applyBindings(window.vm);

$(document).ready(function() {
  var url = "https://docs.google.com/spreadsheet/pub?key=0Atbk29ZiYrX2dFZxV0pJM3V1bUM2UlA0eWJYbVg5aXc&output=csv";

  $.ajax(url)
  .pipe(CSV.parse)
  .done(function(rows) {
          for (var i = 1; i < rows.length; i++) {
            window.vm.addHotel(rows[i]);
          }
        });
});