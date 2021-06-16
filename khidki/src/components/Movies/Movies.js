import React, { useState, useEffect} from 'react'
import axios from "axios";
import CustomNavbar from '../CustomNavbar'
import Moviescard from './Moviescard';
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core/styles';
import  {createBrowserHistory} from 'history'
function Movies({match}) {  
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
    const url2=`https://api.themoviedb.org/3/movie/popular?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`
    const url=`https://api.themoviedb.org/3/movie/popular?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US&page=${query}`
    const [overview,setOverview] = useState([]);     
    const apiii=async ()=>{
        try{
            const response=await axios.get(url);
            const response2=await axios.get(url2);
           
            setOverview(response.data.results);
            
            setQuery2(response2.data.total_pages)
            console.log(response2);
        }catch(err){
            console.log(err);
        }
    }
    const history = createBrowserHistory({forceRefresh: true})
    
    useEffect(() => {
         apiii();
    }, [])      
    const Result= ()=>{
        if(overview.length!==0)
        {
            return overview.map(x=>{return <Moviescard movie={x}></Moviescard>})
        }
        else
        {
            return <p>Nothing to show</p>;
        }
    }
    console.log(query);
    const classes = useStyles();
    const nextPage= (e,x) =>{      
        history.push(`/movie/${x.toString()}`);
    }
    return (
        <div style={{backgroundColor:"black"}} >
            <CustomNavbar/>
            <h2 style={{color:"white",padding:"5px 20px",fontFamily:"Lato, sans-serif",fontSize:"5rem"}}>Popular Movies</h2>
            <div style={{marginTop:"5%",marginRight:"2%"}} className="peoplelist">
            <Result/>
            </div>
            <div className="pagination" >
            <Pagination  classes={{ ul: classes.ul }} count={query2} variant="outlined" color="secondary" size="large" defaultPage={parseInt(query)} onChange={nextPage}>
            </Pagination>
            </div>
        </div>
    )
}

export default Movies
