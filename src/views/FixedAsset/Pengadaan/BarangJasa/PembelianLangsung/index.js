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
  createBarangPembelianLangsung,
  updateBarangPembelianLangsung,
  deleteBarangPembelianLangsung,
} from '../../../../../modules/pengadaan/pembelianLangsung/actions'
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
    jenisPengadaan: 'Pembelian Langsung',
    typePengadaan: 'barang',
    izinPrinsipUser: false,
    izinPrinsipPengadaan: false,
    izinHasilPengadaan: false,
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
      },
      {
        Header: 'Biaya Putusan',
        accessor: 'biayaPutusan',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => (row.value ? formatCurrencyIDR(row.value) : row.value),
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
    const { createBarangPembelianLangsung, updateBarangPembelianLangsung } = this.props
    const { provider, pihakKetiga } = values
    if (!invalidValues.includes(id)) {
      if (provider && Object.keys(provider).length > 0) {
        values.provider = provider.id || provider
      }
      if (!pihakKetiga) {
        values.provider = ''
      }
      updateBarangPembelianLangsung(values, id, this.doRefresh)
    } else {
      if (!pihakKetiga) {
        values.provider = ''
      }
      createBarangPembelianLangsung(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteBarangPembelianLangsung } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteBarangPembelianLangsung(id, this.doRefresh)
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
    const { optProvider, dataProvider, columns, isShow } = this.state
    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

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
              onClick={() =>
                modalForm.show({
                  data: { ...props.original, pihakKetiga: !!props.original.provider },
                })
              }
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

    const pageName = 'Pembelian Langsung'
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
                            label="Izin Hasil Pengadaan"
                            value={(col) => (col.izinHasilPengadaan ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Jenis Anggaran" value={(col) => col.jenisAnggaran} />
                          <ExcelColumn
                            label="Biaya Putusan"
                            value={(col) => formatCurrencyIDR(col.biayaPutusan)}
                          />
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
                    <ModalHeader toggle={modalForm.hide}>Tambah Pengadaan</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Jenis Pengadaan"
                          options={[{ value: 'Pembelian Langsung', label: 'Pembelian Langsung' }]}
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
                          <Field
                            label="Izin Hasil Pengadaan"
                            name="izinHasilPengadaan"
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

                      <FormGroup>
                        <Field
                          label="Biaya Putusan"
                          type="number"
                          name="biayaPutusan"
                          isRequired
                          placeholder="Masukkan Biaya Putusan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field
                            label="Menggunakan Pihak Ketiga"
                            name="pihakKetiga"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      {values.pihakKetiga && (
                        <>
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
                        </>
                      )}
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
  createBarangPembelianLangsung: PropTypes.func.isRequired,
  updateBarangPembelianLangsung: PropTypes.func.isRequired,
  deleteBarangPembelianLangsung: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.barangPembelianLangsung.isLoading,
  message: state.barangPembelianLangsung.message,
})

const mapDispatchToProps = (dispatch) => ({
  createBarangPembelianLangsung: (formData, refresh) =>
    dispatch(createBarangPembelianLangsung(formData, refresh)),
  updateBarangPembelianLangsung: (formData, id, refresh) =>
    dispatch(updateBarangPembelianLangsung(formData, id, refresh)),
  deleteBarangPembelianLangsung: (id, refresh) =>
    dispatch(deleteBarangPembelianLangsung(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getBarangPembelianLangsung(p),
    Component: withToggle({
      Component: PembelianLangsung,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
