window.onload = function () {
  var long;
  var lat;
  var tempDesc = document.querySelector('.temp-description'); // cold , hot 
  var tempDegree = document.querySelector('.temp-degree'); // the degree
  var locTimezone = document.querySelector('.location-timezone'); //city 
  var sec = document.querySelector('.degree-section');
  var span = document.querySelector('span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position){
      long = position.coords.longitude;
      lat = position.coords.latitude;
      var proxy = 'https://cors-anywhere.herokuapp.com/';
      var api = `${proxy}https://api.darksky.net/forecast/dddeb8c48eefd7005e13afb8dcd89ef8/${lat},${long}`;
  
    //   fetch(api)
    // .then(function(response){
    //   return response.json();
    // })
    // .then(function(data){
    //   console.log(data);
    //   var temp = data.currently.temperature;
    //   var summary = data.currently.summary;
    //   var timezone = data.timezone;
    //   var icon = data.currently.icon;

    //   //set DOM elements from the API
    //   tempDegree.textContent = temp;
    //   tempDesc.textContent = summary;
    //   locTimezone.textContent = timezone;
    //   var iconID = document.querySelector('.icon');
    //   setIcon(icon,iconID);
    // })

    (function loadData(){
      var xhr = new XMLHttpRequest();
      xhr.open('GET',api, true);
    
      xhr.onload = function(){
        if(this.status == 200){
          var data = JSON.parse(this.responseText);
          var temp = data.currently.temperature;
          var summary = data.currently.summary;
          var timezone = data.timezone;
          var icon = data.currently.icon;

          //set DOM elements from the API
          tempDegree.textContent = temp;
          tempDesc.textContent = summary;
          locTimezone.textContent = timezone;
          var iconID = document.querySelector('.icon');
          setIcon(icon,iconID);

          if(span.textContent === "F") {
            span.innerHTML = "C";
            var num = parseInt(tempDegree.textContent,10);
            c = (num - 32) * 5 / 9;
            tempDegree.textContent = Math.floor(c);
          }
          sec.addEventListener('click',()=>{
            var c;
            if(span.textContent === "F") {
              span.innerHTML = "C";
              var num = parseInt(tempDegree.textContent,10);
              c = (num - 32) * 5 / 9;
              tempDegree.textContent = Math.floor(c);
            }
             else if (span.textContent === "C"){
                span.textContent = "F";
                tempDegree.textContent= temp;   
             }
          });// sec event listener
        } // if status 200
      } // load function 
      xhr.onerror = () => {alert('error');}
      xhr.send();
    }()); // self invoke function
    
    }); // inner function position
  }
  else {
    document.querySelector('span').innerHTML = "Please allow The website to track your Location ";
  }

  function setIcon(icon,iconID)
  {
    var skycons = new Skycons({"color": "white"});
    var currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    skycons.set(iconID,Skycons[currentIcon]);
  }
};
