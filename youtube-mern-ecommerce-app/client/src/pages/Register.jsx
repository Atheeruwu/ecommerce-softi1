import styled from "styled-components";
import { mobile } from "../responsive";
import React,{useState,useEffect} from "react"
import { Link,Redirect } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  // const navigate = useNavigate()

  const [inpval, setInpval] = useState({
    username:"",
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

  const registeruser = async (e) => {
    e.preventDefault();



    const {username, email, password } = inpval;
    if (email === "") {
      alert("please enter your email");

    } else if (!email.includes("@")) {
      alert("enter valid email")

    } else if (password === "") {
      alert("please enter your pasword");

    }
    else {
      const data = await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        headers: {

          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //got the data 
          username,email, password
        })
      })
      const res = await data.json();
      console.log(res)
      if (res.status === 200) {
       alert("Register successful")
        // localStorage.setItem("User", JSON.stringify(res))
     
     
        setInpval({ ...Link, email: "", password: "" });
        Redirect('/login')

      } else {
        alert("Something went wrong")

      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {/* <Input placeholder="name" />
          <Input placeholder="last name" /> */}
          <Input placeholder="username" name = "username"  value = {inpval?.username} onChange={setVal} />
          <Input placeholder="email" name ="email" value ={inpval.email} onChange={setVal}/>
          <Input placeholder="password" name ="password" value ={inpval.password} onChange={setVal}/>
          {/* <Input placeholder="confirm password" /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={registeruser}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
