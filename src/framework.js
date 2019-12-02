import { parse } from 'node-html-parser';
import Component from './component';

// Create vDom object from original dom object 
export function createVDomTree(vDomClass) {

    let tree = new Component(vDomClass)

    tree.template = typeof vDomClass.template == 'string' ? parse(vDomClass.template).firstChild : vDomClass.template
    tree.identifier = Math.round(Date.now() + Math.random() * 1000)

    for (const childIndex in tree.template.childNodes) {
        let $child = tree.template.childNodes[childIndex]
    
        // If there's a match with used components attach the class
        if(!tree.children){
            tree.children = []
        }

        if($child.tagName){
            let includedClassesInComponent = tree.use ? Object.keys(tree.use) : []
            let classIndex = includedClassesInComponent ? includedClassesInComponent.indexOf($child.tagName) : null
            
            if(classIndex !== -1){
                // Parse component
                tree.children.push(createVDomTree(tree.use[includedClassesInComponent[classIndex]]))
            } else {
                // This will parse standard html tagNames like divs, spans etc..
                tree.children.push(createVDomTree({
                    // Pass parent class properties
                    ...vDomClass,
                    template: $child,
                    children: [],
                    // Pass used components so vRenderer can see them
                }))
            }
        } else {
            // This will parse everything wihout tagName (textNodes) e.g spaces enters etc..
            tree.children.push({
                template: $child,
                children: [],
            })
        }
    }

    return tree
}

// export function renderVirtualDomObject