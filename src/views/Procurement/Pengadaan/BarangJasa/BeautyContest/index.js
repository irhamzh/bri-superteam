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
  CfAsyncSelect,
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  CfSelect,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../../components'
import { AlertMessage, formatCurrencyIDR, formatDate, invalidValues } from '../../../../../helpers'
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
class PemilihanLangsung extends Component {
  state = {
    optProvider: [],
    dataProvider: [],
    optPendidikan: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    typePengadaan: 'Beauty Contest',
    izinPrinsipPengadaan: false,
    tor: false,
    proposalPenawaran: false,
    undangan: false,
    klarifikasiNegosiasi: false,
    izinHasilPengadaan: false,
    suratPemesanan: false,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typePengadaan: 'Beauty Contest',
    })
    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

    const resDataPendidikan = await Service.getPendidikan()
    const dataPendidikan = resDataPendidikan.data.data
    const optPendidikan = dataPendidikan.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggal',
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
        filterable: true,
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
        Header: 'TOR',
        accessor: 'tor',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Proposal Penawaran',
        accessor: 'proposalPenawaran',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Undangan',
        accessor: 'undangan',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Klarifikasi dan Negosiasi',
        accessor: 'klarifikasiNegosiasi',
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
        Header: 'Surat Pemesanan',
        accessor: 'suratPemesanan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Nomor SPK',
        accessor: 'nomorSPK',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Provider',
        accessor: 'provider.name',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Alamat Provider',
        accessor: 'provider.address',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'No. Contact',
        accessor: 'provider.contact',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Pendidikan',
        accessor: 'namaPendidikan.name',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Jumlah Peserta',
        accessor: 'jumlahPeserta',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Durasi',
        accessor: 'durasi',
        show: true,
        filterable: false,
      },
      {
        Header: 'Jumlah Biaya',
        accessor: 'jumlahBiaya',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatCurrencyIDR(row.value)}</div>,
      },
      {
        Header: 'Masa Berlaku',
        accessor: 'masaBerlaku',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
      },
    ]

    this.setState({
      optProvider,
      dataProvider,
      optPendidikan,
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
      const { provider, namaPendidikan } = values
      if (provider && Object.keys(provider).length > 0) {
        values.provider = provider.id || provider
      }
      if (namaPendidikan && Object.keys(namaPendidikan).length > 0) {
        values.namaPendidikan = namaPendidikan.id || namaPendidikan
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

  handleInputProvider = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getProvider(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  handleInputPendidikan = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getPendidikan(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { dataProvider, optProvider, optPendidikan, isShow, columns } = this.state

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

    const pageName = 'Beauty Contest'
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
                        {/* <i className="fa fa-plus" style={isIcon} />
                        &nbsp; */}
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.tanggal)} />
                          <ExcelColumn label="Jenis Pengadaan" value="jenisPengadaan" />
                          <ExcelColumn label="Nama Pengadaan" value="namaPengadaan" />
                          <ExcelColumn
                            label="Izin Prinsip Pengadaan"
                            value={(col) => (col.izinPrinsipPengadaan ? '???' : '???')}
                          />
                          <ExcelColumn label="TOR" value={(col) => (col.tor ? '???' : '???')} />
                          <ExcelColumn
                            label="Proposal Penawaran"
                            value={(col) => (col.proposalPenawaran ? '???' : '???')}
                          />
                          <ExcelColumn
                            label="Undangan"
                            value={(col) => (col.undangan ? '???' : '???')}
                          />
                          <ExcelColumn
                            label="Klasifikasi dan Negosiasi"
                            value={(col) => (col.klasifikasiNegosiasi ? '???' : '???')}
                          />
                          <ExcelColumn
                            label="Izin Hasil Pengadaan"
                            value={(col) => (col.izinHasilPengadaan ? '???' : '???')}
                          />
                          <ExcelColumn
                            label="Surat Pemesanan"
                            value={(col) => (col.suratPemesanan ? '???' : '???')}
                          />
                          <ExcelColumn label="Nomor SPK" value={(col) => col.nomorSPK} />
                          <ExcelColumn label="Nama Provider" value={(col) => col.provider?.name} />
                          <ExcelColumn
                            label="Alamat Provider"
                            value={(col) => col.provider?.address}
                          />
                          <ExcelColumn
                            label="Kontak Provider"
                            value={(col) => col.provider?.contact}
                          />
                          <ExcelColumn
                            label="Nama Pendidikan"
                            value={(col) => col.namaPendidikan?.name}
                          />
                          <ExcelColumn label="Jumlah Peserta" value="jumlahPeserta" />
                          <ExcelColumn label="Durasi" value="durasi" />
                          <ExcelColumn
                            label="Jumlah Biaya"
                            value={(col) => formatCurrencyIDR(col.jumlahBiaya)}
                          />
                          <ExcelColumn label="Masa Berlaku" value="masaBerlaku" />
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
                  filterable={false}
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
                    <ModalHeader toggle={modalForm.hide}>Tambah Pengadaan</ModalHeader>
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

                        <FormGroup>
                          <Field label="TOR" name="tor" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Proposal Penawaran"
                            name="proposalPenawaran"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Undangan" name="undangan" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Klarifikasi dan Negosiasi"
                            name="klarifikasiNegosiasi"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Izin Hasil Pengadaan"
                            name="izinHasilPengadaan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Surat Pemesanan"
                            name="suratPemesanan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

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

                      <h6>Pembuatan SPK/PKS/Surat Pemesanan</h6>

                      <div style={{ marginLeft: '1rem' }}>
                        <FormGroup>
                          <Field
                            label="Nomor SPK"
                            type="text"
                            name="nomorSPK"
                            isRequired
                            placeholder="Masukkan Nomor SPK"
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
                            placeholder="Pilih atau cari Provider"
                            defaultValue={
                              values.provider
                                ? { value: values.provider.id, label: values.provider.name }
                                : null
                            }
                            component={CfAsyncSelect}
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
                            label="Nama Pendidikan"
                            cacheOptions
                            options={optPendidikan}
                            defaultOptions
                            loadOptions={this.handleInputPendidikan}
                            name="namaPendidikan"
                            isRequired
                            placeholder="Pilih atau cari Nama Pendidikan"
                            defaultValue={
                              values.namaPendidikan
                                ? {
                                    value: values.namaPendidikan.id,
                                    label: values.namaPendidikan.name,
                                  }
                                : null
                            }
                            component={CfAsyncSelect}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Jumlah Peserta"
                            type="number"
                            name="jumlahPeserta"
                            isRequired
                            placeholder="Masukkan Jumlah Peserta"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Durasi"
                            type="text"
                            name="durasi"
                            isRequired
                            placeholder="Masukkan Durasi"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Jumlah Biaya"
                            type="number"
                            name="jumlahBiaya"
                            isRequired
                            placeholder="Masukkan Jumlah Biaya"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Masa Berlaku"
                            type="text"
                            name="masaBerlaku"
                            isRequired
                            placeholder="Masukkan Masa Berlaku"
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

PemilihanLangsung.propTypes = {
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
      Component: PemilihanLangsung,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
