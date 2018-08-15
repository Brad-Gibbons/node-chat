var expect = require('expect');
var {generateMsg} = require('./message');


describe('generateMsg', () => {
    it('should generate correct msg object', () => {
        var from = 'brad';
        var text = 'text';
        var message = generateMsg(from, text);

        // expect(message.createdAt).toBeA('number');
        expect(message).toMatchObject(message);
    });
});