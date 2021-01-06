/* eslint-disable react/jsx-curly-newline */
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
import { CfInput, CfInputDate, CfInputRadio } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createWorkingOrder,
  updateWorkingOrder,
  deleteWorkingOrder,
} from '../../../../modules/workingOrder/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class KegiatanPendidikan extends Component {
  initialValues = {
    typeKegiatan: 'Kegiatan Pendidikan',
    division: 'Procurement',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeKegiatan: 'Kegiatan Pendidikan',
      division: 'Procurement',
    })
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
    const { data } = tableProps

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
        Header: 'Nama Pendidikan',
        accessor: 'namaKegiatan',
        filterable: false,
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
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Ada' : 'Tidak Ada'}</div>
        ),
      },
      {
        Header: 'Kebutuhan - Hotel',
        accessor: 'hotel',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Ada' : 'Tidak Ada'}</div>
        ),
      },
      {
        Header: 'Kebutuhan - ATK',
        accessor: 'atk',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Ada' : 'Tidak Ada'}</div>
        ),
      },
      {
        Header: 'Kebutuhan - Akomodasi',
        accessor: 'akomodasi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Ada' : 'Tidak Ada'}</div>
        ),
      },
      {
        Header: 'Kebutuhan - Pengajar Eksternal',
        accessor: 'pengajarEksternal',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Ada' : 'Tidak Ada'}</div>
        ),
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
                          <ExcelColumn label="Kode Working Order" value="kodeWorkingOrder" />
                          <ExcelColumn label="Nama Kegiatan" value="namaKegiatan" />
                          <ExcelColumn label="Kode Pelatihan" value="kodePelatihan" />
                          <ExcelColumn
                            label="Tanggal Terima"
                            value={(col) => formatDate(col.tanggalTerima)}
                          />
                          <ExcelColumn
                            label="Tanggal Revisi"
                            value={(col) => formatDate(col.tanggalRevisi)}
                          />
                          <ExcelColumn
                            label="Tanggal Konfirmasi"
                            value={(col) => formatDate(col.tanggalKonfirmasi)}
                          />
                          <ExcelColumn
                            label="SLA"
                            value={(col) =>
                              Math.round(
                                (new Date(col.tanggalKonfirmasi) - new Date(col.tanggalTerima)) /
                                  (1000 * 24 * 3600)
                              )
                            }
                          />
                          <ExcelColumn
                            label="Kebutuhan - Catering"
                            value={(col) => (col.catering === 'yes' ? 'Ada' : 'Tidak Ada')}
                          />
                          <ExcelColumn
                            label="Kebutuhan - ATK"
                            value={(col) => (col.atk === 'yes' ? 'Ada' : 'Tidak Ada')}
                          />
                          <ExcelColumn
                            label="Kebutuhan - Hotel"
                            value={(col) => (col.hotel === 'yes' ? 'Ada' : 'Tidak Ada')}
                          />
                          <ExcelColumn
                            label="Kebutuhan - Akomodasi"
                            value={(col) => (col.akomodasi === 'yes' ? 'Ada' : 'Tidak Ada')}
                          />
                          <ExcelColumn
                            label="Kebutuhan - Pengajar Eksternal"
                            value={(col) => (col.pengajarEksternal === 'yes' ? 'Ada' : 'Tidak Ada')}
                          />
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
                            <Field label="Ada" name="catering" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="catering"
                              id="no"
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
                            <Field label="Ada" name="hotel" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="hotel"
                              id="no"
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
                            <Field label="Ada" name="atk" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Tidak Ada" name="atk" id="no" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6 className="pl-4">Akomodasi</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Ada" name="akomodasi" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="akomodasi"
                              id="no"
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
                              name="pengajarEksternal"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Ada"
                              name="pengajarEksternal"
                              id="no"
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
