import  React from 'react'
import {Box,Button, Typography} from '@mui/material'
import MyTextFieldRequired from './forms/MyTextFieldRequired'
import {useForm} from 'react-hook-form'
import MyGroupField from './forms/MyGroupField'
import MyCourseField from './forms/MyCourseField'
import MySemesterField from './forms/MySemesterField'
import MyStudiepoengField from './forms/MyStudiepoengField'
import AxiosInstance  from './Axios'
import MyIntegerFIeld from './forms/MyIntegerFIeld'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"



const Create = () => {
        

    const navigate = useNavigate()

    const defaultValues ={
        course_id:'',
        name:'',
        type:'',
        group:'',
        semester:'',
        studiepoeng:'',
        // nb_student:0,
        // nb_vit:0,
        // nb_stud_ass:0,

    }

    const schema = yup
    .object({
      course_id: yup.string().required('Course id is a required field'),
      name: yup.string().required('Course name is a required field'),
      type: yup.string().required('Course type is a required field'),
      group: yup.string().required('Group is a required field'),
      semester: yup.string().required('Semester is a required field'),
      studiepoeng: yup.string().required('Studiepoeng is a required field'),
      nb_student: yup.number(),
      nb_vit: yup.number(),
      nb_stud_ass: yup.number(),

    })


    const{handleSubmit,control} = useForm({defaultValues:defaultValues,resolver: yupResolver(schema)})
    const submission =(data) => 
    
    {
        AxiosInstance.post(`course/`,{
            course_id: data.course_id,
            name: data.name,
            type: data.type,
            group: data.group,
            semester: data.semester,
            studiepoeng: data.studiepoeng,
            nb_student: data.nb_student,
            nb_vit: data.nb_vit,
            nb_stud_ass: data.nb_stud_ass,
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
                Create New Course
                </Typography>
            </Box>


             <Box sx ={{display:'flex', width:'100%',boxShadow:3, padding:4, flexDirection:'column'}}>
             <Box sx ={{display:'flex',justifyContent:'space-around'}}>



                 <MyTextFieldRequired       
                  label = "Course ID"
                  name="course_id"
                  control={control}
                  placeholder="Provide a short course name"
                  width={'20%'}
                 />
                <MyTextFieldRequired
                  label = "Course Name"
                  name="name"
                  control={control}
                  placeholder="Provide the course name"
                  width={'55%'}
                 />
                 <MyCourseField
                 label = "Type of the course"
                 name="type"
                 control={control}
                 width={'15%'}
                />



            </Box>

            <div>
               <br></br>
            </div>

            <Box sx ={{display:'flex',justifyContent:'space-around'}}>

     
                 <MyGroupField
                 label = "Group in charge of the course"
                 name="group"
                 control={control}
                 width={'20%'}
                />  
          
                <MySemesterField
                 label = "Semester"
                 name="semester"
                 control={control}
                 width={'15%'}
                />  
                <MyStudiepoengField
                 label = "Studiepoeng"
                 name="studiepoeng"
                 control={control}
                 width={'30%'}
                />  
            </Box>

            <div>
               <br></br>
            </div>


            <Box sx ={{display:'flex',justifyContent:'space-around'}}>


                <MyIntegerFIeld   
                  label = "Nb of Students"
                  name="nb_student"
                  placeholder="Number of students"
                  width={'15%'}

                  control={control}


                 />
                 <MyIntegerFIeld       
                  label = "Nb of Vit. As."
                  name="nb_vit"
                  control={control}
                  placeholder="Number of Vit. Ass"
                  width={'15%'}
                 />
                 <MyIntegerFIeld       
                  label = "Nb of As. Stud."
                  name="nb_stud_ass"
                  control={control}
                  placeholder="Number of assisting students"
                  width={'15%'}
                 />

            </Box> 
            
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






export default Create