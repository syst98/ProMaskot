var firebaseConfig = {
  apiKey: "AIzaSyDqFTI_KVaBIpV9588NEb1l8JbS1oSrLI0",
  authDomain: "sistemainformatics98.firebaseapp.com",
  projectId: "sistemainformatics98",
  storageBucket: "sistemainformatics98.appspot.com",
  messagingSenderId: "746265767794",
  appId: "1:746265767794:web:c527b3ac6869019ac4f7eb",
  measurementId: "G-7HMCNHRYMT"
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
        <div  class="col s12 m4 l4">
              <div class="center promo promo-example">
              <img src="${url}" style="height: 120px; weight:30px" alt="...">
                <h5 class="promo-caption">${promociones.name}</h5>
                <p class="center">${promociones.description}</p>
                <p class="light center">Desde ${promociones.timeStart.split('T')[0]} ${promociones.timeStart.split('T')[1]} Hasta ${promociones.timeEnd.split("T")[0]} ${promociones.timeEnd.split("T")[1]}</p>
              </div>
            </div>
        `
      }).catch(function(error) {
        console.log(error)
      });
      
    }})
  },
  error => console.error(error));