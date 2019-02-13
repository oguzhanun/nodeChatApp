const expect = require('expect');
const {messageGenerator,locationGenerator} = require('./message');


describe('messageGenerator', ()=>{
    it('should generate correct message object', ()=>{
        var message = messageGenerator("ogu", "come on!");
        expect(message.from).toBe("ogu");
        expect(message.text).toBe("come on!");
        expect(message.createdAt).toBeA('number');
    })
});

describe('locationGenerator', ()=>{
    it('should generate correct location object', ()=>{
        var location = locationGenerator("ogu", 1,1);
        expect(location.from).toBe("ogu");
        expect(location.url).toBe("https://www.google.com/maps?q=1,1");
        expect(location.createdAt).toBeA('number');
    })
});
