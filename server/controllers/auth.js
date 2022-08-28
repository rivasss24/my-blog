const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = require , res = response ) => {
    
    const { correo, password } = req.body;
    
    try {

        const usuarioExiste = await Usuario.findOne( { correo } );
        
        if( !usuarioExiste ){
        return res.status(400).json({
                msg: "Correo o contraseña incorrectos"
            });
        }

        if( !usuarioExiste.estado ){
            return res.status(400).json({
                msg: "El usuario ingresado fue eliminado"
            });
        }

        const contraseñaValida = bcryptjs.compareSync( password, usuarioExiste.password );

        if(!contraseñaValida){
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos"
            })
        }

        //Generar el JWT
        console.log( usuarioExiste.id );
        const token = await generarJWT( usuarioExiste.id );



        if( token ){
            res.cookie('SESSION_TOKEN', 'hola' ).json({
                token
            }); 
        }
    } catch (error) {
        //aqui van los errores
        console.log(error);
    }
}


module.exports = login;