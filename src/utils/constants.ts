import { B, I, H1, H2,H3,H4,H5,H6,P } from "../components";
import { IConfig } from "../types";

export enum ELEMENT_TYPES {
    BOLD = 'BOLD',
    ITALIC = 'ITALIC',
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    H5 = 'H5',
    H6 = 'H6',
    P = 'P'
}

export const defaultConfig: IConfig = {
    pattern: {
        seperator: '|',
        suffix: '>>',
        prefix: '<<'
    },
    elementTypes: {
        BOLD: B,
        ITALIC: I,
        H1: H1,
        H2: H2,
        H3: H3,
        H4: H4,
        H5: H5,
        H6: H6,
        P: P
    }
}