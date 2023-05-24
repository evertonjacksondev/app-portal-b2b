import styled from "styled-components"
import { Fragment, useEffect, useRef, useState } from "react"
import Table from "../components/Table"
import { Select } from "../components/Select"
import IconButton from "../components/IconButton"
import { Input } from "../components/Input"
import { useSnackbar } from "notistack"
import { getPartnerId, insertOrder } from "../http/inventoApi"


const CartContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:0 auto;
    gap:10px; 
    margin:10px;  
`
const CartItem = styled.div`
    display:flex;
    justify-content:flex-end;
`
const ContainerText = styled.div`
    display:flex;
    max-width: 1320px;
    min-width: 1320px;
    flex-wrap:wrap; 
    gap:10px;
    margin:0 auto;
`
const ContainerInput = styled.div`
    display:flex;
    align-items: center;
    max-width: 1320px;
    min-width: 1320px;
    flex-wrap:wrap; 
    gap:10px;
    margin:0 auto;
`
const NumberInput = styled.input`

  font-size: 14px;
  width: 90px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 4px;
  text-align:'center';
  /* Remover as setas do campo de entrada */
  appearance: none;
  -moz-appearance: textfield; /* Para o Firefox */

  /* Estilo adicional para navegadores que suportam o seletor '::-webkit-inner-spin-button' */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus{
    outline: none;
    border: 1px solid #ccc;
  }
  :active{
    outline: none; 
    border: 1px solid #ccc;
}
:hover{
      color: black;
      cursor: pointer;
    }
