
const { Schema, model } = require('mongoose');

const PostSchema = Schema({
    title:{
        type: String,
        required: [true, ' El titulo es obligatorio '],
        
    },
    description:{
        type: String ,
        required: [ true, 'la descripcion es obligatoria' ]
        
    },
    contenido:{
        type: String ,
        required: [true, 'El contenido es obligatorio']
        
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: { type: String },
    date: {
        type: Date,
        min: '1987-09-28',

    }
});

/*
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}
*/

//la U mayuscula es porque me va a permitir crear instancias de mi modelo
module.exports = model( 'Post', PostSchema );