import React, { useState, useEffect} from 'react'
import axios from "axios";
import CustomNavbar from '../CustomNavbar'
import Showscard from './Showscard';
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
function Shows({match}) {  
    console.log("hello welcome to shows");
    const useStyles = makeStyles(() => ({
        ul: {
          "& .MuiPaginationItem-root": {
            color: "#fff",
            size: "40px",            
            fontSize:"20px"
          }
        }
      }));
    const [query,setQuery]=useState(match.params.id);
    const [query2,setQuery2]=useState();
    const url2=`https://api.themoviedb.org/3/tv/popular?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`
    const url=`https://api.themoviedb.org/3/tv/popular?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US&page=${query}`
    const [overview,setOverview] = useState([]);     
    const apiii=async ()=>{
        try{
            const response=await axios.get(url);
            const response2=await axios.get(url2);
           
            setOverview(response.data.results);
            
            setQuery2(response2.data.total_pages)
            console.log("helloooo");
            console.log(response.data.results);
        }catch(err){
            console.log(err);
        }
    }
    const history = createBrowserHistory({forceRefresh: true});  
    
    useEffect(() => {
        if(overview.length===0)
        {
         apiii();
        }
        
    },[overview])      
    const Result= ()=>{
        if(overview.length!==0)
        {
            return overview.map(x=>{return <Showscard movie={x}></Showscard>})
        }
        else
        {
            return <p>Nothing to show</p>;
        }
    }
    console.log(query);
    const classes = useStyles();
    const nextPage= (e,x) =>{      
        history.push(`/show/${x.toString()}`);
    }
    return (
        <div style={{backgroundColor:"black"}} >
  <CustomNavbar/>
            <h2 style={{color:"white",padding:"5px 20px",fontFamily:"Lato, sans-serif",fontSize:"5rem"}}>Popular TVshows</h2>
            <div style={{marginTop:"5%",marginRight:"2%"}} className="peoplelist">
            <Result/>
            hello
            </div>
            <div style={{marginLeft:"35%"}}>
            <Pagination  classes={{ ul: classes.ul }} count={query2} variant="outlined" color="secondary" size="large" defaultPage={parseInt(query)} onChange={nextPage}>
            </Pagination>
            </div>
        </div>
    )
}

export default Shows
