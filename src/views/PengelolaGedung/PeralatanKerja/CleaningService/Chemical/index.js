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
import { CfInput, CfInputCheckbox, CfInputDate } from '../../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createPeralatanKerja,
  updatePeralatanKerja,
  deletePeralatanKerja,
} from '../../../../../modules/peralatankerja/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

class Chemical extends Component {
  initialValues = {
    typePeralatanKerja: 'chemical',
    floorKlin: true,
    glassCleaner: true,
    allPurposeCleaner: true,
    metalPolish: true,
    handSoap: true,
    furniturePolish: true,
    vim: true,
    bubukDetergen: true,
    thiner: true,
    bayFresh: true,
    fresPhone: true,
    marblePowder: true,
    karbolWangi: true,
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPeralatanKerja, updatePeralatanKerja } = this.props
    if (!invalidValues.includes(id)) {
      updatePeralatanKerja(values, id, this.doRefresh)
    } else {
      createPeralatanKerja(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePeralatanKerja } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePeralatanKerja(id, this.doRefresh)
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
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Floor Klin',
        accessor: 'floorKlin',
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
        Header: 'Glass Cleaner',
        accessor: 'glassCleaner',
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
        Header: 'All Purpose Cleaner',
        accessor: 'allPurposeCleaner',
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
        Header: 'Metal Polish',
        accessor: 'metalPolish',
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
        Header: 'Hand Soap',
        accessor: 'handSoap',
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
        Header: 'Furniture Polish',
        accessor: 'furniturePolish',
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
        Header: 'Vim',
        accessor: 'vim',
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
        Header: 'Bubuk Detergen',
        accessor: 'bubukDetergen',
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
        Header: 'Thiner',
        accessor: 'thiner',
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
        Header: 'Bay Fresh',
        accessor: 'bayFresh',
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
        Header: 'Fres Phone',
        accessor: 'fresPhone',
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
        Header: 'Marble Powder',
        accessor: 'marblePowder',
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
        Header: 'Karbol Wangi',
        accessor: 'karbolWangi',
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
        Header: 'Keterangan',
        accessor: 'information',
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

    const pageName = 'Chemical'
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
              size="lg"
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

                      <strong>Kondisi</strong>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field label="Floor Klin" name="floorKlin" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Glass Cleaner"
                            name="glassCleaner"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="All Purpose Cleaner"
                            name="allPurposeCleaner"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Metal Polish"
                            name="metalPolish"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Hand Soap" name="handSoap" component={CfInputCheckbox} />
                        </FormGroup>
                        <FormGroup>
                          <Field
                            label="Furniture Polish"
                            name="furniturePolish"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Vim" name="vim" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Bubuk Detergen"
                            name="bubukDetergen"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Thiner" name="thiner" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Bay Fresh" name="bayFresh" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Fres Phone" name="fresPhone" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Marble Powder"
                            name="marblePowder"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Karbol Wangi"
                            name="karbolWangi"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

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

Chemical.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPeralatanKerja: PropTypes.func.isRequired,
  updatePeralatanKerja: PropTypes.func.isRequired,
  deletePeralatanKerja: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.peralatanKerja.isLoading,
  message: state.peralatanKerja.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPeralatanKerja: (formData, refresh) => dispatch(createPeralatanKerja(formData, refresh)),
  updatePeralatanKerja: (formData, id, refresh) =>
    dispatch(updatePeralatanKerja(formData, id, refresh)),
  deletePeralatanKerja: (id, refresh) => dispatch(deletePeralatanKerja(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPeralatanKerja(p),
    Component: withToggle({
      Component: Chemical,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
