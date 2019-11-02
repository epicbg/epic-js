import { parse } from "node-html-parser";

const render = (vNode, componentClass = null) => {

    let childClass = null

    if(componentClass && componentClass.use){
        let classIndex = Object.keys(componentClass.use).indexOf(vNode.tagName)
        if(classIndex !== -1){
            childClass = componentClass.use[vNode.tagName]
        }
    }

    if(!vNode.tagName){
        let $el = document.createTextNode(vNode.rawText);
        return $el
    }
    let $el = null
    if(!childClass){
        $el = document.createElement(vNode.tagName)
        
        let attributes = vNode.attributes ? Object.entries(vNode.attributes) : []
        for (const [k, v] of attributes) {
            $el.setAttribute(k, v)
        }
    
        for (const child of vNode.childNodes) {
            const $child = render(child, componentClass)
            $el.appendChild($child)
        }
    } else {
        $el = render(parse(childClass.template).firstChild, childClass)
    }

    return $el
}

export default render