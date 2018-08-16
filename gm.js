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
      1: {
        entries: [],
        RepCounter: 0,
        DemCounter: 0,
        NPCounter: 0
      },
      7: {
        entries: [],
        RepCounter: 0,
        DemCounter: 0,
        NPCounter: 0
      },
      8: {
        entries: [],
        RepCounter: 0,
        DemCounter: 0,
        NPCounter: 0
      },
      9: {
        entries: [],
        RepCounter: 0,
        DemCounter: 0,
        NPCounter: 0
      }
    };
    $.each(data, function(i, entry) {
    districts[entry.cg].entries.push(entry);
    if (entry.party==="Dem") {
      districts[entry.cg].DemCounter+=parseInt(entry.sumofcount)
    }
    else if (entry.party==="Rep") {
      districts[entry.cg].RepCounter+=parseInt(entry.sumofcount)
    }
    else {
      districts[entry.cg].NPCounter+=parseInt(entry.sumofcount)
    }
  });
    debugger;
    console.log(districts);
  });
});

//Map Function
function initMap() {
  map = new google.maps.Map(document.getElementById("MapDiv"), {
    center: {lat:47.5480, lng:-121.9836},
    zoom: 8
  });
}

//Submit Button and Answers
var answers=["a","b","b","a","a","c","b","a","a","a"],
      tot=answers.length;
var questions = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10"]
function getCheckedValue(radioName){
  var radios=document.getElementsByName( radioName);
  for(var y=0; y<radios.length; y++)
    if(radios[y].checked)
      return radios[y].value;
}
function getScore(){
  var score=0;
  for (var i=0; i<tot; i++)
    if(getCheckedValue(questions[i])===answers[i]){
      score += 1;
    }
  return score;
}
function returnScore(){
  getScore();
  showcorrect();
  showincorrect();
  alert("Your score is " + getScore() + "/" + tot + "." + " Click 'Ok' to see the correct answers(green) and incorrect answers(red).");
}
function showcorrect() {
   var elements = document.getElementsByClassName("answer");
   for (var i=0;i<=elements.length-1;i++ ){
     elements[i].classList.add("greenhighlight")
   }
 }
 function showincorrect() {
    var elements = document.getElementsByClassName("wronganswer");
    for (var i=0;i<=elements.length-1;i++ ){
      elements[i].classList.add("redhighlight")
    }
  }

//Clear All Button
function clearHighlight() {
    var elements = document.getElementsByClassName("wronganswer");
    for (var i=0;i<=elements.length-1;i++ ){
    elements[i].classList.remove("redhighlight");}
    var elements = document.getElementsByClassName("answer");
    for (var i=0;i<=elements.length-1;i++ ){
    elements[i].classList.remove("greenhighlight");}
    reset();
}

function reset() {
  document.getElementById("gerrymanderingQuiz").reset();
}
