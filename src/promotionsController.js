//conexion a la bd de firebase
const db = firebase.firestore()

//firebase storage
const sg = firebase.storage();

//variable que guarda informacion del usuario logeado
let infoUser = { name: '', email: '' }

//mandar a llamar una bd
const promocion = db.collection("Promociones");
var promociones = db.collection("Promociones");
var tasksContainer = document.getElementById("leerPromociones")

var isEditable = false,
  idPromo = "";
//agrega valores a la coleccion

const addPromotion = (name, description, discount, timeEnd, timeStart, code, points, coupons, rute) => {
  var user = firebase.auth().onAuthStateChanged(userAutenticado => {
    promocion.doc().set({
      nameCreator: userAutenticado.displayName,
      mail: userAutenticado.email,
      name,
      description,
      discount,
      timeEnd,
      timeStart,
      code,
      points,
      coupons,
      used: coupons,
      rute
    })
  })
}

// borrado de datos
const deletePromotion = (id) => promociones.doc(id).delete();

//obtener usuarios
promocion.
  orderBy("name", "asc").
  onSnapshot(
    async snapshot => {
      console.log(snapshot.size);
      tasksContainer.innerHTML = '';
      snapshot.forEach(doc => {
        console.log(doc.id);
        const promociones = doc.data();
        tasksContainer.innerHTML += `
              <tr data_id="${doc.id}">
                <td>${promociones.name}</td>
                <td>${promociones.description}</td>
                <td>${promociones.discount}</td>
                <td>${promociones.timeStart.split('T')[0]} ${promociones.timeStart.split('T')[1]}</td>
                <td>${promociones.timeEnd.split("T")[0]} ${promociones.timeEnd.split("T")[1]}</td>
                <td>${promociones.code}</td>
                <td>${promociones.points}</td>
                <td>${promociones.coupons}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button class="btn btn-delete" data-id="${doc.id}">Borrar</button>
                        <button class="btn btn-edit" data-id="${doc.id}">Editar</button>
                    </div>
                </td>
              </tr>`;
        //obtiene etiqueta del formulario
        let agregarPromociones = document.getElementById("agregarPromociones")
        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
          btn.addEventListener("click", async (e) => {
            console.log(e.target.dataset.id);
            try {
              console.log(e.target.dataset.id)
              await db.collection("Promociones").doc(e.target.dataset.id).delete();
            } catch (error) {
              console.log(error);
            }
          })
        );
        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          let agregarPromociones = document.getElementById("agregarPromociones");
          var nombre = agregarPromociones["nombre"],
            descripcion = agregarPromociones["descripcion"],
            descuento = agregarPromociones["descuento"],
            fechaInicio = agregarPromociones["fechaInicio"],
            fechaFinal = agregarPromociones["fechaFinal"],
            codigo = agregarPromociones["codigo"],
            puntos = agregarPromociones["puntos"],
            cupones = agregarPromociones["cupones"]
          var leerPromo = await db.collection("Promociones").doc(e.target.dataset.id).get()
          var read = leerPromo.data();
            nombre.value = read.name,
            descripcion.value = read.description,
            descuento.value = read.discount,
            fechaInicio.value = read.timeStart,
            fechaFinal.value = read.timeEnd,
            codigo.value = read.code,
            puntos.value = read.points,
            cupones.value = read.coupons

          isEditable = true
          idPromo = e.target.dataset.id
        }))
      })
    },
    error => console.error(error));

//Funcion agrega datos a "Usuarios"
agregarPromociones.addEventListener("submit", async (e) => {
  console.log(idPromo)
  console.log(isEditable);
  //evita recargo de pagina
  e.preventDefault();
  //obtiene valor del campo HTML puntos
  var nombre = agregarPromociones["nombre"],
    descripcion = agregarPromociones["descripcion"],
    descuento = agregarPromociones["descuento"],
    fechaInicio = agregarPromociones["fechaInicio"],
    fechaFinal = agregarPromociones["fechaFinal"],
    codigo = agregarPromociones["codigo"],
    puntos = agregarPromociones["puntos"],
    cupones = agregarPromociones["cupones"],
    nombreArchivo = agregarPromociones["fileName"],
    archivo = agregarPromociones["file"].files[0];
  //referencia de archivos
  var metadata = {
    contentType: ['image/jpeg'],
  };
  var refArch = sg.ref(nombre.value + '/' + nombreArchivo.value);
  var rute = nombre.value + '/' + nombreArchivo.value
  //montar archivos
  await refArch.put(archivo, metadata);
  cupones = parseInt(cupones.value)
  //llama a la funcion addUser, para agregar datos
  if (isEditable == false) {
    await addPromotion(nombre.value, descripcion.value, descuento.value, fechaFinal.value, fechaInicio.value, codigo.value, puntos.value, cupones, rute)
  }
  else{
     await db.collection("Promociones").doc(idPromo).update({
     name: nombre.value, 
     description: descripcion.value, 
     discount: descuento.value, 
     timeEnd: fechaFinal.value, 
     timeStart: fechaInicio.value, 
     code: codigo.value, 
     points: puntos.value, 
     coupons: cupones,
     used: cupones, 
     rute
    })
    isEditable=false
  }
  var nombre = agregarPromociones["nombre"].value = "",
    descripcion = agregarPromociones["descripcion"].value = "",
    descuento = agregarPromociones["descuento"].value = "",
    fechaInicio = agregarPromociones["fechaInicio"].value = "",
    fechaFinal = agregarPromociones["fechaFinal"].value = "",
    codigo = agregarPromociones["codigo"].value = "",
    puntos = agregarPromociones["puntos"].value = "",
    cupones = agregarPromociones["cupones"].value = "",
    nombreArchivo = agregarPromociones["fileName"].value = "",
    archivo = agregarPromociones["file"].value = "";

})




