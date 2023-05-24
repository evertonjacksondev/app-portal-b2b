import styled from "styled-components";



export const Button = styled.button`
  background:${(props) => (props.background ? props.background : '#61a2f7')} ;
  color: #ffffff;
  border: 0px solid #f3efef;
  border-radius: 3px;
  width:${(props) => (props.width ? props.width : '120px')} ;
  height:${(props) => (props.height ? props.height : '35px')} ;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor:pointer;
    box-shadow: 0 0 5px #808080;
     color: black;
  
  }
  :disabled {
    background-color: dimgrey;
     color: black;
    opacity: 1;
  }
`

