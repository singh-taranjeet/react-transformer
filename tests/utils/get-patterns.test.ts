import { IConfig } from "../../src/types"
import { getPatterns } from "../../src/utils"
import { Bold } from "../components/Bold"
import { Button } from "../components/Button"

describe('Test getPatterns method', () => {
    const config: IConfig = {
        pattern: {
            prefix: '++',
            suffix: '--',
            seperator: '!'
        },
        elementTypes: {
            bold: Bold,
            button: Button
        }
    }
    it('Is able to identify valid pattern', () => {
        const result = getPatterns(`++!button!{"data":{"text":"Test Button"}}!--`, config);
        expect(result).toStrictEqual([{
            data: { data: { text: 'Test Button' } },
            startPosition: 0,
            endPosition: 43,
            type: 'button'
        }])
    })
    it('Does not identify in-valid pattern', () => {
        const result = getPatterns(`++-!button!'{"data":{"text":"New Button"}}'!--`, config);
        expect(result).toStrictEqual([])
    })
    it('Does not throw error with invalid json', () => {
        const result = getPatterns(`++!button!'{"data":{"text":"New Button"}}'!--`, config);
        expect(result).toStrictEqual([])
    })
})