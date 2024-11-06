import { useEffect, useState } from "react"

export default function OdakGrid({ dataSource, rowTemplate, columnTemplate }) {
    const [columns, setColumns] = useState([])

    const [orderDir, setOrderDir] = useState("asc")
    const [orderBy, setOrderBy] = useState(null)

    useEffect(() => {
        if (!dataSource[0]) return;
        const columns = Object.keys(dataSource[0])
        setColumns(columns)
    }, [dataSource])

    const handleOrderChange = (columnIdx) => {
        const column = columns[columnIdx]

        if (orderBy === column) {
            setOrderDir(orderDir === "asc" ? "desc" : "asc")
        } else {
            setOrderBy(column)
            setOrderDir("asc")
        }
    }

    const sortedData = [...dataSource].sort((a, b) => {
        if (!orderBy) return 0
        if (a[orderBy] < b[orderBy]) return orderDir === "asc" ? -1 : 1
        if (a[orderBy] > b[orderBy]) return orderDir === "asc" ? 1 : -1
        return 0
    })

    return (
        <table className="odak-grid">
            <thead>
                <tr>
                    {
                        columns.map((item, index) => (
                            <th key={index} onClick={() => handleOrderChange(index)}>
                                {item} {orderBy === item ? (orderDir === "asc" ? "▲" : "▼") : ""}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    sortedData.map((item, index) => (
                        <tr key={index}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{item[col]}</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}