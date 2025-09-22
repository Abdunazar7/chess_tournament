import Joi from "joi";

export const createAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().min(3).max(255).optional(),
  is_creator: Joi.boolean().required(),
  is_active: Joi.boolean().required(),
});

export const updateAdminSchema = Joi.object({
  email: Joi.string().email().optional(),
  full_name: Joi.string().min(3).max(255).optional(),
  is_creator: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
}).min(1);

export const changePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(6).required(),
});
