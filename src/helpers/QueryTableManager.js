import { cloneDeep, get, isFunction, isNil } from 'lodash'
import { invalidValues } from './Common'

const GET_CONFIG = () => ({
  initFilter: {},
  defaultFilter: {},
})

class QueryTableManager {
  constructor(configs = GET_CONFIG()) {
    this.configs = {
      ...GET_CONFIG(),
      ...configs,
    }
    this.filtered = []
    this.sorted = []
    this.queryObject = {}

    this.setFilteredByObject(this.configs.initFilter)
    this.setFilteredByObject(this.configs.defaultFilter)
  }

  getStringifyQuery() {
    return {
      filtered: JSON.stringify(this.filtered),
      sorted: JSON.stringify(this.sorted),
      ...this.queryObject,
    }
  }

  setQueryObject = (obj) => {
    this.queryObject = obj
  }

  isValidFilterValue = (val) => {
    return !isNil(val) || val !== ''
  }

  getFilterByKey = (key) => {
    return this.filtered.find((x) => x.id === key)
  }

  setFilteredValue = async (id, value, callback) => {
    const { defaultFilter } = this.configs
    let curVal = value
    if (isFunction(value)) {
      curVal = await value(get(this.getFilterByKey(id), 'value'))
    }

    // set default filter kalo gk valid
    if (!this.isValidFilterValue(curVal) && !isNil(get(defaultFilter, id))) {
      curVal = cloneDeep(defaultFilter[id])
    }

    const filter = this.filtered.find((x) => x.id === id)
    if (!filter && this.isValidFilterValue(curVal)) {
      this.filtered.push({
        id,
        value: curVal,
      })
    } else if (!this.isValidFilterValue(curVal)) {
      this.filtered = [this.filtered].filter((x) => x.id !== filter.id)
    } else {
      filter.value = curVal
    }

    if (invalidValues.includes(value)) {
      this.filtered = this.filtered.filter((x) => !invalidValues.includes(x.value))
    }
    console.log(this.filtered, filter)
    if (callback) {
      callback()
    }
  }

  setSortedValue(id, desc, callback) {
    const sorted = this.sorted.find((x) => x.id === id)
    if (!sorted) {
      this.sorted.push({
        id,
        desc,
      })
    } else {
      sorted.desc = desc
    }

    if (callback) {
      callback()
    }
  }

  setFilteredByObject = (obj) => {
    const filterKeys = Object.keys(obj)
    for (let i = 0; i < filterKeys.length; i += 1) {
      const filterKey = filterKeys[i]
      const value = obj[filterKey]
      // if (!invalidValues.includes(value)) {
      this.setFilteredValue(filterKey, value)
      // }
    }
  }

  setSorted(value) {
    this.sorted = [...(value || [])]
  }
}

export default QueryTableManager
