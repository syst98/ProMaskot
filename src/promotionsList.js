  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA14Vc16_jkjUzCWBpjwTy_t-Hwtz2Wt5k",
    authDomain: "cuponerawal.firebaseapp.com",
    projectId: "cuponerawal",
    storageBucket: "cuponerawal.appspot.com",
    messagingSenderId: "406474058038",
    appId: "1:406474058038:web:62a527c117af27f3b52b97",
    measurementId: "G-WEEL5GKJB2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//conexion a la bd de firebase
const db =firebase.firestore()
const sg = firebase.storage();
//mandar a llamar una bd
const promocion = db.collection("Promociones");

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
console.log(hoy.toISOString().split(".")[0])


//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    document.getElementById("promocionesList").innerHTML = '';
    console.log(snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id);
      const promociones = doc.data();
      console.log(promociones.timeEnd.split("T")[1])
      if(hoy.toISOString().split(".")[0]<=promociones.timeEnd){
      var refArch = sg.ref(promociones.rute);
      sg.refFromURL(refArch).getDownloadURL().then(function(url) {
        
        document.getElementById("promocionesList").innerHTML +=`
      <div class="card mb-3 bg-dark border-light" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                  <img src="${url}" style="height: 120px; weight:30px" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body" data-id="${doc.id}">
                      <h5 class="card-title">${promociones.name}</h5>
                      <p class="card-text">${promociones.description}.</p>
                      <p class="card-text"><small class="text-light">Desde ${promociones.timeStart.split('T')[0]} ${promociones.timeStart.split('T')[1]} Hasta ${promociones.timeEnd.split("T")[0]} ${promociones.timeEnd.split("T")[1]}</small></p>
                      <div class="row justify-content-md-center">
                        <a href="./inicio.html" class="btn btn-primary">Ver la promocion</a>
                      </div>
                    </div>
                  </div>
                </div>
      </div>      
      `;
      }).catch(function(error) {
        console.log(error)
      });
      
    }})
  },
  error => console.error(error));