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
import { CfInput, CfInputDate, CfInputRadio, CfSelect } from '../../../../../components'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../../helpers'
import { createRole, updateRole, deleteRole } from '../../../../../modules/master/role/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

const roleSchema = Yup.object().shape({
  nama: Yup.string().required('nama role belum diisi'),
})

class Machinery extends Component {
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
        AlertMessage.error(err) // AC Server Error
      })
  }

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        width: 100,
        filterable: false,
        Cell: (props) => <span>{props.value}</span>,
      },
      {
        Header: 'Low Speed Polisher Machine 17"',
        accessor: 'polisherMachine',
        filterable: false,
      },
      {
        Header: 'Wet & Dry Vacuum Cleaner 20 lt',
        accessor: 'vacuumCleaner',
        filterable: false,
      },
      {
        Header: 'Jet Sprayer',
        accessor: 'jetSprayer',
        filterable: false,
      },
      {
        Header: 'Blower',
        accessor: 'blower',
        filterable: false,
      },
      {
        Header: 'Signed',
        accessor: 'signed',
        filterable: false,
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

    const pageName = 'Machinery'
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
                        {/* <i className="fa fa-plus" style={isIcon} /> */}
                        {/* &nbsp; */}
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
              // size="lg"
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
                    <ModalHeader toggle={modalForm.hide}>Tambah Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <Row>
                        <Col sm="6">
                          <h6>Low Speed Polisher Machine 17"</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="polisherMachine"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="polisherMachine"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Wet & Dry Vacuum Cleaner 20 lt</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="vacuumCleaner"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="vacuumCleaner"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Jet Sprayer</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="jetSprayer"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="jetSprayer"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Blower</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="blower" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="blower"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Signed</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="signed" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="signed"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Field
                          label="Keterangan"
                          type="text"
                          name="keterangan"
                          isRequired
                          placeholder="Masukkan Keterangan"
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

Machinery.propTypes = {
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
      Component: Machinery,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
