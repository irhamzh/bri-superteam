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
import { CfInput, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createGAPajakKendaraan,
  updateGAPajakKendaraan,
  deleteGAPajakKendaraan,
} from '../../../../modules/generalAffair/pengelolaanKendaraan/kendaraan/pajakKendaraan/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class PajakKendaran extends Component {
  state = {
    optKendaraan: [],
  }

  initialValues = {}

  async componentDidMount() {
    const resDataKendaraan = await Service.getKendaraan()
    const dataKendaraan = resDataKendaraan.data.data
    const optKendaraan = dataKendaraan.map((row) => ({
      label: `${row.platNomor}-${row.merk}-${row.color}`,
      value: row.id,
    }))

    this.setState({
      optKendaraan,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createGAPajakKendaraan, updateGAPajakKendaraan } = this.props
    if (!invalidValues.includes(id)) {
      updateGAPajakKendaraan(values, id, this.doRefresh)
    } else {
      createGAPajakKendaraan(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteGAPajakKendaraan } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGAPajakKendaraan(id, this.doRefresh)
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
    const { optKendaraan } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Kendaraan',
        accessor: 'vehicle',
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>
            {row.value ? `${row.value.platNomor} - ${row.value.merk} - ${row.value.color}` : ''}
          </div>
        ),
      },
      {
        Header: 'Jatuh Tempo',
        accessor: 'jatuhTempo',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Biaya Pajak',
        accessor: 'biaya',
        filterable: false,
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

    const pageName = 'Pajak Kendaraan'
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
                        element={(
                          <Button
                            className="mr-1 mb-2 px-4"
                            color="secondary"
                            style={{ borderRadius: '20px' }}
                          >
                            Export
                          </Button>
                        )}
                      >
                        <ExcelSheet data={data} name={pageName}>
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.tanggal)} />
                          <ExcelColumn
                            label="Kendaraan"
                            value={(col) =>
                              col.vehicle
                                ? `${col.vehicle.platNomor} - ${col.vehicle.merk} - ${col.vehicle.color}`
                                : ''}
                          />
                          <ExcelColumn label="Jatuh Tempo" value={(col) => col.jatuhTempo} />
                          <ExcelColumn label="Biaya" value={(col) => col.biaya} />
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
                    <ModalHeader toggle={modalForm.hide}>Data Pajak Kendaraan</ModalHeader>
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
                          label="Kendaraan"
                          options={optKendaraan}
                          isRequired
                          name="vehicle"
                          placeholder="Pilih atau Cari Kendaraan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      {/* <FormGroup>
                        <Field
                          label="Jatuh Tempo"
                          name="jatuhTempo"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Tanggal Berakhir"
                          component={CfInputDate}
                        />
                      </FormGroup> */}

                      <FormGroup>
                        <Field
                          label="Jatuh Tempo"
                          type="text"
                          name="jatuhTempo"
                          isRequired
                          placeholder="Masukkan Jatuh Tempo"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Biaya Pajak"
                          type="number"
                          name="biaya"
                          isRequired
                          placeholder="Masukkan Biaya Pajak"
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

PajakKendaran.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGAPajakKendaraan: PropTypes.func.isRequired,
  updateGAPajakKendaraan: PropTypes.func.isRequired,
  deleteGAPajakKendaraan: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.generalAffairPajakKendaraan.isLoading,
  message: state.generalAffairPajakKendaraan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGAPajakKendaraan: (formData, refresh) =>
    dispatch(createGAPajakKendaraan(formData, refresh)),
  updateGAPajakKendaraan: (formData, id, refresh) =>
    dispatch(updateGAPajakKendaraan(formData, id, refresh)),
  deleteGAPajakKendaraan: (id, refresh) => dispatch(deleteGAPajakKendaraan(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGAPajakKendaraan(p),
    Component: withToggle({
      Component: PajakKendaran,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
