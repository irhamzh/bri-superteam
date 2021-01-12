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
import { CfInput, CfInputFile } from '../../../../components'
import { AlertMessage, invalidValues, userData } from '../../../../helpers'
import {
  createAsset,
  updateAsset,
  deleteAsset,
  uploadAsset,
  approveAsset,
} from '../../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'
import { createAssetSchema } from '../../../../validations/mvAsset'

class DaftarAset extends Component {
  initialValues = {}

  componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      status: 'Unapproved',
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, excel } = values
    const { createAsset, updateAsset, uploadAsset } = this.props
    if (!invalidValues.includes(id)) {
      updateAsset(values, id, this.doRefresh)
    } else if (excel) {
      uploadAsset(values, this.doRefresh)
    } else {
      createAsset(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteAsset } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteAsset(id, this.doRefresh)
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

  handleApprove = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { approveAsset } = this.props
    const message = {
      title: 'Apa kamu yakin?',
      text: 'Setelah approve, Kamu tidak dapat memulihkan data ini!',
      confirmButtonText: 'Ya, Approve!',
      cancelButtonText: 'Kembali',
    }

    AlertMessage.warning(message)
      .then((result) => {
        if (result.value) {
          approveAsset(state, id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Notice!',
            text: 'Proses Approval Dibatalkan',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Internal Server Error
      })
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    const columns = [
      {
        Header: 'Kode',
        accessor: 'id',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Aset',
        accessor: 'name',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Edit',
        width: 60,
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
            {/* &nbsp; | &nbsp;
            <Button
              color="danger"
              onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              <i className="fa fa-trash" />
            </Button> */}
          </>
        ),
      },
    ]

    const user = userData()
    const allowedRole = ['admin', 'supervisor']
    if (user && allowedRole.includes(user.role?.name.toLowerCase())) {
      columns.push({
        Header: 'Approval',
        width: 200,
        accessor: 'id',
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={(e) => this.handleApprove(e, props.original)}
              className="mr-1"
              title="Approve"
            >
              Approve
            </Button>
            &nbsp; | &nbsp;
            <Button
              color="danger"
              onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              Deny
            </Button>
          </>
        ),
      })
    }

    const pageName = 'Daftar Aset'
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
                        onClick={() => modalForm.show({ data: this.initialValues, upload: false })}
                        className="mr-3"
                      >
                        Import Data Aset
                      </Button>

                      <Button
                        color="primary"
                        onClick={() => modalForm.show({ data: this.initialValues, upload: false })}
                        className="mr-1"
                      >
                        Input Data Aset
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <ReactTable
                  filterable={false}
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
                validationSchema={modalForm.prop.upload ? null : createAssetSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Data Aset</ModalHeader>
                    <ModalBody>
                      {/* <FormGroup>
                        <Field
                          label="Kode Aset"
                          type="text"
                          name="code"
                          isRequired
                          placeholder="Masukkan kode aset"
                          component={CfInput}
                        />
                      </FormGroup> */}
                      {modalForm.prop.upload && (
                        <FormGroup>
                          <Field
                            label="File Excel"
                            name="excel"
                            isRequired
                            accept=".xlsx, .xls, .csv"
                            component={CfInputFile}
                          />
                        </FormGroup>
                      )}
                      {!modalForm.prop.upload && (
                        <>
                          <FormGroup>
                            <Field
                              label="Nama Aset"
                              type="text"
                              name="name"
                              isRequired
                              placeholder="Masukkan nama aset"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Keterangan"
                              type="text"
                              name="information"
                              isRequired
                              placeholder="Masukkan Keterangan"
                              component={CfInput}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* {ErrorMessage(message)} */}
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

DaftarAset.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createAsset: PropTypes.func.isRequired,
  updateAsset: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func.isRequired,
  uploadAsset: PropTypes.func.isRequired,
  approveAsset: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createAsset: (formData, refresh) => dispatch(createAsset(formData, refresh)),
  updateAsset: (formData, id, refresh) => dispatch(updateAsset(formData, id, refresh)),
  deleteAsset: (id, refresh) => dispatch(deleteAsset(id, refresh)),
  uploadAsset: (formData, refresh) => dispatch(uploadAsset(formData, refresh)),
  approveAsset: (formData, id, refresh) => dispatch(approveAsset(formData, id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getAsset(p),
    Component: withToggle({
      Component: DaftarAset,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
