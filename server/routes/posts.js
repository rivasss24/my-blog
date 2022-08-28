const { Router } = require('express');
const { check } = require('express-validator');
const { guardarPost, obtenerPost, obtenerPostById } = require('../controllers/posts');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', [validarJWT] , obtenerPostById);

router.get('/', [validarJWT] , obtenerPost)

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La description es obligatoria').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
] , guardarPost );









module.exports = router;