`;

export const Cart = () => {

    const [cartValues, setCartValues] = useState([])
    const [values, setValues] = useState({})
    const [payments, setPayments] = useState([])
    const [paymentTime, setPaymentTime] = useState([])
    const [company, setCompany] = useState('')
    const [filters, setFilters] = useState({})
    const [filterData, setFilterData] = useState([])
    const [valueSubmit, setValueSubmit] = useState({})
    const [disabled, setDisabled] = useState(true)

    const { enqueueSnackbar } = useSnackbar()
    const handleData = () => {
        const values = JSON.parse(localStorage.getItem('cart'))
        setCartValues(values)
    }
    useEffect(() => { handleSubmitSearch(); handleData() }, [])

    const inputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target;
        setCompany(value)

        if (value == 'Vale') {

            setPaymentTime(paymentsTimeVale)
            setPayments(paymentsVale)
        }

        if (value == 'AUTOCASE') {
            setPaymentTime(paymentsTimeAutoCase)
            setPayments(paymentsAutoCase)

        }

        if (value == 'ai') {
            setPaymentTime(paymentsTimeAi)
            setPayments(paymentsAi)

        }

        if (value == '') {
            setPaymentTime([])
            setPayments([])
            setValueSubmit((current) => {
                return {
                    ...current,
                    transport: '',
                    message: '',
                    payment: '',
                    paymentTime: '',
                }
            })

        }

    }

    const convertNumbeValuePtBR = (value) => {
        // Converter o valor para formato monetário brasileiro
        const valueConvert = Number(value)
        return valueConvert;
    };

    const handleInputSubmit = (e) => {


        let { name, value } = e.target;

        if (name == 'cliente') value = filterData.find(data => data._id == value)
        setValueSubmit((current) => {
            return {
                ...current,
                [name]: value
            }
        })



    }

    useEffect(() => {

        let newValueSubmit = valueSubmit

        if (newValueSubmit.payment && newValueSubmit.payment !== "" && newValueSubmit.payment !== null &&
            newValueSubmit.paymentTime && newValueSubmit.paymentTime !== "" && newValueSubmit.paymentTime !== null &&
            newValueSubmit.cliente && newValueSubmit.cliente !== null && newValueSubmit.cliente !== undefined &&
            company !== null && company !== '') {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }

    }, [company, valueSubmit])


    const handleChangeInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        const numericValue = value.replace(/[^\d.,]/g, '').replace(',', '.');
        const newValue = convertNumbeValuePtBR(numericValue)
        setValues((current) => {
            return {
                ...current,
                [name]: newValue
            }
        })
    }

    const handleInput = (e) => {
        e.preventDefault()

        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value })



    }

    const handleDeleteCart = () => {
        localStorage.removeItem('cart')
        setCartValues([])
        enqueueSnackbar('Orçamento Apagado', { variant: 'success' })
    }

    const handleSubmitSearch = async () => {

        const partnerFilter = await getPartnerId(filters.search)
        setFilterData(partnerFilter)
    }

    const handleSubmit = async () => {

        try {
            if (valueSubmit && cartValues && cartValues.length > 0) {
                const order = await insertOrder([{ ...valueSubmit, items: cartValues }])
                if (order) {
                    enqueueSnackbar('Orçamento Salvo', { variant: 'success' })
                    localStorage.removeItem('cart')
                    setFilters({})
                    setCartValues([])
                }

            }
            else {
                enqueueSnackbar('Adicione itens ao carrinho', { variant: 'info' })
            }
        }
        catch (error) {

        }

    }

    const columns = [
        {
            path: 'descricao',
            name: 'Descrição',
            isActiveFilter: false,

        },
        {
            path: 'categoria',
            name: 'Categoria',
            isActiveFilter: false,

        },
        {
            path: 'codigo',
            name: 'SKU',
            isActiveFilter: false,

        },
        {
            path: 'quantity',
            name: 'Quantidade',
            isActiveFilter: false,
            attribute: (value) => {

                return <NumberInput
                    name='quantity'
                    onChange={handleChangeInput}
                    placeholder="0"
                    value={parseInt(value)}
                    type="number" />
            }

        },
        {
            path: 'price',
            name: 'Preço Real',
            totalValue: 0,
            onChange: handleChange,
            attribute: (value) => {
                return value
            },
            sum: true
        },
        {
            path: 'price',
            name: 'Preço Negociado',
            onChange: handleChange,
            totalValue: 0,
            attribute: () => {

                if (inputRef.current) {
                    inputRef.current.setSelectionRange(100, 100); // Define a seleção do input para o início
                }
                return <NumberInput
                    ref={inputRef}
                    name='priceNegotiated'
                    onChange={handleChangeInput}
                    placeholder="R$ 0.00"
                    value={values.priceNegotiated && `R$ ${values.priceNegotiated}` || `R$ ${0}`}
                />
            },
            sum: (value) => {
                let total = 0
                total + value
                return total

            }
        },

    ]

    let paymentsAi = [
        "BOLETO",
        "A VISTA ANTECIPADO",
        "CARTÃO DE CRÉDITO",
        "CHEQUE",
        "DEPÓSITO",
        "CHEQUE/CHEQUE"
    ]

    let paymentsVale = [
        "BOLETO",
        "A VISTA ANTECIPADO",
        "CARTÃO DE CRÉDITO",
        "CHEQUE",
        "DEPÓSITO",
        "CHEQUE/CHEQUE"
    ]

    let paymentsAutoCase = [
        "A VISTA/A VISTA",
        "A VISTA/BOLETO",
        "A VISTA/CARTÃO",
        "BOLETO/A VISTA",
        "BOLETO/BOLETO",
        "BOLETO/CARTÃO",
        "BOLETO/CHEQUE",
        "CARTÃO/A VISTA",
        "CARTÃO/BOLETO",
        "CARTÃO/CARTÃO",
        "CARTÃO DE CRÉDITO",
        "Sem Onus"
    ]

    let paymentsTimeAutoCase = [
        {
            "id": 5,
            "descricao": "30/45/60/75"
        },
        {
            "id": 3,
            "descricao": "30 Dias"
        },
        {
            "id": 6,
            "descricao": "30/45/60/75/90"
        },
        {
            "id": 9,
            "descricao": "45/60/75"
        },
        {
            "id": 8,
            "descricao": "45 dias"
        },
        {
            "id": 10,
            "descricao": "45/60"
        },
        {
            "id": 2,
            "descricao": "14 dias"
        },
        {
            "id": 4,
            "descricao": "30/45/60"
        },
        {
            "id": 1,
            "descricao": "7/14/21"
        },
        {
            "id": 0,
            "descricao": "A Vista Antecipado"
        },
        {
            "id": 7,
            "descricao": "30/60/90"
        },
        {
            "id": 12,
            "descricao": "60 dias"
        },
        {
            "id": 11,
            "descricao": "50/60/70"
        },
        {
            "id": 13,
            "descricao": "30/40"
        },
        {
            "id": 14,
            "descricao": "40 dias"
        },
        {
            "id": 15,
            "descricao": "30/40/50"
        },
        {
            "id": 16,
            "descricao": "30/40/50/60"
        },
        {
            "id": 17,
            "descricao": "30/60"
        },
        {
            "id": 18,
            "descricao": "30/40/50/60/70"
        },
        {
            "id": 19,
            "descricao": "50 dias "
        },
        {
            "id": 20,
            "descricao": "Cartão de crédito"
        }
    ]

    let paymentsTimeVale = [
        {
            "id": 5,
            "descricao": "30/45/60/75"
        },
        {
            "id": 3,
            "descricao": "30 Dias"
        },
        {
            "id": 6,
            "descricao": "30/45/60/75/90"
        },
        {
            "id": 9,
            "descricao": "45/60/75"
        },
        {
            "id": 8,
            "descricao": "45 dias"
        },
        {
            "id": 10,
            "descricao": "45/60"
        },
        {
            "id": 2,
            "descricao": "14 dias"
        },
        {
            "id": 4,
            "descricao": "30/45/60"
        },
        {
            "id": 1,
            "descricao": "7/14/21"
        },
        {
            "id": 0,
            "descricao": "A Vista Antecipado"
        },
        {
            "id": 7,
            "descricao": "30/60/90"
        },
        {
            "id": 12,
            "descricao": "60 dias"
        },
        {
            "id": 11,
            "descricao": "50/60/70"
        },
        {
            "id": 13,
            "descricao": "30/40"
        },
        {
            "id": 14,
            "descricao": "40 dias"
        },
        {
            "id": 15,
            "descricao": "30/40/50"
        },
        {
            "id": 16,
            "descricao": "30/40/50/60"
        },
        {
            "id": 17,
            "descricao": "30/60"
        },
        {
            "id": 18,
            "descricao": "30/40/50/60/70"
        },
        {
            "id": 19,
            "descricao": "50 dias "
        },
        {
            "id": 20,
            "descricao": "Cartão de crédito"
        },
        {
            "id": 21,
            "descricao": "28/35/42/49/56/63"
        },
        {
            "id": 22,
            "descricao": "28/35"
        },
        {
            "id": 23,
            "descricao": "30/45"
        }
    ]

    let paymentsTimeAi = [
        {
            "id": 5,
            "descricao": "30/45/60/75"
        },
        {
            "id": 3,
            "descricao": "30 Dias"
        },
        {
            "id": 6,
            "descricao": "30/45/60/75/90"
        },
        {
            "id": 9,
            "descricao": "45/60/75"
        },
        {
            "id": 8,
            "descricao": "45 dias"
        },
        {
            "id": 10,
            "descricao": "45/60"
        },
        {
            "id": 2,
            "descricao": "14 dias"
        },
        {
            "id": 4,
            "descricao": "30/45/60"
        },
        {
            "id": 1,
            "descricao": "7/14/21"
        },
        {
            "id": 0,
            "descricao": "A Vista Antecipado"
        },
        {
            "id": 7,
            "descricao": "30/60/90"
        },
        {
            "id": 12,
            "descricao": "60 dias"
        },
        {
            "id": 11,
            "descricao": "50/60/70"
        },
        {
            "id": 13,
            "descricao": "30/40"
        },
        {
            "id": 14,
            "descricao": "40 dias"
        },
        {
            "id": 15,
            "descricao": "30/40/50"
        },
        {
            "id": 16,
            "descricao": "30/40/50/60"
        },
        {
            "id": 17,
            "descricao": "30/60"
        },
        {
            "id": 18,
            "descricao": "30/40/50/60/70"
        },
        {
            "id": 19,
            "descricao": "50 dias "
        },
        {
            "id": 20,
            "descricao": "Cartão de crédito"
        },
        {
            "id": 21,
            "descricao": "28/35/42/49/56/63"
        },
        {
            "id": 22,
            "descricao": "28/35"
        },
        {
            "id": 23,
            "descricao": "30/45"
        }
    ]

    return (
        <Fragment>
            <CartContainer>
                <ContainerText>
                    <p>Preencha todos os campos Obrigatórios *</p>
                </ContainerText >
                <ContainerText>
                    <p>Selecione a empresa *</p>
                </ContainerText >
                <ContainerInput>
                    <CartItem>
                        <Input
                            onChange={handleInput}
                            value={filters.search}
                            name="search" style={{ width: 590 }}
                            placeholder="Pesquise seu cliente, ultilize Nome ou Código ou Cnpj" />
                    </CartItem>
                    <CartItem>
                        <Select
                            onChange={handleInputSubmit}
                            value={filters.client}
                            style={{ width: 510 }}
                            name="cliente"
                            placeholder="Nome Cliente" >
                            <option value="" hidden>Selecione o cliente *</option>
                            {filterData && filterData.map(filter => <option value={filter._id}> Código: {filter.codigo}  Razão: {filter.nome}  CNPJ{filter.documento} UF: {filter.UF}</option>)}
                        </Select>
                    </CartItem>
                    <CartItem>
                        <IconButton
                            onClick={handleSubmitSearch}
                            style={{ width: 200 }}
                            iconName={'search'}
                            label={'Pesquisar Cliente'} />
                    </CartItem>
                    <CartItem>
                        <Select name="company" style={{ width: 290 }} onChange={handleChange} value={company}>
                            <option value="" hidden>Empresa *</option>
                            <option value="Vale">Vale</option>
                            <option value="ai">AI</option>
                            <option value="AUTOCASE">AUTOCASE</option>
                        </Select>
                    </CartItem>
                    {/* <CartItem>
                        <Select name="transport" onChange={handleInputSubmit} style={{ width: 290 }} disabled={!paymentTime.length > 0 ? true : false}>
                            <option value="" hidden>Transportadora *</option>
                            <option value="1">Transporte 1</option>
                            <option value="2">Transporte 2</option>
                            <option value="3">Transporte 3</option>
                            <option value="4">Transporte 4  </option>
                        </Select>
                    </CartItem> */}
                    <CartItem>
                        <Select value={valueSubmit.payment} name="payment" onChange={handleInputSubmit} style={{ width: 290 }} disabled={!payments.length > 0 ? true : false}>
                            <option value="" hidden>Forma de Pagamento *</option>
                            {payments && payments.map(payment => <option value={payment}>{payment}</option>)}

                        </Select>
                    </CartItem>
                    <CartItem>
                        <Select value={valueSubmit.paymentTime} name="paymentTime" onChange={handleInputSubmit} style={{ width: 290 }} disabled={!paymentTime.length > 0 ? true : false}>
                            <option value="" hidden>Prazos *</option>
                            {paymentTime && paymentTime.map(payment => <option value={payment.descricao}>{payment.descricao}</option>)}
                        </Select>
                    </CartItem>
                    <CartItem>
                        <Input name="message" onChange={handleInputSubmit} style={{ width: 720 }} placeholder="Observação (Opcional)" />
                    </CartItem>
                    <CartItem>
                        <IconButton
                            style={{ width: 250 }}
                            iconName={'save'}
                            disabled={disabled}
                            onClick={handleSubmit}
                            label={'Salvar Orçamento'} />
                    </CartItem>
                    <CartItem>
                        <IconButton
                            onClick={handleDeleteCart}
                            style={{ width: 250 }}
                            iconName={'delete'}
                            label={'Apagar Orçamento'} />
                    </CartItem>
                </ContainerInput>
                <CartItem>
                    <Table
                        options={[{ buttonFilter: false }]}
                        columns={columns}
                        data={cartValues}
                    />
                </CartItem>
            </CartContainer>
        </Fragment>
    )
}
