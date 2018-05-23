import React from 'react'
import classnames from 'classnames'

import style from './index.css'

const Table = ({ className, data = [], columns = [], header = '' }) => (
  <div className={classnames(style.table, className)}>
    <div className={style.header}>{ header }</div>
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            {
              columns.map((column, index) => (
                <th key={column.id || index}>{column.header}</th>
              ))
            }
          </tr>
        </thead>
      </table>
    </div>
  </div>
)

export default Table

// <table>
// <thead>
//   <tr>
//     <template v-for="(column, index) in columns">
//       <th :key="column.id || index">{{ column.header }}</th>
//     </template>
//     <slot name="column-header"></slot>
//   </tr>
// </thead>
// <tbody>
//   <tr v-if="data.length === emptyData || loading">
//     <td colspan="40" :class="{ loading, empty: data.length === emptyData }">
//       Sin datos
//     </td>
//   </tr>
//   <template v-else v-for="(row, rowIndex) in data">
//     <tr :key="row.id || rowIndex">
//       <template v-for="(field, fieldIndex) in columns">
//         <td :key="composeTdKey(row, rowIndex, field, fieldIndex)">
//           {{ printFieldData(field, row) }}
//         </td>
//       </template>
//       <slot name="column" :row="row"></slot>
//     </tr>
//   </template>
// </tbody>
// </table>
