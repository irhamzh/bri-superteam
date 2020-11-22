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
import Service from '../../../../config/services'
import { CfInputCheckbox, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import { createVendor, updateVendor, deleteVendor } from '../../../../modules/vendor/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class PestControl extends Component {
  state = {
    optRekanan: [],
  }

  initialValues = {
    typeMonitoring: 'Pest Control',
    toilet: false,
    musholla: false,
    lobbyLounge: false,
    rMeeting: false,
    rKelas: false,
    rKerja: false,
    koridor: false,
    tanggaDarurat: false,
    rSampah: false,
    rShaft: false,
    parkirMotor: false,
    halaman: false,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeMonitoring: 'Pest Control',
    })
    const resDataRekanan = await Service.getPartner()
    const dataRekanan = resDataRekanan.data.data
    const optRekanan = dataRekanan.map((row) => ({ label: row.name, value: row.id }))

    this.setState({ optRekanan })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createVendor, updateVendor } = this.props
    if (!invalidValues.includes(id)) {
      updateVendor(values, id, this.doRefresh)
    } else {
      createVendor(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteVendor } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteVendor(id, this.doRefresh)
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
    const { optRekanan } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggal',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Toilet',
        accessor: 'toilet',
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
        Header: 'Musholla',
        accessor: 'musholla',
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
        Header: 'Lobby Lounge',
        accessor: 'lobbyLounge',
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
        Header: 'R. Meeting',
        accessor: 'ruangMeeting',
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
        Header: 'R. Kelas',
        accessor: 'ruangKelas',
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
        Header: 'R. Kerja',
        accessor: 'ruangKerja',
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
        Header: 'Koridor',
        accessor: 'corridor',
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
        Header: 'Tangga Darurat',
        accessor: 'tanggaDarurat',
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
        Header: 'R. Sampah',
        accessor: 'ruangSampah',
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
        Header: 'R. Shaft',
        accessor: 'ruangShaft',
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
        Header: 'Parkir Motor',
        accessor: 'parkirMotor',
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
        Header: 'Halaman',
        accessor: 'halaman',
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
        Header: 'Rekanan',
        accessor: 'rekanan.name',
        filterable: false,
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

    const pageName = 'Pest Control'
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
                        Input Data
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
                    <ModalHeader toggle={modalForm.hide}>Form Pest Control</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Rekanan"
                          options={optRekanan}
                          isRequired
                          name="partner"
                          placeholder="Pilih atau Cari Rekanan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <b>Monitoring</b>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field label="Toilet" name="toilet" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Musholla" name="musholla" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lobby Lounge"
                            name="lobbyLounge"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Ruang Meeting"
                            name="ruangMeeting"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Ruang Kelas"
                            name="ruangKelas"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Ruang Kerja"
                            name="ruangKerja"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Corridor" name="corridor" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Tangga Darurat"
                            name="tanggaDarurat"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Ruang Sampah"
                            name="ruangSampah"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Ruang Shaft"
                            name="ruangShaft"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Parkir Motor"
                            name="parkirMotor"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Halaman" name="halaman" component={CfInputCheckbox} />
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
                          'Save Changes'
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

PestControl.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createVendor: PropTypes.func.isRequired,
  updateVendor: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.vendor.isLoading,
  message: state.vendor.message,
})

const mapDispatchToProps = (dispatch) => ({
  createVendor: (formData, refresh) => dispatch(createVendor(formData, refresh)),
  updateVendor: (formData, id, refresh) => dispatch(updateVendor(formData, id, refresh)),
  deleteVendor: (id, refresh) => dispatch(deleteVendor(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getVendor(p),
    Component: withToggle({
      Component: PestControl,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
