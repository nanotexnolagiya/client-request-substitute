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
    return new UserResource().getAll();
  }

  static getUserById(id) {
    return new UserResource().get(id);
  }

  static createUser(data) {
    return new UserRequest().send(data, UserResource);
  }
}

UserService.getUserById(123).then(res => console.log('Using Resource: ', res));
UserService.createUser({ first_name: "John Doe", email: "test@site.com" })
  .then(res => console.log('Using Request and Resource', res))
UserService.createUser({ first_name: "", email: "" })
  .catch(err => console.log( 'Request validate', err.response));

```
### Result
```jsx
Using Resource 
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
      id: 123
      first_name: "Jeffrey"
      email: "Elyssa_Brekke70@yahoo.com"
    },
    message: "Created"
  }
}

Request validate
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
### CRSResource
Properties:
- `perPage:` Limit items in one page
- `total:` Total items count
- `faker:` Instance package [faker](https://github.com/marak/Faker.js/ "faker")
- `statusCodes: ` HTTP Status codes use [http-status-codes](https://github.com/prettymuchbryce/http-status-codeshttp:// "http-status-codes")
- `getReasonPhrase: ` HTTP Status codes phrases use [http-status-codes](https://github.com/prettymuchbryce/http-status-codeshttp:// "http-status-codes")

Methods:
- `template(status, data) { } ` Resource returned data default template
-- Params:
-- `status: ` Response status
-- `data: ` Resource returned data
