/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-curly-newline */
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
import ReactStars from 'react-rating-stars-component'
import Service from '../../../../config/services'
import { CfAsyncSelect, CfInput, CfInputDate, ListCheckboxShow } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createPenugasanDriver,
  updatePenugasanDriver,
  deletePenugasanDriver,
} from '../../../../modules/generalAffair/pengelolaanKendaraan/penugasanDriver/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class PenugasanDriver extends Component {
  state = {
    optKendaraan: [],
    isShow: false,
    columns: [],
  }

  initialValues = { rate: 0 }

  async componentDidMount() {
    // const { fetchQueryProps } = this.props

    const resDataKendaraan = await Service.getKendaraan()
    const dataKendaraan = resDataKendaraan.data.data
    const optKendaraan = dataKendaraan.map((row) => ({
      label: `${row.platNomor}-${row.merk}-${row.color}`,
      value: row.id,
    }))

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
        Header: 'Kendaraan',
        accessor: 'vehicle',
        show: true,
        filterable: false,
        width: 200,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>
            {row.value ? `${row.value.platNomor} - ${row.value.merk} - ${row.value.color}` : ''}
          </div>
        ),
      },
      {
        Header: 'Nama Driver',
        accessor: 'driverName',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Nama Penumpang',
        accessor: 'passengerName',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Tujuan',
        accessor: 'destination',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Bintang',
        accessor: 'rate',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
    ]

    this.setState({
      optKendaraan,
      columns,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPenugasanDriver, updatePenugasanDriver } = this.props
    if (!invalidValues.includes(id)) {
      const { vehicle } = values
      if (vehicle && Object.keys(vehicle).length > 0) {
        values.vehicle = vehicle.id || vehicle
      }
      updatePenugasanDriver(values, id, this.doRefresh)
    } else {
      createPenugasanDriver(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePenugasanDriver } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePenugasanDriver(id, this.doRefresh)
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

  handleInputKendaraan = async (value) => {
    const filtered = [{ id: 'merk', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getKendaraan(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: `${row.platNomor}-${row.merk}-${row.color}`,
        value: row.id,
      }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optKendaraan, isShow, columns } = this.state
    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        width: 200,
        show: true,
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
            &nbsp; | &nbsp;
            <Button
              color="info"
              onClick={() => modalForm.show({ data: props.original, evaluasi: true })}
              className="mr-1"
              title="Evaluasi"
            >
              <i className="icon-star" />
            </Button>
          </>
        ),
      },
    ]
    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const starOptions = {
      size: 80,
      count: 5,
      isHalf: false,
      value: 0,
      // activeColor: "",
    }

    const pageName = 'Penugasan Driver'
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
                          <ExcelColumn
                            label="Kendaraan"
                            value={(col) =>
                              col.vehicle
                                ? `${col.vehicle.platNomor} - ${col.vehicle.merk} - ${col.vehicle.color}`
                                : ''
                            }
                          />
                          <ExcelColumn label="Nama Driver" value="driverName" />
                          <ExcelColumn label="Nama Penumpang" value={(col) => col.passengerName} />
                          <ExcelColumn label="Tujuan" value={(col) => col.destination} />
                          <ExcelColumn label="Bintang" value={(col) => col.rate} />
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
                {({ values, isSubmitting, setFieldValue }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Data Penugasan Driver</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          isRequired
                          disabled={!!modalForm.prop.evaluasi}
                          placeholder="Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Kendaraan"
                          cacheOptions
                          options={optKendaraan}
                          defaultOptions
                          loadOptions={this.handleInputKendaraan}
                          name="vehicle"
                          isRequired
                          placeholder="Pilih atau cari"
                          defaultValue={
                            values.vehicle
                              ? {
                                  value: values.vehicle.id,
                                  label: `${values.vehicle.platNomor}-${values.vehicle.merk}-${values.vehicle.color}`,
                                }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Driver"
                          type="text"
                          name="driverName"
                          isRequired
                          disabled={!!modalForm.prop.evaluasi}
                          placeholder="Masukkan Nama Driver"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Penumpang"
                          type="text"
                          name="passengerName"
                          isRequired
                          disabled={!!modalForm.prop.evaluasi}
                          placeholder="Masukkan Nama Penumpang"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tujuan"
                          type="text"
                          name="destination"
                          isRequired
                          disabled={!!modalForm.prop.evaluasi}
                          placeholder="Masukkan Tujuan"
                          component={CfInput}
                        />
                      </FormGroup>

                      {modalForm.prop.evaluasi && (
                        <>
                          <strong>Bintang</strong>

                          <FormGroup>
                            <ReactStars
                              {...starOptions}
                              value={values.bintang ? values.bintang : 0}
                              onChange={(newValue) => setFieldValue('rate', newValue)}
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

PenugasanDriver.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPenugasanDriver: PropTypes.func.isRequired,
  updatePenugasanDriver: PropTypes.func.isRequired,
  deletePenugasanDriver: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.penugasanDriver.isLoading,
  message: state.penugasanDriver.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPenugasanDriver: (formData, refresh) => dispatch(createPenugasanDriver(formData, refresh)),
  updatePenugasanDriver: (formData, id, refresh) =>
    dispatch(updatePenugasanDriver(formData, id, refresh)),
  deletePenugasanDriver: (id, refresh) => dispatch(deletePenugasanDriver(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPenugasanDriver(p),
    Component: withToggle({
      Component: PenugasanDriver,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
