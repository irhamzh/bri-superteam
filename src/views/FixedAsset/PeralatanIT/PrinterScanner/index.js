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
import { CfInput, CfSelect } from '../../../../components'
import {
  createPeralatanIT,
  updatePeralatanIT,
  deletePeralatanIT,
} from '../../../../modules/peralatan-it/actions'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../helpers'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'
import { createPeralatanSchema } from '../../../../validations/mvPeralatanIT'

class PrinterScanner extends Component {
  state = {
    optRuangan: [],
  }

  initialValues = {
    jenisPeralatan: 'Printer dan Scanner',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      jenisPeralatan: 'Printer dan Scanner',
    })

    const resDataRuangan = await Service.getRoom()
    const dataRuangan = resDataRuangan.data.data
    const optRuangan = dataRuangan.map((row) => ({ label: row.name, value: row.id }))
    this.setState({
      optRuangan,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPeralatanIT, updatePeralatanIT } = this.props
    if (!invalidValues.includes(id)) {
      updatePeralatanIT(values, id, this.doRefresh)
    } else {
      createPeralatanIT(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePeralatanIT } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePeralatanIT(id, this.doRefresh)
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
    const { optRuangan } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Merk',
        accessor: 'merk',
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Model',
        accessor: 'model',
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'SN',
        accessor: 'sn',
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Ruangan',
        accessor: 'ruangan.name',
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kondisi',
        accessor: 'kondisi',
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
        filterable: true,
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

    const pageName = 'Printer & Scanner'
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
                        &nbsp;Tambah Data
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
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
                validationSchema={createPeralatanSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Merk"
                          type="text"
                          name="merk"
                          isRequired
                          placeholder="Masukkan Merk"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Model"
                          type="text"
                          name="model"
                          isRequired
                          placeholder="Masukkan Model"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="SN"
                          type="text"
                          name="sn"
                          isRequired
                          placeholder="Masukkan Serial Number"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Ruangan"
                          options={optRuangan}
                          isRequired
                          name="ruangan"
                          placeholder="Pilih atau Cari Ruangan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kondisi"
                          options={[
                            { value: 'Baik', label: 'Baik' },
                            { value: 'Tidak Baik', label: 'Tidak Baik' },
                          ]}
                          isRequired
                          name="kondisi"
                          placeholder="Pilih atau Cari Kondisi"
                          component={CfSelect}
                        />
                      </FormGroup>

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

PrinterScanner.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPeralatanIT: PropTypes.func.isRequired,
  updatePeralatanIT: PropTypes.func.isRequired,
  deletePeralatanIT: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.peralatanIt.isLoading,
  message: state.peralatanIt.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPeralatanIT: (formData, refresh) => dispatch(createPeralatanIT(formData, refresh)),
  updatePeralatanIT: (formData, id, refresh) => dispatch(updatePeralatanIT(formData, id, refresh)),
  deletePeralatanIT: (id, refresh) => dispatch(deletePeralatanIT(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPeralatanIT(p),
    Component: withToggle({
      Component: PrinterScanner,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
