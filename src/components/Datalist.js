import styled from "styled-components";

export const Datalist = styled.div`
    max-width:100%;
    height:50px;
    width:250px;
    max-height:40px;  
    background-color:#e1e9f3; 
    border:0px solid  #65696d;
    padding: 10px;
    font-size: 14px;
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
`;
