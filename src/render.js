import { parse } from "node-html-parser";

const render = (vDomObject) => {

    let vDomEl = document.createElement(vDomObject.template.tagName)

    // Apply unique identifier with which you can detect changes in vDom and oDom
    vDomEl.setAttribute('eid', vDomObject.identifier)

    let attributes = vDomObject.template.attributes ? Object.entries(vDomObject.template.attributes) : []
    for (const [k, v] of attributes) {
        vDomEl.setAttribute(k, v)

        // TODO: add event listeners
        if(k == 'bind'){
            vDomEl.addEventListener('input', function(vDomObject, event){
                vDomObject.state[event.target.getAttribute('bind')] = event.target.value
            }.bind(this, vDomObject))
        }

        // Register event
        if(k.includes('-')){
            vDomEl.addEventListener(k.split('-')[1], vDomObject.methods[v].bind(vDomObject))
        }
    }
    
    for (const childEl of vDomObject.children) {
        let childNode = null
        if(!childEl.template.tagName){
            // Render text
            // Check for mustaches
            let variable = childEl.template.rawText.match(/\{\{((?!\}\})(.|\n))*\}\}/g);
            if(variable){
                variable = variable[0]
                let variableValue = vDomObject.state[variable.split('{{').pop().split('}}')[0]];
                childNode = document.createTextNode(variableValue)
            } else {
                childNode = document.createTextNode(childEl.template.rawText)
            }
            
        } else {
            // Render tags
            childNode = render(childEl)
        }
        // console.log(childNode, typeof childNode)
        vDomEl.appendChild(childNode)
    }

    return vDomEl
}

export default render
