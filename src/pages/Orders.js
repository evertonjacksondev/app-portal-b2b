import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getOrder, insertOrderInvento } from "../http/inventoApi";
import IconButton from "../components/IconButton";
import logoInvento from "../assets/logo-invento-fundo-transparente.png"
import * as FcIcons from "react-icons/fc";
import { enqueueSnackbar } from "notistack";
import { convertMonetaryValueToNumber } from '../lib/convertMonetaryValueToNumber.js'

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



	const handleSubmitInvento = async (values) => {
		await insertOrderInvento([values])
		getValues()
		enqueueSnackbar('Enviado para Invento', { variant: 'success' })
	}

	const columns = [
		{
			path: 'orderid',
			name: 'Nº Pedido de venda',
			isActiveFilter: true,
		},

		{
			path: 'nome',
			name: 'Nome cliente',
			isActiveFilter: true,

		},
		{
			path: 'documento',
			name: 'CNPJ',
			isActiveFilter: true,

		},
		{
			path: 'status',
			name: 'Status',
			isActiveFilter: false,
			attribute: (value) => {
				let status = {
					pending: 'Orçamento',
					send: 'Enviado para Invento'
				}
				return status[value]
			}
		},
		{
			path: 'gross',
			name: 'Total',
			isActiveFilter: false,
			attribute: (value) => {
				return convertMonetaryValueToNumber(value)
			}
		},
		{
			path: '',
			name: 'Ação',
			attribute: (isEmpty, value) => {

				return (
					<div style={{ display: 'flex', gap: '10px' }}>

						<IconButton onClick={() => { handleSubmitInvento(value) }} background={'transparent'} style={{ width: 50 }}>
							<img style={{ width: 30, height: 20 }} src={logoInvento} />
						</IconButton>
						<IconButton background={'transparent'} style={{ width: 50 }} >
							<FcIcons.FcPrint size='10x' />
						</IconButton>

						<IconButton background={'transparent'} style={{ width: 50 }} >
							<FcIcons.FcEmptyTrash size='10x' />
						</IconButton>
						<IconButton background={'transparent'} style={{ width: 50 }} >
							<FcIcons.FcSynchronize size='10x' />
						</IconButton>
						<IconButton iconName={'visibility'} style={{ width: 50 }} >
							{/* <FcIcons.FcBinoculars size='10x' /> */}
						</IconButton>
					</div>
				)
			}
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

