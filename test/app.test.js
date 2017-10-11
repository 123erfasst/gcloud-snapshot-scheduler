const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const handler = require('../src/handler');

describe('handler', function () {
    it('should throw error if no cron job', function () {
        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            method: 'GET',
            url: '/create/myZone/myDsik'
        });

        handler(req, res, 'start');

        expect(res.statusCode).to.equal(400);
        expect(res._isJSON()).to.equal(true);
        expect(JSON.parse(res._getData())).to.deep.equal({
            type: 'Unauthorized',
            message: 'Only cron jobs have access'
        })
    });
});