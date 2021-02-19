/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  FormGroup,
} from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import ReactExport from 'react-export-excel'
import Service from '../../../../config/services'
import { CfAsyncSelect, CfInputDate, CfSelect, ListCheckboxShow } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createPRCatering,
  updatePRCatering,
  deletePRCatering,
} from '../../../../modules/procurement/catering/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Internal extends Component {
  state = {
    optCatering: [],
    optWorkingOrder: [],
    isShow: false,
    columns: [],
  }

  initialValues = {}

  async componentDidMount() {
    // const { fetchQueryProps } = this.props

    const resDataCatering = await Service.getCatering()
    const dataCatering = resDataCatering.data.data
    const optCatering = dataCatering.map((row) => ({ label: row.name, value: row.id }))

    const filteredDivision = [{ id: 'division', value: 'Procurement' }]
    const filterString = JSON.stringify(filteredDivision)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)

    const resDataWorkingOrder = await Service.getWorkingOrder(paramsEncoded)
    const dataWorkingOrder = resDataWorkingOrder.data.data
    const optWorkingOrder = dataWorkingOrder.map((row) => ({
      label: row.kodeWorkingOrder,
      value: row.id,
    }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        width: 100,
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'No. Working Order',
        accessor: 'workingOrder.kodeWorkingOrder',
        filterable: true,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nomor Surat Pemesanan',
        accessor: 'noSuratPesanan',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Catering',
        accessor: 'catering.name',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Evaluasi Sampel Makanan',
        accessor: 'sampleMakan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Evaluasi Penyajian di Restoran',
        accessor: 'penyajian',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Performance',
        accessor: 'performance',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    this.setState({
      optCatering,
      optWorkingOrder,
      columns,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPRCatering, updatePRCatering } = this.props
    if (!invalidValues.includes(id)) {
      const { workingOrder, catering } = values
      if (workingOrder && Object.keys(workingOrder).length > 0) {
        values.workingOrder = workingOrder.id || workingOrder
      }
      if (catering && Object.keys(catering).length > 0) {
        values.catering = catering.id || catering
      }
      updatePRCatering(values, id, this.doRefresh)
    } else {
      createPRCatering(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePRCatering } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deletePRCatering(id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Huff',
            text: 'Hampir saja kamu kehilangan data ini',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Internal Server Error
      })
  }

  toggleShow = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isShow: !prevState.isShow,
      }
    })
  }

  handleShowCheckbox = (e, data) => {
    const { columns } = this.state

    const selected = [...columns]
    const keyIndex = columns.indexOf(data)
    if (e.target.checked) {
      selected[keyIndex].show = true
    } else {
      selected[keyIndex].show = false
    }

    this.setState({ columns: selected })
  }

  handleInputCatering = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getCatering(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  handleInputWorkingOrder = async (value) => {
    const filtered = [
      { id: 'kodeWrokingOrder', value: `${value}` },
      { id: 'division', value: 'Procurement' },
    ]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getWorkingOrder(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.kodeWorkingOrder, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optCatering, optWorkingOrder, isShow, columns } = this.state

    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        width: 150,
        show: true,
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={() => modalForm.show({ data: props.original })}
              className="mr-1"
              title="Edit"
            >
              <i className="fa fa-pencil" />
            </Button>
            &nbsp; | &nbsp;
            <Button
              color="danger"
              onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              <i className="fa fa-trash" />
            </Button>
          </>
        ),
      },
    ]

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Evaluasi Internal'
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
                  <Col sm="6">
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        color="primary"
                        onClick={() => modalForm.show({ data: this.initialValues })}
                        className="mr-1"
                      >
                        {/* <i className="fa fa-plus" style={isIcon} /> */}
                        {/* &nbsp; */}
                        Tambah Data
                      </Button>
                    </div>
                  </Col>
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
                        onClick={this.toggleShow}
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.tanggal)} />
                          <ExcelColumn
                            label="No. Working Order"
                            value={(col) => col.workingOrder?.kodeWorkingOrder}
                          />
                          <ExcelColumn label="Nama Catering" value={(col) => col.catering?.name} />
                          <ExcelColumn label="No. Surat Pesanan" value="noSuratPesanan" />
                          <ExcelColumn label="Evaluasi Sampel Makanan" value="sampleMakan" />
                          <ExcelColumn label="Evaluasi Penyajian di Restoran" value="penyajian" />
                          <ExcelColumn label="Performance" value="performance" />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
                {/* Card Show */}
                <ListCheckboxShow
                  data={columns}
                  isShow={isShow}
                  handleShowCheckbox={this.handleShowCheckbox}
                />
                <ReactTable
                  filterable
                  columns={tableCols}
                  defaultPageSize={10}
                  className="-highlight"
                  {...tableProps}
                />
              </CardBody>
            </Card>

            <Modal
              isOpen={modalForm.isOpen}
              toggle={modalForm.toggle}
              backdrop="static"
              className={className}
            >
              <Formik
                initialValues={modalForm.prop.data}
                // validationSchema={}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ values, isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Evaluasi</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Working Order"
                          cacheOptions
                          options={optWorkingOrder}
                          defaultOptions
                          loadOptions={this.handleInputWorkingOrder}
                          name="workingOrder"
                          isRequired
                          placeholder="Pilih atau cari Working Order"
                          defaultValue={
                            values.workingOrder
                              ? {
                                  value: values.workingOrder.id,
                                  label: values.workingOrder.kodeWorkingOrder,
                                }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Catering"
                          cacheOptions
                          options={optCatering}
                          defaultOptions
                          loadOptions={this.handleInputCatering}
                          name="catering"
                          isRequired
                          placeholder="Pilih atau cari Catering"
                          defaultValue={
                            values.catering
                              ? {
                                  value: values.catering.id,
                                  label: values.catering.name,
                                }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Evaluasi Sampel Makanan"
                          options={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                          ]}
                          isRequired
                          name="sampleMakan"
                          placeholder="Pilih atau Cari Evaluasi"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Evaluasi Penyajian di Restoran"
                          options={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                          ]}
                          isRequired
                          name="penyajian"
                          placeholder="Pilih atau Cari Evaluasi"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Performance"
                          options={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                          ]}
                          isRequired
                          name="performance"
                          placeholder="Pilih atau Cari Performance"
                          component={CfSelect}
                        />
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button type="button" color="secondary" onClick={modalForm.hide}>
                        Cancel
                      </Button>
                      &nbsp;
                      <Button
                        type="submit"
                        color="primary"
                        className="px-4"
                        disabled={isSubmitting || isLoading}
                      >
                        {isSubmitting || isLoading ? (
                          <>
                            <Spinner size="sm" color="light" />
                            &nbsp;Loading...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </Modal>
          </Col>
        </Row>
      </div>
    )
  }
}

Internal.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPRCatering: PropTypes.func.isRequired,
  updatePRCatering: PropTypes.func.isRequired,
  deletePRCatering: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.procurementCatering.isLoading,
  message: state.procurementCatering.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPRCatering: (formData, refresh) => dispatch(createPRCatering(formData, refresh)),
  updatePRCatering: (formData, id, refresh) => dispatch(updatePRCatering(formData, id, refresh)),
  deletePRCatering: (id, refresh) => dispatch(deletePRCatering(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPRCatering(p),
    Component: withToggle({
      Component: Internal,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
