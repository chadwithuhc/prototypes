import store from './store'
import { Mapper } from 'js-data'

const service = new Mapper({
  name: 'entry',
  defaultAdapter: 'localstorage'
})

const mapper = store.defineMapper('entry')
console.log('mapper', mapper)

export default mapper
