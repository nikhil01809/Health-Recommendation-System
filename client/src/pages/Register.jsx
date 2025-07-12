// import React, { useState } from 'react'
// import { Form,Input ,message} from 'antd'
// import '../styles/RegisterStyle.css'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { useDispatch } from 'react-redux';
// import { hideLoading,showLoading } from '../redux/features/alertSlice.js';
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import { GoogleOutlined } from '@ant-design/icons';
// const Register = () => {
//     const navigation=useNavigate();
//     const dispatch=useDispatch();
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const onfinishHandler=async (values)=>{
//         try{
//             dispatch(showLoading());
//             const res=await axios.post('/api/v1/user/register',values);
//             dispatch(hideLoading());
//             if(res.data.success){
//                 message.success("Registerd successfully");
//                 console.log(res);
//                 localStorage.setItem("token",res.data.token);
//                 navigation('/');
//                 window.location.reload();
//             }
//             else{
//                 message.error(res.data.message);
//             }
//         }
//         catch(error){
//             dispatch(hideLoading());
//             console.log(error);
//             message.error("something went wrong");
           
//         }
//     }
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };
//   return (
//     <div className='formBody'>
//     <div style={{display:"flex",justifyContent:"center",alignItem:"center"}}>
//      <div className="formContainer">
//      <div className='register-form' >
//         <Form layout="vertical" onFinish={onfinishHandler} >
//         <h1 style={{textAlign:"center",margin:"20px"}}>MedEase APP</h1>
//             <hr/>
//             <h2 style={{textAlign:"center",margin:"20px"}}><b>REGISTER</b></h2>
//             <Form.Item label={<h6>Name</h6>} name="name" className='m-4' >
//                 <Input type="text" required/>
//             </Form.Item>
//             <Form.Item label={<h6>Email Address</h6>} name="email" className='m-4'>
//                 <Input type="email" required/>
//             </Form.Item>
//             <Form.Item label={<h6>Password</h6>} name="password" className='m-4'>
//                             <Input
//                                 type={passwordVisible ? 'text' : 'password'} // Use type based on password visibility state
//                                 required
//                                 suffix={
//                                     passwordVisible
//                                         ? <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
//                                         : <EyeTwoTone onClick={togglePasswordVisibility} />
//                                 }
//                             />
//                         </Form.Item>
                    
//             <div className='m-4'>have an account?<Link to='/login' className='m-2' style={{color:"purple"}}>Sign In</Link></div>
//            <div style={{margin:"20px",textAlign:"center"}}>
//             <button className='btn btn-primary' type="submit" >
//                 Register
//             </button>
//             </div>
//         </Form>
//         <h6 style={{textAlign:'center'}}>OR Login with</h6>
//         <form action="http://localhost:8080/api/v1/user/google" method="get" style={{ textAlign: 'center', margin: "20px" }}>
//     <button className='btn btn-primary'>
//         <GoogleOutlined style={{ marginRight: '5px' }} /> SIGN IN WITH GOOGLE
//     </button>
// </form>
    
//      </div>
//     </div> 
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 className='imgCont' style={{ width: "700px", height: "670px" }} />
//         </div>
//     </div>
//     </div>
//   )
// }

// export default Register


import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });
    const [otp, setOtp] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

        const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // 🔹 Step 1: Send OTP
    const handleSendOTP = async (values) => {
        try {
            setFormValues(values);  // Store input values
            const res = await axios.post("/api/v1/user/register/send-otp", values);
            if (res.data.success) {
                message.success("OTP sent to your email!");
                setStep(2);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Error sending OTP");
        }
    };

    // 🔹 Step 2: Verify OTP and Register
    const handleVerifyOTP = async () => {
        try {
            const res = await axios.post("/api/v1/user/register/verify-otp", { ...formValues, otp });
            if (res.data.success) {
                message.success("Registered successfully!");
                localStorage.setItem("token", res.data.token);
                navigate("/");
                window.location.reload();
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Error verifying OTP");
        }
    };

    return (
        <div className='formBody'>
             <div style={{display:"flex",justifyContent:"center",alignItem:"center"}}>
              <div className="formContainer">
              <div className='register-form' >

                {step === 1 ? (
                    <Form layout="vertical" onFinish={handleSendOTP} >
                             <h1 style={{textAlign:"center",margin:"20px"}}>MedEase APP</h1>
                                <hr/>
                                 <h2 style={{textAlign:"center",margin:"20px"}}><b>REGISTER</b></h2>
                                 <Form.Item label={<h6>Name</h6>} name="name" className='m-4' >
                                     <Input type="text" required/>
                                 </Form.Item>
                                 <Form.Item label={<h6>Email Address</h6>} name="email" className='m-4'>
                                     <Input type="email" required/>
                                 </Form.Item>
                                 <Form.Item label={<h6>Password</h6>} name="password" className='m-4'>
                                                 <Input
                                                     type={passwordVisible ? 'text' : 'password'} // Use type based on password visibility state
                                                     required
                                                    suffix={
                                                        passwordVisible
                                                            ? <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                                                            : <EyeTwoTone onClick={togglePasswordVisibility} />
                                                    }
                                                />
                                            </Form.Item>
                                        
                                 <div className='m-4'>have an account?<Link to='/login' className='m-2' style={{color:"purple"}}>Sign In</Link></div>
                                <div style={{margin:"20px",textAlign:"center"}}>
                        <Button type="primary" htmlType="submit" block>
                            Send OTP
                        </Button>
                        </div>
                    </Form>
                ) : (
                    <div>
                        <h4 style={{textAlign:"center", marginTop:"30px"}}>Enter OTP sent to your email</h4>
                        <Input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} style={{marginTop:"40px"}}/>
                        <Button type="primary" onClick={handleVerifyOTP} block style={{ marginTop: "30px" ,width:"200px",marginLeft:"80px"}}>
                            Verify & Register
                        </Button>
                    </div>
                )}
             </div>
     </div> 
     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
             <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className='imgCont' style={{ width: "700px", height: "670px" }} />
        </div>
    </div>
    </div>
    );
};

export default Register;
