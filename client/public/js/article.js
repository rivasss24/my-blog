const article = document.getElementById('article');

const logOut = document.getElementById('logOut');

logOut.onclick = () => {
  console.log('log-out');
  location.replace(`../`);
}

let params = new URLSearchParams(location.search);

let id = params.get('id');

const renderArticle = ( { img, title, description, contenido, date, usuario } ) => {
    
    console.log(usuario);

    article.innerHTML = `
    <div class="info">
      <h1> ${ title } </h1>
      <div class="img-container">
          <img src=" ${ img } " alt="">
      </div>
      <p>${ description }</p>
      <div class="contenido">
        ${contenido}
      </div>
    </div>
    <div class="author">
        <div class="author-image-container">
          <img src=${usuario.img} alt="">
        </div>
        <p>
        Written by:
        </p>
        <h3>
          ${usuario.nombre}
        </h3>
        <p class="moment">${ moment( date ).fromNow() }</p>
    </div>
    `
   console.log(':p');
}

const config = {
    headers:{
        "x-token": localStorage.getItem('myBlogAccessToken')
    }
}

axios.get(`http://localhost:8081/posts/${ id }`, config )
.then(function ({data}) {
  console.log( data );
  const { post } = data;
  renderArticle( post );
})
.catch(function (error) {
  console.log( error );
});