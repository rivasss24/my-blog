const sectionPost = document.getElementById('sectionPost');

const logOut = document.getElementById('logOut');

logOut.onclick = () => {
    console.log('log-out');
    location.replace(`../`);
}


const config = {
    headers:{
        "x-token": localStorage.getItem('myBlogAccessToken')
    }
}

const loadPosts = ( data ) => {

    console.log(data);

    data.posts.reverse().forEach( ( {_id, img, description, title, usuario, date} ) => {
        const article = document.createElement('article');
        article.classList.add('article');
        article.setAttribute('id', _id );

        const recortar = ( str , longitud ) => {
            return `${str.slice( 0, longitud )}...`;
        }

        const titleSlice = (50<title.length) ?recortar(title,50) :title; 
        const descriptionSlice = (67<description.length) ?recortar(description, 67) :description;


        //const image = ( !!img ) ?  poner imagen por defecto 

        article.innerHTML += `
        <div class="article-image_container">
            <img src=${ img } alt="">
        </div>
        <div class="article-info_container">
            <h2>${titleSlice}</h2>
            <p>${descriptionSlice}</p>
        </div>
        <hr width="90%">
        <div class="article-author-container">
            <div class="author-info">
                <img src=${ usuario.img } alt="" class="author-image">
                <p class="author-name">${usuario.nombre}</p>
            </div>
            <p>${ moment(date).fromNow() }</p>
        </div>
        `

        article.onclick = ({target}) => {
            history.replaceState( null, 'Article',`/article?id=${article.id}`);
            location.replace(`/article?id=${article.id}`);
        }

        sectionPost.appendChild(article);
    });
}

axios.get('http://localhost:8081/posts?limite=50', config)
.then(function ({data}) {
  console.log( data );
  loadPosts( data );
} )
.catch(function (error) {
  console.log( error );
});