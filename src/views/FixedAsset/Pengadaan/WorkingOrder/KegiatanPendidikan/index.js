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
import Service from '../../../../../config/services'
import { CfInput, CfInputDate } from '../../../../../components'
import { AlertMessage, ErrorMessage, invalidValues, formatDate } from '../../../../../helpers'
import {
  createWorkingOrder,
  updateWorkingOrder,
  deleteWorkingOrder,
} from '../../../../../modules/workingOrder/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

class KegiatanPendidikan extends Component {
  initialValues = {
    typeKegiatan: 'Kegiatan Pendidikan',
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createWorkingOrder, updateWorkingOrder } = this.props
    if (!invalidValues.includes(id)) {
      updateWorkingOrder(values, id, this.doRefresh)
    } else {
      createWorkingOrder(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteWorkingOrder } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteWorkingOrder(id, this.doRefresh)
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
        accessor: 'kodeWorkingOrder',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Kegiatan',
        accessor: 'namaKegiatan',
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kode Pelatihan',
        accessor: 'kodePelatihan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Tanggal Terima',
        accessor: 'tanggalTerima',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Tanggal Revisi',
        accessor: 'tanggalRevisi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Tanggal Konfirmasi',
        accessor: 'tanggalKonfirmasi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'SLA',
        accessor: 'sla',
        filterable: false,
        Cell: (props) => (
          <div style={{ textAlign: 'center' }}>
            {Math.round(
              (new Date(props.original.tanggalKonfirmasi) -
                new Date(props.original.tanggalTerima)) /
                (1000 * 24 * 3600)
            )}
          </div>
        ),
      },
      {
        Header: 'Kebutuhan - Catering',
        accessor: 'catering',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kebutuhan - ATK',
        accessor: 'atk',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kebutuhan - Hotel',
        accessor: 'hotel',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kebutuhan - Akomodasi',
        accessor: 'akomodasi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kebutuhan - Pengajar Eksternal',
        accessor: 'pengajarEksternal',
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
                // validationSchema={}
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
                          label="Kode Working Order"
                          type="text"
                          name="kodeWorkingOrder"
                          isRequired
                          placeholder="Masukkan Kode Working Order"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Kegiatan"
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
                          type="number"
                          name="kodePelatihan"
                          isRequired
                          placeholder="Masukkan kode Pelatihan"
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
                          label="Tanggal Revisi"
                          name="tanggalRevisi"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
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

                      <FormGroup>
                        <Field
                          label="Kebutuhan - Catering"
                          type="text"
                          name="catering"
                          isRequired
                          placeholder="Masukkan Kebutuhan Catering"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kebutuhan - ATK"
                          type="text"
                          name="atk"
                          isRequired
                          placeholder="Masukkan Kebutuhan ATK"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kebutuhan - Hotel"
                          type="text"
                          name="hotel"
                          isRequired
                          placeholder="Masukkan Kebutuhan Hotel"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kebutuhan - Akomodasi"
                          type="text"
                          name="akomodasi"
                          isRequired
                          placeholder="Masukkan Kebutuhan Akomodasi"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kebutuhan - Pengajar Eksternal"
                          type="text"
                          name="pengajarEksternal"
                          isRequired
                          placeholder="Masukkan Kebutuhan Pengajar Eksternal"
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

KegiatanPendidikan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createWorkingOrder: PropTypes.func.isRequired,
  updateWorkingOrder: PropTypes.func.isRequired,
  deleteWorkingOrder: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.workingOrder.isLoading,
  message: state.workingOrder.message,
})

const mapDispatchToProps = (dispatch) => ({
  createWorkingOrder: (formData, refresh) => dispatch(createWorkingOrder(formData, refresh)),
  updateWorkingOrder: (formData, id, refresh) =>
    dispatch(updateWorkingOrder(formData, id, refresh)),
  deleteWorkingOrder: (id, refresh) => dispatch(deleteWorkingOrder(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getWorkingOrder(p),
    Component: withToggle({
      Component: KegiatanPendidikan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
