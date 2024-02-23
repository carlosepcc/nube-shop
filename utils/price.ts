const price = (number: number) => number.toLocaleString("es-CU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default price;