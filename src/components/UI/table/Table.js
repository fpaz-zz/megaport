import React, { useEffect, useState } from 'react';
import { CaretUp, CaretDown } from './Caret';

import './Table.css';

const Table = ({ data }) => {
  const [sort, setSort] = useState({});
  const [tableData, setTableData] = useState({});
  const columns = tableData[0] && Object.keys(tableData[0]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleColumnClick = (e) => {
    const columnKey = e.target.getAttribute('data-column-key');

    const direction = !sort[columnKey]
      ? 'asc'
      : sort[columnKey] === 'desc'
      ? ''
      : 'desc';

    if (direction) {
      const sorted = tableData.sort((a, b) => {
        const reverse = direction === 'asc' ? 1 : -1;
        return reverse * a[columnKey].toString().localeCompare(b[columnKey]);
      });
      setTableData(sorted);
    } else {
      setTableData(data);
    }

    setSort((prev) => ({ ...prev, [columnKey]: direction }));
  };

  const renderColumns = () =>
    columns &&
    columns.map((column) => {
      const columnKey = column.toLocaleLowerCase();
      const direction = sort[columnKey];
      let caret = () => null;
      switch (direction) {
        case 'asc':
          caret = () => <CaretUp />;
          break;
        case 'desc':
          caret = () => <CaretDown />;
          break;
        default:
          break;
      }

      return (
        <th
          key={column}
          data-column-key={column.toLocaleLowerCase()}
          onClick={handleColumnClick}
        >
          {column.toLocaleUpperCase()}
          <span className="caret">{caret()}</span>
        </th>
      );
    });

  const renderRows = () =>
    tableData[0] &&
    tableData.map((row, i) => (
      <tr key={`${i}_${row.id}`}>
        {columns.map((column) => (
          <td>{row[column]}</td>
        ))}
      </tr>
    ));

  return (
    <div className="table-container">
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>{renderColumns()}</tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default Table;
