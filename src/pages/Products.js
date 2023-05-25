import React, { useEffect, useState } from "react";
import bannerLogo from "../assets/banner-zeene.jpg"
import { Card } from "../components/Card";
import inventoApi, { getProduct } from "../http/inventoApi";

import styled from "styled-components";
import { Input } from "../components/Input";
import IconButton from "../components/IconButton";
import { Select } from "../components/Select";
import { enqueueSnackbar } from "notistack";


const ProductsContainer = styled.div`
 	display:flex;
    padding:20px;
    margin:0 auto;
    flex-wrap:wrap;
	max-width:1320px;
    border-radius:10px;
	gap:20px;
`
const ProductsFilterItem = styled.div`
display: flex;

`
const ProductsFilterContainer = styled.div`
	display: flex;
	margin-top:10px;	
	gap:10px;

`
const FilterButtonContainer = styled.table`
display: flex;
justify-content: flex-end;
max-width:1320px;
flex-direction: row;
margin:0 auto;
width:100%;
`
const FilterButtonItem = styled.table`
display: flex;
padding:2px;
max-width:1320px;

`
const ProductsImage = styled.img`
  max-width:1320px;
  border-radius: 10px;
  width:100%;
  margin:0 auto;`


export const Products = () => {

	const [productsData, setProductsData] = useState({ items: [] })
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
	})
	const [filterValue, setFilterValue] = useState({})

	useEffect(() => {

		getProduct(50, pagination.currentPage, { ...filterValue }).then((products) => {
			setProductsData({ ...pagination, ...products })

		})
	}, [pagination])


	const handleChange = (e) => {

		e.preventDefault()

		const { name, value } = e.target;


		setFilterValue((current) => {
			return {
				...current,
				[name]: value,
			}
		})
	}

	const handleResetFilter = () => {

		setFilterValue({ brand: '', descricao: '', sku: '', categoria: '', avaible: '' })
		setPagination({
			currentPage: 1,
			totalPages: 1
		}
		)
	}

	const columns = [
		{
			path: 'descricao',
			name: 'Descrição',
			isActiveFilter: true,
			value: filterValue.descricao,
			onChange: handleChange

		},
		{
			path: 'sku',
			name: 'SKU',
			value: filterValue.sku,
			isActiveFilter: true,
			onChange: handleChange

		},
		{
			path: 'categoria',
			name: 'Categoria',
			isActiveFilter: true,
			value: filterValue.categoria,
			onChange: handleChange

		},
		,
		{
			path: 'brand',
			name: 'Marca',
			isActiveFilter: true,
			value: filterValue.brand,
			onChange: handleChange

		},
		{
			path: 'avaible',
			name: 'Estoque',
			type: 'select',
			value: filterValue.avaible,
			isActiveFilter: true,
			onChange: handleChange

		},

	]

	const handleSubmitFilter = () => {

		const filter = { ...filterValue }

		console.log(filter)

		getProduct(50, pagination.currentPage, filter).then((products) => {

			if (products.result.length > 0) {
				setProductsData(products)
			}
			else {
				enqueueSnackbar('Não foi localizado nenhum item para o filtro informado !', { variant: 'info' })
				handleResetFilter()
			}
		})

	}

	const handleSubmit = () => {

		const filter = { ...filterValue }

		console.log(filter)

		getProduct(50, pagination.currentPage, filter).then((products) => {
			setProductsData(products)

		})

	}

	const handleKeyDown = (event) => {
		if (event.keyCode === 13 ||
			event.keyCode === 18) { // Verifica se a tecla pressionada é "Enter"
			handleSubmitFilter(); // Chama a função de clique no botão
		}
	};



	return (
		<ProductsContainer>
			<ProductsImage src={bannerLogo} />
			<ProductsFilterContainer >

				{columns && columns.filter(
					column => column.isActiveFilter == true
				).map((filter, index) => {
					return (
						<>
							{filter.type != 'select' && (<ProductsFilterItem>
								<Input
									key={index}
									name={filter.path}
									onKeyUp={handleKeyDown}
									placeholder={filter.name}
									value={filter.value}
									onChange={(e) => {
										if (filter.onChange) filter.onChange(e)

									}}
								/>

							</ProductsFilterItem>
							)}
							{filter.type == 'select' && (<ProductsFilterItem>
								<Select
									key={index}
									name={filter.path}
									placeholder={filter.name}
									value={filter.value}
									onChange={(e) => {
										if (filter.onChange) filter.onChange(e)
									}}
								>
									<option value="" hidden>Selecione o status</option>
									<option value="Disponível" >Disponível</option>
									<option value="Indisponivel" >Indisponivel</option>

								</Select>

							</ProductsFilterItem>
							)}
						</>

					)
				})}


			</ProductsFilterContainer>
			<FilterButtonContainer>
				<FilterButtonItem>
					<IconButton
						iconName={'search'}
						label={'Procurar (Enter)'}
						onClick={handleSubmitFilter}
					/>
				</FilterButtonItem>
				<FilterButtonItem>
					<IconButton
						iconName={'clear'}
						label={'Limpar Filtros'}
						onClick={handleResetFilter}
					/>
				</FilterButtonItem>
			</FilterButtonContainer>
			<Card
				setPagination={setPagination}
				currentPage={productsData.currentPage}
				totalPages={productsData.totalPages}
				data={{ items: productsData.result }} />
		</ProductsContainer>
	);

}


