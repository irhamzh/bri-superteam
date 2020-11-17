import React from 'react'
import PropTypes from 'prop-types'
import { isError, debounce } from 'lodash'
import queryString from 'query-string'
import QueryTableManager from '../helpers/QueryTableManager'
import { AlertMessage } from '../helpers/Alert'

const GET_CONFIG = () => ({
  idProps: 'fetchQueryProps',
  Component: null,
  API: null,
  initFilter: {},
  defaultFilter: {},
})

function WithTableFetchQuery(options = GET_CONFIG()) {
  const { idProps, Component, API, initFilter, defaultFilter } = Object.assign(
    GET_CONFIG(),
    options
  )

  const queryManager = new QueryTableManager({
    initFilter,
    defaultFilter,
  })

  return class _withQueryPagination extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
        loading: true,
        page: 0,
        pages: 0,
        limit: 10,
      }
      this.onFetchData = debounce(this.onFetchData.bind(this), 800)
      this.queryManager = queryManager
    }

    onFetchData(state, instance, onFinish) {
      const { page, pageSize, sorted } = state
      const limit = pageSize
      // show the loading overlay
      // this.setState({ loading: true })
      // fetch your data
      if (instance) {
        this.queryManager.setSorted(sorted)
      }

      return API(
        `?${queryString.stringify({
          page: page + 1,
          limit,
          ...this.queryManager.getStringifyQuery(),
        })}`
      )
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })
        .then((resOrError) => {
          if (isError(resOrError)) {
            // AlertMessage.error(resOrError)

            this.setState({ loading: false, page, pages: 0, pageSize, limit }, () => {
              if (onFinish) {
                onFinish([])
              }
            })
          } else {
            const res = resOrError
            const { data } = res.data
            this.setState(
              {
                data,
                pages: Math.ceil(res.data.totalCount / limit),
                totalRow: res.data.totalCount,
                loading: false,
                page,
                pageSize,
              },
              () => {
                if (onFinish) {
                  onFinish(data)
                }
              }
            )
          }
        })
    }

    doFilter = async (id, value) => {
      return new Promise((resolve) => {
        this.queryManager.setFilteredValue(id, value, () => {
          this.setState({ loading: true })
          this.onFetchData(this.state, null, (data) => {
            resolve(data)
          })
        })
      })
    }

    refresh = () => {
      this.setState({ loading: true })
      this.onFetchData(this.state)
    }

    isFilter = (key) => {
      return this.queryManager.filtered.some((x) => x.id === key)
    }

    getFilterByKey = (key) => {
      return this.queryManager.filtered.find((x) => x.id === key)
    }

    render() {
      const { getFilterByKey, isFilter, refresh } = this
      const { data, totalRow, loading, page, pages, pageSize } = this.state
      const queryProps = {
        [idProps]: {
          tableProps: {
            manual: true,
            data,
            totalRow,
            loading,
            onFetchData: this.onFetchData,
            onFilteredChange: (filtered, column) => {
              const { id } = column
              const filter = filtered.find((x) => x.id === id)
              if (filter) {
                this.doFilter(id, filter.value)
              } else {
                this.doFilter(id, null)
              }
            },
            page,
            pages,
            pageSize,
          },
          doFilter: this.doFilter,
          refresh,
          getFilterByKey,
          isFilter,
          setFilteredByObject: this.queryManager.setFilteredByObject,
          setQueryObject: this.queryManager.setQueryObject,
        },
      }

      return <Component {...this.props} {...queryProps} />
    }
  }
}

const withTableFetchQuery = WithTableFetchQuery

export const WithTableFetchQueryProp = PropTypes.shape({
  tableProps: PropTypes.shape({
    manual: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    totalRow: PropTypes.number,
    onFetchData: PropTypes.func,
    loading: PropTypes.bool,
    page: PropTypes.number,
    pages: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  doFilter: PropTypes.func,
  refresh: PropTypes.func,
  getFilterByKey: PropTypes.func,
  isFilter: PropTypes.func,
  setFilteredByObject: PropTypes.func,
})

export default withTableFetchQuery
