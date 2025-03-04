const axios = {
  create: () => ({
    get: jest.fn().mockResolvedValue({ data: [] }),
  }),
};

export default axios;
