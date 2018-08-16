//Load Map
initMap();

//Load API
$(window).on('load',function() {
  $.ajax({
      url: "https://data.kingcounty.gov/resource/3jsh-6kcp.json?race=Secretary%20of%20State",
      type: "GET",
      data: {
        "$limit" : 20000,
        "$$app_token" : "4ZSd8qJnlKd5CfvqYYcpoT8Fj"
      }
  }).done(function(data) {

    //alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    //var center = new google.maps.LatLng(47.5480,-121.9836);

//Filter Info
    var districts = {
      1: [],
      7: [],
      8: [],
      9: []
    };
    var DemCounter = 0
    $.each(data, function(i, entry) {
    districts[entry.cg].push(entry);
    if (entry.party==="Dem") {
      console.log(entry);
      DemCounter++;
    }
    //console.log(i,entry);
    });
    var RepCounter = 0
    $.each(data, function(i, entry) {
    districts[entry.cg].push(entry);
    if (entry.party==="Rep") {
      console.log(entry);
      RepCounter++;
    }
    });
    var NPCounter = 0
    $.each(data, function(i, entry) {
    districts[entry.cg].push(entry);
    if (entry.party==="NP") {
      console.log(entry);
      NPCounter++;
    }
    });
    //console.log(districts);
    //console.log(DemCounter);
    console.log(RepCounter);
    //console.log(NPCounter);
  });
});

//Map Function
function initMap() {
  map = new google.maps.Map(document.getElementById("MapDiv"), {
    center: {lat:47.5480, lng:-121.9836},
    zoom: 8
  });
}
