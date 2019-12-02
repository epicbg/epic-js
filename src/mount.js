import { parse } from 'node-html-parser';
import render from './render'
import {createVDomTree} from './framework'

// Create vDOM once and then start recompiling
export default (target, entryClass) => {
    // Root element
    let app = document.querySelector(target)
    

    // Initial structure should be 
    let vApp = createVDomTree(entryClass)
    console.log(vApp)
    const root = parse('<ul id="list"><li>Hello World</li></ul>');
console.log(root)
    
    let vAppRendered = render(vApp)

    app.replaceWith(vAppRendered)
}