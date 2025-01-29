import fetchMock from "jest-fetch-mock";
import database  from "../../../../../infra/database.ts";

fetchMock.enableMocks(); 

test("GET to /api/v1/status should return 200", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ status: "ok" }));
  const result = await database.query("SELECT 1 + 1");  
  console.log(result);

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});