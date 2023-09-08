import BaseJoi from "joi";
import JoiDateExtention from "@hapi/joi-date";
import { ValidationResult } from "joi";
import {
  IUser,
  IUserQueryOptions,
  IPost,
  IPostQueryOptions,
  IAuth,
} from "../../../infra/support/interfaces";

const Joi = BaseJoi.extend(JoiDateExtention);

// validation for user signUp
export const validateUserPayload = async (user: IUser): Promise<ValidationResult> => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

// validation for updating user
export const validateUserUpdatePayload = async (user: IUser): Promise<ValidationResult> => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string(),
  });
  return schema.validate(user);
};

// validation for search and filter users
export const validateSearchUserPayload = async (
  user: IUserQueryOptions
): Promise<ValidationResult> => {
  const schema = Joi.object({
    name: Joi.string(),
    gender: Joi.string(),
    limit: Joi.number().integer().min(1).default(20),
    page: Joi.number().integer().min(1).default(1),
    startDate: Joi.date().format("YYYY-MM-DD").utc(),
    endDate: Joi.date().format("YYYY-MM-DD").utc().min(Joi.ref("startDate")),
  });
  return schema.validate(user);
};

// validation for creating a post
export const validatePostPayload = async (post: IPost): Promise<ValidationResult> => {
  const schema = Joi.object({
    title: Joi.string().required(),
    post: Joi.string().required(),
  });
  return schema.validate(post);
};

// validation for creating a post
export const validateUpdatePostPayload = async (post: IPost): Promise<ValidationResult> => {
  const schema = Joi.object({
    title: Joi.string(),
    post: Joi.string(),
  });
  return schema.validate(post);
};

// validation for search and filter users
export const validateSearchPostPayload = async (
  post: IPostQueryOptions
): Promise<ValidationResult> => {
  const schema = Joi.object({
    keyword: Joi.string(),
    limit: Joi.number().integer().min(1).default(20),
    page: Joi.number().integer().min(1).default(1),
    startDate: Joi.date().format("YYYY-MM-DD").utc(),
    endDate: Joi.date().format("YYYY-MM-DD").utc().min(Joi.ref("startDate")),
  });
  return schema.validate(post);
};

// validation for signing in a user
export const validateAuthPayload = async (user: IAuth): Promise<ValidationResult> => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
