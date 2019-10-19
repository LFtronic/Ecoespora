try {
    document.getElementById('FormularioSignData').addEventListener("submit", signData);
} catch {

}
function signData(e){
    e.preventDefault();
    var recurso = getInputValues("recurso");
    var cantidad = getInputValues("number");
    var date = getInputValues("date");
    writeUserData(recurso, cantidad, date);
}

function writeUserData(recurso, cantidad, date){
    firebase.database().ref('consumption/'+ user.uid +'/'+ recurso).set({
        gasto: cantidad,
        dia: date,
    });
}
try {
    document.getElementById('FormularioLogIn').addEventListener("submit", logIn);
} catch {

}
function logIn(e){
    e.preventDefault();
    var recurso = getInputValues("password");
    var cantidad = getInputValues("user");

    writeUserData(recurso, cantidad);
}

function writeUserData(recurso, cantidad){
    firebase.database().ref('consumption/'+ user.uid +'/'+ recurso).set({
        gasto: cantidad,
        dia: date,
    });
}
try {
  document.getElementById('FormularioSignIn').addEventListener("submit", signIn);
} catch {

}
function signIn(e){
  e.preventDefault();
  var company = getInputValues("Nombre");
  var inds = getInputValues("Industria");
  var des = getInputValues("Descripcion");
  var loca = getInputValues("Ubicacion");
  var cer = getInputValues("Certificaciones");
  var mail = getInputValues("Correo");
  var password = getInputValues("Contrasena");
  var clients = getInputValues("Clientes")
  register(company, inds, des, loca, cer, mail, password, clients);
}

function getInputValues(id){
  return document.getElementById(id).value;
}

function register(company, inds, des, loca, cer, mail, password, clients) {
  firebase.auth().createUserWithEmailAndPassword(mail,password).then(function(){
    writeUserData(company, inds, des, loca, cer,clients, mail, firebase.auth().currentUser);
  }).catch(function (error){
      //Error code here
  });
}

function writeUserData(company, inds, des, loca, cer, clients, mail, user){
  firebase.database().ref('companies/'+ user.uid).set({
      companyName: company,
      mail: mail,
      industry: inds,
      description: des,
      location: loca,
      clients: clients,
      certifications: cer,
      rankingPoints: 0,
      premium: false
  });
}
