import  React from 'react'
import {Box,Button, Typography} from '@mui/material'
import MyTextFieldRequired from './forms/MyTextFieldRequired'
import {useForm} from 'react-hook-form'
import MyGroupField from './forms/MyGroupField'
import MyTextField from './forms/MyTextField'
import MyPositionField from './forms/MyPositionField'
import AxiosInstance  from './Axios'
import {useNavigate} from 'react-router-dom'
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"
import { useState,useEffect } from 'react'
// import MyMultiCourseField3 from './forms/MyMultiCourseField3'
import MyMultiCourseField2 from './forms/MyMultiCourseField2'
import MyMultiCourseField from './forms/MyMultiCourseField'
// import MyCourseField from './forms/MyMultiCourseFieldNEW'
// import MyMultiCourseField2 from './forms/MyMultiCourseField'
// import MyMultiCourseFieldNEW from './forms/MyMultiCourseFieldNEW'
// import MyPositionFieldMulti from './forms/MyPositionFieldMulti'

const Create= () => {
    const[course, setCourse]=useState()
    const[loading,setLoading] = useState(true)
    
    
    const GetData = () => {
    AxiosInstance.get(`course/`).then((res) => {
        setCourse(res.data) 
        console.log('courses',res.data)
        setLoading(false)

      })
    
    }
        useEffect(() => { 
    
            GetData();
       
        },[])

    const navigate = useNavigate()
    const defaultValues ={
        first_name:'',
        middle_name:'',
        last_name:'',
        position:'',
        groupe:'',
        courses:'',
       

    }
    // const schema = yup
    // .object({
    //   first_name: yup.string().required('First name is a required field'),
    //   last_name: yup.string().required('Last name name is a required field'),
    //   middle_name: yup.string(),
    //   position: yup.string().required('Position is a required field'),
    //   groupe: yup.string().required('Group is a required field'),
    //   courses: yup.string().required('Courses is a required field'),

    // })


    const{handleSubmit,control} = useForm({defaultValues:defaultValues})
    const submission =(data) => 
    //  console.log(data)
     {
        AxiosInstance.post(`person/`,{
            first_name:data.first_name,
            middle_name:data.middle_name,
            last_name:data.last_name,
            position:data.position,
            groupe:data.groupe,
            courses:data.courses,


        })
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
                Create New Person
                </Typography>
            </Box>


             <Box sx ={{display:'flex', width:'100%',boxShadow:3, padding:4, flexDirection:'column'}}>
             <Box sx ={{display:'flex',justifyContent:'space-around'}}>



                 <MyTextFieldRequired
                  label = "First Name"
                  name="first_name"
                  control={control}
                  placeholder="Provide first name"
                  width={'30%'}
                 />
                <MyTextField
                  label = "Middle Name"
                  name="middle_name"
                  control={control}
                  placeholder="Provide middle name"
                  width={'30%'}
                 />
                 <MyTextFieldRequired
                 label = "Last Name"
                 name="last_name"
                 control={control}
                 placeholder="Provide last name"
                 width={'30%'}
                />
                 



            </Box>

            <div>
               <br></br>
            </div>

            <Box sx ={{display:'flex',justifyContent:'space-around'}}>



                <MyGroupField
                 label = "Group"
                 name="groupe"
                 control={control}
                 width={'20%'}
                />  
                <MyPositionField
                 label = "Position"
                 name="position"
                 control={control}
                 width={'15%'}
                />  
                {/* works with multicoursefield */}
                 <MyMultiCourseField2
                 label = "Course"
                 name="courses"
                 control={control}
                 width={'30%'}
                 options = {course}

            
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






export default Create