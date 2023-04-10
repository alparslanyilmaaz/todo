import axios, { isAxiosError } from 'axios';

const backendUrl = `http://localhost:${process.env.SERVER_PORT || '8080'}`

describe('POST /users/register', () => {
  it('should create a new user or should return 500 if user exists', async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/register`, {
        email: "test3@user.com",
        password: "test"
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
    } catch(e){
      if(isAxiosError(e) && e.response){
        expect(e.response.status).toBe(500);
      } else {
        throw e;
      }
    }
  });

  it('returns a 400 with empty body', async () => {
    try{
      await axios.post(`${backendUrl}/api/users/register`);
    } catch(e){
      if(isAxiosError(e) && e.response){
        expect(e.response.status).toBe(400);
      } else {
        throw e;
      }
    }
  });
});

describe('POST /users/login', () => {
  it('should login user', async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email: "test3@user.com",
        password: "test"
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
    } catch(e){
      if(isAxiosError(e) && e.response){
        expect(e.response.status).toBe(400);
      } else {
        throw e;
      }
    }
  });

  it('returns a 400 with empty body', async () => {
    try{
      await axios.post(`${backendUrl}/api/users/login`)
    } catch(e){
      if(isAxiosError(e) && e.response){
        expect(e.response.status).toBe(400);
      } else {
        throw e;
      }
    }
  });
});