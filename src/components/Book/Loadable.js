/**
 *
 * Asynchronously loads the component
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "book" */),
  loading: () => null
})
