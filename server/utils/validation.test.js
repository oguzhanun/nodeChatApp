const expect = require('expect');

const {isRegularString} = require('./validation');

describe('isRegularString :', ()=>{
    
    it("should test isRegularString functions working", ()=>{
        expect(isRegularString(123)).toBe(false);
    })

    it("should test isRegularString functions working", ()=>{
        expect(isRegularString("     ")).toBe(false);
    })

    it("should test isRegularString functions working", ()=>{
        expect(isRegularString("123")).toBe(true);
    })
})