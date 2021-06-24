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
  firebase.analytics();
var infoUsuario 
        //Conexión al sistema de autenticación de Firebase
        const auth = firebase.auth();
        //Tipo de autenticación de usuarios. En este caso es con Google.
        const provider = new firebase.auth.GoogleAuthProvider();
        //Configura el proveedor de Google para que permita seleccionar de una lista. 
        provider.setCustomParameters({ prompt: "select_account" });
        //Recibe una función que se invoca cada que hay un cambio en la autenticación y recibe el modelo con las características del usuario.*/
        auth.onAuthStateChanged(
          /** Recibe las características del usuario o null si no ha iniciado
           * sesión. */
          usuarioAuth => {
            if (usuarioAuth && usuarioAuth.email) {
              var urlNav={promotions: "",estadistics: ""}
              // Usuario aceptado.
              // @ts-ignore Muestra el email registrado en Google.
              email.value = usuarioAuth.email;
              // @ts-ignore Muestra el nombre registrado en Google.
              nombre.value = usuarioAuth.displayName;
              // @ts-ignore Muestra el avatar registrado en Google.
              avatar.src = usuarioAuth.photoURL;
              if(usuarioAuth.email==="sistema.informatic.98@gmail.com"){
                document.getElementById("navar").innerHTML='';
                document.getElementById("navar").innerHTML+=`
              <div class="nav-wrapper"><a id="logo-container" href="#top" class="brand-logo"><img src="https://firebasestorage.googleapis.com/v0/b/sistemainformatics98.appspot.com/o/LOGO5.png?alt=media&token=003c6827-4e91-4e7e-a6b9-c680a77b60c4" alt="imagen-walmart" width="90" height="40"></a>
                    <ul id="nav-mobile" class="right side-nav">
                      <li><a href="./promociones.html">Promociones</a></li>
                      <li><a href="./estadisticas.html">Estadisticas</a></li>
                       <li><a type="button" onclick="terminaSesión()">Terminar Sesión</a></li>
                    </ul><a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
                  </div>
              `
              }
              else{
                document.getElementById("navar").innerHTML='';
                document.getElementById("navar").innerHTML+=`
                  <div class="nav-wrapper"><a id="logo-container" href="#top" class="brand-logo"><img src="https://firebasestorage.googleapis.com/v0/b/sistemainformatics98.appspot.com/o/LOGO5.png?alt=media&token=003c6827-4e91-4e7e-a6b9-c680a77b60c4" alt="imagen-walmart" width="90" height="40"></a>
                    <ul id="nav-mobile" class="right side-nav">
                       <li><a type="button" onclick="terminaSesión()">Terminar Sesión</a></li>
                    </ul><a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
                  </div>
                `
              }
              ;
            } else {
              // No ha iniciado sesión. Pide datos para iniciar sesión.
              auth.signInWithRedirect(provider); 
            }
          },
          // Función que se invoca si hay un error al verificar el usuario. //
          procesaError
        );
        /** Termina la sesión. */
        async function terminaSesión() {
          try {
            await auth.signOut();
          } catch (e) {
            procesaError(e);
          }
        }
        /** Procesa un error. Muestra el objeto en la consola y un cuadro de
         * alerta con el mensaje.
         * @param {Error} e descripción del error. */
        function procesaError(e) {
          console.log(e);
          alert(e.message);
        }
