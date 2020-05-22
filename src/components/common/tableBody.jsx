import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
    // return _.get(item, column.path);
  };
  render() {
    const { data, columns } = this.props;

    const list = data.map((item, i) => (
      <tr key={item._id || item.id}>
        {columns.map((column, i) => (
          <td key={i}>{this.renderCell(item, column)}</td>
        ))}
      </tr>
    ));
    return (
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className='text-center m-5' colSpan='5'>
              Nothing found
            </td>
          </tr>
        ) : (
          list
        )}
      </tbody>
    );
  }
}

export default TableBody;
