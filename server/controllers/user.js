const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const usuariosPost = async( req, res= response ) =>{

    let secureUrl = '';
    if( !!req.files === true ){
        
        try {
            //const nombre = await subirArchivo( req.files, undefined, 'imgs' );
            
            const { tempFilePath } = req.files.file
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
            secureUrl = secure_url;

        } catch (err) {
            console.log(err);
        }

    }

    const { nombre, correo, password, role }  = req.body

    const usuario = new Usuario({ 
        nombre,
        correo,
        password,
        role: 'ADMIN_ROLE',
        img: secureUrl
    });

    const salt = bcryptjs.genSaltSync( 11 );
    usuario.password = bcryptjs.hashSync( password, salt);

    await usuario.save();

    console.log( `Añadido:\n${usuario}` );

    res.status(200).json({
        msg:'all good - post',
        usuario
    });
    
}


const usuariosPut = ( req = require, res= response ) => {

    const { id } = req.params;
    
    res.json({
        msg: 'all good - put'
    });
}

const usuariosDelete = ( req = require, res= response ) => {
    res.json({
        msg: 'all good - delete'
    });
}

module.exports = {
    usuariosPost,
    usuariosPut,
    usuariosDelete
}