import axios from "axios"
import { getToken } from "../PrivateRoute"


export const getPartner = async (limit = 100, page = 1) => {


    try {
        let Authorization = (await getToken())
        const partners = await axios({
            method: 'get',
            timeout: '30000',
            url: `http://localhost:5005/v1/customer?limit=${limit}&page=${page}`,
            headers: {
                Authorization
            }
        })
        return partners.data
    } catch (error) {
        console.log(error)
    }

}

export const insertOrder = async (data) => {

    try {
        let Authorization = (await getToken())
        const orders = await axios({
            method: 'post',
            timeout: '30000',
            url: `http://localhost:5005/v1/order`,
            headers: {
                Authorization
            },
            data
        })
        return orders.data
    } catch (error) {
        console.log(error)
    }

}

export const insertOrderInvento = async (data) => {

    try {
        let Authorization = (await getToken())
        const orders = await axios({
            method: 'post',
            timeout: '30000',
            url: `http://localhost:5005/v1/order/invento`,
            headers: {
                Authorization
            },
            data
        })
        return orders.data
    } catch (error) {
        console.log(error)
    }

}

export const getPartnerId = async (search) => {

    try {
        let Authorization = (await getToken())
        const partners = await axios({
            method: 'get',
            timeout: '30000',
            url: `http://localhost:5005/v1/customerid`,
            headers: {
                Authorization
            },
            params: { search }
        })
        return partners.data.result
    } catch (error) {
        console.log(error)
    }

}

export const getOrder = async (search) => {

    try {
        let Authorization = (await getToken())
        const partners = await axios({
            method: 'get',
            timeout: '30000',
            url: `http://localhost:5005/v1/order`,
            headers: {
                Authorization
            },
            params: { search }
        })
        return partners.data.result
    } catch (error) {
        console.log(error)
    }

}

export const postOrderToInvent = async () => {

    let orders = [
        {
            SellerKey: "IKV4W762FNOQJPR",
            Customer: {
                Name: "2 COELHOS AUTO PECAS LTDA",
                DocumentType: "CNPJ",
                DocumentNumber: "05679879000244",
                Email: "financeiro.atm@2coelhos.com.br",
                PhoneAreaCode: null,
                PhoneNumber: null,
                Gender: 1,
                BirthDate: "Date(-62135589600000)",
                StateInscription: null,
                Address: {
                    Recipient: null,
                    Identification: null,
                    Street: "Av Alacid Nunes",
                    Complement: null,
                    Number: "4018",
                    ZipCode: "68373500",
                    State: "PA",
                    City: "ALTAMIRA",
                    Neighborhood: "Premem",
                    Reference: null
                }
            }, Status: 1,
            Number: "PV8294",
            SaleDate: "Date(1648491750000)",
            CancellationDate: null,
            Payments: [
                {
                    Description: "CHEQUE",
                    Parcels: 10,
                    Value: 196.75,
                    InventoPaymentTransaction: null
                }]
            , CarrierService: {
                Description: "PADRAO",
                ShippingAmount: 0,
                DeliveryDate: "Date(-62135589600000)",
                Gift: null,
                GiftMessage: null,
                Transports: null,
                ShippingAddress: {
                    Recipient: null,
                    Identification: null,
                    Street: "Av Alacid Nunes",
                    Complement: null,
                    Number: "4018",
                    ZipCode: "68373500",
                    State: "PA",
                    City: "ALTAMIRA",
                    Neighborhood: "Premem",
                    Reference: null
                }
            }, Amount: 196.75,
            FinancialAmount: 0,
            Channel: "Portal B2B",
            PriceListName: null,
            TotalAmountCollected: 196.75,
            Fulfillment: false,
            FulfillmentInvoiceLink: null,
            Items: [
                {
                    SkuCode: "ROADRS904BR",
                    Quantity: 1,
                    UnitPrice: 133,
                    DiscountAmount: 0,
                    FinancialAmount: 0,
                    TotalAmount: 133,
                    UnitTradedPrice: 0
                }, {
                    SkuCode: "ROADRS904BR",
                    Quantity: 1,
                    UnitPrice: 63.75,
                    DiscountAmount: 0,
                    FinancialAmount: 0,
                    TotalAmount: 63.75,
                    UnitTradedPrice: 0
                }], Messages: [
                    "123 transportadora: teste Vendedor:Zeene Generico (111111 )"
                ]
        }
    ]

    const order = await axios({
        method: 'get',
        timeout: '30000',
        url: 'apiarsenalcar.digigrow.com.br/v1/orders',
        headers: {
            Authorization: 'Bearer SW52ZW50b1Npc3RlbWFzL0h1YkRpZ2lncm93L1BlcnNpc3RlbnRBY2Nlc3MvR2VuZXJhdGVkQnlEaWVnby8wMzA1MjAyMQ==',
            tokenaccount: 'ZW7XR3QB0S4SE1A'
        },
        data: orders
    })
    return order.data
}

