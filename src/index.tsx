import React from 'react'
import ReactDom from 'react-dom'
import { IReactTransformer, IPattern } from './types'
import { getId, getPatterns } from './utils'

const REACT_VERSION = parseFloat(React.version)

// const Replacer = (props: IReactTransformer) => {
//   const [componentId] = useState(getId())
//   const { config } = props
//   const { elementTypes } = config

//   const insertAfter = (newNode: Text | HTMLElement, existingNode: HTMLElement | Text) => {
//     return existingNode?.parentNode?.insertBefore(newNode, existingNode.nextSibling)
//   }

//   const setHtml = (
//     htmlString: string,
//     nodes: HTMLElement[],
//     pattern: IPattern,
//     parentNode: HTMLElement,
//     referenceNode: HTMLElement | Text,
//     onChangeReference: any,
//   ) => {
//     const data = pattern.data
//     const elementType = pattern.type
//     const Component = elementTypes[elementType]
//     const first = document.createTextNode(htmlString)
//     const id = getId()
//     const newDiv = document.createElement('span')
//     newDiv.setAttribute('id', id)

//     // Empty all the text nodes
//     for (let i = 0; i < nodes.length; i++) {
//       nodes[i].textContent = ''
//     }
//     insertAfter(newDiv, referenceNode)
//     parentNode.insertBefore(first, newDiv)
//     onChangeReference(newDiv)
//     const container = document.getElementById(id)
//     if (container) {
//       if (Number(REACT_VERSION) < 16.8) {
//         ReactDom.render(<Component data={data.data} />, container)
//       } else {
//         const root = ReactDOMClient.createRoot(container)
//         root.render(<Component data={data.data} />)
//       }
//     }
//   }

//   const iterate = (ele: HTMLElement) => {
//     // @ele HTMLElement - Element in which we need to find patterns and replace with react components

//     /*Algorithm to find and replace pattern*/
//     /**
//      * 1. Loop through all Child nodes
//      * 2. Check if pattern exist in text node
//      * 2.1 If pattern exist call the REPLACER method
//      * 2.2 If pattern does not exist -> keep joining the text of the text nodes and check for pattern, till a non-text node comes
//      */

//     /*Algorithm to find pattern*/

//     // str string - for example `Parteet Kaur is a <<|bold|jsonData|>> girl and she is goint to <<|bold|jsonData|>> with me`;

//     /**
//      * 1. Loop through all characters in the string
//      * 2. Try to find PREFIX of the pattern followed by SEPERATOR
//      * 3. Once complete -> check if the type is valid and json is valid
//      * 3.1 If pattern is found -> store the start and end position of the pattern along with type and json data.
//      * 3.2 If not found -> reset and keep searching for pattern
//      */

//     let html = ''
//     let nodes: any[] = []
//     const empty = () => {
//       html = ''
//       nodes = []
//     }
//     // Iterate every child node
//     ele?.childNodes.forEach((child: any, index: number) => {
//       const work: {
//         htmlString: string
//         pattern: IPattern
//       }[] = []
//       if (child.nodeType === Node.TEXT_NODE) {
//         html += child.textContent
//         nodes.push(ele?.childNodes[index])
//         const patterns = getPatterns(html, config)
//         let start = 0
//         if (patterns.length) {
//           patterns.forEach((pattern) => {
//             work.push({
//               htmlString: `${html.substring(start, pattern.startPosition)}`,
//               pattern,
//             })
//             start = pattern.endPosition + 1
//           })

//           const newDiv = () => document.createElement('div')
//           let ref: HTMLElement | Text | undefined
//           let tempNode: HTMLElement | Text | undefined
//           const onChangeReference = (node: any) => {
//             ref = node
//           }
//           // set html for all
//           work.forEach((workItem, j) => {
//             const { htmlString, pattern } = workItem
//             tempNode = newDiv()
//             if (j === 0) {
//               ref = insertAfter(tempNode, nodes[0])
//             } else if (ref) {
//               insertAfter(tempNode, ref)
//             }
//             if (ref) {
//               setHtml(htmlString, nodes, pattern, ele, ref, onChangeReference)
//               ele.removeChild(tempNode)
//             }
//           })
//           // set html for the last part
//           if (ref) {
//             const last = document.createTextNode(html.substring(start))
//             insertAfter(last, ref)
//           }
//           empty()
//         }
//       } else {
//         iterate(child)
//         empty()
//       }
//     })
//   }

