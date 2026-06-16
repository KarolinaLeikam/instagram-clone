import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { useState } from 'react';

const SignUp = () => {
  const [contact,setContact]=useState("")
   const [fullName,setFullName]=useState("")
    const [userName,setUserName]=useState("")
     const [password,setPassword]=useState("")


     const handleSignUp=()=>{
      if(!contact||!password||!userName||!fullName){
        alert{'Пожалуйста, заполните все поля!'};
        return;
      }
     const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if(!usernameRegex.test(userName)||userName.length<3||userName.length > 20){
        alert('Имя пользователя должно содержать только латиницу, цифры или _,и быть длиннее 3 символов и меньше 20');
    return;
      }
   
  if (password.length < 8) {
    alert('Пароль слишком короткий (минимум 8 символов)');
    return;
  }
      
     }
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = existingUsers.some((user) => user.login === username);
  if (userExists) {
    alert('Пользователь с таким именем уже существует!');
    return;
  }

  if(!userExists){  
  const newUser = { login: username, password: password };
  existingUsers.push(newUser);
const  localStorage.setItem('users', JSON.stringify(existingUsers));
alert("Успешно")
  localStorage.setItem('isAuth', 'true');
  navigate('/'); 
}

  return (
    <>
      <div>
        <input type="text" placeholder="Mobile Number or Email" />
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="UserName" />
        <input type="text" placeholder="Password" />
      </div>
      <div>
        <Button>Sign up</Button>
      </div>
      <div>
        <p>Have an account?</p>
        <Link to="/login">Log in.</Link>
      </div>
    </>
  );
};

export default SignUp;
