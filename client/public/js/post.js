
const title = document.getElementById('title');
const description = document.getElementById('description');
const formulario = document.getElementById('formulario');
const titleCaracteres = document.getElementById('titleCaracteres');
const descCaracteres = document.getElementById('descCaracteres');
const postButton = document.getElementById('postButton');
const file = document.getElementById('file');
const inputs = document.querySelectorAll('#formulario input');
const contenido = document.getElementById('contenido');

const logOut = document.getElementById('logOut');

logOut.onclick = () => {
    console.log('log-out');
    location.replace(`../`);
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach( ( element ) => {
    element.onclick = (event) => {
        console.log( event );
        const comando = element.dataset['element'];
        if( comando === 'createLink' || comando === 'insertImage' ){
            const url = prompt(`Enter the link here`, 'http://');
            if(url){
                document.execCommand( comando, false, url );
                return true
            }else{
                return true
            }
        } else {
            document.execCommand( comando, false, null );
        }
    } 
});

title.oninput = ( event ) => {
    let caracteres = event.target.value.length 
    if( 100 <= caracteres ){
        event.target.value = event.target.value.slice( 0, 100);
        caracteres = event.target.value.length 
        console.log(caracteres);
    }
    titleCaracteres.innerText = `${caracteres}/${100-caracteres}`
}

description.oninput = ( event ) => {
    let caracteres = event.target.value.length 
    if( 200 <= caracteres ){
        event.target.value = event.target.value.slice( 0, 200);
        caracteres = event.target.value.length 
        console.log(caracteres);
    }
    descCaracteres.innerText = `${caracteres}/${ 200 - caracteres }`
}

const formRest = () => {
    formulario.reset();
    titleCaracteres.innerText = '0/60';
    descCaracteres.innerText = '0/200';
    contenido.innerHTML = '';
}

const disabledAndEnabled = () =>{
    console.log( Array.from(inputs));
    Array.from(inputs).forEach( input => {
        input.readonly = !input.readonly; 
    });
    description.readonly = !description.readonly;
    //description.contenteditable 
    postButton.disabled = !postButton.disabled;
}


postButton.onclick = async( event ) => {

    disabledAndEnabled();
    event.preventDefault();

    const config = {
        headers:{
            "x-token": localStorage.getItem('myBlogAccessToken')
        }
    }

    const formData = new FormData(formulario);

    formData.set( 'contenido', contenido.innerHTML );

    formData.get('contenido');

    

    await axios.post('http://localhost:8081/posts', formData , config )
    .then(function (response) {
      alert('succes!');
      console.log(response);
      formRest();
      disabledAndEnabled();
    })
    .catch(function (error) {
        console.log(error);
        const errorMsg = JSON.parse(error.response.request.response).msg;
        alert( errorMsg );
      disabledAndEnabled();
    });

}