import { parse } from 'node-html-parser';
import render from './render'

export default (target, entry) => {
    // Root element
    let el = document.querySelector(target)
    
    // Our virtual dom
    const vApp = parse(entry.template);

    // render virtual dom
    const rendered = render(vApp.firstChild, entry)
    
    // append it 
    el.replaceWith(rendered)
}