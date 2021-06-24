//conexion a la bd de firebase
const db = firebase.firestore()
const sg = firebase.storage();


//mandar a llamar una bd
const usuario = db.collection("Usuarios");
const promocion = db.collection("Promociones");

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

var user = firebase.auth().onAuthStateChanged(userAuth => {
  usuario.where("mail", "==", userAuth.email).onSnapshot(async snapshot => {
    
    if (await snapshot.size >= 1) {
      console.log(snapshot.size)
      document.getElementById("agregarUsuarios").innerHTML = '';
      document.getElementById("agregarUsuarios").innerHTML += `
            <div class="container">
            <div class="row justify-content-md-center">
                <p style="text-align: center"><i class="fas fa-tags"></i> Gracias por tu registro</p>
            </div>
            </div>`;
    }
    else {
      document.getElementById("agregarUsuarios").innerHTML = '';
      document.getElementById("agregarUsuarios").innerHTML += `
      <div class="col s12 m12 24 header text_b center">
               <div class="card">
                  <div class="card-content ">
                    <span class="card-title activator grey-text text-darken-4" style="font-size:32px">Completa tu informacion</span>
                    <div>
                        <label class="form-label grey-text text-darken-4" style="font-size:25px"> Telefono</label>
                        <input type="tel" class="form-control" name="telefono" required style="font-size: 34px;">
                    </div>
                    <div>
                        <label class="form-label grey-text text-darken-4" style="font-size: 25px"> Direccion</label>
                        <input type="text" class="form-control" name="direccion" required style="font-size: 34px;">
                    </div>
                  </div>
                  <div class="card-image waves-effect waves-block waves-light">
                  <button>Enviar</button>
                </div>
              </div>
          </div>
        `;

    }
    //agrega valores a la coleccion
    const addUser = (phone, address) => {
      usuario.doc().set({
        name: userAuth.displayName,
        mail: userAuth.email,
        phone,
        address,
        level: "user",
        coupons: ['MbVjhFnai8T9O5G0aqaF'],
        points: 3,
      })
    }
    var agregarUsuarios= document.getElementById("agregarUsuarios")
    //Funcion agrega datos a "Usuarios"
    agregarUsuarios.addEventListener("submit", (e) => {
      e.preventDefault()
      //obtiene valor del campo HTML puntos
      var telefono = agregarUsuarios["telefono"],
        direccion = agregarUsuarios["direccion"];
      //llama a la funcion addUser, para agregar datos
      addUser(telefono.value, direccion.value)
      telefono = agregarUsuarios["telefono"].value = "",
        direccion = agregarUsuarios["direccion"].value = "";
      checkRegister(snapshot.size)
    })
  }, error => console.error(error))
});


var cupones=[]
//obtener promociones
var validacionUsuario = firebase.auth().onAuthStateChanged(userAuth => {
  usuario.where("mail", "==", userAuth.email).onSnapshot( snapshot => {
    snapshot.forEach(registros => {
      var usr = registros.data();
      console.log(usr.points)
      if(parseInt(usr.points) >= 1){
      cupones[cupones]=usr.coupons
      console.log(Array.isArray(cupones));
      promocion.onSnapshot(snapshot => {
       document.getElementById("promocionesList").innerHTML =''; 
        console.log(snapshot.size);
        if (snapshot.size >= 1) {
          snapshot.forEach(doc => {
            console.log(doc.id);
            const promociones = doc.data();
            console.log(promociones.timeEnd.split("T")[1])
            console.log(promociones.points)
            if (hoy.toISOString().split(".")[0] >= promociones.timeStart && hoy.toISOString().split(".")[0] <= promociones.timeEnd && usr.points >= promociones.points && promociones.used >=1 && usr.points >= 1) {
              var refArch = sg.ref(promociones.rute);
              sg.refFromURL(refArch).getDownloadURL().then(function (url) {
                document.getElementById("promocionesList").innerHTML += `   
                <div  class="col s12 m4 l4">
                  <div class="center promo promo-example">
                  <img src="${url}" style="height: 120px; weight:30px" alt="...">
                    <h5 class="promo-caption">${promociones.name}</h5>
                    <p class="center">${promociones.description}</p>
                    <p class="promo-caption">Codigo: ${promociones.code}</p>
                    <p class="light center">Desde ${promociones.timeStart.split('T')[0]} ${promociones.timeStart.split('T')[1]} Hasta ${promociones.timeEnd.split("T")[0]} ${promociones.timeEnd.split("T")[1]}</p>
                  </div>
                </div>
                    `;
                var promocionesList = document.getElementById("promocionesList")
                var btnsSelected = promocionesList.querySelectorAll(".btn-selected");
                btnsSelected.forEach((btn) =>{
                  btn.addEventListener("click", async (e) => {
                    document.getElementById("promocionesList").innerHTML ='';
                    try {
                      //elimina puntos por uso del cupon y los mete en su wallet
                      const getPromo = (id) => db.collection("Promociones").doc(id).get();
                      const info=await getPromo(e.target.dataset.id)                  
                      const promocionUsuario= info.data()
                      /** **/
                            await usuario.doc(registros.id).update({
                                  coupons: firebase.firestore.FieldValue.arrayUnion(e.target.dataset.id),
                                  points: (parseInt(usr.points) - parseInt(promocionUsuario.points))
                                })
                                document.getElementById("promocionesList").innerHTML =' ';
                      //elimina un cupon de las promociones
                     await promocion.doc(e.target.dataset.id).update({
                        used: (parseInt(promociones.used) - 1)
                      })
                      document.getElementById("promocionesList").innerHTML ='';
                      //await db.collection("Promociones").doc(e.target.dataset.id).delete();
                    } catch (error) {
                      console.log(error);
                    }
                  })
                });
              }).catch(function (error) {
                console.log(error)
              });
            }
          })
        }
        else {
          document.getElementById("promocionesList").innerHTML = '';
          document.getElementById("promocionesList").innerHTML += `
          <h2 class="header text_b center"> No hay promociones, esperalas pronto ProMaskot </h2>`;
        }
      },
        error => console.error(error));
    }
  })
  })
});