export const getProduct = async (limit = 100, page = 1, filter) => {
    try {
        let Authorization = (await getToken())
        const products = await axios({
            method: 'get',
            timeout: '30000',
            url: `http://localhost:5005/v1/product?limit=${limit}&page=${page}`,
            headers: {
                Authorization
            },
            params: filter
        })
        return products.data

    } catch (error) {
        throw error
    }
}

export const getPayments = async () => {

    try {
        const payments = await axios({
            method: 'get',
            timeout: '30000',
            url: 'http://integrador.digigrow.com.br/order/payment',
            headers: {
                Authorization: 'Bearer SW52ZW50b1Npc3RlbWFzL0h1YkRpZ2lncm93L1BlcnNpc3RlbnRBY2Nlc3MvR2VuZXJhdGVkQnlEaWVnby8wMzA1MjAyMQ==',
                tokenaccount: 'ZW7XR3QB0S4SE1A'
            }
        })
        return payments.data

    } catch (error) {
        throw error
    }
}

export const getPaymentsTime = async () => {
    try {
        const paymentTime = await axios({
            method: 'get',
            timeout: '30000',
            url: 'http://integrador.digigrow.com.br/order/paymentTime',
            headers: {
                Authorization: 'Bearer SW52ZW50b1Npc3RlbWFzL0h1YkRpZ2lncm93L1BlcnNpc3RlbnRBY2Nlc3MvR2VuZXJhdGVkQnlEaWVnby8wMzA1MjAyMQ==',
                tokenaccount: 'ZW7XR3QB0S4SE1A'
            }
        })
        return paymentTime.data

    } catch (error) {
        throw error
    }
}

export const getOrderStatus = async (OrderNumber) => {
    try {
        const statusOrder = await axios({
            method: 'get',
            timeout: '30000',
            url: `integrador.digigrow.com.br/order/status?pedido=${OrderNumber} `,
            headers: {
                Authorization: 'Bearer SW52ZW50b1Npc3RlbWFzL0h1YkRpZ2lncm93L1BlcnNpc3RlbnRBY2Nlc3MvR2VuZXJhdGVkQnlEaWVnby8wMzA1MjAyMQ==',
                tokenaccount: 'ZW7XR3QB0S4SE1A'
            }
        })
        return statusOrder.data

    } catch (error) {
        throw error
    }

}

export const getPriceAndStock = async (OrderNumber) => {
    try {
        const pricesAndStocks = await axios({
            method: 'get',
            timeout: '30000',
            url: 'http://integrador.digigrow.com.br/sku/status',
            headers: {
                Authorization: 'Bearer SW52ZW50b1Npc3RlbWFzL0h1YkRpZ2lncm93L1BlcnNpc3RlbnRBY2Nlc3MvR2VuZXJhdGVkQnlEaWVnby8wMzA1MjAyMQ==',
                tokenaccount: 'ZW7XR3QB0S4SE1A'
            }
        })
        return pricesAndStocks.data

    } catch (error) {
        throw error
    }
}

export const getCompanies = async (OrderNumber) => {
    try {
        const companies = await axios({
            method: 'get',
            timeout: '30000',
            url: 'http://integrador.digigrow.com.br/order/seller',
            headers: {
                Authorization: 'Bearer SW52ZW50b1Npc3RlbWFzL0h1YkRpZ2lncm93L1BlcnNpc3RlbnRBY2Nlc3MvR2VuZXJhdGVkQnlEaWVnby8wMzA1MjAyMQ==',
                tokenaccount: 'ZW7XR3QB0S4SE1A'
            }
        })
        return companies.data

    } catch (error) {
        throw error
    }
}

