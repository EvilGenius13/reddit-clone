const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, after } = require('mocha');
const app = require('../server');
chai.use(chaiHttp);
const agent = chai.request.agent(app);
const should = chai.should();

describe('site', () => {
  // Describe what you are testing
  it('Should have home page', (done) => {
    // Describe what should happen
    // In this case we test that the home page loads
    agent
      .get('/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        return done(); // Call done if the test completed successfully.
      });
  });
});

// after(() => {
//   app.close(); // Close the server after running tests
// });

// // Add the following lines to start the server on a different port (3003)
// const server = app.listen(3003, () => {
//   console.log('Server is running on port 3003');
// });
