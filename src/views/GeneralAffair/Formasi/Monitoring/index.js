/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactExport from 'react-export-excel'
import { Redirect } from 'react-router-dom'
import Service from '../../../../config/services'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class MonitoringFormasi extends Component {
  state = {}

  initialValues = {}

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  render() {
    const { auth, fetchQueryProps } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Level Jabatan',
        accessor: 'levelJabatan',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Formasi',
        accessor: 'formasi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Pemenuhan',
        accessor: 'pemenuhan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Sisa',
        accessor: 'sisa',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>
            {row.original?.formasi - row.original.pemenuhan}
          </div>
        ),
      },
      {
        Header: 'Unit Kerja',
        accessor: 'unitKerja',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    const pageName = 'Monitoring Formasi'
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card style={{ borderRadius: '20px' }}>
              <CardHeader style={{ backgroundColor: 'white', borderRadius: '20px 20px 0px 0px' }}>
                <Row>
                  <Col sm="6">
                    <Button
                      color="default"
                      className="mr-1"
                      style={{ color: '#2D69AF', fontSize: '1.1rem' }}
                    >
                      {pageName}
                    </Button>
                  </Col>
                  <Col sm="6" />
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        className="mr-3 mb-2 px-4"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                      >
                        Show
                      </Button>

                      <ExcelFile
                        filename={pageName}
                        element={
                          <Button
                            className="mr-1 mb-2 px-4"
                            color="secondary"
                            style={{ borderRadius: '20px' }}
                          >
                            Export
                          </Button>
                        }
                      >
                        <ExcelSheet data={data} name={pageName}>
                          <ExcelColumn label="Level Jabatan" value={(col) => col.levelJabatan} />
                          <ExcelColumn label="Formasi" value={(col) => col.formasi} />
                          <ExcelColumn label="Pemenuhan" value={(col) => col.pemenuhan} />
                          <ExcelColumn
                            label="Sisa"
                            value={(col) => Number(col.formasi - col.pemenuhan)}
                          />
                          <ExcelColumn label="Unit Kerja" value={(col) => col.unitKerja} />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
                <br />
                <ReactTable
                  filterable
                  columns={columns}
                  defaultPageSize={10}
                  className="-highlight"
                  {...tableProps}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

MonitoringFormasi.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.formasi.isLoading,
  message: state.formasi.message,
})

// const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  null
)(
  withTableFetchQuery({
    API: (p) => Service.getFormasi(p),
    Component: withToggle({
      Component: MonitoringFormasi,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
