const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../db/config.js');
const cookieParser = require('cookie-parser');


//const port = process.env.PORT; 

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:        '/auth',
            usuarios :   '/usuarios',
            posts:        '/posts'
        }


        //Connect to database

        this.conectarDB();

        //Middleware
        this.middleware();

        this.routes();

        //this.listen();

    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        this.app.use( express.static('public') );
        //Intercambio de Recursos de Origen Cruzado / CORS 
        this.app.use(cors());
        //Lectura y parseo del body
        //esto se hace para serializar la inf que venga de frontend...
        //en formato json
        this.app.use( express.json() );

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            // esto es para poder crear carpetas donde guardar las imagenes,
            //si el path ingresado no existe.
            createParentPath: true
        }));

        this.app.use(cookieParser());

    }

    routes(){
        //aqui van todas las rutas
        this.app.use( this.path.usuarios, require('../routes/user.js'));
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.posts, require('../routes/posts'));
        //this.app.use( this.path.categorias, require('../routes/categorias'));
        
    }

    listen(){
        //no se si esto deberia estar en un try and catch
        this.app.listen( this.port, () => {
            console.log('Escuchando en el puerto:', this.port );
        });
    }
}

module.exports = Server;