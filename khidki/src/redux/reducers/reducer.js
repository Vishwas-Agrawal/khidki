
const initialState={
    _id:"",
    name:"",
    token:"",
    email:""
}
const myreducer=(state = initialState,action)=>{
    switch(action.type)
    {
        case "SIGN_IN": 
        return {
            ... state,
            name: action.payload.name,
            token: action.payload.token,
            email: action.payload.email,
            _id: action.payload._id
        }
        case "SIGN_OUT":
        return {
            ... state,
            name: "",
            token: "",
            email:"",
            _id: ""
        }
        default: 
        return state
    }
}
export default myreducer