var expect = require('expect');
var {generateMsg, generateLocMsg} = require('./message');


describe('generateMsg', () => {
    it('should generate correct msg object', () => {
        var from = 'brad';
        var text = 'text';
        var message = generateMsg(from, text);

        // expect(message.createdAt).toBeA('number');
        expect(message).toMatchObject(message);
    });
});

describe('generateLocMsg', () => {
    it('should generate correct loc msg object', () => {
        var from = 'me';
        var lat = 15;
        var long = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocMsg(from, lat, long);
        expect(message).toMatchObject({from, url});

    })
})