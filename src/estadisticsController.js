
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
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title"><i class="fas fa-tags"></i> Promociones</h5>
          <p class="card-text text-center text-muted">${snapshot.size} promociones registradas</p>
        </div>
      </div>
    </div>
    `;
    document.getElementById("myfirstchart").innerHTML ='';
    snapshot.forEach(doc => {
    const promociones = doc.data();
    var porcentaje
    if(((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()<50){
      porcentaje="bg-success"
    }
    if(((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()>50){
      porcentaje="bg-danger"
    }
    document.getElementById("myfirstchart").innerHTML +=`
    <div class="md">
          <div class="card-title">${promociones.name}</div>
          <div class="progress">
            <div class="card-list progress-bar progress-bar-striped progress-bar-animated ${porcentaje}" role="progressbar" style="width:${((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()}%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">${((parseInt(promociones.used)*100)/parseInt(promociones.coupons)).toFixed()}%</div>
          </div>
          <div class="card-list text-center">
          <p class="text-muted"> Quedan ${promociones.used} cupones de  ${promociones.coupons}</p>
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
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title"><i class="fas fa-users"></i> Registrados</h5>
          <p class="card-text text-center text-muted">${snapshot.size} usuarios registrados</p>
        </div>
      </div>
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