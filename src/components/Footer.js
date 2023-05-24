import styled from "styled-components";



export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:16px;
  height: 8rem;
  color:white;
  width: 100%;
  background-color:#0771AC;
  flex-direction:column;
  margin-top: auto;

`

export const FooterItem = styled.footer`
  display: flex;
  max-width:1220px;
  justify-content: center;
`

export const Footer = () => {

  return (
    <FooterContainer>
      <FooterItem>
        Telefone - 11 4652 3200
        E-mail: vendas@zeene.com.br
      </FooterItem>
      <FooterItem>
        Endereço: Av. Adília Barbosa Neves, 3636 - Bairro do Portão, Arujá - SP
      </FooterItem>
    </FooterContainer >
  )
}



