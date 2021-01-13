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
import { CfInput, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, formatCurrencyIDR, formatDate, invalidValues } from '../../../../helpers'
import {
  createPRKlasifikasiAtk,
  updatePRKlasifikasiAtk,
  deletePRKlasifikasiAtk,
} from '../../../../modules/procurement/atk/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Klasifikasi extends Component {
  state = {
    optProvider: [],
    optWorkingOrder: [],
  }

  initialValues = {
    barang: [{ name: '', price: '' }],
  }

  async componentDidMount() {
    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

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

    this.setState({
      optProvider,
      optWorkingOrder,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPRKlasifikasiAtk, updatePRKlasifikasiAtk } = this.props
    if (!invalidValues.includes(id)) {
      const { workingOrder, provider } = values
      if (workingOrder && Object.keys(workingOrder).length > 0) {
        values.workingOrder = workingOrder.id || workingOrder
      }
      if (provider && Object.keys(provider).length > 0) {
        values.provider = provider.id || provider
      }
      updatePRKlasifikasiAtk(values, id, this.doRefresh)
    } else {
      createPRKlasifikasiAtk(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePRKlasifikasiAtk } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deletePRKlasifikasiAtk(id, this.doRefresh)
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
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optProvider, optWorkingOrder } = this.state

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
        Header: 'No. WO',
        accessor: 'workingOrder.kodeWorkingOrder',
        filterable: false,
      },
      {
        Header: 'Nomor Surat',
        accessor: 'noSuratPesanan',
        filterable: false,
      },
      {
        Header: 'Kebutuhan',
        accessor: 'kebutuhan',
        filterable: false,
      },
      {
        Header: 'Nama Vendor',
        accessor: 'provider.name',
        filterable: false,
      },
      {
        Header: 'Nama Barang',
        accessor: 'namaBarang',
        filterable: false,
        Cell: (props) => {
          const { barang } = props.original
          const listBarang = barang.map((row) => <div>{`${row.name}`}</div>)
          return listBarang
        },
      },
      {
        Header: 'Biaya',
        accessor: 'biaya',
        filterable: false,
        Cell: (props) => {
          const { barang } = props.original
          const listBiaya = barang.map((row) => <div>{`${formatCurrencyIDR(row.price)}`}</div>)
          return listBiaya
        },
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
                          <ExcelColumn label="Nama Vendor" value={(col) => col.provider?.name} />
                          <ExcelColumn label="Barang" value={(col) => JSON.stringify(col.barang)} />
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
              size="lg"
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
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Working Order"
                          options={optWorkingOrder}
                          isRequired
                          name="workingOrder"
                          placeholder="Pilih atau Cari Working Order"
                          defaultValue={
                            values.workingOrder
                              ? {
                                  value: values.workingOrder.id,
                                  label: values.workingOrder.kodeWorkingOrder,
                                }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nomor Surat"
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

                      <strong>Detail Barang:</strong>
                      <br />
                      <br />
                      <Row>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Nama Vendor"
                              options={optProvider}
                              isRequired
                              name="provider"
                              placeholder="Pilih atau Cari Vendor"
                              defaultValue={
                                values.provider
                                  ? {
                                      value: values.provider.id,
                                      label: values.provider.name,
                                    }
                                  : null
                              }
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FieldArray
                        name="barang"
                        render={(arrayHelpers) => (
                          <>
                            {values.barang && values.barang.length > 0 ? (
                              values.barang.map((barang, index) => (
                                <Row form key={`key ${barang.name}`}>
                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Nama Barang"
                                        options={[
                                          { label: 'Bolpoin', value: 'Bolpoin' },
                                          { label: 'Buku tulis', value: 'Buku tulis' },
                                          { label: 'Blocknote', value: 'Blocknote' },
                                          { label: 'Baterai', value: 'Baterai' },
                                          { label: 'Pouch', value: 'Pouch' },
                                          { label: 'Spidol', value: 'Spidol' },
                                          { label: 'Lain lain', value: 'Lain lain' },
                                        ]}
                                        isRequired
                                        name={`barang[${index}].name`}
                                        placeholder="Pilih atau Cari"
                                        component={CfSelect}
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <Field
                                        label="Biaya"
                                        type="number"
                                        name={`barang[${index}].price`}
                                        isRequired
                                        placeholder="Masukkan biaya"
                                        component={CfInput}
                                      />
                                    </FormGroup>
                                  </Col>

                                  {values.barang && values.barang.length > 1 && (
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
  createPRKlasifikasiAtk: PropTypes.func.isRequired,
  updatePRKlasifikasiAtk: PropTypes.func.isRequired,
  deletePRKlasifikasiAtk: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.procurementAtk.isLoading,
  message: state.procurementAtk.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPRKlasifikasiAtk: (formData, refresh) =>
    dispatch(createPRKlasifikasiAtk(formData, refresh)),
  updatePRKlasifikasiAtk: (formData, id, refresh) =>
    dispatch(updatePRKlasifikasiAtk(formData, id, refresh)),
  deletePRKlasifikasiAtk: (id, refresh) => dispatch(deletePRKlasifikasiAtk(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPRKlasifikasiAtk(p),
    Component: withToggle({
      Component: Klasifikasi,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
