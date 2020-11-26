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
import { CfInput, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createPRPurchasePengadaan,
  updatePRPurchasePengadaan,
  deletePRPurchasePengadaan,
} from '../../../../modules/procurement/pengadaan/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class PurchaseOrder extends Component {
  state = {
    optPRPengadaan: [],
    optProvider: [],
    dataProvider: [],
  }

  initialValues = {}

  async componentDidMount() {
    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

    const resDataPRPengadaan = await Service.getPRBarangJasaPengadaan()
    const dataPRPengadaan = resDataPRPengadaan.data.data
    const optPRPengadaan = dataPRPengadaan.map((row) => ({
      label: row.namaPengadaan,
      value: row.id,
    }))

    this.setState({
      optProvider,
      optPRPengadaan,
      dataProvider,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPRPurchasePengadaan, updatePRPurchasePengadaan } = this.props
    if (!invalidValues.includes(id)) {
      updatePRPurchasePengadaan(values, id, this.doRefresh)
    } else {
      createPRPurchasePengadaan(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePRPurchasePengadaan } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePRPurchasePengadaan(id, this.doRefresh)
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

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optProvider, dataProvider, optPRPengadaan } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        width: 100,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'pengadaan.namaPengadaan',
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Provider',
        accessor: 'provider.name',
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Alamat Provider',
        accessor: 'provider.address',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nomor Contact Provider',
        accessor: 'provider.contact',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Barang',
        accessor: 'jumlah',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Harga Satuan',
        accessor: 'hargaSatuan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Total Harga',
        accessor: 'totalHarga',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Aksi',
        width: 150,
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

    const pageName = 'Purchase Order'
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
                        Tambah Pengadaan
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
                            label="Nama Pengadaan"
                            value={(col) => col.pengadaan?.namaPengadaan}
                          />
                          <ExcelColumn label="Nama Provider" value={(col) => col.provider?.name} />
                          <ExcelColumn
                            label="Alamat Provider"
                            value={(col) => col.provider?.address}
                          />
                          <ExcelColumn
                            label="Kontak Provider"
                            value={(col) => col.provider?.contact}
                          />
                          <ExcelColumn label="Jumlah Barang" value="jumlah" />
                          <ExcelColumn label="Harga Satuan" value="hargaSatuan" />
                          <ExcelColumn label="Total Harga" value="totalHarga" />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
                <ReactTable
                  filterable
                  columns={columns}
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
                    <ModalHeader toggle={modalForm.hide}>Tambah Pengadaan</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal Purchase Order"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Pengadaan"
                          options={optPRPengadaan}
                          isRequired
                          name="pengadaan"
                          placeholder="Pilih atau Cari Nama Pengadaan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Provider"
                          options={optProvider}
                          isRequired
                          name="provider"
                          placeholder="Pilih atau Cari Nama Provider"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Alamat Provider"
                          type="text"
                          name="address"
                          isRequired
                          disabled
                          value={dataProvider.find((obj) => obj.id === values.provider)?.address}
                          placeholder="Masukkan Alamat Provider"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="No. Kontak Provider"
                          type="text"
                          name="contact"
                          isRequired
                          disabled
                          value={dataProvider.find((obj) => obj.id === values.provider)?.contact}
                          placeholder="Masukkan No. Kontak Provider"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jumlah Barang"
                          type="text"
                          name="jumlah"
                          isRequired
                          placeholder="Masukkan Jumlah Barang"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Harga Satuan"
                          type="text"
                          name="hargaSatuan"
                          isRequired
                          placeholder="Masukkan Harga Barang"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Total Harga"
                          type="text"
                          name="totalHarga"
                          isRequired
                          placeholder="Masukkan Total Harga"
                          component={CfInput}
                        />
                      </FormGroup>

                      {ErrorMessage(message)}
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

PurchaseOrder.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPRPurchasePengadaan: PropTypes.func.isRequired,
  updatePRPurchasePengadaan: PropTypes.func.isRequired,
  deletePRPurchasePengadaan: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.procurementPengadaan.isLoading,
  message: state.procurementPengadaan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPRPurchasePengadaan: (formData, refresh) =>
    dispatch(createPRPurchasePengadaan(formData, refresh)),
  updatePRPurchasePengadaan: (formData, id, refresh) =>
    dispatch(updatePRPurchasePengadaan(formData, id, refresh)),
  deletePRPurchasePengadaan: (id, refresh) => dispatch(deletePRPurchasePengadaan(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPRPurchasePengadaan(p),
    Component: withToggle({
      Component: PurchaseOrder,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
