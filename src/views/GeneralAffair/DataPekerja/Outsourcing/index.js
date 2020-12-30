/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable eqeqeq */
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
// import Select from 'react-select'
import Service from '../../../../config/services'
import { CfInputDate, CfInputFile } from '../../../../components'
import { AlertMessage, invalidValues } from '../../../../helpers'
import {
  createGAPenilaianOutsourcing,
  updateGAPenilaianOutsourcing,
  deleteGAPenilaianOutsourcing,
  uploadGAPenilaianOutsourcing,
} from '../../../../modules/generalAffair/dataPekerja/outsourcing/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Outsourcing extends Component {
  state = {
    tahun: '',
    bulan: '',
    // optBulan: [
    //   { label: 'Januari', value: '1' },
    //   { label: 'Februari', value: '2' },
    //   { label: 'Maret', value: '3' },
    //   { label: 'April', value: '4' },
    //   { label: 'Mei', value: '5' },
    //   { label: 'Juni', value: '6' },
    //   { label: 'Juli', value: '7' },
    //   { label: 'Agustus', value: '8' },
    //   { label: 'September', value: '9' },
    //   { label: 'Oktober', value: '10' },
    //   { label: 'November', value: '11' },
    //   { label: 'Desember', value: '12' },
    // ],
    // optTahun: [
    //   { label: '2015', value: '2015' },
    //   { label: '2016', value: '2016' },
    //   { label: '2017', value: '2017' },
    //   { label: '2018', value: '2018' },
    //   { label: '2019', value: '2019' },
    //   { label: '2020', value: '2020' },
    //   { label: '2021', value: '2021' },
    //   { label: '2022', value: '2022' },
    //   { label: '2023', value: '2023' },
    //   { label: '2024', value: '2024' },
    //   { label: '2025', value: '2025' },
    //   { label: '2026', value: '2026' },
    // ],
  }

  initialValues = {}

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, excel } = values
    const {
      createGAPenilaianOutsourcing,
      updateGAPenilaianOutsourcing,
      uploadGAPenilaianOutsourcing,
    } = this.props
    if (!invalidValues.includes(id)) {
      updateGAPenilaianOutsourcing(values, id, this.doRefresh)
    } else if (excel) {
      uploadGAPenilaianOutsourcing(values, this.doRefresh)
    } else {
      createGAPenilaianOutsourcing(values, this.doRefresh)
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
    const { deleteGAPenilaianOutsourcing } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGAPenilaianOutsourcing(id, this.doRefresh)
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

  filterData = async (e) => {
    e.preventDefault()
    const { bulan, tahun } = this.state
    if (invalidValues.includes(bulan)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }
    if (invalidValues.includes(tahun)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }

    try {
      const { fetchQueryProps } = this.props
      fetchQueryProps.setFilteredByObject({
        'month-year$createdAt': `${tahun}-${bulan}`,
      })

      this.doRefresh()
    } catch (error) {
      AlertMessage.error(error)
    }
  }

  render() {
    // const { optBulan, optTahun } = this.state
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps

    const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'No.',
        width: 50,
        // accessor: `none`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{numbData(props)}</p>,
      },
      {
        Header: 'Nama',
        accessor: `name`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'PN',
        accessor: `pn`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Tahun Sebelumnya',
        accessor: `previous`,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value?.value}</p>,
      },
      {
        Header: 'Tahun Sekarang',
        accessor: `current`,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value?.value}</p>,
      },
      {
        Header: 'Tahun Berikutnya',
        accessor: `next`,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value?.value}</p>,
      },
    ]

    const pageName = 'Penilaian Outsourcing'
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
                        className="mr-1"
                      >
                        <i className="fa fa-plus" style={isIcon} />
                        &nbsp;Upload
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    {/* Filter Bulan tahun */}
                    {/* <Row>
                      <Col>
                        <FormGroup>
                          <Select
                            isClearable
                            placeholder="Pilih Bulan..."
                            options={optBulan}
                            name="bulan"
                            onChange={(e) => this.setState({ bulan: e?.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Select
                            isClearable
                            placeholder="Pilih tahun..."
                            options={optTahun}
                            name="tahun"
                            className=""
                            onChange={(e) => this.setState({ tahun: e?.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <Button type="submit" color="primary" onClick={(e) => this.filterData(e)}>
                          <i className="fa fa-filter" />
                        </Button>
                      </Col>
                    </Row> */}
                  </Col>

                  <Col>
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
                          <ExcelColumn label="Nama" value={(col) => col.name} />
                          <ExcelColumn label="PN" value={(col) => col.pn} />
                          <ExcelColumn
                            label="Tahun Sebelumnya"
                            value={(col) => col.previous.value}
                          />
                          <ExcelColumn label="Tahun Sekarang" value={(col) => col.current.value} />
                          <ExcelColumn label="Tahun Berikutnya" value={(col) => col.next.value} />
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
                    <ModalHeader toggle={modalForm.hide}>Upload File</ModalHeader>
                    <ModalBody>
                      {modalForm.prop.upload && (
                        <>
                          <FormGroup>
                            <Field
                              label="Bulan/Tahun"
                              name="tanggal"
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
                              label="File Excel"
                              name="excel"
                              isRequired
                              component={CfInputFile}
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

Outsourcing.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGAPenilaianOutsourcing: PropTypes.func.isRequired,
  updateGAPenilaianOutsourcing: PropTypes.func.isRequired,
  deleteGAPenilaianOutsourcing: PropTypes.func.isRequired,
  uploadGAPenilaianOutsourcing: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.penilaianOutsourcing.isLoading,
  message: state.penilaianOutsourcing.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGAPenilaianOutsourcing: (formData, refresh) =>
    dispatch(createGAPenilaianOutsourcing(formData, refresh)),
  updateGAPenilaianOutsourcing: (formData, id, refresh) =>
    dispatch(updateGAPenilaianOutsourcing(formData, id, refresh)),
  deleteGAPenilaianOutsourcing: (id, refresh) =>
    dispatch(deleteGAPenilaianOutsourcing(id, refresh)),
  uploadGAPenilaianOutsourcing: (formData, refresh) =>
    dispatch(uploadGAPenilaianOutsourcing(formData, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGAPenilaianOutsourcing(p),
    Component: withToggle({
      Component: Outsourcing,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
