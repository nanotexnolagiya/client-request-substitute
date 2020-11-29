# Install
## Use NPM
```bash
npm install client-request-substitute
```
## Use Yarn
```bash
yarn add client-request-substitute
```
# Example
### Create Resource
```js
import { CRSResource } from 'client-request-substitute'

class UserResource extends CRSResource {
  toCollection(faker) {
    return {
      id: faker.random.number(),
      first_name: faker.name.firstName(),
      email: faker.internet.email()
    };
  }
}
```
### Create Request
```js
import { CRSRequest } from 'client-request-substitute'

class UserRequest extends CRSRequest {
  rules() {
    return {
      first_name: ["string", "min:3", "max:255", "required"],
      email: ["string", "email", "required"]
    };
  }
}
```
### Using
```js
class UserService {
  static getUsers() {
    return new UserResource().getAll({ perPage: 20, page: 1 });
  }

  static getUserById(id) {
    return new UserResource().get({ id });
  }

  static createUser(data) {
    return new UserRequest().send(data, UserResource, ["first_name", "email"]);
  }
}

UserService.getUsers().then((res) =>
  console.log("Using Resource get all: ", res)
);

UserService.getUserById(123).then((res) =>
  console.log("Using Resource get by ID: ", res)
);

UserService.createUser({ first_name: "John Doe", email: "test@site.com" })
  .then((res) => console.log("Using Request and Resource", res));

UserService.createUser({ first_name: "", email: "" })
  .catch((err) => console.log("Request validate failed", err.response));

```
### Result
```jsx
Using Resource get all:
{
  status: 200,
  data: {
    data: Array(20),
    message: 'OK',
    meta: {
      page: 1
      per_page: 20
      total: 100
      totalPages: 5
    }
  }
}
Using Resource get by ID
{
  status: 200,
  data: {
    data: {
      id: 123
      first_name: "Jeffrey"
      email: "Elyssa_Brekke70@yahoo.com"
    },
    message: "OK"
  }
}

Using Request and Resource
{
  status: 201,
  data: {
    data: {
      email: "test@site.com",
      first_name: "John Doe",
      id: 81958
    },
    message: "Created"
  }
}

Request validate failed
{
  status: 422,
  data: {
    errors: {
      first_name: ["'first_name' is not allowed to be empty"],
      email: ["'email' is not allowed to be empty"]
    },
    message: "Created"
  }
}

```
# Documentation
## CRSResource

### Properties:
- `perPage:` Limit items in one page
- `timeout:` Timout returned response
- `total:` Total items count
- `faker:` Instance package [faker](https://github.com/marak/Faker.js/ "faker")
- `statusCodes: ` HTTP Status codes
- `ReasonPhrase: ` HTTP Status codes phrases

### Methods
`getAll(options) => {}`
`options:`
- `perPage:` One page items count
- `page:` Current page

`get(data) => {}`
- `data:` Replaced data in generated item by resource


## CRSRequest

### Properties:
- `timeout:` Timout returned response
- `Joi:` Instance package [Joi](https://github.com/sideway/joi/ "Joi")
- `statusCodes: ` HTTP Status codes
- `ReasonPhrase: ` HTTP Status codes phrases

### Methods
`send(data, Resource, replacedFields) => {}`
- `data:` Validated data with rules
- `Resource:` returned data Resource
- `replacedFields:` replaced values returned data by validated values
