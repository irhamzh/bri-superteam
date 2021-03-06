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
import { CfInput, CfInputDate, CfInputFile, ListCheckboxShow } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createGAKehadiran,
  updateGAKehadiran,
  deleteGAKehadiran,
  uploadGAKehadiran,
} from '../../../../modules/generalAffair/dataPekerja/kehadiran/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'
import templateAttendance from '../../../../assets/template/Attendance.xlsx'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Security extends Component {
  state = {
    isShow: false,
    columns: [],
  }

  initialValues = { type: 'Security' }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      type: 'Security',
    })

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },

      {
        Header: 'Nama',
        accessor: 'name',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Hadir',
        accessor: 'jumlahHadir',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Tidak Hadir',
        accessor: 'jumlahTidakHadir',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Cuti',
        accessor: 'jumlahCuti',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    this.setState({ columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, excel } = values
    const { createGAKehadiran, updateGAKehadiran, uploadGAKehadiran } = this.props
    if (!invalidValues.includes(id)) {
      updateGAKehadiran(values, id, this.doRefresh)
    } else if (excel) {
      uploadGAKehadiran(values, this.doRefresh)
    } else {
      createGAKehadiran(values, this.doRefresh)
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
    const { deleteGAKehadiran } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGAKehadiran(id, this.doRefresh)
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

  toggleShow = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isShow: !prevState.isShow,
      }
    })
  }

  handleShowCheckbox = (e, data) => {
    const { columns } = this.state

    const selected = [...columns]
    const keyIndex = columns.indexOf(data)
    if (e.target.checked) {
      selected[keyIndex].show = true
    } else {
      selected[keyIndex].show = false
    }

    this.setState({ columns: selected })
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { isShow, columns } = this.state
    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        show: true,
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={() => modalForm.show({ data: props.original, upload: false })}
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
    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Security'
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
                        onClick={() => modalForm.show({ data: this.initialValues, upload: true })}
                        className="mr-3"
                      >
                        Upload Data
                      </Button>

                      <Button
                        color="primary"
                        onClick={() => modalForm.show({ data: this.initialValues, upload: false })}
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
                        onClick={this.toggleShow}
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
                          <ExcelColumn label="Nama Pekerja" value={(col) => col.name} />
                          <ExcelColumn label="Jumlah Hadir" value={(col) => col.jumlahHadir} />
                          <ExcelColumn
                            label="Jumlah Tidak Hadir"
                            value={(col) => col.jumlahTidakHadir}
                          />
                          <ExcelColumn label="Jumlah Cuti" value={(col) => col.jumlahCuti} />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
                {/* Card Show */}
                <ListCheckboxShow
                  data={columns}
                  isShow={isShow}
                  handleShowCheckbox={this.handleShowCheckbox}
                />
                <ReactTable
                  filterable
                  columns={tableCols}
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
                      {modalForm.prop.upload && (
                        <>
                          <FormGroup>
                            <Field
                              label="Tanggal"
                              name="tanggal"
                              classIcon="fa fa-calendar"
                              blockLabel
                              isRequired
                              placeholder="Pilih Tanggal"
                              // showMonthYearPicker
                              // showFullMonthYearPicker
                              // dateFormat="MM/yyyy"
                              component={CfInputDate}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="File Excel"
                              name="excel"
                              isRequired
                              component={CfInputFile}
                            />
                          </FormGroup>

                          <div style={{ marginTop: '50px' }}>
                            <p>
                              Download Template:
                              <a href={templateAttendance} target="_blank" rel="noreferrer">
                                File Template
                              </a>
                            </p>
                          </div>
                        </>
                      )}

                      {!modalForm.prop.upload && (
                        <>
                          <FormGroup>
                            <Field
                              label="Tanggal"
                              name="tanggal"
                              classIcon="fa fa-calendar"
                              blockLabel
                              isRequired
                              placeholder="Pilih Tanggal"
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
                              label="Jumlah Hadir"
                              type="number"
                              name="jumlahHadir"
                              isRequired
                              placeholder="Masukkan Jumlah Hadir"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Jumlah Tidak Hadir"
                              type="number"
                              name="jumlahTidakHadir"
                              isRequired
                              placeholder="Masukkan Jumlah Tidak Hadir"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Jumlah Cuti"
                              type="number"
                              name="jumlahCuti"
                              isRequired
                              placeholder="Masukkan Jumlah Cuti"
                              component={CfInput}
                            />
                          </FormGroup>
                        </>
                      )}
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

Security.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGAKehadiran: PropTypes.func.isRequired,
  updateGAKehadiran: PropTypes.func.isRequired,
  deleteGAKehadiran: PropTypes.func.isRequired,
  uploadGAKehadiran: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.dataPekerjaKehadiran.isLoading,
  message: state.dataPekerjaKehadiran.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGAKehadiran: (formData, refresh) => dispatch(createGAKehadiran(formData, refresh)),
  updateGAKehadiran: (formData, id, refresh) => dispatch(updateGAKehadiran(formData, id, refresh)),
  deleteGAKehadiran: (id, refresh) => dispatch(deleteGAKehadiran(id, refresh)),
  uploadGAKehadiran: (formData, refresh) => dispatch(uploadGAKehadiran(formData, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGAKehadiran(p),
    Component: withToggle({
      Component: Security,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
