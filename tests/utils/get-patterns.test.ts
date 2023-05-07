import { IConfig } from "../../src/types"
import { getPatterns } from "../../src/utils"
import { Bold } from "../components/Bold"
import { Button } from "../components/Button"

const prefix = '++';
const suffix = '--';
const seperator = '!';
enum elementType {
    button = 'button',
    bold = 'bold'
}

const config: IConfig = {
    pattern: {
        prefix,
        suffix,
        seperator
    },
    elementTypes: {
        bold: Bold,
        button: Button
    }
}

describe('Test getPatterns method', () => {

    describe('Identifies correct pattern', () => {
        it('Is able to identify valid pattern', () => {
            const result = getPatterns(`${prefix}${seperator}${elementType.button}${seperator}{"data":{"text":"Test Button1"}}${seperator}${suffix}`, config);
            expect(result).toStrictEqual([{
                data: { data: { text: 'Test Button1' } },
                startPosition: 0,
                endPosition: 44,
                type: elementType.button
            }])
        })
        it('Is able to identify patter as valid with single quotes also', () => {
            const result = getPatterns(`${prefix}${seperator}${elementType.button}${seperator}'{"data":{"text":"Single quotes"}}'${seperator}${suffix}`, config);
            expect(result).toStrictEqual([{
                data: { data: { text: 'Single quotes' } },
                startPosition: 0,
                endPosition: 47,
                type: elementType.button
            }])
        })
        it('Works with 2 suffix in end', () => {
            const result = getPatterns(`hello ${prefix}${seperator}${elementType.button}${seperator}'{"data":{"text":"New Button 2"}}'${seperator}${suffix}${suffix}`, config);
            expect(result).toStrictEqual([{
                data: { data: { text: 'New Button 2' } },
                startPosition: 6,
                endPosition: 52,
                type: elementType.button
            }])
        })
    })
    
    
    describe('Does not identifies incorrect pattern', () => {
        it('Wrong element type', () => {
            const result = getPatterns(`${prefix}${seperator}buttlon${seperator}'{"data":{"text":"New Button 2"}}'${seperator}${suffix}`, config);
            expect(result).toStrictEqual([])
        })
        it('Wrong pattern in end', () => {
            const result = getPatterns(`${prefix}${seperator}${elementType.button}${seperator}'{"data":{"text":"New Button 2"}}'${seperator}${seperator}${suffix}`, config);
            expect(result).toStrictEqual([])
        })
        it('Invalid json', () => {
            const result = getPatterns(`${prefix}${seperator}${elementType.button}${seperator}'{"data":{text:"New Button"}}'${seperator}${suffix}`, config);
            expect(result).toStrictEqual([])
        })
    })
})