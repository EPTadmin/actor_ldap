import  React from 'react'
import {Box,Button, Typography} from '@mui/material'
import MyTextFieldRequired from './forms/MyTextFieldRequired'
import {useForm} from 'react-hook-form'
import MyTextField from './forms/MyTextField'
import AxiosInstance  from './Axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect,useState } from 'react'
import MyTextFieldUnchange from './forms/MyTextFieldUnchange'

const Edit_teaching = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    const[myData, setMydata]=useState()
    // const[loading,setLoading] = useState(true)


    const GetData = () => {
        AxiosInstance.get(`person_course/${MyId}`).then((res) => {
           console.log(res.data)
           setMydata(res.data) 
           setValue ('person',res.data.person)
           setValue ('course',res.data.course)
           setValue ('amount',res.data.amount)



    })


     }

    useEffect(() => { 
        GetData();
   
    },[])
    const navigate = useNavigate()
    


    if(myData){
        var Name_person = myData.person_full
        var Name_course = myData.course_full
    }
    const defaultValues ={

        person:'',
        course:'',
        amount:'',
        // full_name:'',
        // full_course:'',
        // position:'',
        // groupe:'',
        // courses:'',
        // activities:'',


    }

    const{handleSubmit,setValue,control} = useForm({defaultValues:defaultValues})
    const submission =(data) => 
    
    {
        AxiosInstance.patch(`person_course/${MyId}/`,{
            person: data.person,
            course: data.course,
            amount: data.amount,
            // full_name: data.full_name,
            // full_course: data.full_course,
            // position: data.position,
            // groupe: data.groupe,
            // courses: data.courses,
            // activities: data.activities,

        })
        
        .then((res) => (
            navigate(`/person_course`)
        ))

    }
    return(
        <div>
            

        {/* { loading ? <p>Loading data ...</p> : */}
            <form onSubmit={handleSubmit(submission)}>

            <Box sx ={{display:'flex', width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
                <Typography sx ={{marginLeft:'20px', color:'#fff'}}>
                    <br></br>
                Edit teaching : {Name_person}  {Name_course}
                <br></br>

            
                
                </Typography>
            </Box>


             <Box sx ={{display:'flex', width:'100%',boxShadow:3, padding:4, flexDirection:'column'}}>
             <Box sx ={{display:'flex',justifyContent:'space-around'}}>


             {/* <MyTextFieldUnchange
                //   label = "Person"
                  name="person"
                  control={control}
                  placeholder="person_id"
                  width={'30%'}
                 />

                <MyTextFieldUnchange
                //   label = "Course"
                  name="course"
                  control={control}
                  placeholder="course_id"
                  width={'30%'}
                 /> */}



            </Box>
            <div>
               <br></br>
               <br></br>
            </div>
             <Box sx ={{display:'flex',justifyContent:'space-around'}}>
             {/* <MyTextFieldUnchange
                //   label = "NAME"
                  name="person_full"
                  control={control}
                  placeholder="person_full"
                  width={'30%'}
                 /> */}
             {/* <MyTextFieldUnchange
                //  label = "NAME"
                 name="full_name"
                 control={control}
                 placeholder="full_name"
                 width={'30%'}
                /> */}


                <MyTextFieldRequired
                 label = "Amount"
                 name="amount"
                 control={control}
                 placeholder="amount"
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
{/* } */}
    </div>    
            
    )
}






export default Edit_teaching