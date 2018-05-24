import React from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import './index.css'

const EMPTY_DATA = 0

function composeTdKey (row, rowIndex, field, fieldIndex) {
  if (row.id && field.id) return `${row.id}.${field.id}`
  if (row.id && !field.id) return `${row.id}.${fieldIndex}`
  if (!row.id && field.id) return `${rowIndex}.${field.id}`
  return `${rowIndex}.${fieldIndex}`
}

function printField (field, row) {
  if (typeof field.accessor === 'function') return field.accessor(row)
  if (typeof field.accessor === 'string') return get(row, field.accessor, '')
  if (field.id) return get(row, field.id, '')
  return ''
}

const Table = ({ className, data = [], columns = [], header = '', loading = false }) => (
  <div className={classnames('table', className)}>
    <div className='header'>{ header }</div>
    <div className='container'>
      <table>
        <thead>
          <tr>
            {
              columns.map((column, index) => (
                <th key={column.id || index} className={column.className}>{ column.header }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.length === EMPTY_DATA ? (
              <td colSpan={40} className={classnames({ loading })}>Sin datos</td>
            ) : data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {
                  columns.map((field, fieldIndex) => (
                    <td key={composeTdKey(row, rowIndex, field, fieldIndex)} className={field.className}>
                      {printField(field, row)}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
)

export default Table
