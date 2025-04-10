import  React from 'react'
import {Box,Button, Typography} from '@mui/material'
import MyTextFieldRequired from './forms/MyTextFieldRequired'
import {useForm} from 'react-hook-form'
import AxiosInstance  from './Axios'
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import MyPersonField from './forms/MyPersonField'
import MyCoursechooseField from './forms/MyCoursechooseField'

const CreatePersonCourse= () => {
    const[personcourse, setPersoncourse]=useState([])
    const[loading,setLoading] = useState(true)
    
    const[person, setPerson]=useState([])
    const[course, setCourse]=useState([])

    useEffect(() => { 

        AxiosInstance
        .get(`course/`)
          .then((res) => {
    
          setCourse(res.data) 
         setLoading(false)
    
        });
    
        AxiosInstance
        .get(`person/`)
          .then((res) => {
    
          setPerson(res.data) 

         setLoading(false)
    
        });
    
        AxiosInstance
        .get(`person_course/`)
          .then((res) => {
    
            setPersoncourse(res.data) 

         setLoading(false)
    
        });
    

    

    
    
      },[])

    const navigate = useNavigate()
    const defaultValues ={
        person_full:'',
        course_full:'',
        amount:'',
        person:'',
        course:'',


    }
    // var lecturer = personcourse.map(x => x.person)


    const{handleSubmit,control} = useForm({defaultValues:defaultValues})
    const submission =(data) => 
     {
        var name = person.map(x=> x.first_name + ' ' + x.last_name)
        data.person = person.filter(x=> x.first_name + ' ' + x.last_name === data.person_full).map(x=>x.id)[0]    


        AxiosInstance.post(`person_course/`,{
            person:data.person,
            course_full:data.course,
            person_full:data.person_full,
            course:data.course,
            amount:data.amount,
        },
    )
        
        .then((res) => (
            navigate(`/`)
        ))

    }
    return(
        <div>
            { loading ? <p>Loading data ...</p> :

            <form onSubmit={handleSubmit(submission)}>

            <Box sx ={{display:'flex', width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
                <Typography sx ={{marginLeft:'20px', color:'#fff'}}>
                Create combianison Person / Course
                </Typography>
            </Box>


             <Box sx ={{display:'flex', width:'100%',boxShadow:3, padding:4, flexDirection:'column'}}>


            <div>
               <br></br>
            </div>

            <Box sx ={{display:'flex',justifyContent:'space-around'}}>



                <MyPersonField
                 label = "Person"
                 name="person_full"
                 control={control}
                 width={'10%'}
                 options = {person}

                />  

{/* 
                <MyPersonIDField
                 label = "Person"
                 name="person"
                 control={control}
                 width={'50%'}
                 options = {person}

                />   */}

                <MyCoursechooseField
                 label = "Course"
                 name="course"
                 control={control}
                 width={'15%'}
                 options = {course}

                />  
                <MyTextFieldRequired
                 label = "Amount"
                 name="amount"
                 control={control}
                 width={'30%'}


            
                />  
    
            </Box>
            <div>
               <br></br>
            </div>



            <div>
               <br></br>
            </div>
            <Box >
                <Button variant ="contained" type="submit" sx ={{width:'100%'}}>Submit</Button>
            </Box>
        </Box>
        </form>
    }
    </div>    
            
    )
}






export default CreatePersonCourse