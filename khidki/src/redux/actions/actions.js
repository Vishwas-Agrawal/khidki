import {SIGN_IN} from '../constants'
import {SIGN_OUT} from '../constants'
export const signin = () =>{
    return async (dispatch)=>{
        
        try{        
            const token= await localStorage.getItem('jwt');            
            const res = await localStorage.getItem('user');
            const res2=JSON.parse(res);            
            const name= res2.name;
            const email= res2.email;
            const _id= res2._id;
            dispatch({type:SIGN_IN,payload:{token,name,email,_id}})

        }catch(err){
            console.log(err);
        }
    }
}
export const signout =() =>{
    return async(dispatch)=>
    {
        try{
            await localStorage.clear();
            dispatch({type:SIGN_OUT});
        }
        catch(err){
            console.log(err);
        }
    }
}