import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import {link,Redirect } from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  // const navigate = useNavigate()


  const [inpval, setInpval] = useState({
    email: "",
    password: ""
  });

  const setVal = (e) => {
    const { name, value } = e.target;
   
    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }

  const loginuser = async (e) => {
    e.preventDefault();



    const { email, password } = inpval;
    if (email === "") {
      alert("please enter your email");

    } else if (!email.includes("@")) {
      alert("enter valid email")

    } else if (password === "") {
      alert("please enter your pasword");

    }
    else {
      const data = await fetch(`http://localhost:5000/api/users/login`, {
        method: "POST",
        headers: {

          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //got the data 
          email, password
        })
      })
      const res = await data.json();
      console.log(res)
      if (res.status === 200) {
       alert("login successful")
        localStorage.setItem("User", JSON.stringify(res))
     
     
        setInpval({ ...Link, email: "", password: "" });
        Redirect('/home')

      } else {
        alert("Something went wrong")

      }
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            name = "email" value ={inpval.email} onChange={setVal}
          />
          <Input
            placeholder="password"
            type="password"
            name = "password" 
            
            value ={inpval.password} onChange={setVal}
          />
          <Button onClick={loginuser} >
            LOGIN
          </Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
