const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const signUp = document.getElementById('signUp');
const file = document.getElementById('file');
const checkbox = document.getElementById('checkbox');

checkbox.onchange = ( {target} ) => {

  const {checked} = target;

  if( checked ){
    password.type = 'text';
  }
  
  if( !checked  ){
    console.log(target.value);
    password.type = 'password';
  }
  
}


const imgAvatar = document.getElementById('imgAvatar');

const formInputs = document.querySelectorAll('#formulario input');

const inputs = Array.from( formInputs );

const inputErrors = {
  nombre: document.getElementById('nombreError'),
  correo: document.getElementById('emailError'),
  password: document.getElementById('passwordError'),
}

const showErrorMensage = ( target ) => {
  inputErrors[target.name].style.display = 'block';
}

const validarCampo = ( target ) => {

  switch ( target.name ) {
    case 'nombre':
      const regExpNombre = /^[a-zA-Z ]{4,30}$/;
      const isTrueNombre = regExpNombre.test(target.value);
      
      if( !isTrueNombre ){
        showErrorMensage(target);
        return true
      }else{
        inputErrors[target.name].style.display = 'none';
      }

    break;
    
    case 'correo':
    
    const regExpEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; 
    const isTrueEmail = regExpEmail.test(target.value);
    if( !isTrueEmail ){
      showErrorMensage(target);
      return true
    }else{
      inputErrors[target.name].style.display = 'none';
    }

    break;
    
    case 'password':
      //const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/;
      //const isTruePassword = regExpPassword.test(target.value);
      /*if( !isTruePassword ){
            return true
            showErrorMensage(target);
      }else{
        inputErrors[target.name].style.display = 'none';
      }*/
      if( target.value.length < 8 || 16 < target.value.length ){
        showErrorMensage(target);
        return true
      } else{
        inputErrors[target.name].style.display = 'none';
      }
    break;  

    default:
      break;
  }
}

const closeErrorMenssage = ({target}) => {
  inputErrors[target.name].style.display = 'none';
}

inputs.forEach( ( input ) => {
  input.onkeyup = (e) => validarCampo( e.target );
  input.onfocus = (e) => validarCampo( e.target );
  input.onblur = closeErrorMenssage;
});

const renderFile = ( formData ) => {
  const image = formData.get('file');
  //buscar que hace la URL.createObjectULR
  const imageUrl = URL.createObjectURL(image);
  imgAvatar.setAttribute( 'src', imageUrl ); 
}

file.onchange = ( event ) => {
  const formData = new FormData(formulario);
  renderFile( formData );
}

const validarTodosLosCampos = () => {
  const even = ( element ) => validarCampo(element);
  
   const isTru = inputs.some(even);
   if( isTru ){
     alert('ingrese correctamente los campos');
     return true;
   }
}

const disabledAndEnabled = () =>{
  inputs.forEach( input => {
      input.readonly = !input.readonly; 
  });
  signUp.disabled = !signUp.disabled;
}

signUp.onclick = ( e ) => {

  e.preventDefault();

    disabledAndEnabled();
    validarTodosLosCampos();

    const formData = new FormData(formulario);
    
    formData.append('role', 'ADMIN_ROLE' );
    
    console.log(formData.get('file'))

    axios.post('http://localhost:8081/usuarios', formData )
      .then(function (response) {
        disabledAndEnabled();
        formulario.reset();
        alert('success!');
      })
      .catch(function (error) {
        disabledAndEnabled();
        const errorMsg = JSON.parse(error.response.request.response).msg;
        alert( errorMsg );
      });

    console.log('CLICKED');
}

