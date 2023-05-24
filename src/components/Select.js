import styled from "styled-components";

export const Select = styled.select`
    max-width:100%;
    height:50px;
    width:250px;
    max-height:40px;  
    background-color:#e1e9f3; 
    border:0px solid  #65696d;
    padding: 10px;
    font-size: 14px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 0.5);
    border-left: 6px solid  #437d94;
    border-radius: 3px; 

       option {
         color: black;
         background-color:#e1e9f3; 
         border:0px solid  #65696d;
         border-left: 6px solid  #437d94;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
       }
        :focus{
      outline: none;
      border: 1px solid #ccc;
      max-width:100%;
      height:50px;
      width:250px;
      max-height:40px;  
      background-color:#e1e9f3; 
      border:0px solid  #65696d;
      padding: 10px;
      font-size: 14px;
      box-shadow: 0 1px 5px rgb(0 0 0 / 0.6);
      border-left: 6px solid  #437d94;
      border-radius: 3px; 
  }

`;



