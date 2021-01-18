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
import Service from '../../../../../config/services'
import {
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  CfSelect,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createPRBarangJasaPengadaan,
  updatePRBarangJasaPengadaan,
  deletePRBarangJasaPengadaan,
} from '../../../../../modules/procurement/pengadaan/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class PembelianLangsung extends Component {
  state = {
    optProvider: [],
    dataProvider: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    typePengadaan: 'Pembelian Langsung',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typePengadaan: 'Pembelian Langsung',
    })
    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

    const { tableProps } = fetchQueryProps
    const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal Awal',
        accessor: 'tanggalAwal',
        width: 100,
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Tanggal Akhir',
        accessor: 'tanggalAkhir',
        width: 100,
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Jenis Pengadaan',
        accessor: 'jenisPengadaan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'namaPengadaan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Izin Prinsip Pengadaan',
        accessor: 'izinPrinsipPengadaan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Izin Hasil Pengadaan',
        accessor: 'izinHasilPengadaan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Anggaran Biaya',
        accessor: 'anggaranBiaya',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Surat Pemesanan',
        accessor: 'suratPemesanan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Nama Provider',
        accessor: 'provider.name',
        show: true,
        filterable: false,
      },
      {
        Header: 'Alamat Provider',
        accessor: 'provider.address',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nomor Contact Provider',
        accessor: 'provider.contact',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
      },
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

    this.setState({
      optProvider,
      dataProvider,
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
    const { createPRBarangJasaPengadaan, updatePRBarangJasaPengadaan } = this.props
    if (!invalidValues.includes(id)) {
      const { provider } = values
      if (provider && Object.keys(provider).length > 0) {
        values.provider = provider.id || provider
      }
      updatePRBarangJasaPengadaan(values, id, this.doRefresh)
    } else {
      createPRBarangJasaPengadaan(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePRBarangJasaPengadaan } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deletePRBarangJasaPengadaan(id, this.doRefresh)
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

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optProvider, dataProvider, isShow, columns } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Pembelian Langsung'
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
                          <ExcelColumn
                            label="Tanggal Awal"
                            value={(col) => formatDate(col.tanggalAwal)}
                          />
                          <ExcelColumn
                            label="Tanggal Akhir"
                            value={(col) => formatDate(col.tanggalAkhir)}
                          />
                          <ExcelColumn label="Jenis Pengadaan" value="jenisPengadaan" />
                          <ExcelColumn label="Nama Pengadaan" value="namaPengadaan" />
                          <ExcelColumn
                            label="Izin Prinsip Pengadaan"
                            value={(col) => (col.izinPrinsipPengadaan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Izin Hasil Pengadaan"
                            value={(col) => (col.izinHasilPengadaan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Anggaran Biaya"
                            value={(col) => (col.anggaranBiaya ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Surat Pemesanan"
                            value={(col) => (col.suratPemesanan ? '✓' : '❌')}
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
                          <ExcelColumn label="Keterangan" value="information" />
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
                          label="Tanggal Awal"
                          name="tanggalAwal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal Awal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tanggal Akhir"
                          name="tanggalAkhir"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal Akhir"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jenis Pengadaan"
                          options={[
                            { value: 'barang', label: 'Barang' },
                            { value: 'jasa', label: 'Jasa' },
                          ]}
                          isRequired
                          name="jenisPengadaan"
                          placeholder="Pilih atau Cari Jenis Pengadaan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Pengadaan"
                          type="text"
                          name="namaPengadaan"
                          isRequired
                          placeholder="Masukkan Nama Pengadaan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field
                            label="Izin Prinsip Pengadaan"
                            name="izinPrinsipPengadaan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <Row>
                          <Col>
                            <FormGroup>
                              <Field
                                label="Izin Hasil Pengadaan"
                                name="izinHasilPengadaan"
                                component={CfInputCheckbox}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <FormGroup>
                              <Field
                                label="Anggaran Biaya"
                                name="anggaranBiaya"
                                component={CfInputCheckbox}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup>
                          <Field
                            label="Surat Pemesanan"
                            name="suratPemesanan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <h6>Pembuatan SPK/PKS</h6>
                      <div style={{ marginLeft: '2rem' }}>
                        <FormGroup>
                          <Field
                            label="Nama Provider"
                            options={optProvider}
                            isRequired
                            name="provider"
                            placeholder="Pilih atau Cari Nama Provider"
                            defaultValue={
                              values.provider
                                ? { value: values.provider.id, label: values.provider.name }
                                : null
                            }
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
                            value={
                              dataProvider.find(
                                (obj) =>
                                  obj.id === values.provider || obj.id === values.provider?.id
                              )?.address
                            }
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
                            value={
                              dataProvider.find(
                                (obj) =>
                                  obj.id === values.provider || obj.id === values.provider?.id
                              )?.contact
                            }
                            placeholder="Masukkan No. Kontak Provider"
                            component={CfInput}
                          />
                        </FormGroup>

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
                      </div>
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

PembelianLangsung.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPRBarangJasaPengadaan: PropTypes.func.isRequired,
  updatePRBarangJasaPengadaan: PropTypes.func.isRequired,
  deletePRBarangJasaPengadaan: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.procurementPengadaan.isLoading,
  message: state.procurementPengadaan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPRBarangJasaPengadaan: (formData, refresh) =>
    dispatch(createPRBarangJasaPengadaan(formData, refresh)),
  updatePRBarangJasaPengadaan: (formData, id, refresh) =>
    dispatch(updatePRBarangJasaPengadaan(formData, id, refresh)),
  deletePRBarangJasaPengadaan: (id, refresh) => dispatch(deletePRBarangJasaPengadaan(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPRBarangJasaPengadaan(p),
    Component: withToggle({
      Component: PembelianLangsung,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
