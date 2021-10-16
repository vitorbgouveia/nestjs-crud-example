import * as pipeline from "./pipeline"

// @ponicode
describe("addPipe", () => {
    let inst: any

    beforeEach(() => {
        inst = new pipeline.Pipeline([])
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.addPipe(() => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("processPipe", () => {
    let inst: any

    beforeEach(() => {
        inst = new pipeline.Pipeline([])
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.processPipe(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.processPipe(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.processPipe(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.processPipe(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.processPipe(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.processPipe(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
