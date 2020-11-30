import { CRSRequest } from "../crs-request";
jest.mock("../crs-request")
describe("Checking the CRSRequest class", () => {
it('Methods validation have been called', () => {
    const crsRequest = new CRSRequest()
    expect(crsRequest.template).not.toHaveBeenCalled();
    expect(crsRequest.send).not.toHaveBeenCalled();
    expect(crsRequest.schema).not.toHaveBeenCalled();
    expect(crsRequest.rules).not.toHaveBeenCalled();
  })
it("We can check if the consumer called a method on the class instance", () => {

    class UserRequest extends CRSRequest {
      rules() {
        return {
          first_name: ["string", "min:3", "max:255", "required"],
          email: ["string", "email", "required"],
        };
      }
    }

    class UserResource {
      
    }

    class UserService {
      static createUser(data) {
        return new UserRequest().send(data, UserResource);
      }
    }
    expect.assertions(1);
    UserService.createUser({ first_name: "", email: "" }).catch((err) => {
      expect(err).toMatch("error");
      expect(err.response);
    });
  });
});
