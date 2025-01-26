import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks(); 

test("GET to /api/v1/status should return 200", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ status: "ok" }));

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});