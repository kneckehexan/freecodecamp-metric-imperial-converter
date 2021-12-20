const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test('Test GET /api/convert with a valid input, like 10L', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });
  test('Test GET /api/convert with an invalid input, like 32g', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid unit"');
        done();
      });
  });
  test('Test GET /api/convert with an invalid number, like 3/7.2/4kg', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '"invalid number"');
        done();
      });
  });
  test('Test GET /api/convert with an invalid number and invalid unit, like 3/7.2/4kilomegagram', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid number and unit"');
        done();
      });
  });
  test('Test GET /api/convert with no number, like kg', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
});
