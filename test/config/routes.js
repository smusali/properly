/** External Dependencies */
const request = require('supertest');
const {test, threw} = require('tap');

/** Internal Dependencies */
const app = require('../../config/routes');

/** Variables */
let response, rentID, saleID;

/** Constants */
const rentData = {
  price: '$1000',
  email: 'samir.musali@gmail.com'
};

const saleData = {
  price: '$300000',
  email: 'samir.musali@gmail.com'
}

/** Test the Routes */
test('routes', async (t) => {
  response = await request(app).get('/');
  t.same(response.status, 302, 'Successful Redirection');

  response = await request(app).get('/info');
  t.same(response.status, 200, 'Successful GET /info Request');
  t.same(response.body, {}, 'No JSON Response Body');
  t.not(response.text.length, 0, 'Non-Empty Response Text');

  response = await request(app).post('/listings/rent').send({});
  t.same(response.status, 400, 'Invalid Request Body');
  t.same(response.body, {
    error: 'Invalid Request Body',
    code: 'EINVALID'
  }, 'Invalid Request Body');

  response = await request(app).post('/listings/sale').send({});
  t.same(response.status, 400, 'Invalid Request Body');
  t.same(response.body, {
    error: 'Invalid Request Body',
    code: 'EINVALID'
  }, 'Invalid Request Body');

  response = await request(app).post('/listings/test').send({});
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).post('/listings/rent').send(rentData);
  t.same(response.status, 200, 'Successful Listing Creation');
  t.match(response.body, {
    message: String,
    id: String
  }, 'Successful Listing Creation');
  rentID = response.body.id;
  t.match(response.body, {
    message: `Successfully Created ${rentID}`,
    id: rentID
  }, 'Successful Listing Creation');

  response = await request(app).post('/listings/sale').send(saleData);
  t.same(response.status, 200, 'Successful Listing Creation');
  t.match(response.body, {
    message: String,
    id: String
  }, 'Successful Listing Creation');
  saleID = response.body.id;
  t.match(response.body, {
    message: `Successfully Created ${saleID}`,
    id: saleID
  }, 'Successful Listing Creation');

  response = await request(app).post('/listings/test').send(rentData);
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).get('/listings');
  t.same(response.status, 200, 'Successful Listing Listing');
  t.match(response.body, [{
    ...rentData,
    id: rentID,
    created: Number,
    updated: Number
  }, {
    ...saleData,
    id: saleID,
    created: Number,
    updated: Number
  }], 'Successful Listing Listing');

  response = await request(app).get('/listings/rent');
  t.same(response.status, 200, 'Successful Listing Listing');
  t.match(response.body, [{
    ...rentData,
    id: rentID,
    created: Number,
    updated: Number
  }], 'Successful Listing Listing');

  response = await request(app).get('/listings/sale');
  t.same(response.status, 200, 'Successful Listing Listing');
  t.match(response.body, [{
    ...saleData,
    id: saleID,
    created: Number,
    updated: Number
  }], 'Successful Listing Listing');

  response = await request(app).get('/listings/test');
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).get('/listings').query({
    ids: [rentID]
  });
  t.same(response.status, 200, 'Successful Listing Listing');
  t.match(response.body, [{
    ...rentData,
    id: rentID,
    created: Number,
    updated: Number
  }], 'Successful Listing Listing');

  response = await request(app).get('/listings/rent').query({
    ids: [saleID]
  });
  t.same(response.status, 200, 'Successful Listing Listing');
  t.match(response.body, [], 'Successful Listing Listing');

  response = await request(app).get('/listings/sale').query({
    ids: [rentID]
  });
  t.same(response.status, 200, 'Successful Listing Listing');
  t.match(response.body, [], 'Successful Listing Listing');

  response = await request(app).put(`/listings/rent/${rentID}`).send({});
  t.same(response.status, 400, 'Invalid Request Body');
  t.same(response.body, {
    error: 'Invalid Request Body',
    code: 'EINVALID'
  }, 'Invalid Request Body');

  response = await request(app).put(`/listings/sale/${saleID}`).send({});
  t.same(response.status, 400, 'Invalid Request Body');
  t.same(response.body, {
    error: 'Invalid Request Body',
    code: 'EINVALID'
  }, 'Invalid Request Body');

  response = await request(app).put(`/listings/test/${rentID}`).send({});
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).put(`/listings/rent/${rentID}`).send(rentData);
  t.same(response.status, 200, 'Successful Listing Update');
  t.same(response.body, {
    message: `Successfully Updated ${rentID}`,
    id: rentID
  }, 'Successful Listing Update');

  response = await request(app).put(`/listings/sale/${saleID}`).send(saleData);
  t.same(response.status, 200, 'Successful Listing Update');
  t.same(response.body, {
    message: `Successfully Updated ${saleID}`,
    id: saleID
  }, 'Successful Listing Update');

  response = await request(app).put(`/listings/test/${saleID}`).send(saleData);
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).put(`/listings/rent/${saleID}`).send(saleData);
  t.same(response.status, 400, 'Failed Listing Update');
  t.same(response.body, {
    error: 'Invalid Request Body',
    code: 'EINVALID'
  }, 'Failed Listing Update');

  response = await request(app).put(`/listings/sale/${rentID}`).send(rentData);
  t.same(response.status, 400, 'Failed Listing Update');
  t.same(response.body, {
    error: 'Invalid Request Body',
    code: 'EINVALID'
  }, 'Failed Listing Update');

  response = await request(app).put(`/listings/test/${rentID}`).send(rentData);
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).get(`/listings/rent/${rentID}`);
  t.same(response.status, 200, 'Successful Listing Retrieval');
  t.match(response.body, {
    ...rentData,
    created: Number,
    updated: Number
  }, 'Successful Listing Retrieval');

  response = await request(app).get(`/listings/sale/${saleID}`);
  t.same(response.status, 200, 'Successful Listing Retrieval');
  t.match(response.body, {
    ...saleData,
    created: Number,
    updated: Number
  }, 'Successful Listing Retrieval');

  response = await request(app).get(`/listings/test/${rentID}`);
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).get(`/listings/rent/${saleID}`);
  t.same(response.status, 404, 'Failed Listing Retrieval');
  t.match(response.body, {
    error: `No Listing Found for ${saleID}`,
    code: 'ENOTFOUND'
  }, 'Failed Listing Retrieval');

  response = await request(app).get(`/listings/sale/${rentID}`);
  t.same(response.status, 404, 'Failed Listing Retrieval');
  t.match(response.body, {
    error: `No Listing Found for ${rentID}`,
    code: 'ENOTFOUND'
  }, 'Failed Listing Retrieval');

  response = await request(app).get(`/listings/test/${saleID}`);
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');

  response = await request(app).delete(`/listings/rent/${rentID}`);
  t.same(response.status, 200, 'Successful Listing Removal');
  t.same(response.body, {
    message: `Successfully Removed ${rentID}`,
    id: rentID
  }, 'Successful Listing Removal');

  response = await request(app).delete(`/listings/sale/${saleID}`);
  t.same(response.status, 200, 'Successful Listing Removal');
  t.same(response.body, {
    message: `Successfully Removed ${saleID}`,
    id: saleID
  }, 'Successful Listing Removal');

  response = await request(app).delete(`/listings/test/${rentID}`);
  t.same(response.status, 404, 'Undefined Listing Type');
  t.same(response.body, {
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND'
  }, 'Undefined Listing Type');
}).catch(threw);
