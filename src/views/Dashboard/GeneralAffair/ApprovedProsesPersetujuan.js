import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Row, FormGroup, Form } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import Service from '../../../config/services'
// import { CfInput, CfSelect } from '../../../components'
import { AlertMessage, formatDate, invalidValues, queryStringToJSON } from '../../../helpers'
import { createAsset, updateAsset, deleteAsset } from '../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'

class ApprovedProsesPersetujuan extends Component {
  state = {
    bulan: null,
    tahun: null,
  }

  initialValues = {}

  async componentDidMount() {
    const { location } = this.props
    const query = queryStringToJSON(location.search)
    const { date, monthYear } = query
    const { fetchQueryProps } = this.props

    if (date) {
      fetchQueryProps.setFilteredByObject({
        division: 'General Affair',
        status: 'Approved oleh Wakabag',
        atDate$createdAt: date,
        'month-year$createdAt': '',
      })
    } else if (monthYear) {
      fetchQueryProps.setFilteredByObject({
        division: 'General Affair',
        status: 'Approved oleh Wakabag',
        atDate$createdAt: '',
        'month-year$createdAt': monthYear,
      })
    } else {
      fetchQueryProps.setFilteredByObject({
        division: 'General Affair',
        status: 'Approved oleh Wakabag',
        atDate$createdAt: '',
        'month-year$createdAt': '',
      })
    }
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createAsset, updateAsset } = this.props
    if (!invalidValues.includes(id)) {
      updateAsset(values, id, this.doRefresh)
    } else {
      createAsset(values, this.doRefresh)
    }
  }

  handleChangeSelect = (name, value) => {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      condition: value.value,
    })
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.doRefresh()
      }
    )
  }

  filterData = async (e) => {
    e.preventDefault()
    const { bulan, tahun } = this.state
    if (invalidValues.includes(bulan)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }
    if (invalidValues.includes(tahun)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }

    try {
      const { fetchQueryProps } = this.props
      fetchQueryProps.setFilteredByObject({
        'month-year$createdAt': `${tahun}-${bulan}`,
      })

      this.doRefresh()
    } catch (error) {
      AlertMessage.error(error)
    }
  }

  // handleDelete = (e, state) => {
  //   e.preventDefault()

  //   const { id } = state
  //   const { deleteDelete } = this.props

  //   AlertMessage.warning()
  //     .then((result) => {
  //       if (result.value) {
  //         console.log('delete object', id)
  //         deleteDelete(id, this.doRefresh)
  //       } else {
  //         const paramsResponse = {
  //           title: 'Huff',
  //           text: 'Hampir saja kamu kehilangan data ini',
  //         }
  //         AlertMessage.info(paramsResponse)
  //       }
  //     })
  //     .catch((err) => {
  //       AlertMessage.error(err) // Internal Server Error
  //     })
  // }

  render() {
    const { auth, fetchQueryProps } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Kode Working Order',
        accessor: 'kodeWorkingOrder',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Kegiatan',
        accessor: 'namaKegiatan',
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kode Pelatihan',
        accessor: 'kodePelatihan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Tanggal Terima',
        accessor: 'tanggalTerima',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Status',
        width: 200,
        accessor: 'status',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    // const pageName = ''
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Form onSubmit={(e) => this.filterData(e)}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Select
                              isClearable
                              placeholder="Pilih Bulan..."
                              options={[
                                { label: 'Januari', value: '1' },
                                { label: 'Februari', value: '2' },
                                { label: 'Maret', value: '3' },
                                { label: 'April', value: '4' },
                                { label: 'Mei', value: '5' },
                                { label: 'Juni', value: '6' },
                                { label: 'Juli', value: '7' },
                                { label: 'Agustus', value: '8' },
                                { label: 'September', value: '9' },
                                { label: 'Oktober', value: '10' },
                                { label: 'November', value: '11' },
                                { label: 'Desember', value: '12' },
                              ]}
                              name="bulan"
                              onChange={(e) => this.setState({ bulan: e?.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Select
                              isClearable
                              placeholder="Pilih tahun..."
                              options={[
                                { value: 2018, label: '2018' },
                                { value: 2019, label: '2019' },
                                { value: 2020, label: '2020' },
                                { value: 2021, label: '2021' },
                                { value: 2022, label: '2022' },
                              ]}
                              name="tahun"
                              className=""
                              onChange={(e) => this.setState({ tahun: e?.value })}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="1">
                          <Button type="submit" color="primary">
                            <i className="fa fa-filter" />
                          </Button>
                        </Col>
                        <Col sm="3" />
                      </Row>
                    </Form>
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

ApprovedProsesPersetujuan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  fetchQueryProps: WithTableFetchQueryProp,
  createAsset: PropTypes.func.isRequired,
  updateAsset: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func.isRequired,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createAsset: (formData, refresh) => dispatch(createAsset(formData, refresh)),
  updateAsset: (formData, id, refresh) => dispatch(updateAsset(formData, id, refresh)),
  deleteAsset: (id, refresh) => dispatch(deleteAsset(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getWorkingOrder(p),
    Component: withToggle({
      Component: ApprovedProsesPersetujuan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
