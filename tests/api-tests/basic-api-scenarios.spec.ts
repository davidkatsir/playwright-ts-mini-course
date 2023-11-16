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
  const ststusTextOk = "OK";
  const ststusTextNotFound = "Not Found";

  test("Validate Users List Response by GET API call", async ({ request }) => {
    const usersListResponseData = {
      page: 2,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 7,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 8,
          email: "lindsay.ferguson@reqres.in",
          first_name: "Lindsay",
          last_name: "Ferguson",
          avatar: "https://reqres.in/img/faces/8-image.jpg",
        },
        {
          id: 9,
          email: "tobias.funke@reqres.in",
          first_name: "Tobias",
          last_name: "Funke",
          avatar: "https://reqres.in/img/faces/9-image.jpg",
        },
        {
          id: 10,
          email: "byron.fields@reqres.in",
          first_name: "Byron",
          last_name: "Fields",
          avatar: "https://reqres.in/img/faces/10-image.jpg",
        },
        {
          id: 11,
          email: "george.edwards@reqres.in",
          first_name: "George",
          last_name: "Edwards",
          avatar: "https://reqres.in/img/faces/11-image.jpg",
        },
        {
          id: 12,
          email: "rachel.howell@reqres.in",
          first_name: "Rachel",
          last_name: "Howell",
          avatar: "https://reqres.in/img/faces/12-image.jpg",
        },
      ],
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };
    const usersListResponse = await request.get(`${baseUrl}/api/users?page=2`);
    expect(usersListResponse.status()).toBe(200);
    expect(usersListResponse.statusText()).toBe(ststusTextOk);
    expect(await usersListResponse.json()).toEqual(usersListResponseData);
  });

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
    expect(singleUserResponse.statusText()).toBe(ststusTextOk);
    expect(await singleUserResponse.json()).toEqual(responseUserId2Data);
  });

  test("Validate Single user Not Found by GET API call", async ({
    request,
  }) => {
    const responseSingleUserNotFound = {};
    const singleUserNotFoundResponse = await request.get(
      `${baseUrl}/api/users/23`
    );
    expect(singleUserNotFoundResponse.status()).toBe(404);
    expect(singleUserNotFoundResponse.statusText()).toBe(ststusTextNotFound);
    expect(await singleUserNotFoundResponse.json()).toEqual(
      responseSingleUserNotFound
    );
  });

  test("Validate getting LIST <RESOURCE> by GET API call", async ({
    request,
  }) => {
    const responseListResource = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          name: "cerulean",
          year: 2000,
          color: "#98B2D1",
          pantone_value: "15-4020",
        },
        {
          id: 2,
          name: "fuchsia rose",
          year: 2001,
          color: "#C74375",
          pantone_value: "17-2031",
        },
        {
          id: 3,
          name: "true red",
          year: 2002,
          color: "#BF1932",
          pantone_value: "19-1664",
        },
        {
          id: 4,
          name: "aqua sky",
          year: 2003,
          color: "#7BC4C4",
          pantone_value: "14-4811",
        },
        {
          id: 5,
          name: "tigerlily",
          year: 2004,
          color: "#E2583E",
          pantone_value: "17-1456",
        },
        {
          id: 6,
          name: "blue turquoise",
          year: 2005,
          color: "#53B0AE",
          pantone_value: "15-5217",
        },
      ],
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };
    const listResourceResponse = await request.get(`${baseUrl}/api/unknown`);
    expect(listResourceResponse.status()).toBe(200);
    expect(listResourceResponse.statusText()).toBe(ststusTextOk);
    expect(await listResourceResponse.json()).toEqual(responseListResource);
  });

  test("Validate getting Single <RESOURCE> by GET API call", async ({
    request,
  }) => {
    const responseSingleResource = {
      data: {
        id: 2,
        name: "fuchsia rose",
        year: 2001,
        color: "#C74375",
        pantone_value: "17-2031",
      },
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };
    const singleResourceResponse = await request.get(
      `${baseUrl}/api/unknown/2`
    );
    expect(singleResourceResponse.status()).toBe(200);
    expect(singleResourceResponse.statusText()).toBe(ststusTextOk);
    expect(await singleResourceResponse.json()).toEqual(responseSingleResource);
  });

  test("Validate getting Single <RESOURCE> Not Found by GET API call", async ({
    request,
  }) => {
    const responseSingleResourceNotFound = {};
    const singleResourceNotFoundResponse = await request.get(
      `${baseUrl}/api/unknown/23`
    );
    expect(singleResourceNotFoundResponse.status()).toBe(404);
    expect(singleResourceNotFoundResponse.statusText()).toBe(
      ststusTextNotFound
    );
    expect(await singleResourceNotFoundResponse.json()).toEqual(
      responseSingleResourceNotFound
    );
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

  test("Validate Update User by PUT API call", async ({ request }) => {
    const data = {
      name: "morpheus",
      job: "zion resident",
    };
    const updateUserByPutResponse = await request.put(
      `${baseUrl}/api/users/2`,
      { data }
    );
    expect(updateUserByPutResponse.status()).toBe(200);
    expect(updateUserByPutResponse.statusText()).toBe(ststusTextOk);
    const jsonResponse: IResponse = await updateUserByPutResponse.json();
    expect(jsonResponse.name).toBe(data.name);
    expect(jsonResponse.job).toBe(data.job);
    expect(jsonResponse.updatedAt).toBeDefined();
  });

  test("Validate update information by PATCH API method", async ({
    request,
  }) => {
    const data = {
      name: "morpheus",
      job: "zion resident",
    };
    const updatedUserResponse = await request.patch(`${baseUrl}/api/users/2`, {
      data,
    });
    const jsonResponse: IResponse = await updatedUserResponse.json();
    expect(updatedUserResponse.status()).toBe(200);
    expect(updatedUserResponse.statusText()).toBe(ststusTextOk);
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
    expect(registerSuccessfullResponse.statusText()).toBe(ststusTextOk);
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
    const responseToken = "QpwL5tke4Pnpja7X4";
    const loginSuccessfullResponse = await request.post(
      `${baseUrl}/api/login`,
      { data }
    );
    expect(loginSuccessfullResponse.status()).toBe(200);
    expect(loginSuccessfullResponse.statusText()).toBe(ststusTextOk);
    const jsonResponse: IResponse = await loginSuccessfullResponse.json();
    expect(jsonResponse.token).toBe(responseToken);
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
    expect(delayedResponseResponse.statusText()).toBe(ststusTextOk);
    expect(await delayedResponseResponse.json()).toEqual(
      responseDelayedResponseData
    );
  });
});
