import Joi from "joi";
import { ReasonPhrases, StatusCodes } from "./http-status-codes";

export class CRSRequest {
  constructor() {
    this.timeout = 2000;
    this.Joi = Joi;
    this.statusCodes = StatusCodes;
    this.reasonPhrases = ReasonPhrases;
  }

  template(status, data) {
    const error = new Error(this.reasonPhrases[status]);
    error.response = {
      status,
      data: {
        errors: data
      }
    };
    return error;
  }

  send(data, Resource, replacedFields = []) {
    const $this = this;
    return new Promise((resolve, reject) => {
      if (!Resource) {
        reject(new Error("Resource not found"));
      }
      const schema = $this.schema();
      schema
        .validateAsync(data, {
          abortEarly: false
        })
        .then((values) => {
          $this.values = values;
          const gotData = replacedFields.reduce((acc, currVal) => {
            acc[currVal] = values[currVal];
            return acc;
          }, {});
          resolve(new Resource().get(gotData));
        })
        .catch((error) => {
          const errors = {};
          const errorDetails = error.details;
          if (errorDetails) {
            errorDetails.forEach((detail) => {
              errors[detail.context.key] = errors[detail.key]
                ? [...errors[detail.key], detail.message]
                : [detail.message];
            });
          }
          const response = this.template(
            this.statusCodes.UNPROCESSABLE_ENTITY,
            errors
          );
          setTimeout(() => reject(response), $this.timeout);
        });
    });
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