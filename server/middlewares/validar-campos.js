const { validationResult } = require('express-validator');

const validarCampos = ( req , res, next ) =>{

    // validationResult( req ) ---> esto para obtener todos los errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        errors
        return res.status(400).json({
            //pueden haber mas de un error, en este caso solo tomaremos, 
            //el primero
            msg: 'campos ingresados incorrectamente'
        });
    }
    
    next();
}


module.exports = {
    validarCampos
}