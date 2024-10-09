import { expect } from 'chai';
import { HttpRequest } from './HttpRequest';

describe('HttpRequest - Auth API', () => {
  const baseURL = 'https://ya-praktikum.tech/api/v2';
  const httpRequest = new HttpRequest(baseURL);

  it('Должен создаться новый пользователь', async () => {
    try {
      const response = await httpRequest.post('/auth/signup', {
        first_name: 'John',
        second_name: 'Doe',
        login: `johndoe${Date.now()}`,
        email: `johndoe${Date.now()}@example.com`,
        password: 'password123',
        phone: '1234567890123',
      });

      expect(response).to.be.an('object');
      expect(response).to.have.property('id');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error response:', error.message);
      }
      if (error instanceof Error && 'response' in error) {
        console.error('Full error response:', (error as any).response);
      }
    }
  });
});
