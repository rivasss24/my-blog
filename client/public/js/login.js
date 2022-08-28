
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const login = document.getElementById('login');

const saveAccessToken = (token) => {
  localStorage.setItem( 'myBlogAccessToken', token );
}

login.onclick = ( e ) => {
    e.preventDefault();

    axios.post('http://localhost:8081/auth', {
        correo: correo.value,
        password: password.value,
    } )
    .then(function ( response ) {
      if( response.status === 200 ){
        const { token } = response.data;
        saveAccessToken( token );
        location.replace('home');
      }
    })
    .catch(function (error) {
      //console.log( error );
      //console.log( error.response.request.response );
      const errorMsg = JSON.parse(error.response.request.response).msg;
      alert( errorMsg )
      //console.log( errorMsg );
    });

}

