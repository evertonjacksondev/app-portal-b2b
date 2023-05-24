import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import loading from '../assets/loading.gif'
import IconButton from './IconButton'
import Modal from './Modal'

const CardIContainer = styled.div`
    display:flex;
    overflow: hidden;
    padding:15px;
    margin:0 auto;
    flex-wrap:wrap;
    max-width:1320px;
    border-radius:5px;
   margin:15;

`
const CardItem = styled.div`
    border: 2px solid #D2D2D2;
    box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
    display:flex;
    justify-content: center;
    flex-direction:column;
    overflow:hidden;
    margin:10px;
    align-items:center;
    width:230px;
    border-radius:15px;
    height:350px;
      `
const CardAvatar = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    text-align:'center'; 
 `


const CardImg = styled.div`
  background-image: url(${props => props.image});
  width: 180px;
  height:180px;
      overflow:hidden;
  border-radius:50%;
  background-size: cover;
  :hover{
   cursor:pointer;
    width:200px;
    border: 2px solid #d2d2d2;
    transition: 0.5s;
  }`

const PaginationContainer = styled.div`
padding:40px;
display:flex;
max-width: 1240px;
margin:0 auto ;
margin-top:10px;
margin-bottom:10px;
gap:20px;
min-width: 1320px;
justify-content: flex-end;
align-items: baseline;
`
const Paragraph = styled.p`
font-weight:500;
font-size:12px;
color:black;
text-align: center;
`

const TooltipBox = styled.div`
   color: #fff;
   background: #0771AC;
    width: 230px;
    color:white;
   padding: 8px 8px;
   border-radius: 4px;
`;

export const Card = ({ data, setPagination, currentPage = 1, totalPages = 1 }) => {

    const [countItem, setCountItem] = useState([])
    const [modal, setModal] = useState({})
    const handleAddCart = (data) => {

        let cartData = JSON.parse(localStorage.getItem('cart'))
        if (!cartData) cartData = []
        let newCardData = [...cartData]
        let quantity = 0
        quantity = newCardData.find(card => card.codigo == data.codigo) ? newCardData.find(card => card.codigo == data.codigo).quantity + 1 : 1
        let distinctItemCardData = newCardData.filter(card => card.codigo != data.codigo)


        localStorage.setItem('cart', JSON.stringify([...distinctItemCardData, { ...data, quantity }]))



        setCountItem([...distinctItemCardData, { ...data, quantity }])
    }

    const handleRemoveCart = (data) => {

        let cartItems = JSON.parse(localStorage.getItem('cart'))
        if (!cartItems) cartItems = []
        let quantity = cartItems.find(cartItem => cartItem.codigo == data.codigo) ? cartItems.find(cartItem => cartItem.codigo == data.codigo).quantity > 0 ? cartItems.find(cartItem => cartItem.codigo == data.codigo).quantity - 1 : 0 : 0
        let distinctItemCardData = cartItems.filter(cartItem => cartItem.codigo != data.codigo)

        if (quantity == 0) {
            //Apagar do Carrinho
            localStorage.setItem('cart', JSON.stringify([...distinctItemCardData]))
            setCountItem([...distinctItemCardData])
        } else {
            // Decrementar estoque e manter no carrinho
            localStorage.setItem('cart', JSON.stringify([...distinctItemCardData, { ...data, quantity }]))
            setCountItem([...distinctItemCardData, { ...data, quantity }])
        }

    }


    useState(() => {

        let cartData = JSON.parse(localStorage.getItem('cart'))
        if (cartData) {
            setCountItem([...cartData])
        }

    }, [])

    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }


    const handlePrevPage = () => {

        setPagination((prevPage) => {
            return {
                ...prevPage,
                currentPage: prevPage.currentPage - 1
            }
        });

    };

    const handleNextPage = () => {
        setPagination((prevPage) => {
            return {
                ...prevPage,
                currentPage: prevPage.currentPage + 1
            }
        });
    };


    return (
        <Fragment>
            <Modal isOpen={isOpen} value={modal} onClose={toggleModal}></Modal>
            <CardIContainer>

                {data.items && data.items.length > 0 ? data.items.map((value, index) => {
                    return (
                        <CardItem key={index}>
                            <CardAvatar>
                                <a onClick={() => { toggleModal(); setModal(value) }}><CardImg image={value.imagem}></CardImg></a>
                            </CardAvatar>
                            <CardAvatar>
                                <Paragraph >

                                    <TooltipBox>
                                        {value.descricao ? value.descricao.substring(0, 30) + '...' : ''}
                                    </TooltipBox> </Paragraph>
                            </CardAvatar>
                            <CardAvatar>
                                <Paragraph> SKU: {value.codigo}</Paragraph>
                                <Paragraph> - Marca: {value.marca}</Paragraph>

                            </CardAvatar>
                            <CardAvatar>
                                <Paragraph>{value.avaible == 'true' ? 'Disponivel' : 'indisponivel'} </Paragraph>
                                <Paragraph> -  Categoria: {value.categoria} </Paragraph>
                            </CardAvatar>
                            <CardAvatar>

                                <Paragraph> Preço: {value.price} </Paragraph>
                                <Paragraph> - Preço Por: {value.fromPrice} </Paragraph>
                            </CardAvatar>
                            <CardAvatar>
                                <IconButton disabled={value.avaible == 'false' ? true : false} onClick={() => { handleAddCart(value) }} style={{ width: '30px', height: '30px' }} iconName='add' />
                                <Paragraph style={{ margin: 10, fontSize: 16, textAlign: 'center' }}>
                                    {countItem.find(f => f.codigo == value.codigo) ?
                                        countItem.find(f => f.codigo == value.codigo).quantity : 0
                                    }
                                </Paragraph>
                                <IconButton disabled={value.avaible == 'false' ? true : false} onClick={() => { handleRemoveCart(value) }} style={{ width: '30px', height: '30px' }} iconName='remove' />
                            </CardAvatar>
                        </CardItem >
                    )
                }
                ) : <img src={loading}></img>}

            </CardIContainer >

            <PaginationContainer>
                <IconButton style={{ width: '80px' }} iconName='arrow_back' onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </IconButton>
                <span>Página {currentPage} de {totalPages}</span>
                <IconButton style={{ width: '80px' }} iconName='arrow_forward' onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Próxima
                </IconButton>
            </PaginationContainer>

        </Fragment >
    )

}