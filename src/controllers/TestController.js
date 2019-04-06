export default {
  testMe: async (request, h) =>
  // Stub for adding a action to store to db, sky is the limit
    h.response({
      status: true,
      ...request.payload,
    })
  ,
};
