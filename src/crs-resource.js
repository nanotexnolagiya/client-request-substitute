import faker from "faker";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class CRSResource {
  constructor() {
    this.perPage = 20;
    this.currentPage = 1;
    this.total = 100;
    this.totalPages = Math.ceil(this.total / this.perPage)
    this.faker = faker;
    this.statusCodes = StatusCodes;
    this.getReasonPhrase = getReasonPhrase;
  }

  collectionTemplate() {
    return {
      status,
      data: {
        data,
        message: this.getReasonPhrase(status)
      }
    };
  }

  template(status, data) {
    return {
      status,
      data: {
        data,
        message: this.getReasonPhrase(status)
      },
      meta: {
        total: this.total,
        per_page: this.perPage,
        page: this.currentPage,
        totalPages: this.totalPages
      }
    };
  }

  async getAll({ perPage, page }) {
    if (perPage) {
      this.perPage = perPage
      this.totalPages = Math.ceil(this.total / this.perPage)
    }
    if (page) this.currentPage = page
    const dataCount = this.currentPage >= this.totalPages ? this.total - (this.currentPage * this.perPage) : this.perPage
    const items = new Array(dataCount)
      .fill(null)
      .map(() => this.toCollection(this.faker));

    return this.collectionTemplate(this.statusCodes.OK, items);
  }

  async get(id) {
    const item = this.toCollection(this.faker);
    if (id) item.id = id;
    return this.template(this.statusCodes.OK, item);
  }

  toCollection(faker) {
    return {
      id: faker.random.number()
    };
  }
}