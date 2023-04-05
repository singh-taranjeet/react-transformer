import React, { useEffect, useState } from 'react'
import ReactDOMClient from 'react-dom/client'

export interface IComponent {
  data: {
    text: string
  }
}

const prefix = 'text-replacer'

function getId(length = 5) {
  let result = `${prefix}`
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

interface IProps {
  config: {
    pattern: {
      prefix: string
      suffix: string
      seperator: string
    }
    elementTypes: {
      [type: string]: React.ComponentType<IComponent>
    }
  }
  children: React.ReactNode
}

interface Pattern {
  data: any
  type: string
  startPosition: number
  endPosition: number
}

export const Replacer = (props: IProps) => {
  const [componentId] = useState(getId())
  const { suffix, seperator, prefix } = props.config.pattern
  const { elementTypes } = props.config

  const getPatterns = (str: string): Pattern[] => {
    let subPattern = ''
    let index = 0
    const patternsFound: Pattern[] = []
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
                                patternsFound.push({
                                  type: subType,
                                  data: JSON.parse(subJsonData),
                                  startPosition: index - (prefix.length - 1),
                                  endPosition: k,
                                })
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

  const insertAfter = (newNode: Text | HTMLElement, existingNode: HTMLElement | Text) => {
    return existingNode?.parentNode?.insertBefore(newNode, existingNode.nextSibling)
  }

  const setHtml = (
    htmlString: string,
    nodes: HTMLElement[],
    pattern: Pattern,
    parentNode: HTMLElement,
    referenceNode: HTMLElement | Text,
    onChangeReference: any,
  ) => {
    const data = pattern.data
    const elementType = pattern.type
    const Component = elementTypes[elementType]
    const first = document.createTextNode(htmlString)
    const id = getId()
    const newDiv = document.createElement('span')
    newDiv.setAttribute('id', id)

    // Empty all the text nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].textContent = ''
    }
    insertAfter(newDiv, referenceNode)
    parentNode.insertBefore(first, newDiv)
    onChangeReference(newDiv)
    const container = document.getElementById(id)
    if (container) {
      const root = ReactDOMClient.createRoot(container)
      root.render(<Component data={data.data} />)
    }
  }

  const iterate = (ele: HTMLElement) => {
    // @ele HTMLElement - Element in which we need to find patterns and replace with react components

    /*Algorithm to find and replace pattern*/
    /**
     * 1. Loop through all Child nodes
     * 2. Check if pattern exist in text node
     * 2.1 If pattern exist call the REPLACER method
     * 2.2 If pattern does not exist -> keep joining the text of the text nodes and check for pattern, till a non-text node comes
     */

    /*Algorithm to find pattern*/

    // str string - for example `Parteet Kaur is a <<|bold|jsonData|>> girl and she is goint to <<|bold|jsonData|>> with me`;

    /**
     * 1. Loop through all characters in the string
     * 2. Try to find PREFIX of the pattern followed by SEPERATOR
     * 3. Once complete -> check if the type is valid and json is valid
     * 3.1 If pattern is found -> store the start and end position of the pattern along with type and json data.
     * 3.2 If not found -> reset and keep searching for pattern
     */

    let html = ''
    let nodes: any[] = []
    const empty = () => {
      html = ''
      nodes = []
    }
    // Iterate every child node
    ele?.childNodes.forEach((child: any, index: number) => {
      const work: {
        htmlString: string
        pattern: Pattern
      }[] = []
      if (child.nodeType === Node.TEXT_NODE) {
        html += child.textContent
        nodes.push(ele?.childNodes[index])
        const patterns = getPatterns(html)
        let start = 0
        if (patterns.length) {
          patterns.forEach((pattern) => {
            work.push({
              htmlString: `${html.substring(start, pattern.startPosition)}`,
              pattern,
            })
            start = pattern.endPosition + 1
          })

          const newDiv = () => document.createElement('div')
          let ref: HTMLElement | Text | undefined
          let tempNode: HTMLElement | Text | undefined
          const onChangeReference = (node: any) => {
            ref = node
          }
          // set html for all
          work.forEach((workItem, j) => {
            const { htmlString, pattern } = workItem
            tempNode = newDiv()
            if (j === 0) {
              ref = insertAfter(tempNode, nodes[0])
            } else if (ref) {
              insertAfter(tempNode, ref)
            }
            if (ref) {
              setHtml(htmlString, nodes, pattern, ele, ref, onChangeReference)
              ele.removeChild(tempNode)
            }
          })
          // set html for the last part
          if (ref) {
            const last = document.createTextNode(html.substring(start))
            insertAfter(last, ref)
          }
          empty()
        }
      } else {
        iterate(child)
        empty()
      }
    })
  }

  //   const startObserving = (targetNode: HTMLElement) => {
  //     // Options for the observer (which mutations to observe)
  //     const config = { attributes: true, childList: true, subtree: true };

  //     // Callback function to execute when mutations are observed
  //     const callback = (mutationList: any, observer: any) => {
  //       for (const mutation of mutationList) {
  //         if (mutation.type === "childList") {
  //           // sconsole.log("A child node has been added or removed.", mutation.addedNodes);
  //           mutation.addedNodes.forEach((addedNode: HTMLElement) => {
  //             // console.log("Added node's child nodes", addedNode.childNodes);
  //             iterate(addedNode);
  //           });
  //         }
  //         // else if (mutation.type === "attributes") {
  //         // console.log(`The ${mutation.attributeName} attribute was modified.`);
  //         // }
  //       }
  //     };

  //     // Create an observer instance linked to the callback function
  //     const observer = new MutationObserver(callback);

  //     // Start observing the target node for configured mutations
  //     if (targetNode) {
  //       observer.observe(targetNode, config);
  //     }

  //     // Later, you can stop observing
  //     // observer.disconnect();
  //   };

  useEffect(() => {
    const wrapperComponent = document.getElementById(`${componentId}`)
    if (wrapperComponent) {
      // startObserving(wrapperComponent);
      iterate(wrapperComponent)
    }
  })

  return <div id={componentId}>{props.children}</div>
}
