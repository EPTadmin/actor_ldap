import React from 'react';
import '../App.css'
import { Box } from '@mui/material';
import MyTextFieldLogin from './forms/MyTextFieldLogin';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import { Link } from 'react-router-dom';
import{useForm} from 'react-hook-form'
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const{handleSubmit, control} = useForm()
    const navigate=useNavigate()
    const submission = (data) => {
        AxiosInstance.post(`login/`,{
            username:data.username,
            password:data.password,
        })

        .then((response) => {
            console.log('response',response)
            localStorage.setItem('Token',response.data.token)
            navigate(`/home`)
        })
        .catch((error)=>{
            console.error('Error during login',error)
        
        })


    }





    return(
        <div className ={"myBackground"}> 
        <form onSubmit={handleSubmit(submission)}>
            <Box className = {"whiteBox"}>
                <Box className={"itemBox"}>
                    <Box className = {"title"}>Login for auth App</Box>
                </Box>
                <Box className={"itemBox"}>
                    <MyTextFieldLogin
                        label={"Username"}
                        name = {"username"}
                        control={control}
                    />
                </Box>
                <Box className ={"itemBox"}>
                    <MyPassField
                    label={"Password"}
                    name = {"password"}
                    control={control}
                    />
                </Box>
                <Box className={"itemBox"}>
                    <MyButton
                    label={"Login"}
                    type={"submit"}
                    />
                </Box>

            </Box>
            </form>
        </div>
    )

}


export default Login