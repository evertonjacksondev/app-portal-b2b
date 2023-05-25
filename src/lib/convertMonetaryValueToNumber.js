export const convertMonetaryValueToNumber = (value) => {
    const valueConvert = Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valueConvert;
};

