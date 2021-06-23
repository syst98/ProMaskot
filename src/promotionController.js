import {idSend, idPromotion} from "./usersController.js"
//conexion a la bd de firebase
const db = firebase.firestore()
const sg = firebase.storage();
//mandar a llamar una bd
const promocion = db.collection("Promociones");

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);




  promocion.doc(idSend).onSnapshot(
    promociones => {
      if (promociones.exists) {
        const datos = promociones.data();
        var refArch = sg.ref(datos.rute);
        if (hoy.toISOString().split(".")[0] <= datos.timeEnd) {
          sg.refFromURL(refArch).getDownloadURL().then(function (url) {
            document.getElementById("promocionInfo").innerHTML += `
        <div class="card mb-3 bg-dark">
                <img src="${url}" class="card-img-top" alt="...">
                    <br><br>
                <div class="card-body">
                <h5 class="card-title display-2 border-top">${datos.name}</h5>
                <p class="card-text display-4 fst-italic">${datos.description}</p>
                <img src="https://firebasestorage.googleapis.com/v0/b/cuponerawal.appspot.com/o/LOGO5.png?alt=media&token=91ae9512-e718-41f5-a433-02b739aaab11" class="card-img-top" alt="...">
                <div class="card mb-3 bg-secondary">
                <div class="card-body">
                <p class="card-text">Codigo: ${datos.code}</p>
                </div>  
                </div>
                <p class="card-text">El presente contrato describe los términos y condiciones aplicables al uso del contenido, productos y/o servicios del sitio web CUPONERA ProMaskot del cual es titular CUPONERA ProMaskot. Para hacer uso del contenido, productos y/o servicios del sitio web el usuario deberá sujetarse a los presentes términos y condiciones.</p>
                <p class="card-text"><p class="text-primary fw-bolder display-6">Hasta ${datos.timeStart.split('T')[0]}</p></p>
            </div>
        </div>
        `
            // Get the download URL for 'images/stars.jpg'
            // This can be inserted into an <img> tag
            // This can also be downloaded directly
          }).catch(function (error) {
            // Handle any errors
          });
        } else {
          document.getElementById("promocionInfo").innerHTML += `
        <div class="card mb-3 bg-dark">
                <img src="https://1000marcas.net/wp-content/uploads/2020/02/Walmart-logo.png" class="card-img-top" alt="...">
                    <br><br>
                <div class="card-body">
                <h5 class="card-title display-3"> Lo sentimos, la promo expiro :(</h5>
                
            </div>
        </div>
        `
        }
      }
    },
    error => console.error(error));
