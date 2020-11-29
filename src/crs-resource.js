import faker from "faker";
import { getReasonPhrase as ReasonPhrases, StatusCodes } from "http-status-codes";

export class CRSResource {
  constructor() {
    this.timeout = 2000
    this.perPage = 20;
    this.currentPage = 1;
    this.total = 100;
    this.totalPages = Math.ceil(this.total / this.perPage)
    this.faker = faker;
    this.statusCodes = StatusCodes;
    this.getReasonPhrase = ReasonPhrases;
  }

  template(status, data) {
    return {
      status,
      data,
    };
  }

  createResponse (response, errors) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(errors) {
          reject(errors)
        } else {
          resolve(response)
        }
      }, this.timeout)
    })
  }

  getAll({ perPage, page }) {
    if (perPage) {
      this.perPage = perPage
      this.totalPages = Math.ceil(this.total / this.perPage)
    }
    if (page) this.currentPage = page
    const dataCount = this.currentPage >= this.totalPages ? this.total - (this.currentPage * this.perPage) : this.perPage
    const items = new Array(dataCount)
      .fill(null)
      .map(() => this.toCollection(this.faker));

    const response = this.template(
      this.statusCodes.OK,
      {
        data: items,
        message: this.getReasonPhrase(this.statusCodes.OK), 
        meta: {
          total: this.total,
          per_page: this.perPage,
          page: this.currentPage,
          totalPages: this.totalPages
        }
      }
    )

    return this.createResponse(response)
  }

  get(id) {
    if (id) {
      const notFoundError = new Error('Request method 404')
      notFoundError.response = {
        status: this.statusCodes.NOT_FOUND,
        data: {
          message: this.getReasonPhrase(this.statusCodes.NOT_FOUND)
        }
      }
      return this.createResponse(null, notFoundError)
    }
    const item = this.toCollection(this.faker);
    if (id) item.id = id;
    const response = this.template(
      this.statusCodes.OK,
      { data: item, message: this.getReasonPhrase(this.statusCodes.OK) }
    );
    return this.createResponse(response)
  }

  toCollection(faker) {
    return {
      id: faker.random.number()
    };
  }
}