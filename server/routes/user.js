const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/user');
const { existeEmail, existeIdDeUsuario } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');


router.post( '/' , [ 
    check('nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check('nombre', 'Minimo 8 caracters' ).isLength({min: 8}),
    check('nombre', 'Maximo 15 caracters' ).isLength({max: 16}),
    check('password', 'Minimo 8 caracters' ).isLength({min: 8}),
    check('password', 'Maximo 15 caracters' ).isLength({max: 16}),
    check('correo', 'El correo no es valido' ).isEmail(),
    check('correo').custom( existeEmail ),
    check('role', 'El rol es requerido').not().isEmpty(),
    validarCampos
    //validar el rol 
 ] , usuariosPost );

router.put( '/:id' , [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeIdDeUsuario ),
    validarCampos
] , usuariosPut );

router.delete( '/' , [] , usuariosDelete );

module.exports = router;