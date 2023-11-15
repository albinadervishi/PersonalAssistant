import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";

const TransactionsList = () => {
  const PER_PAGE = 10;
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("http://localhost:8000/api/transactions/" + userId)
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        console.log("errori " + err);
      });
  }, []);

  //Pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(transactions.length / PER_PAGE);
  const currentPageData = transactions.slice(offset, offset + PER_PAGE);

  return (
    <div>
      <div className="py-4 px-3">
        <h3 className="text-center py-2">Transactions</h3>
        <table class="table table-dark flex-wrap">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Currency</th>
              <th scope="col">Note</th>
              <th scope="col">Type</th>
            </tr>
          </thead>

          {currentPageData.length > 0 ? (
            currentPageData.map((transaction, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    {new Date(transaction.date).toLocaleTimeString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.wallet.currency}</td>
                  <td>{transaction.note}</td>
                  <td>{transaction.type}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td>There are no transactions</td>
              </tr>
            </tbody>
          )}
        </table>
        {transactions.length > 0 && (
          <ReactPaginate
            previousLabel={currentPage === 0 ? null : "←"}
            nextLabel={currentPage === pageCount - 1 ? null : "→"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination__page"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
