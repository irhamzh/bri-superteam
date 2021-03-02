/* eslint-disable react/jsx-curly-newline */
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
import { Formik, Form, Field, FieldArray } from 'formik'
import ReactExport from 'react-export-excel'
import Service from '../../../../config/services'
import {
  CfAsyncSelect,
  CfInput,
  CfInputDate,
  CfSelect,
  ListCheckboxShow,
} from '../../../../components'
import { AlertMessage, formatCurrencyIDR, formatDate, invalidValues } from '../../../../helpers'
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
class Klasifikasi extends Component {
  state = {
    optCatering: [],
    optWorkingOrder: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    menu: [{ name: '', price: '', qty: 0 }],
  }

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
        Header: 'No. WO',
        accessor: 'workingOrder.kodeWorkingOrder',
        show: true,
        filterable: true,
      },

      {
        Header: 'Nomor Surat',
        accessor: 'noSuratPesanan',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kebutuhan',
        accessor: 'kebutuhan',
        show: true,
        filterable: false,
      },
      {
        Header: 'Nama Catering',
        accessor: 'catering.name',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Menu',
        accessor: 'menu',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { menu } = props.original
          const listMenu = menu.map((row) => (
            <div>{`${row.nama === 'Lain-lain' ? `${row.nama}: ${row.other}` : row.nama}`}</div>
          ))
          return listMenu
        },
      },
      {
        Header: 'Biaya',
        accessor: 'biaya',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { menu } = props.original
          const listBiaya = menu.map((row) => <div>{`${formatCurrencyIDR(row.price)}`}</div>)
          return listBiaya
        },
      },
      {
        Header: 'Quantity',
        accessor: 'qty',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { menu } = props.original
          return menu.map((row) => <div>{`${row.qty || 0} `}</div>)
        },
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
      { id: 'kodeWorkingOrder', value: `${value}` },
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

    const pageName = 'Klasifikasi'
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
                            label="No. WO"
                            value={(col) => col.workingOrder?.kodeWorkingOrder}
                          />
                          <ExcelColumn label="Nomor Surat" value="noSuratPesanan" />
                          <ExcelColumn label="Kebutuhan" value={(col) => col.kebutuhan} />
                          <ExcelColumn label="Nama Catering" value={(col) => col.catering?.name} />
                          <ExcelColumn label="Menu" value={(col) => JSON.stringify(col.menu)} />
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
                    <ModalHeader toggle={modalForm.hide}>Tambah Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
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
                          label="No. Surat"
                          type="text"
                          name="noSuratPesanan"
                          isRequired
                          placeholder="Masukkan Nomor Surat"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kebutuhan"
                          type="text"
                          name="kebutuhan"
                          isRequired
                          placeholder="Masukkan Kebutuhan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <strong>Detail Catering:</strong>
                      <br />
                      <br />
                      <Row>
                        <Col>
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
                        </Col>
                      </Row>

                      <FieldArray
                        name="menu"
                        render={(arrayHelpers) => (
                          <>
                            {values.menu && values.menu.length > 0 ? (
                              values.menu.map((menu, index) => (
                                <Row form key={`key ${menu.name}`}>
                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Nama Menu"
                                        options={[
                                          { value: 'Snack Pagi', label: 'Snack Pagi' },
                                          { value: 'Snack Sore', label: 'Snack Sore' },
                                          {
                                            value: 'Snack Malam',
                                            label: 'Snack Malam',
                                          },
                                          {
                                            value: 'Breakfast',
                                            label: 'Breakfast',
                                          },
                                          {
                                            value: 'Lunch',
                                            label: 'Lunch',
                                          },
                                          { value: 'Dinner', label: 'Dinner' },
                                          { value: 'Spesial', label: 'Spesial' },
                                          { value: 'Lain-lain', label: 'Lain-lain' },
                                        ]}
                                        isRequired
                                        name={`menu[${index}].nama`}
                                        placeholder="Pilih atau Cari"
                                        component={CfSelect}
                                      />
                                    </FormGroup>

                                    {values.menu[index].nama === 'Lain-lain' && (
                                      <FormGroup>
                                        <Field
                                          label="Lain-lain"
                                          type="text"
                                          name={`menu[${index}].other`}
                                          isRequired
                                          placeholder="Menu lainnya"
                                          component={CfInput}
                                        />
                                      </FormGroup>
                                    )}
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Biaya"
                                        type="number"
                                        name={`menu[${index}].price`}
                                        isRequired
                                        placeholder="Masukkan biaya"
                                        component={CfInput}
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Quantity"
                                        type="number"
                                        name={`menu[${index}].qty`}
                                        isRequired
                                        placeholder="Masukkan jumlah"
                                        component={CfInput}
                                      />
                                    </FormGroup>
                                  </Col>

                                  {values.menu && values.menu.length > 1 && (
                                    <Col sm="2">
                                      <FormGroup style={{ paddingTop: '50%' }}>
                                        <Button
                                          type="button"
                                          color="danger"
                                          onClick={() => arrayHelpers.remove(index)}
                                          style={{ display: 'block' }}
                                        >
                                          <i className="fa fa-times" />
                                        </Button>
                                      </FormGroup>
                                    </Col>
                                  )}
                                </Row>
                              ))
                            ) : (
                              <>&nbsp;</>
                            )}
                            <div style={{ marginLeft: '90%' }}>
                              <Button
                                type="button"
                                color="success"
                                onClick={() =>
                                  arrayHelpers.push({
                                    nama: '',
                                    biaya: '',
                                  })
                                }
                              >
                                <i className="fa fa-plus" />
                              </Button>
                            </div>
                          </>
                        )}
                      />
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

Klasifikasi.propTypes = {
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
      Component: Klasifikasi,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
