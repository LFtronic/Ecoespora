window.onload = function() {
  checkAuthStatus();
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
