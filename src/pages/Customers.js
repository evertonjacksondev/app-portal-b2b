import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { getPartner } from '../http/inventoApi'

const Customers = () => {

    const [customers, setCustormer] = useState({ currentPage: 1, totalPages: 1, result: [] })
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    })

    useEffect(() => {

        getPartner(50, pagination.currentPage).then((data) => {
            setCustormer(data)

        })
    }, [pagination])


    const handleChange = (e) => {


    }


    const columns = [
        {
            path: 'codigo',
            name: 'Código',
            onChange: handleChange,
            isActiveFilter: true,
        },
        {
            path: 'nome',
            name: 'Nome',
            onChange: handleChange,
            isActiveFilter: true
        },
        {
            path: 'documento',
            name: 'Documento',
            onChange: handleChange,
            isActiveFilter: true
        },
        {
            path: 'UF',
            name: 'UF',
            isActiveFilter: false
        },
        {
            path: 'status',
            name: 'Status',
            onChange: handleChange,
            isActiveFilter: false,
            attribute: (value) => {
                const replaceName =
                {
                    1: 'Inativo',
                    0: 'Ativo',
                    9: 'Desativado',
                    4: 'Financeiro aberto'
                }

                return (
                    replaceName[value]
                )
            }

        },
        {
            path: 'UltimaCompra',
            name: 'Ultima Compra',
            attribute: (value) => {
                let date =
                    new Date(value).toLocaleDateString();
                return date
            }
        }

    ]

    const options = [
        {
            pagination: true,
            buttonFilter: true
        }]

    return (
        <Table
            options={options}
            columns={columns}
            data={customers.result}
            currentPage={customers.currentPage}
            totalPages={customers.totalPages}
            setPagination={setPagination}
        />

    )
}

export default Customers