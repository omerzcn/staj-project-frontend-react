import React from "react";
import { Accordion, Table, Pagination} from "react-bootstrap";
import { useState } from "react";

function ProfileHistoryTable({historyData}){
    const reversedHistoryData = historyData.slice().reverse();

    const itemsPerPage = 10; // Her sayfada gösterilecek öğe sayısı
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = reversedHistoryData.slice(startIndex, endIndex);

    const pageCount = Math.ceil(historyData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="profile-history-container">
            <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Purchase History</Accordion.Header>
                    <Accordion.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Stock Name</th>
                            <th>Purchase Date</th>
                            <th>Purchase Price</th>
                            <th>Total Price</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((purchase, index) => (
                                <tr key={index}>
                                    <td>{purchase.stockName}</td>
                                    <td>{new Date(purchase.purchaseDate).toLocaleString()}</td>
                                    <td>{purchase.purchasePrice !== null ? purchase.purchasePrice.toFixed(2) : ''}$</td>
                                    <td>{purchase.totalPrice !== null ? purchase.totalPrice.toFixed(2) : ''}$</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {Array.from({ length: pageCount }).map((_, index) => (
                            <Pagination.Item
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            active={index + 1 === currentPage}
                            >
                            {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === pageCount}
                        />
                    </Pagination>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );

}
export default ProfileHistoryTable;