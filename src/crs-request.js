import Joi from "joi";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class CrsRequest {
  constructor() {
    this.Joi = Joi;
    this.statusCodes = StatusCodes;
    this.getReasonPhrase = getReasonPhrase;
  }

  template(status, data) {
    const error = new Error(this.getReasonPhrase(status));
    error.response = {
      status,
      data: {
        errors: data
      }
    };
    return error;
  }

  async send(data, Resource) {
    try {
      const schema = this.schema();
      this.values = await schema.validateAsync(data, {
        abortEarly: false
      });
      return Resource ? new Resource().get() : null;
    } catch (error) {
      const errors = {};
      const errorDetails = error.details;
      errorDetails.forEach((detail) => {
        errors[detail.context.key] = errors[detail.key]
          ? [...errors[detail.key], detail.message]
          : [detail.message];
      });
      throw this.template(this.statusCodes.UNPROCESSABLE_ENTITY, errors);
    }
  }

  schema() {
    const rules = this.rules();
    const schemaObject = {};
    Object.keys(rules).forEach((key) => {
      schemaObject[key] = rules[key].reduce((acc, val) => {
        const [rule, param] = val.split(":");
        switch (rule) {
          case "email":
            return acc.email({ tlds: { allow: false } });
          case "max":
            return acc.max(/^\d+$/.test(param) ? +param : 255);
          case "min":
            return acc.min(/^\d+$/.test(param) ? +param : 0);
          default:
            return acc[rule]();
        }
      }, this.Joi);
    });
    return this.Joi.object(schemaObject);
  }

  rules() {
    return {};
  }
}