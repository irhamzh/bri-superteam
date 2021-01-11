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
import { CfInputCheckbox, CfInputDate, CfSelect, IconSuccessOrFailed } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import { createVendor, updateVendor, deleteVendor } from '../../../../modules/vendor/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class TanamanHias extends Component {
  state = {
    optRekanan: [],
  }

  initialValues = {
    typeMonitoring: 'Tanaman Hias',
    tanamanHiasL1: false,
    tanamanHiasL2: false,
    tanamanHiasL3: false,
    tanamanHiasL4: false,
    tanamanHiasL5: false,
    tanamanHiasL6: false,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeMonitoring: 'Tanaman Hias',
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
      const { partner } = values
      if (partner && Object.keys(partner).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.partner = partner.id || partner
      }
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
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
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
        Header: 'Penggantian Tanaman - Lantai 1',
        accessor: 'tanamanHiasL1',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penggantian Tanaman - Lantai 2',
        accessor: 'tanamanHiasL2',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penggantian Tanaman - Lantai 3',
        accessor: 'tanamanHiasL3',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penggantian Tanaman - Lantai 4',
        accessor: 'tanamanHiasL4',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penggantian Tanaman - Lantai 5',
        accessor: 'tanamanHiasL5',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penggantian Tanaman - Lantai 6',
        accessor: 'tanamanHiasL6',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Rekanan',
        accessor: 'partner.name',
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

    const pageName = 'Tanaman Hias'
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
                            label="Penggantian Tanaman - Lantai 1"
                            value={(col) => (col.tanamanHiasL1 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penggantian Tanaman - Lantai 2"
                            value={(col) => (col.tanamanHiasL2 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penggantian Tanaman - Lantai 3"
                            value={(col) => (col.tanamanHiasL3 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penggantian Tanaman - Lantai 4"
                            value={(col) => (col.tanamanHiasL4 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penggantian Tanaman - Lantai 5"
                            value={(col) => (col.tanamanHiasL5 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penggantian Tanaman - Lantai 6"
                            value={(col) => (col.tanamanHiasL6 ? '✓' : '❌')}
                          />

                          <ExcelColumn label="Rekanan" value={(col) => col.partner?.name} />
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
                {({ values, isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Tanaman Hias</ModalHeader>
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
                          defaultValue={
                            values.partner
                              ? { value: values.partner.id, label: values.partner.name }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup>

                      <h6>Monitoring Tanaman Hias</h6>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field
                            label="Lantai 1"
                            name="tanamanHiasL1"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 2"
                            name="tanamanHiasL2"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 3"
                            name="tanamanHiasL3"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 4"
                            name="tanamanHiasL4"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 5"
                            name="tanamanHiasL5"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Lantai 6"
                            name="tanamanHiasL6"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

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

TanamanHias.propTypes = {
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
      Component: TanamanHias,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
