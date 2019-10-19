window.onload = function() {
  console.log("yeet");
  checkAuthStatus();
  getRankingData();
}

function checkAuthStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if (userID == "") {
      //   userID = user.uid;
      // }
      getCompanyData(user, function(){
        //callback
      });
    }
  });
}

function getCompanyData(user, callback) {
  var ref = firebase.database().ref("companies/"+user.uid);
    ref.once("value", function(snapshot){
      document.getElementById('nav-bar-company').innerHTML = snapshot.val().companyName;
      callback();
    });
}

function getRankingData() {
  console.log("Yeetyeet");
  var ref = firebase.database().ref("companies");
  ref.orderByChild("rankingPoints").once("value").then(function(snapshot){
    console.log(snapshot);
    try {
      var ranking = document.getElementById('main_ranking');
    } catch {
    };
    snapshot.forEach(function(childSnapshot) {
      for (i = 0; i < ranking.rows; i++) {
        var newArray = ranking.rows[i].item(2);
      }
      var newTd3 = document.createElement('td').className = "main-ranking-body-cell";
      newTd3.innerHTML = childSnapshot.val().rankingPoints;
      if (newArray === undefined || array.length == 0) {
        newArray = [];
        newArray[0] = newTd3.innerHTML;
      } else {
        newArray[newArray.length] = newTd3.innerHTML;
      }
      newArray.sort(function(a, b){return a - b});
      var index;
      for (i = 0; i < newArray.length; i++) {
        if (newArray[i] == newTd3.innerHTML) {
          index = i;
        }
      }
      var newTr = document.createElement('tr').className = "main-ranking-row";
      newTr = ranking.insertRow(index);
      var newTd1 = document.createElement('td').className = "main-ranking-body-cell";
      newTd1 = newTr.insertCell(0);
      newTd1.innerHTML = index+1;
      var newTd2 = document.createElement('td').className = "main-ranking-body-cell";
      newTd2 = newTr.insertCell(1);
      newTd2.innerHTML = childSnapshot.val().companyName;
      var newTd3X = document.createElement('td').className = "main-ranking-body-cell";
      newTd3X = newTr.insertCell(2);
      newTd3X.innerHTML = childSnapshot.val().rankingPoints;
    });
  });
}
