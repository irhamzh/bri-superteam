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
import { CfInput, CfInputCheckbox, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createGALembur,
  updateGALembur,
  deleteGALembur,
} from '../../../../modules/generalAffair/dataPekerja/lembur/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Driver extends Component {
  state = {
    optUker: [],
  }

  initialValues = {
    type: 'Driver',
    suratPerintahLembur: false,
    rekapPerhitunganLembur: false,
    formPembayaranUangLembur: false,
    absensi: false,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      type: 'Driver',
    })

    const resDataUker = await Service.getUker()
    const dataUker = resDataUker.data.data
    const optUker = dataUker.map((row) => ({ value: row.id, label: row.name }))
    this.setState({
      optUker,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createGALembur, updateGALembur } = this.props
    if (!invalidValues.includes(id)) {
      updateGALembur(values, id, this.doRefresh)
    } else {
      createGALembur(values, this.doRefresh)
    }
  }

  handleChangeSelect = (name, value) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.doRefresh()
      }
    )
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteGALembur } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGALembur(id, this.doRefresh)
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
    const { optUker } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'month',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },

      {
        Header: 'Nama',
        accessor: 'name',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Uker',
        accessor: 'uker.name',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Lembur',
        accessor: 'lembur',
        filterable: false,
        headerClassName: 'wordwrap',
        columns: [
          {
            Header: 'Surat Perintah Lembur',
            accessor: 'suratPerintahLembur',
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
            Header: 'Rekap Perhitungan Lembur',
            accessor: 'rekapPerhitunganLembur',
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
            Header: 'Form Pembayaran Uang Lembur',
            accessor: 'formPembayaranUangLembur',
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
            Header: 'Absensi',
            accessor: 'absensi',
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
        ],
      },
      {
        Header: 'Aksi',
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

    const pageName = 'Driver'
    const isIcon = { paddingRight: '7px' }

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
                        <i className="fa fa-plus" style={isIcon} />
                        &nbsp;Tambah Data
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.month)} />
                          <ExcelColumn label="Uker" value={(col) => col.uker?.name} />
                          <ExcelColumn label="Nama" value={(col) => col.name} />
                          <ExcelColumn
                            label="Surat Perintah Lembur"
                            value={(col) => (col.suratPerintahLembur ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Rekap Perhitungan Lembur"
                            value={(col) => (col.rekapPerhitunganLembur ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Form Pembayaran Uang Lembur"
                            value={(col) => (col.formPembayaranUangLembur ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Absensi"
                            value={(col) => (col.absensi ? '✓' : '❌')}
                          />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
                <br />
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
                    <ModalHeader toggle={modalForm.hide}>Form Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="month"
                          classIcon="fa fa-calendar"
                          blockLabel
                          // minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          showMonthYearPicker
                          showFullMonthYearPicker
                          dateFormat="MM/yyyy"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama"
                          type="text"
                          name="name"
                          isRequired
                          placeholder="Masukkan Nama"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Uker"
                          options={optUker}
                          isRequired
                          name="uker"
                          placeholder="Pilih atau Cari Uker"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field
                            label="Surat Perintah Lembur (SPL)"
                            name="suratPerintahLembur"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Rekap Perhitungan Lembur"
                            name="rekapPerhitunganLembur"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Form Pembayaran Uang Lembur"
                            name="formPembayaranUangLembur"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Absensi" name="absensi" component={CfInputCheckbox} />
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

Driver.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGALembur: PropTypes.func.isRequired,
  updateGALembur: PropTypes.func.isRequired,
  deleteGALembur: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.dataPekerjaLembur.isLoading,
  message: state.dataPekerjaLembur.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGALembur: (formData, refresh) => dispatch(createGALembur(formData, refresh)),
  updateGALembur: (formData, id, refresh) => dispatch(updateGALembur(formData, id, refresh)),
  deleteGALembur: (id, refresh) => dispatch(deleteGALembur(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGALembur(p),
    Component: withToggle({
      Component: Driver,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