//   //   const startObserving = (targetNode: HTMLElement) => {
//   //     // Options for the observer (which mutations to observe)
//   //     const config = { attributes: true, childList: true, subtree: true };

//   //     // Callback function to execute when mutations are observed
//   //     const callback = (mutationList: any, observer: any) => {
//   //       for (const mutation of mutationList) {
//   //         if (mutation.type === "childList") {
//   //           // sconsole.log("A child node has been added or removed.", mutation.addedNodes);
//   //           mutation.addedNodes.forEach((addedNode: HTMLElement) => {
//   //             // console.log("Added node's child nodes", addedNode.childNodes);
//   //             iterate(addedNode);
//   //           });
//   //         }
//   //         // else if (mutation.type === "attributes") {
//   //         // console.log(`The ${mutation.attributeName} attribute was modified.`);
//   //         // }
//   //       }
//   //     };

//   //     // Create an observer instance linked to the callback function
//   //     const observer = new MutationObserver(callback);

//   //     // Start observing the target node for configured mutations
//   //     if (targetNode) {
//   //       observer.observe(targetNode, config);
//   //     }

//   //     // Later, you can stop observing
//   //     // observer.disconnect();
//   //   };

//   useEffect(() => {
//     const wrapperComponent = document.getElementById(`${componentId}`)
//     if (wrapperComponent) {
//       // startObserving(wrapperComponent);
//       console.log('react version' + REACT_VERSION)
//       iterate(wrapperComponent)
//     }
//   })

//   return <div id={componentId}>{props.children}</div>
// }

export class Replacer extends React.Component<IReactTransformer, { componentId: string }> {
  constructor(props: IReactTransformer) {
    super(props)
    this.state = {
      componentId: getId(),
    }
  }

  componentDidMount(): void {
    const { componentId } = this.state
    const wrapperComponent = document.getElementById(`${componentId}`)
    if (wrapperComponent) {
      // startObserving(wrapperComponent);
      console.log('react version' + REACT_VERSION)
      this.iterate(wrapperComponent)
    }
  }

  insertAfter = (newNode: Text | HTMLElement, existingNode: HTMLElement | Text) => {
    return existingNode?.parentNode?.insertBefore(newNode, existingNode.nextSibling)
  }

  setHtml = (
    htmlString: string,
    nodes: HTMLElement[],
    pattern: IPattern,
    parentNode: HTMLElement,
    referenceNode: HTMLElement | Text,
    onChangeReference: any,
  ) => {
    const { config } = this.props
    const { elementTypes } = config
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
    this.insertAfter(newDiv, referenceNode)
    parentNode.insertBefore(first, newDiv)
    onChangeReference(newDiv)
    const container = document.getElementById(id)
    if (container) {
      if (Number(REACT_VERSION)) {
        ReactDom.render(<Component data={data.data} />, container)
      } else {
        // in future versions of react
        // import ReactDOMClient from 'react-dom/client'
        // const root = ReactDOMClient.createRoot(container)
        // root.render(<Component data={data.data} />)
      }
    }
  }

  iterate = (ele: HTMLElement) => {
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
    const { config } = this.props
    const empty = () => {
      html = ''
      nodes = []
    }
    // Iterate every child node
    ele?.childNodes.forEach((child: any, index: number) => {
      const work: {
        htmlString: string
        pattern: IPattern
      }[] = []
      if (child.nodeType === Node.TEXT_NODE) {
        html += child.textContent
        nodes.push(ele?.childNodes[index])
        const patterns = getPatterns(html, config)
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
              ref = this.insertAfter(tempNode, nodes[0])
            } else if (ref) {
              this.insertAfter(tempNode, ref)
            }
            if (ref) {
              this.setHtml(htmlString, nodes, pattern, ele, ref, onChangeReference)
              ele.removeChild(tempNode)
            }
          })
          // set html for the last part
          if (ref) {
            const last = document.createTextNode(html.substring(start))
            this.insertAfter(last, ref)
          }
          empty()
        }
      } else {
        this.iterate(child)
        empty()
      }
    })
  }

  render() {
    const { componentId } = this.state
    const { children } = this.props

    return <div id={componentId}>{children}</div>
  }
}
