function Message(){
    const name : string = "Stefan"
    if (name){
        return <h1>Hello {name}</h1>;
    } else {
        return <h1>Hello</h1>
    }
}


export default Message;