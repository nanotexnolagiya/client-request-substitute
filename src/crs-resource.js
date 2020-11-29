import faker from "faker";
import { ReasonPhrases, StatusCodes } from "./http-status-codes";

export class CRSResource {
  constructor() {
    this.timeout = 2000;
    this.perPage = 20;
    this.currentPage = 1;
    this.total = 100;
    this.totalPages = Math.ceil(this.total / this.perPage);
    this.faker = faker;
    this.statusCodes = StatusCodes;
    this.reasonPhrases = ReasonPhrases;
  }

  template(status, data) {
    return {
      status,
      data
    };
  }

  createResponse(response, errors) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (errors) {
          reject(errors);
        } else {
          resolve(response);
        }
      }, this.timeout);
    });
  }

  getAll({ perPage, page }) {
    if (perPage) {
      this.perPage = perPage;
      this.totalPages = Math.ceil(this.total / this.perPage);
    }
    if (page) this.currentPage = page;
    let dataCount = 0

    if (this.currentPage === this.totalPages) {
      dataCount = this.total - (this.currentPage - 1) * this.perPage
    } else if (this.currentPage < this.totalPages) {
      dataCount = this.perPage
    }
    
    const items = new Array(dataCount)
      .fill(null)
      .map(() => this.toCollection(this.faker));

    const response = this.template(this.statusCodes.OK, {
      data: items,
      message: this.reasonPhrases[this.statusCodes.OK],
      meta: {
        total: this.total,
        per_page: this.perPage,
        page: this.currentPage,
        totalPages: this.totalPages
      }
    });

    return this.createResponse(response);
  }

  get(data) {
    const item = this.toCollection(this.faker);
    const response = this.template(this.statusCodes.OK, {
      data: { ...item, ...data },
      message: this.reasonPhrases[this.statusCodes.OK]
    });
    return this.createResponse(response);
  }

  toCollection(faker) {
    return {
      id: faker.random.number()
    };
  }
}