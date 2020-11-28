import { CRSRequest } from "../index";
describe("Checking the CRSRequest class", () => {
it('Methods validation have been called', () => {
    expect(CRSRequest).not.toHaveBeenCalled();
    const crsRequest = new CRSRequest()
    expect(crsRequest.rules).not.toHaveBeenCalled();
  })
it("We can check if the consumer called a method on the class instance", () => {
  // Show that mockClear() is working:
    expect(CRSRequest).not.toHaveBeenCalled();

    class UserRequest extends CRSRequest {
      rules() {
        return {
          first_name: ["string", "min:3", "max:255", "required"],
          email: ["string", "email", "required"],
        };
      }
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
