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
import { useEffect,useState } from 'react'

const Edit_position = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    const[myData, setMydata]=useState()



    const GetData = () => {
        AxiosInstance.get(`person_activity/${MyId}`).then((res) => {
           console.log(res.data)
           setMydata(res.data) 
           setValue ('person',res.data.person)
           setValue ('activity',res.data.activity)
           setValue ('amount',res.data.amount)

    })


     }

    useEffect(() => { 
        GetData();
   
    },[])

    if(myData){
        var Name_person = myData.person_full
        var Name_activity = myData.activity_full
    }
    console.log(Name_activity,Name_person)
    const navigate = useNavigate()

    const defaultValues ={

        person:'',
        activity:'',
        amount:'',



    }

    const{handleSubmit,setValue,control} = useForm({defaultValues:defaultValues})
    const submission =(data) => 
    
    {
        AxiosInstance.patch(`person_activity/${MyId}/`,{
            person: data.person,
            activity: data.activity,
            amount: data.amount,


        })
        
        .then((res) => (
            navigate(`/person_activity`)
        ))

    }
    return(
        <div>

            <form onSubmit={handleSubmit(submission)}>

            <Box sx ={{display:'flex', width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
                <Typography sx ={{marginLeft:'20px', color:'#fff'}}>
                    <br></br>
                Edit position :  {Name_person}  {Name_activity}
                </Typography>
            </Box>


             <Box sx ={{display:'flex', width:'100%',boxShadow:3, padding:4, flexDirection:'column'}}>
             <Box sx ={{display:'flex',justifyContent:'space-around'}}>



             <MyTextFieldRequired
                 label = "Amount"
                 name="amount"
                 control={control}
                 placeholder="amount"
                 width={'30%'}
                />


             {/* <MyTextFieldRequired
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
                /> */}



            </Box>

            <div>
               <br></br>
            </div>

            <Box sx ={{display:'flex',justifyContent:'space-around'}}>

     
            {/* <MyGroupField
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
            
                />   */}
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






export default Edit_position