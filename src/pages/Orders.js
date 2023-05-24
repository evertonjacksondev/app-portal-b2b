import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getOrder } from "../http/inventoApi";

export const Orders = () => {

	const [value, setValue] = useState({})



	const getValues = async () => {
		const orders = await getOrder()
		if (orders)
			setValue(orders)
	}
	useEffect(() => {
		getValues()
	}, [])


	const columns = [
		{
			path: 'orderId',
			name: 'Nº Pedido de venda	',
			isActiveFilter: true,
		},
		{
			path: 'nome',
			name: 'Nome cliente',
			isActiveFilter: true,
			attribute: (value, array) => {
				return array['cliente'].nome
			}
		},
		{
			path: 'documento',
			name: 'CNPJ',
			isActiveFilter: true,
			attribute: (value, array) => {
				return array['cliente'].documento
			}
		},
		{
			path: 'status',
			name: 'Status',
			isActiveFilter: false
		},
		{
			path: 'button',
			name: 'Ação'
		},
	]

	const options = [
		{
			pagination: true,
			buttonFilter: true
		}]


	return (
		<Table
			columns={columns}
			data={value}
			options={options}
		/>
	);
};

