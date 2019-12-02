export default class Component {
    constructor(vDomClass){
        // Map all properties to component class
        for (const prop in vDomClass) {
            this[prop] = vDomClass[prop]
        }
        this.listenForStateChanges()
    }

    listenForStateChanges(){
        // Skip listeners
        if(!this.state)
            return
        
        // listen for property change
    }
    
}