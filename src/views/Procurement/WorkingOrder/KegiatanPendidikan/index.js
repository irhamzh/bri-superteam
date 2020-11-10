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
import Service from '../../../../config/services'
import { CfInput, CfInputDate, CfInputRadio, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../helpers'
import { createRole, updateRole, deleteRole } from '../../../../modules/master/role/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const roleSchema = Yup.object().shape({
  nama: Yup.string().required('nama role belum diisi'),
})

class KegiatanPendidikan extends Component {
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

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Kode Working Order',
        accessor: 'workingOrderCode',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Pendidikan',
        accessor: 'namaKegiatan',
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kode Pelatihan',
        accessor: 'kodePelatihan',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Tanggal Terima',
        accessor: 'tanggalTerima',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Tanggal Revisi',
        accessor: 'tanggalRevisi',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Tanggal Konfirmasi',
        accessor: 'tanggalKonfirmasi',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'SLA',
        accessor: 'sla',
        filterable: false,
      },
      {
        Header: 'Kebutuhan - Catering',
        accessor: 'kebutuhanCatering',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kebutuhan - Hotel',
        accessor: 'kebutuhanHotel',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kebutuhan - ATK',
        accessor: 'kebutuhanATK',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kebutuhan - Akomodasi',
        accessor: 'kebutuhanAkomodasi',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kebutuhan - Pengajar Eksternal',
        accessor: 'kebutuhanPengajarEksternal',
        filterable: false,
        headerClassName: 'wordwrap',
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

    const pageName = 'Kegiatan Pendidikan'
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
                    <ModalHeader toggle={modalForm.hide}>Data Kegiatan Pendidikan</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Nama Pendidikan"
                          type="text"
                          name="namaKegiatan"
                          isRequired
                          placeholder="Masukkan nama kegiatan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kode Pelatihan"
                          type="text"
                          name="kodePelatihan"
                          isRequired
                          placeholder="Masukkan Kode Pelatihan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tanggal Terima"
                          name="tanggalTerima"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Tanggal Terima"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tanggal Revisi (Opsional)"
                          name="tanggalRevisi"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          placeholder="Tanggal Revisi"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tanggal Konfirmasi"
                          name="tanggalKonfirmasi"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Tanggal Konfirmasi"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <strong>Kebutuhan :</strong>
                      <br />
                      <br />
                      <Row>
                        <Col sm="6">
                          <h6 className="pl-4">Catering</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Ada"
                              name="kebutuhanCatering"
                              id="Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="kebutuhanCatering"
                              id="Tidak Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6 className="pl-4">Hotel (Nama Hotel)</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Ada"
                              name="kebutuhanHotel"
                              id="Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="kebutuhanHotel"
                              id="Tidak Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6 className="pl-4">ATK</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Ada"
                              name="kebutuhanATK"
                              id="Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="kebutuhanATK"
                              id="Tidak Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6 className="pl-4">Akomodasi</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Ada"
                              name="kebutuhanAkomodasi"
                              id="Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="kebutuhanAkomodasi"
                              id="Tidak Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6 className="pl-4">Pengajar Eksternal</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Ada"
                              name="kebutuhanPengajarEksternal"
                              id="Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="kebutuhanPengajarEksternal"
                              id="Tidak Ada"
                              component={CfInputRadio}
                            />
                          </FormGroup>
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

KegiatanPendidikan.propTypes = {
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
      Component: KegiatanPendidikan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
