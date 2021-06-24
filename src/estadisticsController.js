
//conexion a la bd de firebase
const db =firebase.firestore()
const promocion = db.collection("Promociones");
const usuario=db.collection("Usuarios");


usuariosRegistrados=document.getElementById("usuariosRegistrados")
usuariosRegistrados.innerHTML ='';
//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    usuariosRegistrados.innerHTML +=`
    <div class="col s12 m6 14">
    <p class="card-title activator grey-text text-darken-2" style="font-size: 25px;">Promociones</p>
    <p class="card-title activator text-lighten-4 center" style="font-size: 20px;">${snapshot.size} promociones registradas</p>
  </div>
    `;
    document.getElementById("myfirstchart").innerHTML ='';
    snapshot.forEach(doc => {
    const promociones = doc.data();
    document.getElementById("myfirstchart").innerHTML +=`
    <div>
        <p class="card-title activator grey-text text-darken-2" style="font-size: 25px;">${promociones.name}</p>
        <p class="card-title activator grey-text text-darken-3">
          <div id="progressbar">
            <div style="width:${((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()}%" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </p>
        <p class="card-title activator text-lighten-4 center" style="font-size: 18px;"> Quedan ${promociones.used} cupones de  ${promociones.coupons}</p>
  </div>
    `
  })
},
  error => console.error(error));
//obtener usuarios
usuario.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    console.log(snapshot.size);
    usuariosRegistrados.innerHTML +=`
    <div class="col s12 m6 14">
    <p class="card-title activator grey-text text-darken-2" style="font-size: 25px;">Usuarios Registrados</p>
    <p class="card-title activator text-lighten-4 center" style="font-size: 20px;"> ${snapshot.size} usuarios registrados</p>
  </div>
    `;
    snapshot.forEach(doc => {
      console.log(doc.id);
      const usuarios = doc.data();
      /*
      document.getElementById("leerUsuarios").innerHTML+=`
        <div class="card bg-dark" style="width: 18rem;" data-id="${doc.id}">
            <div class="card-body">
              <h5 class="card-title text-light">${usuarios.name} - ${usuarios.mail}</h5>
              <p class="card-text text-light">Cupones usados: ${usuarios.coupons}</p>
            </div>
        </div>
        <br>`;*/
    })
  },
  e => console.error(e));

  /*
  usuario.
  orderBy("name", "asc").
  onSnapshot(
  snapshot => {
    console.log(snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id);
      const usuarios = doc.data();
      console.log(usuarios.mail===infoUser.email)
      document.getElementById("leerUsuarios").innerHTML+=`
      <div class="card bg-dark" style="width: 18rem;" data-id="${doc.id}">
          <div class="card-body">
            <h5 class="card-title text-light">${usuarios.name} - ${usuarios.mail}</h5>
            <p class="card-text text-light">Cupones obtenidos: ${usuarios.coupons}</p>
          </div>
      </div>
      <br>`;
    })
  },
  error => console.error(error));
  */