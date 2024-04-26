import  React from 'react'
import {Box,Button, Typography} from '@mui/material'
import MyTextFieldRequired from './forms/MyTextFieldRequired'
import {useForm} from 'react-hook-form'
import MyGroupField from './forms/MyGroupField'
import MyTextField from './forms/MyTextField'
import MyPositionField from './forms/MyPositionField'
import MyMultiCourseField2 from './forms/MyMultiCourseField2'
import AxiosInstance  from './Axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect } from 'react'

const Edit_person = () => {
    const MyParam = useParams()
    const MyId = MyParam.id



    const GetData = () => {
        AxiosInstance.get(`person/${MyId}`).then((res) => {
           console.log(res.data)

           setValue ('first_name',res.data.first_name)
           setValue ('middle_name',res.data.middle_name)
           setValue ('last_name',res.data.last_name)
           setValue ('position',res.data.position)
           setValue ('group',res.data.groupe)
           setValue ('courses',res.data.courses)
           setValue ('activities',res.data.activities)


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
        activities:'',


    }

    const{handleSubmit,setValue,control} = useForm({defaultValues:defaultValues})
    const submission =(data) => 
    
    {
        AxiosInstance.put(`person/${MyId}/`,{
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            position: data.position,
            groupe: data.groupe,
            courses: data.courses,
            activities: data.activities,

        })
        
        .then((res) => (
            navigate(`/`)
        ))

    }
    return(
        <div>

            <form onSubmit={handleSubmit(submission)}>

            <Box sx ={{display:'flex', width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
                <Typography sx ={{marginLeft:'20px', color:'#fff'}}>
                Edit person
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
                 <MyMultiCourseField2
                 label = "Course"
                 name="course"
                 control={control}
                 placeholder="Provide last name"
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

    </div>    
            
    )
}






export default Edit_person