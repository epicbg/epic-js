import mount from "./mount";


export default class framework {
    constructor(props){
        mount(props.mount, props.entry)
    }
}