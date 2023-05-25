import styled from "styled-components";
import IconButton from "./IconButton";
import { Fragment, useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { useSnackbar } from 'notistack'


const TableHeader = styled.th`
    align-items: 'center';
    border: '1px solid black';
    background: #0771AC;
    color: white;
    max-width: 1220px;
    margin: 20px auto;
    width: 20%;
    height: 50px;
    padding: 10px;
  
  `
const TableRow = styled.tr`
  align-items: 'center';
  border: 1px solid #ccc;
  min-height:1220px;
  :hover{
    background-color:#9FC1F5;
}
`
const TableData = styled.td`
align-items: 'center';
padding:2px;
height:60px;
border: 0px solid black;
text-align: center;

`
const Tables = styled.table`
overflow: hidden;
border-radius:10px;
font-size: 12px;
padding:10px;
max-width: 1340px;
min-width: 1320px;
box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
margin:0 auto;
align-items: 'center';
border-collapse: collapse;
@media screen and (max-width: 768px) {
  overflow-x: auto;
}
`
const TableSection = styled.section`
  max-width: 1120px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;    
  flex-direction:column;
`
const FilterContainer = styled.table`
overflow: hidden;
height:50px;
max-width: 1340px;
min-width: 1320px;
margin:0 auto ;
margin-top:40px;
align-items: 'center';
gap:5px;

`
const FilterItem = styled.table`
display: flex;

`
const FilterButtonContainer = styled.table`
display: flex;
margin:0 auto;
`
const FilterButtonItem = styled.table`
display: flex;
padding:2px;

`
const ContainerTable = styled.div`
display:flex;
overflow: hidden;
flex-direction:column;
margin:0 auto;
`
const PaginationContainer = styled.div`
display:flex;
max-width: 1340px;
margin:0 auto ;
margin-top:10px;
margin-bottom:10px;
gap:20px;
min-width: 1320px;
justify-content: flex-end;
align-items: baseline;
`
const TableDivider = styled.hr`
    margin-top:20px;
    height: 2px;
    width:100%;
    background-color: gray;
    border: 1px dotted ;
    margin-bottom:6px;
`
const TableDataSum = styled.td`
  font-size: 16px;
  font-weight:500;
  font-family:'Poppins';
`

const Table = ({ columns = [], data = [], setPagination, totalPages = 100, currentPage = 1, options = [] }) => {

    const [filtersValue, setFiltersValue] = useState({})
    const [values, setValues] = useState([])
    const [columnsValue, setColumnsValue] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const refInput = useRef(null)

    useEffect(() => {
        setValues(data)
    }, [data])

    useEffect(() => {
        setColumnsValue(columns)
        if (columns && columns.filter(column => column.isActiveFilter == true).length == 0) {
            refInput.current.style.display = "none";
        } else {
            refInput.current.style.display = "flex";
        }
    }, [columns])


    const handleFilter = (e, index) => {
        const { name, value } = e.target
        setFiltersValue({ ...filtersValue, [name]: value.trim() })
        setColumnsValue((current) => {
            current[index] = { ...current[index], value }
            return current

        })

    }

    const handleResetFilter = () => {
        let clearValueColumn = columns.map(column => { return { ...column, value: '' } })
        setColumnsValue(clearValueColumn)
        setFiltersValue({})
        setValues(data)
    }

    const handleSubmitFilter = () => {

        let filterData = [...values]
        let filterValues = { ...filtersValue }

        //Filtro por aproximação

        for (let filter of Object.keys(filterValues)) {
            const regex = new RegExp(filterValues[filter].trim(), 'i');
            filterData = filterData.filter(f => regex.test(f[filter.toLocaleLowerCase().trim()]))
        }
        setValues(filterData)
        if (filterData.length == 0) { 
            enqueueSnackbar('Nenhum item localizado!', { variant: 'default' })
            setValues(data)

        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 ||
            event.keyCode === 18) { // Verifica se a tecla pressionada é "Enter"
            handleSubmitFilter(); // Chama a função de clique no botão
        }
    };

    const handlePrevPage = () => {

        setPagination((prevPage) => {
            return {
                currentPage: prevPage.currentPage - 1
            }
        });

    };

    const handleNextPage = () => {
        setPagination((prevPage) => {
            return {
                currentPage: prevPage.currentPage + 1
            }
        });
    };

    const convertMonetaryValueToNumber = (value) => {
        const valueConvert = Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valueConvert;
    };


    return (
        <Fragment>
            <ContainerTable>

                <FilterContainer ref={refInput}  >

                    {columnsValue && columnsValue.filter(
                        column => column.isActiveFilter == true
                    ).map((filter, index) => {
                        return (
                            <>

                                <FilterItem>

                                    <Input
                                        key={index}
                                        name={filter.path}
                                        onKeyUp={handleKeyDown}
                                        placeholder={filter.name}
                                        value={filter.value}
                                        onChange={(e) => {
                                            if (filter.onChange) filter.onChange(e)
                                            handleFilter(e, index)
                                        }}
                                    />

                                </FilterItem>

                            </>

                        )
                    })}
                    {options.length > 0 && options.filter(f => f.buttonFilter == true).length > 0 && (
                        <FilterButtonContainer>
                            <FilterButtonItem>
                                <IconButton
                                    iconName={'search'}
                                    label={'Procurar'}
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
                        </FilterButtonContainer>)}
                </FilterContainer>
                <Tables>
                    <tbody>
                        <TableRow>
                            {columnsValue.length > 0 &&
                                columnsValue.map(({ path, name }) => (
                                    <TableHeader key={path}>{name}</TableHeader>
                                ))}
                        </TableRow>
                        {values && values.length > 0 &&
                            values.map(rowData => (
                                <TableRow key={rowData['id']}>
                                    {columnsValue.length > 0 &&
                                        columnsValue.map(({ path, attribute }, index, values) => (
                                            <Fragment>
                                                {path == 'button' ? (
                                                    <TableSection>
                                                        <FilterButtonItem>
                                                            <IconButton height={'25px'} onClick={() => { console.log('cheguei') }} width={'25px'} iconName="edit" label="" background=" #5a5553" />
                                                        </FilterButtonItem>
                                                        <FilterButtonItem>
                                                            <IconButton height={'25px'} width={'25px'} iconName="delete" label="" background=" #5a5553" />
                                                        </FilterButtonItem>
                                                    </TableSection>
                                                ) : (
                                                    <>
                                                        <TableData key={path}>{!attribute ? rowData[path] : <p> {attribute(rowData[path], rowData)}</p>} </TableData>
                                                    </>
                                                )}
                                            </Fragment>
                                        ))}
                                </TableRow>
                            ))}


                        {columnsValue.length > 0 && columnsValue.filter(column => column.sum).length > 0 && (

                            <>
                                <TableDivider />
                                <tr >
                                    <TableDataSum>Valor Negociado: {values && values.length > 0 && convertMonetaryValueToNumber(values.reduce((accumulator, item) => accumulator + (item.quantity * item.fromPrice), 0))}</TableDataSum>
                                </tr>
                                <tr >
                                    <TableDataSum>Valor Real: {values && values.length > 0 && convertMonetaryValueToNumber(values.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0))}</TableDataSum>
                                </tr>
                             
                            </>
                        )}

                    </tbody>
                </Tables>
                {options.length > 0 && options.filter(f => f.pagination == true).length > 0 && (
                    <PaginationContainer>
                        <IconButton style={{ width: '80px' }} iconName='arrow_back' onClick={handlePrevPage} disabled={currentPage === 1}>
                            Anterior
                        </IconButton>
                        <span>Página {currentPage} de {totalPages}</span>
                        <IconButton style={{ width: '80px' }} iconName='arrow_forward' onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Próxima
                        </IconButton>
                    </PaginationContainer>)
                }
            </ContainerTable>
        </Fragment >

    )
}

export default Table