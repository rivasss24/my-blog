const { response } = require("express");
const Post = require('../models/post');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );


const obtenerPostById = async( req = require , res = response  ) => {
    const { id } = req.params;
    
    const post = await Post.findById(id).
        populate('usuario', ['nombre','img']);
    
    res.json({
        post
    })
}

const obtenerPost = async( req = require , res = response ) => {
    
    const { limite = 5 , desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, posts ] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
            .populate('usuario', ['nombre','img']) 
            .skip( Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        posts
    });
}

const guardarPost = async( req = require , res = response ) => {
    
    let secureUrl = '';

    if( !! req.files === true ){
        try {
            const { tempFilePath } = req.files.file
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
            secureUrl = secure_url;

        } catch (err) {
            console.log(err);
        }
    }

    const { title, description, contenido } = req.body;
    
    const fecha = new Date();

    const post = new Post({
        title,
        description,
        usuario: req.usuario._id,
        img: secureUrl,
        //date: `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
        date: fecha,
        contenido
    });

    await post.save();

    console.log( 'post añadido' , post );

    res.json({
        msg: 'todo bien posteando el post',
        post
    });
}   

module.exports = {
    guardarPost,
    obtenerPost,
    obtenerPostById
}