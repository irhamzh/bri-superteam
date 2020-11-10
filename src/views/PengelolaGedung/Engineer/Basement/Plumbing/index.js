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
import { CfInput, CfInputDate, CfInputRadio, CfSelect, CfTextQuil } from '../../../../../components'
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
    tanggal: '06/06/2020',
    pompa: 'Pompa Riser',
    unit: 'Riser 1',
    voltase: 100,
    kondisiValve: 'Baik',
    kondisiBearing: 'Tidak Baik',
    oli: 'Baik',
    kebocoran: 'Tidak Ada Kebocoran',
    keterangan: 'Lorem Ipsum',
  },
  {
    tanggal: '08/06/2020',
    pompa: 'Pompa Booster',
    unit: 'Booster 3',
    voltase: 100,
    kondisiValve: 'Baik',
    kondisiBearing: 'Baik',
    oli: 'Baik',
    kebocoran: 'Tidak Ada Kebocoran',
    keterangan: 'Lorem Ipsum',
  },
]

class Plumbing extends Component {
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
        AlertMessage.error(err) // Plumbing Server Error
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
      },
      {
        Header: 'Pompa',
        accessor: 'pompa',
        filterable: false,
      },
      {
        Header: 'Unit',
        accessor: 'unit',
        filterable: false,
      },
      {
        Header: 'Voltase',
        accessor: 'voltase',
        filterable: false,
      },
      {
        Header: 'Kondisi Valve',
        accessor: 'kondisiValve',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Kondisi Bearing',
        accessor: 'kondisiBearing',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Oli',
        accessor: 'oli',
        filterable: false,
      },
      {
        Header: 'Kebocoran',
        accessor: 'kebocoran',
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

    const pageName = 'Evaluasi Plumbing'
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
              size="lg"
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

                      <FormGroup>
                        <Field
                          label="Pompa"
                          options={[{ value: 'Pompa Riser', label: 'Pompa Riser' }]}
                          isRequired
                          name="pompa"
                          placeholder="Pilih atau Cari Pompa"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Unit"
                          options={[{ value: 'Riser 1', label: 'Riser 1' }]}
                          isRequired
                          name="unit"
                          placeholder="Pilih atau Cari Unit"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Voltase"
                          type="text"
                          name="voltase"
                          isRequired
                          placeholder="Masukkan Voltase"
                          component={CfInput}
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <h6>Kondisi Valve</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="kondisiValve"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="kondisiValve"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <h6>Kondisi Bearing</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="kondisiBearing"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="kondisiBearing"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <h6>Oli</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="oli" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="oli"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Field
                          label="Kebocoran"
                          type="text"
                          name="kebocoran"
                          isRequired
                          placeholder="Masukkan Kebocoran"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Keterangan"
                          type="text"
                          name="keterangan"
                          placeholder="Masukkan Keterangan"
                          component={CfTextQuil}
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

Plumbing.propTypes = {
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
      Component: Plumbing,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
