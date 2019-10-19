window.onload = function() {
  checkAuthStatus();
  getRankingData();
}

function checkAuthStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if (userID == "") {
        userID = user.uid;
      }
      getCompanyData(function(){
        //callback
      });
    }
  });
}

function getCompanyData(callback) {
  var ref = firebase.database().ref("companies/").child(user.uid);
    ref.once("value", function(snapshot){
      document.getElementById('nav-bar-company').innerHTML = snapshot.val().companyName;
      callback();
    });
}

function getRankingData() {
  var ref = firebase.database().ref("companies/");
  ref.once("value", function(snapshot){
    try {
      var ranking = document.getElementById('main_ranking');
      snapshot.forEach(function(childSnapshot) {
        var newTr = document.createElement('tr').className = "main-ranking-row";
        var newTd1 = document.createElement('td').className = "main-ranking-body-cell";
        newTd1.innerHTML = "0";
        var newTd2 = document.createElement('td').className = "main-ranking-body-cell";
        newTd2.innerHTML = childSnapshot.val().companyName;
        var newTd3 = document.createElement('td').className = "main-ranking-body-cell";
        newTd3.innerHTML = childSnapshot.val().rankingPoints;
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        newTr.appendChild(newTd3);
        ranking.appendChild(newTr);
      });
    } catch {

    }
  });
}
