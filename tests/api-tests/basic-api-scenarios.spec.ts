import test, { expect } from "@playwright/test";

interface IResponse {
  name?: string;
  job?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
  error?: string;
}

test.describe("API Tests Block", () => {
  const baseUrl = "https://reqres.in";

  test("Validate getting a single user by API call", async ({ request }) => {
    const responseUserId2Data = {
      data: {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      },
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };

    const singleUserResponse = await request.get(`${baseUrl}/api/users/2`);

    expect(singleUserResponse.status()).toBe(200);
    expect(singleUserResponse.statusText()).toBe("OK");
    expect(await singleUserResponse.json()).toEqual(responseUserId2Data);
  });

  test("Validate user creation by API call", async ({ request }) => {
    const data = {
      name: "David",
      job: "Automation Developer",
    };

    const userCreationResponse = await request.post(`${baseUrl}/api/users`, {
      data,
    });

    expect(userCreationResponse.status()).toBe(201);
    expect(userCreationResponse.statusText()).toBe("Created");
    const jsonResponse: IResponse = await userCreationResponse.json();
    expect(jsonResponse.name).toEqual(data.name);
    expect(jsonResponse.job).toEqual(data.job);
    expect(jsonResponse.createdAt).toBeDefined();
    expect(jsonResponse.id).toBeDefined();
  });

  test("Validate update information by PATCH API method", async ({request}) => {
    const data = {
      name: "morpheus",
      job: "zion resident",
    };
    const updatedUserResponse = await request.patch(`${baseUrl}/api/users/2`, {data});
    const jsonResponse: IResponse = await updatedUserResponse.json();
    expect(updatedUserResponse.status()).toBe(200);
    expect(updatedUserResponse.statusText()).toBe("OK");
    expect(jsonResponse.name).toEqual(data.name);
    expect(jsonResponse.job).toEqual(data.job);
    expect(jsonResponse.updatedAt).toBeDefined();
  });

  test("Validate user was Deleted by API call", async ({ request }) => {
    const deletedUserResponse = await request.delete(`${baseUrl}/api/users/2`);
    expect(deletedUserResponse.status()).toBe(204);
    expect(deletedUserResponse.statusText()).toBe("No Content");
  });

  test("Validate Register - Successfull by API call", async ({ request }) => {
    const data = {
      email: "eve.holt@reqres.in",
      password: "glockpistol",
    };

    const registerSuccessfullResponse = await request.post(
      `${baseUrl}/api/register`,
      { data }
    );
    expect(registerSuccessfullResponse.status()).toBe(200);
    expect(registerSuccessfullResponse.statusText()).toBe("OK");
    const jsonResponse: IResponse = await registerSuccessfullResponse.json();
    expect(jsonResponse.token).toBeDefined();
    expect(jsonResponse.id).toBeDefined();
  });

  test("Validate Register - UnSuccessfull by API call", async ({ request }) => {
    const data = {
      email: "sydney@fife",
    };

    const registerUnSuccessfullResponse = await request.post(
      `${baseUrl}/api/register`,
      { data }
    );
    expect(registerUnSuccessfullResponse.status()).toBe(400);
    expect(registerUnSuccessfullResponse.statusText()).toBe("Bad Request");
    const jsonResponse: IResponse = await registerUnSuccessfullResponse.json();
    expect(jsonResponse.error).toBe("Missing password");
  });

  test("Validate Login - Successfull by API call", async ({ request }) => {
    const data = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    const loginSuccessfullResponse = await request.post(
      `${baseUrl}/api/login`,
      { data }
    );
    expect(loginSuccessfullResponse.status()).toBe(200);
    expect(loginSuccessfullResponse.statusText()).toBe("OK");
    const jsonResponse: IResponse = await loginSuccessfullResponse.json();
    expect(jsonResponse.token).toBeDefined();
  });

  test("Validate Login - UnSuccessfull by API call", async ({ request }) => {
    const data = {
      email: "peter@klaven",
    };

    const loginUnSuccessfullResponse = await request.post(
      `${baseUrl}/api/login`,
      { data }
    );
    expect(loginUnSuccessfullResponse.status()).toBe(400);
    expect(loginUnSuccessfullResponse.statusText()).toBe("Bad Request");
    const jsonResponse: IResponse = await loginUnSuccessfullResponse.json();
    expect(jsonResponse.error).toBe("Missing password");
  });

  test("Validate Delayed Response by API call", async ({ request }) => {
    const responseDelayedResponseData = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
        {
          id: 3,
          email: "emma.wong@reqres.in",
          first_name: "Emma",
          last_name: "Wong",
          avatar: "https://reqres.in/img/faces/3-image.jpg",
        },
        {
          id: 4,
          email: "eve.holt@reqres.in",
          first_name: "Eve",
          last_name: "Holt",
          avatar: "https://reqres.in/img/faces/4-image.jpg",
        },
        {
          id: 5,
          email: "charles.morris@reqres.in",
          first_name: "Charles",
          last_name: "Morris",
          avatar: "https://reqres.in/img/faces/5-image.jpg",
        },
        {
          id: 6,
          email: "tracey.ramos@reqres.in",
          first_name: "Tracey",
          last_name: "Ramos",
          avatar: "https://reqres.in/img/faces/6-image.jpg",
        },
      ],
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };

    const delayedResponseResponse = await request.get(
      `${baseUrl}/api/users?delay=3`
    );

    expect(delayedResponseResponse.status()).toBe(200);
    expect(delayedResponseResponse.statusText()).toBe("OK");
    expect(await delayedResponseResponse.json()).toEqual(
      responseDelayedResponseData
    );
  });
});
