
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, ' El nombre es obligatorio '],
        
    },
    correo:{
        type: String ,
        required: [true, ' El correo es obligatorio '],
        unique: true,
        
    },
    password:{
        type: String ,
        required: [true, ' La contraseña es obligatorio '],
        
    },
    role:{
        type: String,
        required: true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
        
    },
    img: { type: String }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

//la U mayuscula es porque me va a permitir crear instancias de mi modelo
module.exports = model( 'Usuario', UsuarioSchema );