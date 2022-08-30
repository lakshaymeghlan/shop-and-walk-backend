// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage')


// const storage = new GridFsStorage({
    
// })

// export const validationMiddleware = (req, res, next) => {
//   console.log(req.body);
//   const schema = Joi.object({
//     productId: Joi.string().required(),
//     productName: Joi.string().required(),
//     productPrice: Joi.string().required(),
//   }).unknown(true);
//   const { error } = schema.validate(req.body, { aboutEarly: false });
//   if (error) {
//     res.status(200).json({ error: error });
//   } else {
//     next();
//   }
// };