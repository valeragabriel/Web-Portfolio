import fetchMock from "jest-fetch-mock";

test("GET to /api/v1/status should return 200", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      updated_at: new Date().toISOString(),
      dependencies: {
        database: {
          version: "14.15 (Homebrew)",
          max_connections: 100,
          opened_connections: 1,
        },
      },
    })
  );

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("14.15 (Homebrew)");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
