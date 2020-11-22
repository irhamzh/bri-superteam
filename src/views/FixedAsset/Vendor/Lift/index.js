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

class Lift extends Component {
  state = {
    // optRekanan: [],
  }

  initialValues = {
    typeMonitoring: 'Lift',
    cleaningAreaSangkarL1: false,
    cleaningAreaSangkarL2: false,
    cleaningAreaSangkarL3: false,
    cleaningAreaSangkarL4: false,
    cleaningAreaSangkarL5: false,
    cleaningAreaSangkarL6: false,
    oliRelSangkarLift: false,
    taliSelingLift: false,
    pengeremanLift: false,
    exhaustFanLift: false,
    panelDriveUnitLift: false,
    mesinMotorLift: false,
    powerListrikLift: false,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeMonitoring: 'Lift',
    })
    // const resDataRekanan = await Service.getPartner()
    // const dataRekanan = resDataRekanan.data.data
    // const optRekanan = dataRekanan.map((row) => ({ label: row.name, value: row.id }))

    // this.setState({ optRekanan })
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
    // const { optRekanan } = this.state

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
        Header: 'Cleaning Area Sangkar dan Pintu Lift - Lantai 1',
        accessor: 'cleaningAreaSangkarL1',
        filterable: true,
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
        Header: 'Cleaning Area Sangkar dan Pintu Lift - Lantai 2',
        accessor: 'cleaningAreaSangkarL2',
        filterable: true,
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
        Header: 'Cleaning Area Sangkar dan Pintu Lift - Lantai 3',
        accessor: 'cleaningAreaSangkarL3',
        filterable: true,
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
        Header: 'Cleaning Area Sangkar dan Pintu Lift - Lantai 4',
        accessor: 'cleaningAreaSangkarL4',
        filterable: true,
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
        Header: 'Cleaning Area Sangkar dan Pintu Lift - Lantai 5',
        accessor: 'cleaningAreaSangkarL5',
        filterable: true,
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
        Header: 'Cleaning Area Sangkar dan Pintu Lift - Lantai 6',
        accessor: 'cleaningAreaSangkarL6',
        filterable: true,
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
        Header: 'Oli di Sangkar Lift dan Packing di Mesin Lift',
        accessor: 'oliRelSangkarLift',
        filterable: true,
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
        Header: 'Tali Seling Lift',
        accessor: 'taliSelingLift',
        filterable: true,
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
        Header: 'Cek Brake System atau Pengereman Lift',
        accessor: 'pengeremanLift',
        filterable: true,
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
        Header: 'Exhaust Fan Lift',
        accessor: 'exhaustFanLift',
        filterable: true,
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
        Header: 'Panel atau Drive Unit Lift',
        accessor: 'panelDriveUnitLift',
        filterable: true,
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
        Header: 'Mesin Motor Lift',
        accessor: 'mesinMotorLift',
        filterable: true,
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
        Header: 'Power Listrik Lift',
        accessor: 'powerListrikLift',
        filterable: true,
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
        Header: 'Keterangan',
        accessor: 'keterangan',
        filterable: true,
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

    const pageName = 'Lift'
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
                    <ModalHeader toggle={modalForm.hide}>Form Lift</ModalHeader>
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

                      <h6>Cleaning area sangkar dan pintu lift</h6>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field
                            label="Lantai 1"
                            name="cleaningAreaSangkarL1"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 2"
                            name="cleaningAreaSangkarL2"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 3"
                            name="cleaningAreaSangkarL3"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 4"
                            name="cleaningAreaSangkarL4"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 5"
                            name="cleaningAreaSangkarL5"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 6"
                            name="cleaningAreaSangkarL6"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <FormGroup>
                        <Field
                          label="Lift"
                          options={[
                            { value: 'Lift 1', label: 'Lift 1' },
                            { value: 'Lift 2', label: 'Lift 2' },
                            { value: 'Lift 3', label: 'Lift 3' },
                            { value: 'Lift 4', label: 'Lift 4' },
                          ]}
                          isRequired
                          name="lift"
                          placeholder="Pilih atau Cari Lift"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field
                            label="Oli di Rel Sangkar Lift dan Packing di Mesin"
                            name="oliRelSangkarLift"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Tali Seling Lift"
                            name="taliSelingLift"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Cek Brake System atau Pengereman Lift"
                            name="pengeremanLift"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Exhaust Fan Lift"
                            name="exhaustFanLift"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Panel atai Drive Unit Lift"
                            name="panelDriveUnitLift"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Mesin Motor Lift"
                            name="mesinMotorLift"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Power Listrik Lift"
                            name="powerListrikLift"
                            component={CfInputCheckbox}
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

Lift.propTypes = {
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
      Component: Lift,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
