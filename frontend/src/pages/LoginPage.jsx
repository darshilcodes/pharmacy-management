import React, { useState } from 'react'
import Login from './Login';
import ForgotPassword from './FogotPassword';
const LoginPage = () => {
    const [isLogin,setIsLogin] = useState(true);

  return (
    <div>
      {isLogin?<Login onSwitch={()=>setIsLogin(false)}></Login>:<ForgotPassword onSwitch={()=>setIsLogin(true)}></ForgotPassword>}
    </div>
  )
}

export default LoginPage
