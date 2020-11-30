import { CRSRequest } from "../crs-request";

describe("Checking the CRSRequest class", () => {
it('Methods validation have been called', () => {
    const crsRequest = new CRSRequest()
    expect(crsRequest.template).not.toHaveBeenCalled();
    expect(crsRequest.send).not.toHaveBeenCalled();
    expect(crsRequest.schema).not.toHaveBeenCalled();
    expect(crsRequest.rules).not.toHaveBeenCalled();
  })
});
