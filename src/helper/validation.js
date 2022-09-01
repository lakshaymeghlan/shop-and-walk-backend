import Joi from "joi";

// export default (schema) => {
//     return (req, res, next) => {
//       const { error } = schema.validate(req, { allowUnknown: true });
  
//       const valid = error == null;
  
//       if (!valid) {
//         const { details } = error;
//         const message = details.map((i) => i.message.replace(/body.|headers.|query./, '')).join('');
//         return next(new AppError(message, 400));
//       } else {
//         return next();
//       }
//     };
//   };

  export const validationMiddleware = (req, res, next) => {
    console.log(req.body);
    const schema = Joi.object({
      productId: Joi.string().required(),
      productName: Joi.string().required(),
      productPrice: Joi.string().required(),
    }).unknown(true);
    const { error } = schema.validate(req.body, { aboutEarly: false });
    if (error) {
      res.status(200).json({ error: error });
    } else {
      next();
    }
  };