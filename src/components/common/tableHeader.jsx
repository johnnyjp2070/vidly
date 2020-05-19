import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc')
      return <i className='ml-2 fas fa-sort-down'></i>;

    if (sortColumn.order === 'desc')
      return <i className='ml-2 fas fa-sort-up'></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, i) => (
            <th
              className='clickable'
              key={i}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
