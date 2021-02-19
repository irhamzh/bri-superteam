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
  createBarangPemilihanLangsung,
  updateBarangPemilihanLangsung,
  deleteBarangPemilihanLangsung,
} from '../../../../../modules/pengadaan/pemilihanLangsung/actions'
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
    isShow: false,
    columns: [],
  }

  initialValues = {
    jenisPengadaan: 'Pemilihan Langsung',
    izinPrinsipPengadaan: false,
    izinHasilPengadaan: false,
    undangan: false,
    aanwijzing: false,
    klasifikasiNotifikasi: false,
  }

  async componentDidMount() {
    // const { fetchQueryProps } = this.props
    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggalPengadaan',
        filterable: false,
        show: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'namaPengadaan',
        filterable: true,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Izin Prinsip User',
        accessor: 'izinPrinsipUser',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Izin Prinsip Pengadaan',
        accessor: 'izinPrinsipPengadaan',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Undangan',
        accessor: 'undangan',
        filterable: false,
        show: true,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Aanwijzing',
        accessor: 'aanwijzing',
        filterable: false,
        show: true,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pemasukan Sampul Proposal Teknis',
        accessor: 'pemasukanSampulProposalTeknis',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Klarifikasi dan negosiasi',
        accessor: 'klarifikasiNegosiasi',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pengumuman Pemenang',
        accessor: 'pengumumanPemenang',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Izin Hasil Pengadaan',
        accessor: 'izinHasilPengadaan',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Jenis Anggaran',
        accessor: 'jenisAnggaran',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Pembuatan SPK / PKS',
        show: true,
        columns: [
          {
            Header: 'Tanggal',
            accessor: 'tanggalSPK',
            show: true,
            Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
          },
          {
            Header: 'Nomor SPK',
            accessor: 'nomorSPK',
            filterable: true,
            show: true,
            headerClassName: 'wordwrap',
          },
          {
            Header: 'Nama Provider',
            accessor: 'provider.name',
            filterable: true,
            show: true,
            headerClassName: 'wordwrap',
          },
          {
            Header: 'Alamat Provider',
            accessor: 'provider.address',
            show: true,
            headerClassName: 'wordwrap',
          },
          {
            Header: 'No. Contact Provider',
            accessor: 'provider.contact',
            show: true,
            headerClassName: 'wordwrap',
          },
          {
            Header: 'Jenis Pekerjaan',
            accessor: 'jenisPekerjaan',
            show: true,
            headerClassName: 'wordwrap',
          },
          {
            Header: 'Jumlah Biaya',
            accessor: 'jumlahBiaya',
            show: true,
            headerClassName: 'wordwrap',
            Cell: (row) => (row.value ? formatCurrencyIDR(row.value) : row.value),
          },
          {
            Header: 'Jenis Barang',
            accessor: 'jenisBarang',
            show: true,
            headerClassName: 'wordwrap',
          },
          {
            Header: 'Masa Berlaku',
            accessor: 'masaBerlaku',
            show: true,
            headerClassName: 'wordwrap',
            Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
          },
          {
            Header: 'Sampai',
            accessor: 'sampai',
            show: true,
            headerClassName: 'wordwrap',
            Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
          },
        ],
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
    const { createBarangPemilihanLangsung, updateBarangPemilihanLangsung } = this.props
    if (!invalidValues.includes(id)) {
      const { provider } = values
      if (provider && Object.keys(provider).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.provider = provider.id || provider
      }
      updateBarangPemilihanLangsung(values, id, this.doRefresh)
    } else {
      createBarangPemilihanLangsung(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteBarangPemilihanLangsung } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteBarangPemilihanLangsung(id, this.doRefresh)
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
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = true
        })
      }
    } else {
      selected[keyIndex].show = false
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = false
        })
      }
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

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optProvider, dataProvider, isShow, columns } = this.state

    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        width: 150,
        filterable: false,
        show: true,
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

    const pageName = 'Pemilihan Langsung'
    const isIcon = { paddingRight: '7px' }

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
                        <i className="fa fa-plus" style={isIcon} />
                        &nbsp;Tambah Pengadaan
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
                            label="Tanggal"
                            value={(col) => formatDate(col.tanggalPengadaan)}
                          />
                          <ExcelColumn label="Nama Pengadaan" value={(col) => col.namaPengadaan} />
                          <ExcelColumn
                            label="Izin Prinsip User"
                            value={(col) => (col.izinPrinsipUser ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Izin Prinsip Pengadaan"
                            value={(col) => (col.izinPrinsipPengadaan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Undangan"
                            value={(col) => (col.undangan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Aanwijzing"
                            value={(col) => (col.aanwijzing ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pemasukan Sampul Proposal Teknis"
                            value={(col) => (col.pemasukanSampulProposalTeknis ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Klarifikasi dan Negosiasi"
                            value={(col) => (col.klarifikasiNegosiasi ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pengumuman Pemenang"
                            value={(col) => (col.pengumumanPemenang ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Izin Hasil Pengadaan"
                            value={(col) => (col.izinHasilPengadaan ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Jenis Anggaran" value={(col) => col.jenisAnggaran} />
                          <ExcelColumn
                            label="Tanggal SPK"
                            value={(col) => formatDate(col.tanggalSPK)}
                          />
                          <ExcelColumn label="Nomor SPK" value={(col) => col.nomorSPK} />
                          <ExcelColumn label="Nama Provider" value={(col) => col.provider.name} />
                          <ExcelColumn
                            label="Alamat Provider"
                            value={(col) => col.provider.address}
                          />
                          <ExcelColumn
                            label="Kontak Provider"
                            value={(col) => col.provider.contact}
                          />
                          <ExcelColumn
                            label="Jenis Pekerjaan"
                            value={(col) => col.jenisPekerjaan}
                          />
                          <ExcelColumn
                            label="Jumlah Biaya"
                            value={(col) => formatCurrencyIDR(col.jumlahBiaya)}
                          />
                          <ExcelColumn
                            label="Masa Berlaku"
                            value={(col) => formatDate(col.masaBerlaku)}
                          />
                          <ExcelColumn label="Sampai" value={(col) => formatDate(col.sampai)} />
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
                          label="Jenis Pengadaan"
                          options={[{ value: 'Pemilihan Langsung', label: 'Pemilihan Langsung' }]}
                          isRequired
                          isDisabled
                          name="jenisPengadaan"
                          placeholder="Pilih atau Cari Jenis Pengadaan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tanggal Pengadaan"
                          name="tanggalPengadaan"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal Pengadaan"
                          component={CfInputDate}
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
                            label="Izin Prinsip User"
                            name="izinPrinsipUser"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Izin Prinsip Pengadaan"
                            name="izinPrinsipPengadaan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Undangan" name="undangan" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Aanwijzing" name="aanwijzing" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pemasukan Sampul Proposal Teknis"
                            name="pemasukanSampulProposalTeknis"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Klarifikasi dan negosiasi"
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
                            label="Pengumuman Pemenang"
                            name="pengumumanPemenang"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <FormGroup>
                        <Field
                          label="Jenis Anggaran"
                          options={[
                            { value: 'investasi', label: 'Investasi' },
                            { value: 'eksploitasi', label: 'Eksploitasi' },
                          ]}
                          isRequired
                          name="jenisAnggaran"
                          placeholder="Pilih atau Cari Jenis Anggaran"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <h6>Pembuatan SPK/PKS</h6>

                      <FormGroup>
                        <Field
                          label="Tanggal SPK"
                          name="tanggalSPK"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal SPK"
                          component={CfInputDate}
                        />
                      </FormGroup>

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

                      {/* <FormGroup>
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
                      </FormGroup> */}

                      <FormGroup>
                        <Field
                          label="Nama Provider"
                          cacheOptions
                          options={optProvider}
                          defaultOptions
                          loadOptions={this.handleInputProvider}
                          name="provider"
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
                              (obj) => obj.id === values.provider || obj.id === values.provider?.id
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
                              (obj) => obj.id === values.provider || obj.id === values.provider?.id
                            )?.contact
                          }
                          placeholder="Masukkan No. Kontak Provider"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jenis Pekerjaan"
                          type="text"
                          name="jenisPekerjaan"
                          isRequired
                          placeholder="Masukkan Jenis Pekerjaan"
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
                          label="Jenis Barang"
                          type="text"
                          name="jenisBarang"
                          isRequired
                          placeholder="Masukkan Jenis Barang"
                          component={CfInput}
                        />
                      </FormGroup>

                      <Row>
                        <Col sm="6">
                          <Field
                            label="Masa Berlaku"
                            name="masaBerlaku"
                            classIcon="fa fa-calendar"
                            blockLabel
                            minDate={new Date()}
                            isRequired
                            placeholder="Pilih Tanggal Masa Awal Berlaku"
                            component={CfInputDate}
                          />
                        </Col>

                        <Col sm="6">
                          <Field
                            label="Sampai"
                            name="sampai"
                            classIcon="fa fa-calendar"
                            blockLabel
                            minDate={new Date()}
                            isRequired
                            placeholder="Pilih Tanggal Masa Akhir Berlaku"
                            component={CfInputDate}
                          />
                        </Col>
                      </Row>
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
  createBarangPemilihanLangsung: PropTypes.func.isRequired,
  updateBarangPemilihanLangsung: PropTypes.func.isRequired,
  deleteBarangPemilihanLangsung: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.barangPemilihanLangsung.isLoading,
  message: state.barangPemilihanLangsung.message,
})

const mapDispatchToProps = (dispatch) => ({
  createBarangPemilihanLangsung: (formData, refresh) =>
    dispatch(createBarangPemilihanLangsung(formData, refresh)),
  updateBarangPemilihanLangsung: (formData, id, refresh) =>
    dispatch(updateBarangPemilihanLangsung(formData, id, refresh)),
  deleteBarangPemilihanLangsung: (id, refresh) =>
    dispatch(deleteBarangPemilihanLangsung(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getBarangPemilihanLangsung(p),
    Component: withToggle({
      Component: PemilihanLangsung,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
