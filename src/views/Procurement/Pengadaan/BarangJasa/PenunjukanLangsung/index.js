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
import * as Yup from 'yup'
import Service from '../../../../../config/services'
import { CfInput, CfInputCheckbox, CfInputDate, CfSelect } from '../../../../../components'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../../helpers'
import { createRole, updateRole, deleteRole } from '../../../../../modules/master/role/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

const roleSchema = Yup.object().shape({
  nama: Yup.string().required('nama role belum diisi'),
})

const dataDummy = [
  {
    jenisPengadaan: 'Penunjukkan Langsung',
    tanggalAwal: '06/062020',
    tanggalAkhir: '08/06/2020',
    namaPengadaan: 'Pengadaan 1',
    izinPrinsipUser: true,
    izinPrinsipPengadaan: false,
    izinHasilPengadaan: true,
    undangan: true,
    tor: true,
    proposalPenawaran: true,
    suratPemesanan: true,
    klasifikasiNotifikasi: false,
    jenisAnggaran: 'Investasi',
    biayaPutusan: 100000,
    nomorSPK: 123456,
    namaProvider: 'PT. XXX',
    alamatProvider: 'Alamat 1',
    contactProvider: '08XXXXX',
    jenisPekerjaan: 'Pegawai',
    jumlahBiaya: 12345,
    namaPendidikan: 'Strata',
    jumlahPeserta: 2000,
    durasi: 24,
    jenisBarang: 'Perkakas',
    masaBerlaku: '12/12/2020',
  },
  {
    jenisPengadaan: 'Penunjukkan Langsung',
    tanggalAwal: '06/062020',
    tanggalAkhir: '08/06/2020',
    namaPengadaan: 'Pengadaan 2',
    izinPrinsipUser: true,
    undangan: false,
    izinPrinsiPengadaan: true,
    izinHasilPengadaan: true,
    tor: true,
    proposalPenawaran: true,
    suratPemesanan: true,
    klasifikasiNotifikasi: true,
    jenisAnggaran: 'Eksploitasi',
    biayaPutusan: 10000000,
    nomorSPK: 98776554,
    namaProvider: 'PT. YYY',
    alamatProvider: 'Alamat 2',
    contactProvider: '08XXXXX',
    jenisPekerjaan: 'Kontraktor',
    jumlahBiaya: 12345,
    namaPendidikan: 'Diploma',
    jumlahPeserta: 2034,
    durasi: 14,
    jenisBarang: 'Elektronik',
    masaBerlaku: '12/12/2020',
  },
]

class PenunjukanLangsung extends Component {
  initialValues = {
    nama: '',
    id: '',
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createRole, updateRole } = this.props
    if (!invalidValues.includes(id)) {
      updateRole(values, id, this.doRefresh)
    } else {
      createRole(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteRole } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteRole(id, this.doRefresh)
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

    const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal Awal',
        width: 100,
        accessor: 'tanggalAwal',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Tanggal Akhir',
        width: 100,
        accessor: 'tanggalAkhir',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Jenis Pengadaan',
        accessor: 'jenisPengadaan',
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'namaPengadaan',
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Izin Prinsip Pengadaan',
        accessor: 'izinPrinsipPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'TOR',
        accessor: 'tor',
        filterable: false,
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Proposal Penawaran',
        accessor: 'proposalPenawaran',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Undangan',
        accessor: 'undangan',
        filterable: false,
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Klarifikasi dan Negosiasi',
        accessor: 'klarifikasiDanNegosiasi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Izin Hasil Pengadaan',
        accessor: 'izinHasilPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Surat Pemesanan',
        accessor: 'suratPemesanan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },

      {
        Header: 'Nomor SPK',
        accessor: 'nomorSPK',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Provider',
        accessor: 'namaProvider',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Alamat Provider',
        accessor: 'alamatProvider',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'No. Contact Provider',
        accessor: 'contactProvider',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Pendidikan',
        accessor: 'namaPendidikan',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Jumlah Peserta',
        accessor: 'jumlahPeserta',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Durasi',
        accessor: 'durasi',
        filterable: false,
      },
      {
        Header: 'Jumlah Biaya',
        accessor: 'jumlahBiaya',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Masa Berlaku',
        accessor: 'masaBerlaku',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
        filterable: false,
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

    const pageName = 'Penunjukan Langsung'
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="6">
                    <Button color="default" className="mr-1">
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
                      >
                        Show
                      </Button>
                      <Button
                        className="mr-1 mb-2 px-4"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                      >
                        Export
                      </Button>
                    </div>
                  </Col>
                </Row>
                <ReactTable
                  filterable
                  data={dataDummy}
                  columns={columns}
                  defaultPageSize={10}
                  className="-highlight"
                  // {...tableProps}
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
                validationSchema={roleSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
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
                            { value: 'Barang', label: 'Barang' },
                            { value: 'Jasa', label: 'Jasa' },
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
                            label="Klarifikasi dan negosiasi"
                            name="klarifikasi"
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
                          name="keterangan"
                          isRequired
                          placeholder="Masukkan Nama Pengadaan"
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

                        {/* <FormGroup>
                          <Field
                            label="Nama Provider"
                            options={[
                              { value: 'PT. XXXX', label: 'PT. XXXX' },
                              { value: 'PT. YYYY', label: 'PT. YYYY' },
                            ]}
                            isRequired
                            name="namaProvider"
                            placeholder="Pilih atau Cari Nama Provider"
                            component={CfSelect}
                          />
                        </FormGroup> */}

                        <FormGroup>
                          <Field
                            label="Nama Provider"
                            type="text"
                            name="namaProvider"
                            isRequired
                            placeholder="Masukkan Nama Provider"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Alamat Provider"
                            type="text"
                            name="alamatProvider"
                            isRequired
                            placeholder="Masukkan Alamat Provider"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="No. Kontak Provider"
                            type="text"
                            name="contactProvider"
                            isRequired
                            placeholder="Masukkan No. Kontak Provider"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Nama Pendidikan"
                            options={[
                              { value: 'Pendidikan 1', label: 'Pendidikan 1' },
                              { value: 'Pendidikan 2', label: 'Pendidikan 2' },
                            ]}
                            isRequired
                            name="namaPendidikan"
                            placeholder="Pilih atau Cari Nama Pendidikan"
                            component={CfSelect}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Jumlah Peserta"
                            type="text"
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
                            type="text"
                            name="jumlahBiaya"
                            isRequired
                            placeholder="Masukkan Jumlah Biaya"
                            component={CfInput}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Masa Berlaku"
                            options={[
                              { value: '1 hari', label: '1 hari' },
                              { value: '2 hari', label: '2 hari' },
                            ]}
                            isRequired
                            name="masaBerlaku"
                            placeholder="Pilih atau Cari Masa Berlaku"
                            component={CfSelect}
                          />
                        </FormGroup>
                      </div>

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

PenunjukanLangsung.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createRole: (formData, refresh) => dispatch(createRole(formData, refresh)),
  updateRole: (formData, id, refresh) => dispatch(updateRole(formData, id, refresh)),
  deleteRole: (id, refresh) => dispatch(deleteRole(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getRoles(p),
    Component: withToggle({
      Component: PenunjukanLangsung,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
