import styled from "styled-components";



export const Input = styled.input`
    max-width:100%;
    height:40px;
    width:250px;
    color: black;
    max-height:40px;  
    background-color:#e1e9f3; 
    border:0px solid  #65696d;
    padding: 10px;
    font-size: 14px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 0.5);
    border-left: 6px solid  #437d94;
    border-radius: 3px; 
    :focus {
      color: black;
      outline: none;
      border:0px solid  #65696d;
      border-left: 6px solid  #437d94;
   
    }
    :active{
      color: black;
      border:0px solid  #cacaca;
      outline: none;    
      border-left: 6px solid  #437d94;
      
    }
    ::placeholder{
      color:black;
    }
    :hover{
      color: black;
      box-shadow: 0px 0px 5px #437d94;
      transition: box-shadow 0.3s ease-in-out;
    }
    
    `

