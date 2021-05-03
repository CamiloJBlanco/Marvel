import React from 'react';
import './Pagination.scss';

const Pagination = ({ itemsPerPage, totalItems, paginate, Page }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <table>
            <tbody>
                <tr className="pagination">
                    <td>MARV</td>
                    {pageNumbers.map((number) => (
                        <td key={number} className="">
                            <div className={Page === number ? 'selected' : ''}><a onClick={() => paginate(number)} href="/#" className="">E</a></div>
                            <div className="number">{number}</div>
                        </td>
                    ))}
                    <td>L</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Pagination