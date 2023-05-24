import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import ImageRender from './ImageMagnifier';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-direction: row;
  border-radius:15px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius:15px;
  overflow: hidden;
  max-width: 800px;
  min-width: 800px;
  min-height: 500px;
  max-height: 800px;
`;

const ModalButton = styled.div`
  justify-content: flex-end;
  flex-direction: row;
  display:flex;
  margin: 20px;
  align-items: center;
  `;
const ModalItem = styled.p`
  text-align:center;
  
`;

const ModalContainerAvatar = styled.div`
  background-color: #fff;
  display:flex;
  flex-direction: row-reverse;
  padding:10px;
  max-width: 800px;
  min-width: 800px;
  min-height: 500px;
  max-height: 800px;
`;

const ModalContainerText = styled.div`
  display:flex;
  gap:10px;
  flex-direction: column;
  margin:20px;

`;

const ModalPrice = styled.div`
margin-top:20px;
border: 2px dashed green;
display:flex;
flex-direction:column;
`
const Paragraph = styled.p`
width: 435px;
height: 51px;
left: 53px;
top: 46px;
font-family: 'Poppins';
font-style: normal;
font-weight: 700;
margin-top:10px;
font-size: 25px;
line-height: 30px;
margin-left:20px;
display: flex;
flex-direction: row;
align-items: center;
color: black;
`

const Modal = ({ isOpen, onClose, value }) => {

  if (!isOpen) {
    return null;
  }


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        onClose()
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleClick = () => {
    onClose()
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Paragraph>Perfil do produto</Paragraph>
        <ModalContainerAvatar>
          <ModalContainerText>
            <ModalItem>
              <b>Descrição</b> <p>{value.descricao}</p>
            </ModalItem>
            <ModalItem>
              <b>Categoria:</b> <p>{value.categoria}</p>
            </ModalItem>
            <ModalItem>
              <b>Status:</b> <p>{value.avaible == 'true' ? 'Disponivel' : 'Indisponivel'}</p>
            </ModalItem>
            <ModalItem>
              <b>Marca:</b><p> {value.marca}</p>
            </ModalItem>
            <ModalItem>
              <b>SKU:</b> <p>{value.codigo}</p>
            </ModalItem>
            <ModalPrice>
              <ModalItem>
                <b>Preço De:</b> <p style={{ textDecoration: 'line-through', color: 'red' }}>R$ {value.fromPrice}</p>
              </ModalItem>
              <ModalItem>
                <b>Preço Por:</b><h1 style={{ color: 'green' }}>R$ {value.price}</h1>
              </ModalItem>
            </ModalPrice>
          </ModalContainerText>
          <ModalItem>
            <ImageRender src={value.imagem} />
          </ModalItem>
        </ModalContainerAvatar>
        <ModalButton>
          <ModalItem>
            <IconButton
              onClick={handleClick}
              style={{ width: '200px' }}
              iconName={'closed'}
              label={'Fechar (ESC)'} />
          </ModalItem>
        </ModalButton>
      </ModalContainer>

    </ModalOverlay>
  );
};

export default Modal;
