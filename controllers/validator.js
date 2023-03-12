const { required } = require("joi")
const joi = require("joi")

const validator = (req, res, next) => {
   const schema = joi.object({
      name: joi
         .string()
         .trim()
         .min(2)
         .max(20)
         .required()
         .pattern(new RegExp("[a-zA-Z]$"))
         .messages({
            "string.empty": "El campo nombre no puede estar vacío",
            "string.min":
               "El campo nombre debe contener como mínimo 2 caracteres",
            "string.max": "El campo nombre no puede tener más de 20 caracteres",
            "string.pattern.base": "El campo nombre solo puede contener letras",
         }),
      lastName: joi
         .string()
         .trim()
         .min(2)
         .max(20)
         .required()
         .pattern(new RegExp("[a-zA-Z]$"))
         .messages({
            "string.empty": "El campo apellido no puede estar vacío",
            "string.min":
               "El campo apellido debe contener como mínimo 2 caracteres",
            "string.max":
               "El campo apellido no puede tener más de 20 caracteres",
            "string.pattern.base":
               "El campo apellido solo puede contener letras",
         }),
      password: joi.string().min(6).trim().required().messages({
         "string.empty": "El campo contraseña no puede estar vacío",
         "string.min":
            "El campo contraseña debe contener como mínimo 6 caracteres",
      }),
      src: joi.string().required().uri().messages({
         "string.empty": "El campo foto de perfil no puede estar vacío",
         "string.uri": "El campo foto de perfil debe contener una URL válida",
      }),
      google: joi.boolean(),
      doc: joi.boolean(),
      data: joi.object({mail: joi.string().trim().email().required().messages({
        "string.empty": "El campo email no puede estar vacío",
        "string.email": "Este campo debe contener un email válido",
     })}),
      passwordAdm: joi.string().allow(""),
      validPassword: joi.string().allow("")
   })

   const validation = schema.validate(req.body, { abortEarly: false })

   if (!validation.error) {
      next()
   } else {
      res.json({ success: false, res:validation.error.details })
   }
}

module.exports = validator
