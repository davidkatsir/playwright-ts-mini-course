import test, { expect } from "@playwright/test";

test.describe("API Test Block", () => {
  const baseUrl = "https://reqres.in";

  test("Validate getting a single user by API call", async ({ request }) => {
    
    const responseUserId2Data = {
        "data": {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      }
    
    const singleUserResponse = await request.get(`${baseUrl}/api/users/2`);
    
    expect(singleUserResponse.status()).toBe(200);
    expect(singleUserResponse.statusText()).toBe('OK');
    expect(await singleUserResponse.json()).toEqual(responseUserId2Data);

  });

  test("Validate user creation by API call", async ({ request }) => {

    const userData = {
      "name": "David",
      "job": "Automation Developer"
  }
    const userCreationResponse = await request.post(`${baseUrl}/api/users`,{data: userData})

  });


});
