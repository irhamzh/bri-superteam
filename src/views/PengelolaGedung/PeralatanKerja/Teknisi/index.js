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
import { CfInput, CfInputCheckbox, CfInputDate } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createPeralatanKerja,
  updatePeralatanKerja,
  deletePeralatanKerja,
} from '../../../../modules/peralatankerja/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class Teknisi extends Component {
  initialValues = {
    typePeralatanKerja: 'peralatan teknis',
    pelindungKepala: false,
    pelindungMata: false,
    pelindungPernafasan: false,
    pelindungBadan: false,
    pelindungKaki: false,
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
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggal',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Pelindung Kepala',
        accessor: 'pelindungKepala',
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
        Header: 'Pelindung Mata',
        accessor: 'pelindungMata',
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
        Header: 'Pelindung Pernafasan',
        accessor: 'pelindungPernafasan',
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
        Header: 'Pelindung Badan',
        accessor: 'pelindungBadan',
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
        Header: 'Pelindung Tangan',
        accessor: 'pelindungTangan',
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
        Header: 'Pelindung Kaki',
        accessor: 'pelindungKaki',
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
        Header: 'Pekerjaan',
        accessor: 'pekerjaan',
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

    const pageName = 'Peralatan Teknisi'
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.tanggal)} />
                          <ExcelColumn
                            label="Pelindung Kepala"
                            value={(col) => (col.pelindungKepala ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pelindung Mata"
                            value={(col) => (col.pelindungMata ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pelindung Pernafasan"
                            value={(col) => (col.pelindungPernafasan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pelindung Badan"
                            value={(col) => (col.pelindungBadan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pelindung Tangan"
                            value={(col) => (col.pelindungTangan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pelindung Kaki"
                            value={(col) => (col.pelindungKaki ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Pekerjaan" value="pekerjaan" />
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
                    <ModalHeader toggle={modalForm.hide}>Form Teknisi</ModalHeader>
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

                      <strong>Kondisi</strong>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field
                            label="Pelindung Kepala"
                            name="pelindungKepala"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pelindung Mata"
                            name="pelindungMata"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pelindung Pernafasan"
                            name="pelindungPernafasan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pelindung Badan"
                            name="pelindungBadan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pelindung Kaki"
                            name="pelindungKaki"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pelindung Tangan"
                            name="pelindungTangan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <br />
                      <FormGroup>
                        <Field
                          label="Pekerjaan"
                          type="text"
                          name="pekerjaan"
                          isRequired
                          placeholder="Masukkan Pekerjaan"
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

Teknisi.propTypes = {
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
      Component: Teknisi,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
