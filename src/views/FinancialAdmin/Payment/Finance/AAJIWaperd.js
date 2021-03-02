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
import { Formik, Form, FieldArray, Field } from 'formik'
import ReactExport from 'react-export-excel'
import Service from '../../../../config/services'
import {
  CfAsyncSelect,
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  CfInputMultiFile,
  CfSelect,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../components'
import { AlertMessage, invalidValues, formatDate, formatCurrencyIDR } from '../../../../helpers'
import {
  createFIPayment,
  updateFIPayment,
  deleteFIPayment,
} from '../../../../modules/financialAdmin/payment/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class AAJIWaperd extends Component {
  state = {
    optProvider: [],
    isShow: false,
    columns: [],
    optPajak: [],
  }

  initialValues = {
    seksi: 'Financial Admin',
    typePayment: 'Waperd',
    suratPerintahBayar: false,
    invoice: false,
    invoiceData: [{ invoiceNumber: '', nominal: '' }],
    pajak: [{ pajak: '', nominal: '' }],
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      seksi: 'Financial Admin',
      typePayment: 'Waperd',
    })

    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

    const resDataPajak = await Service.getPajak()
    const dataPajak = resDataPajak.data.data
    const optPajak = dataPajak.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Seksi',
        accessor: 'seksi',
        show: true,
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Peserta',
        accessor: 'namaPeserta',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nomor Invoice',
        accessor: 'invoiceNumber',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { invoiceData } = props.original
          const listInvoice =
            invoiceData && invoiceData.map((row) => <div>{`${row.invoiceNumber}`}</div>)
          return listInvoice
        },
      },
      {
        Header: 'Nominal',
        accessor: 'nominal',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { invoiceData } = props.original
          const listNominal =
            invoiceData &&
            invoiceData.map((row) => <div>{`${formatCurrencyIDR(row.nominal)}`}</div>)
          return listNominal
        },
      },
      {
        Header: 'Surat Perintah Bayar',
        accessor: 'suratPerintahBayar',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Invoice',
        accessor: 'invoice',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Biaya',
        accessor: 'biaya',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatCurrencyIDR(row.value)}</div>,
      },

      {
        Header: 'Pajak',
        accessor: 'pajak',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { pajak } = props.original
          return pajak.map((row) => <div>{`${row.pajak?.name}`}</div>)
        },
      },

      {
        Header: 'Nominal',
        accessor: 'nominal',
        show: true,
        filterable: false,
        Cell: (props) => {
          const { pajak } = props.original
          return pajak.map((row) => <div>{`${formatCurrencyIDR(row.nominal)}`}</div>)
        },
      },

      {
        Header: 'Lampiran',
        accessor: 'lampiran',
        show: true,
        filterable: false,
        Cell: (row) => {
          if (row.value && row.value.length > 0) {
            return row.value.map((item) => (
              <div>
                <a href={item} target="_blank" rel="noreferrer">
                  Download
                </a>
              </div>
            ))
          }
        },
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    this.setState({
      optProvider,
      columns,
      optPajak,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createFIPayment, updateFIPayment } = this.props
    if (!invalidValues.includes(id)) {
      const { provider, pajak } = values
      if (provider && Object.keys(provider).length > 0) {
        values.provider = provider.id || provider
      }
      if (pajak.length > 0) {
        values.pajak = pajak.map((item) => ({
          pajak: item.pajak.id || item.pajak,
          nominal: item.nominal,
        }))
      }
      updateFIPayment(values, id, this.doRefresh)
    } else {
      createFIPayment(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteFIPayment } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteFIPayment(id, this.doRefresh)
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

  handleInputProvider = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getProvider(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: row.name,
        value: row.id,
      }))
    })
    return option
  }

  handleInputPajak = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getPajak(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: row.name,
        value: row.id,
      }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optProvider, isShow, columns, optPajak } = this.state
    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        width: 200,
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
    const pageName = 'AAJI / Waperd'
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
                          <ExcelColumn label="Seksi" value={(col) => col.seksi} />
                          <ExcelColumn label="Nama Peserta" value={(col) => col.namaPeserta} />
                          <ExcelColumn label="Periode / Bulan" value={(col) => col.periodeBulan} />
                          <ExcelColumn
                            label="Surat Perintah Bayar"
                            value={(col) => (col.suratPerintahBayar ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Biaya"
                            value={(col) => formatCurrencyIDR(col.biaya)}
                          />
                          <ExcelColumn label="Keterangan" value={(col) => col.information} />
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
                          placeholder="Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Seksi"
                          options={[{ value: 'Financial Admin', label: 'Financial Admin' }]}
                          isRequired
                          isDisabled
                          name="seksi"
                          placeholder="Pilih atau Cari"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Peserta"
                          type="text"
                          name="namaPeserta"
                          isRequired
                          placeholder="Masukkan Nama"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Provider"
                          cacheOptions
                          options={optProvider}
                          defaultOptions
                          loadOptions={this.handleInputProvider}
                          name="provider"
                          isRequired
                          placeholder="Pilih atau cari"
                          defaultValue={
                            values.provider
                              ? { value: values.provider.id, label: values.provider.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FieldArray
                        name="invoiceData"
                        render={(arrayHelpers) => (
                          <>
                            {values.invoiceData && values.invoiceData.length > 0 ? (
                              values.invoiceData.map((invoiceData, index) => (
                                <Row form key={`key ${invoiceData.name}`}>
                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Nomor Invoice"
                                        type="text"
                                        name={`invoiceData[${index}].invoiceNumber`}
                                        isRequired
                                        placeholder="Nomor Invoice"
                                        component={CfInput}
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Nominal"
                                        type="number"
                                        name={`invoiceData[${index}].nominal`}
                                        isRequired
                                        placeholder="Masukkan nominal"
                                        component={CfInput}
                                      />
                                    </FormGroup>
                                  </Col>

                                  {values.invoiceData && values.invoiceData.length > 1 && (
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
                                    invoiceNumber: '',
                                    nominal: '',
                                  })
                                }
                              >
                                <i className="fa fa-plus" />
                              </Button>
                            </div>
                          </>
                        )}
                      />

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field
                            label="Surat Perintah Bayar"
                            name="suratPerintahBayar"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field label="Invoice" name="invoice" component={CfInputCheckbox} />
                        </FormGroup>
                      </div>

                      <FormGroup>
                        <Field
                          label="Lampiran"
                          name="lampiran"
                          isRequired
                          accept="image/*"
                          multiple
                          component={CfInputMultiFile}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Biaya"
                          type="number"
                          name="biaya"
                          isRequired
                          placeholder="Masukkan Biaya"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FieldArray
                        name="pajak"
                        render={(arrayHelpers) => (
                          <>
                            {values.pajak && values.pajak.length > 0 ? (
                              values.pajak.map((pajak, index) => (
                                <Row form key={`key ${pajak.name}`}>
                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Pajak"
                                        cacheOptions
                                        options={optPajak}
                                        defaultOptions
                                        loadOptions={this.handleInputPajak}
                                        name={`pajak[${index}.pajak]`}
                                        placeholder="Pilih atau cari"
                                        defaultValue={
                                          values.pajak
                                            ? {
                                                value: values.pajak[index].pajak.id,
                                                label: values.pajak[index].pajak.name,
                                              }
                                            : null
                                        }
                                        component={CfAsyncSelect}
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Nominal"
                                        type="number"
                                        name={`pajak[${index}].nominal`}
                                        placeholder="Masukkan biaya"
                                        component={CfInput}
                                      />
                                    </FormGroup>
                                  </Col>

                                  {values.pajak && values.pajak.length > 1 && (
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
                                    pajak: '',
                                    nominal: '',
                                  })
                                }
                              >
                                <i className="fa fa-plus" />
                              </Button>
                            </div>
                          </>
                        )}
                      />

                      <FormGroup>
                        <Field
                          label="Keterangan"
                          type="text"
                          name="information"
                          isRequired
                          placeholder="Masukkan Keterangan"
                          component={CfInput}
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

AAJIWaperd.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createFIPayment: PropTypes.func.isRequired,
  updateFIPayment: PropTypes.func.isRequired,
  deleteFIPayment: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.payment.isLoading,
  message: state.payment.message,
})

const mapDispatchToProps = (dispatch) => ({
  createFIPayment: (formData, refresh) => dispatch(createFIPayment(formData, refresh)),
  updateFIPayment: (formData, id, refresh) => dispatch(updateFIPayment(formData, id, refresh)),
  deleteFIPayment: (id, refresh) => dispatch(deleteFIPayment(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getFIPayment(p),
    Component: withToggle({
      Component: AAJIWaperd,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
