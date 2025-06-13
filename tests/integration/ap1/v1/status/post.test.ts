import orchestrator from '../orchestrator';
import { createMocks } from 'node-mocks-http';
import statusHandler from '../../../../../pages/api/v1/status';


beforeAll(async () => {
  await orchestrator.waitForAllServices(); 
  await orchestrator.clearDatabase();
});

describe('POST /api/v1/status', () => {
  it('should return 405 Method Not Allowed', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await statusHandler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
 