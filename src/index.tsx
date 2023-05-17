import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { IReactTransformer, IPattern } from './types'
import { getId, getPatterns } from './utils'

export const Replacer = (props: IReactTransformer) => {
  const [componentId, setComponentId] = useState('')

  useEffect(() => {
    const id = getId()
    setComponentId(id)
  }, [])

  useEffect(() => {
    const wrapperComponent = document.getElementById(`${componentId}`)
    if (wrapperComponent) {
      startObserving(wrapperComponent)
      iterate(wrapperComponent)
    }
  }, [componentId])

  const insertAfter = (newNode: Text | HTMLElement, existingNode: HTMLElement | Text) => {
    return existingNode?.parentNode?.insertBefore(newNode, existingNode.nextSibling)
  }

  const startObserving = (targetNode: HTMLElement) => {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true }

    // Callback function to execute when mutations are observed
    const callback = (mutationList: any) => {
      for (const mutation of mutationList) {
        // console.log("Mutation type", mutation.type)
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
          mutation.addedNodes.forEach((addedNode: HTMLElement) => {
            iterate(addedNode)
          })
        } else if (mutation.type === 'attributes') {
          // console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    if (targetNode) {
      observer.observe(targetNode, config)
    }

    // Later, you can stop observing
    // observer.disconnect();
  }

  const setHtml = (
    htmlString: string,
    nodes: HTMLElement[],
    pattern: IPattern,
    parentNode: HTMLElement,
    referenceNode: HTMLElement | Text,
    onChangeReference: any,
  ) => {
    const { config } = props
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
    insertAfter(newDiv, referenceNode)
    parentNode.insertBefore(first, newDiv)
    onChangeReference(newDiv)
    const container = document.getElementById(id)
    if (container) {
      const propsData = typeof data === 'string' ? {data: {text: data}} : data.data;
      ReactDom.render(<Component data={propsData} />, container)
    }
    return newDiv
  }

  const iterate = (ele: HTMLElement) => {
    let html = ''
    let nodes: any[] = []
    const { config } = props
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
          ele.setAttribute('data-in-progress', '1')
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
              const addedTransformerElement = setHtml(htmlString, nodes, pattern, ele, ref, onChangeReference)
              // Add some call back when ever the inner html changes to clear the added Transformer node
              ele.addEventListener('DOMSubtreeModified', () => {
                /**
                 * If patterns are found in this node
                 * Remove the existing Transformer node
                 * scan the patterns and convert them
                 */
                // console.log("Patterns found", getPatterns(ele.innerText, config));
                const notInProgress = ele.getAttribute('data-in-progress') === '0'

                if (getPatterns(ele.innerText, config).length && notInProgress) {
                  // Remove added transformer child
                  addedTransformerElement?.parentNode?.removeChild(addedTransformerElement)
                  // Convert the existing patterns
                  iterate(ele)
                }
              })
              ele.removeChild(tempNode)
            }
          })
          ele.setAttribute('data-in-progress', '0')
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

  const { children } = props

  return <div id={componentId}>{children}</div>
}
