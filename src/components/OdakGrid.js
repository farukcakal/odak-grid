import { useEffect, useState } from "react"

export default function OdakGrid({ dataSource, rowTemplate, columnTemplate }) {
    const [columns, setColumns] = useState([])
    const [orderDir, setOrderDir] = useState("asc")
    const [orderBy, setOrderBy] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

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

    const startIndex = (currentPage - 1) * itemsPerPage
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage)
    const totalPages = Math.ceil(dataSource.length / itemsPerPage)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const renderPagination = () => {
        const pageButtons = []

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // İlk sayfa
                i === totalPages || // Son sayfa
                (i >= currentPage - 1 && i <= currentPage + 1) // Geçerli sayfanın etrafındaki sayfalar
            ) {
                pageButtons.push(
                    <a
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={currentPage === i ? "active" : ""}
                    >
                        {i}
                    </a>
                )
            } else if (
                (i === currentPage - 2 && currentPage > 3) || // Geçerli sayfanın 2 öncesi
                (i === currentPage + 2 && currentPage < totalPages - 2) // Geçerli sayfanın 2 sonrası
            ) {
                pageButtons.push(<span key={i}>...</span>)
            }
        }

        return pageButtons
    }

    const handleLengthChange = (value) => {
        setItemsPerPage(value)
        setCurrentPage(1) // Reset to first page when items per page changes
    }

    return (
        <div>
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
                        currentData.map((item, index) => (
                            <tr key={index}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>{item[col]}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="pagination">
                <div>
                    <select onChange={(e) => handleLengthChange(parseInt(e.target.value, 10))} value={itemsPerPage}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div>
                    {renderPagination()}
                </div>
            </div>
        </div>
    )
}