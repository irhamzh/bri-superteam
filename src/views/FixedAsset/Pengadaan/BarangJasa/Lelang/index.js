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

class Lelang extends Component {
  initialValues = {
    jenisPengadaan: 'Lelang',
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
        Header: 'Tanggal',
        width: 100,
        filterable: false,
        Cell: (props) => <span>{numbData(props)}</span>,
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'nama',
        filterable: true,
      },
      {
        Header: 'Izin Prinsip User',
        accessor: 'izinPrinsiUser',
        filterable: false,
      },
      {
        Header: 'Izin Prinsip Pengadaan',
        accessor: 'izinPrinsiPengadaan',
        filterable: false,
      },
      {
        Header: 'Undangan',
        accessor: 'undangan',
        filterable: true,
      },
      {
        Header: 'Aanwijzing',
        accessor: 'aanwijzing',
        filterable: true,
      },
      {
        Header: 'Pemasukan Sampul Proposal Teknis',
        accessor: 'sampulProposalTeknis',
        filterable: true,
      },
      {
        Header: 'Penilaian Proposal Teknis',
        accessor: 'penilaianProposalTeknis',
        filterable: true,
      },
      {
        Header: 'Pebukuan Proposal Financial',
        accessor: 'pembukuanProposalFinancial',
        filterable: true,
      },
      {
        Header: 'Klarifikasi dan negosiasi',
        accessor: 'klarifikasiNegosiasi',
        filterable: true,
      },
      {
        Header: 'Pengumuman Pemenang',
        accessor: 'pengumumanPemenang',
        filterable: true,
      },
      {
        Header: 'Izin Hasil Pengadaan',
        accessor: 'izinHasilPengadaan',
        filterable: false,
      },
      {
        Header: 'Jenis Anggaran',
        accessor: 'jenisAnggaran',
        filterable: false,
      },
      {
        Header: 'Biaya Putusan',
        accessor: 'biayaPutusan',
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
              color="success"
              onClick={() => modalForm.show({ data: props.original })}
              className="mr-1"
              title="Edit"
            >
              <i className="fa fa-pencil" />
            </Button>
          </>
        ),
      },
    ]

    const pageName = 'Lelang'
    const isIcon = { paddingRight: '7px' }

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
                          label="Jenis Pengadaan"
                          options={[{ value: 'Lelang', label: 'Lelang' }]}
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
                            label="Penilaian Proposal Teknis"
                            name="penilaianProposalTeknis"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pembukuan Proposal Financial"
                            name="pembukuanProposalFinancial"
                            component={CfInputCheckbox}
                          />
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
                            { value: 'Investasi', label: 'Investasi' },
                            { value: 'Epsloitasi', label: 'Eksploitasi' },
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

                      <FormGroup>
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
                          name="kontakProvider"
                          isRequired
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
                          type="text"
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
                            name="tanggalAwalBerlaku"
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
                            name="tanggalAkhirBerlaku"
                            classIcon="fa fa-calendar"
                            blockLabel
                            minDate={new Date()}
                            isRequired
                            placeholder="Pilih Tanggal Masa Akhir Berlaku"
                            component={CfInputDate}
                          />
                        </Col>
                      </Row>

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

Lelang.propTypes = {
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
      Component: Lelang,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
