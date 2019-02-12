const expect = require('expect');
const {messageGenerator} = require('./message');


describe('messageGenerator', ()=>{
    it('should generate correct message object', ()=>{
        var message = messageGenerator("ogu", "come on!");
        expect(message.from).toBe("ogu");
        expect(message.text).toBe("come on!");
        expect(message.createdAt).toBeA('number');
    })
})