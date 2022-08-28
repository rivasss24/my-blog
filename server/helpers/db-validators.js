const Usuarios = require('../models/usuario')

const existeEmail = async( correo = '' ) => {
    const existeCorreo = await Usuarios.findOne({ correo });

    if( existeCorreo ){
        throw new Error(`El correo que ingreso ya se encuentra registrado`);
    }
}


const existeIdDeUsuario = async( id ) => {
    const existeId = await Usuarios.findOne({ id });

    if( !existeId ){
        throw new Error(`El usuario ingresado no existe`);
    }
}

module.exports = {
    existeEmail,
    existeIdDeUsuario
}