import { IPattern } from '../types'
import { defaultConfig } from './constants'

export const getPatterns = (str: string, config = defaultConfig): IPattern[] => {

  const { suffix, prefix, seperator } = config.pattern
  const { elementTypes } = config
  let subPattern = ''
  let index = 0
  const patternsFound: IPattern[] = []
  // console.log("str", str);

  // find prefix
  for (index; index < str.length; index++) {
    subPattern += str[index]

    if (subPattern.length === prefix.length) {
      if (subPattern === prefix && str[index + 1] === seperator) {
        // pattern start is found
        // Now search for type and json data
        // interate the remaining characters till first seperator is found
        let subType = ''
        let continueLooping = true
        for (let i = index + 2; i < str.length; i++) {
          if (continueLooping) {
            // search if seperator befor json data is found
            if (str[i] !== seperator) {
              subType += str[i]
            } else {
              // type is now found
              // validate type
              if (elementTypes[subType]) {
                // type is valid
                // search if last seperator and suffic is found
                let subJsonData = ''
                for (let j = i + 1; j < str.length; j++) {
                  if (continueLooping) {
                    if (str[j] !== seperator) {
                      subJsonData += str[j]
                    } else {
                      // last seperator is also found
                      // check if the next sub string has suffix
                      let subSuffix = ''
                      for (let k = j + 1; k < str.length; k++) {
                        if (continueLooping) {
                          subSuffix += str[k]
                          if (subSuffix.length === suffix.length) {
                            if (subSuffix === suffix) {
                              // Last suffix is also found
                              // Pattern found complete
                              // check if JSON is valid
                              if (subJsonData.includes('{"data":{')) {
                                try {
                                  // click first and last single quotes
                                  let newJsonString = subJsonData;
                                  (() => {
                                    if (newJsonString[0] === "'") {
                                      newJsonString = newJsonString.substring(1)
                                    }
                                    if (newJsonString[newJsonString.length - 1] === "'") {
                                      newJsonString = newJsonString.substring(0, newJsonString.length - 1)
                                    }
                                  })();
                                  // console.log('subJsonData', subJsonData, newJsonString)
                                  patternsFound.push({
                                    type: subType,
                                    data: JSON.parse(newJsonString),
                                    startPosition: index - (prefix.length - 1),
                                    endPosition: k,
                                  });
                                } catch (error) {
                                  // json was not found
                                  continueLooping = false;
                                }
                              }
                              else {
                                // data is not a json but a string
                                patternsFound.push({
                                  type: subType,
                                  data: subJsonData,
                                  startPosition: index - (prefix.length - 1),
                                  endPosition: k,
                                });
                              }
                            }
                            continueLooping = false;
                            index = k + 1;
                            subPattern = '';
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    break
                  }
                }
              } else {
                // type is not valid
                // start searching again for the next character
                index = i + 1
                continueLooping = false
                subPattern = ''
                break
              }
            }
          } else {
            break
          }
        }
      } else {
        // pattern start is not found
        subPattern = subPattern.substring(1)
      }
    }
  }
  return patternsFound
}

export const getId = (length = 5) => {
  let result = ``
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
