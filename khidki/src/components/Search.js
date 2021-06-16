import React, { useState, useEffect} from 'react';
import axios from "axios";
import Searchresult from './Searchresult'
export default function Search({match})
{
    const [query, setQuery]= useState(match.params.id);     
    const url=`https://api.themoviedb.org/3/search/movie?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US&query=${query}&page=1&include_adult=false`;
    const [overview,setOverview] = useState([]);     
    const apiii=async ()=>{
        try{
            const response=await axios.get(url);
            setOverview(response.data.results);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
         apiii();
    }, [])      
    const Result= ()=>{
        if(overview.length!==0)
        {
            return overview.map(x=>{return <Searchresult search={x}></Searchresult>})
        }
        else
        {
            return <p>Nothing to show</p>;
        }
    }
    return (
        <>
          <div style={{backgroundColor:"#2a2b2d",height:"100%"}}>
            <input
                type = "text"
                placeholder="Search for..." 
                style={{width: "90%",borderRadius: "30px",height: "10%",margin:"3.5%",marginTop:"4%",padding:"20px",backgroundColor: "rgba(0, 0, 0, 0)",borderColor:"white"}}
                onChange={
                    ({target})=>{setQuery(target.value)}}    
                    onKeyPress={event => {
                        if(event.key === 'Enter')
                        {
                            apiii();
                        }
                    }}                                             
            />         
                <div >
                  {<Result/>}
                </div> 
            </div>           
        </>
    )
}