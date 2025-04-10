import  React from 'react'
import {Box,Button, Typography} from '@mui/material'
import AxiosInstance  from './Axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

const Delete_PC = () => {
    const MyParam = useParams()

    const MyId = MyParam.id

    const[myData, setMydata]=useState()
    const[loading,setLoading] = useState(true)


    const GetData = () => {

        AxiosInstance.get(`person_course/${MyId}`).then((res) => {
           setMydata(res.data) 
           console.log(res.data)
           setLoading(false)
        })


     }




    useEffect(() => { 


        GetData();
   
    },[])


    const navigate = useNavigate()

    const submission =(data) => 
    
    {
        AxiosInstance.delete(`person_course/${MyId}/`)
        
        .then((res) => (
            navigate(`/`)
        ))

    }
    return(
        <div>
            { loading ? <p>Loading data ...</p> :
            <div>

            <Box sx ={{display:'flex', width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
                <Typography sx ={{marginLeft:'20px', color:'#fff'}}>
                    Delete Person Course : {myData.person_full} {myData.course_full}
                </Typography>
            </Box>


             <Box sx ={{display:'flex', width:'100%',boxShadow:3, padding:4, flexDirection:'column'}}>
             Are you sure that you want to delete this entry : {myData.person_full} {myData.course_full}

            
            <Box >
                <Button variant ="contained"  onClick={submission} sx ={{width:'100%'}}>
                    Delete the person course combinaison
                </Button>
            </Box>
        </Box>

        </div>   }
    </div>
 
            
    )
}






export default Delete_PC