import faker from "faker";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class FopResource {
  constructor() {
    this.perPage = 20;
    this.total = 100;
    this.faker = faker;
    this.statusCodes = StatusCodes;
    this.getReasonPhrase = getReasonPhrase;
  }

  template(status, data) {
    return {
      status,
      data: {
        data,
        message: this.getReasonPhrase(status)
      }
    };
  }

  async getAll() {
    const items = new Array(this.total)
      .fill(null)
      .map(() => this.toCollection(this.faker));

    return this.template(this.statusCodes.OK, items);
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