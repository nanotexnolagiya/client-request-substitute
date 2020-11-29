import { CRSRequest } from "../index";
describe("Checking the CRSRequest class", () => {
  it("Methods validation have been called", () => {
    expect(CRSRequest).not.toHaveBeenCalled();
    const crsRequest = new CRSRequest();
    expect(crsRequest.rules).not.toHaveBeenCalled();
  });
});
