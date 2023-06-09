import { IConfig, IPattern } from '../types'

export const getPatterns = (str: string, config: IConfig): IPattern[] => {
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
                              try {
                                patternsFound.push({
                                  type: subType,
                                  data: JSON.parse(subJsonData),
                                  startPosition: index - (prefix.length - 1),
                                  endPosition: k,
                                })
                              } catch (error) {
                                // json was invalid
                              }
                            }
                            continueLooping = false
                            index = k + 1
                            subPattern = ''
                            break
                          }
                        } else {
                          break
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
