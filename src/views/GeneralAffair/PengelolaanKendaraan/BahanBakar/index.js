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
import Service from '../../../../config/services'
import { CfAsyncSelect, CfInput, CfInputDate, ListCheckboxShow } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createGABahanBakar,
  updateGABahanBakar,
  deleteGABahanBakar,
} from '../../../../modules/generalAffair/pengelolaanKendaraan/bahanBakar/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class BahanBakar extends Component {
  state = {
    optKendaraan: [],
    dataKendaraan: [],
    isShow: false,
    columns: [],
  }

  initialValues = {}

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
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>
            {row.value ? `${row.value.platNomor} - ${row.value.merk} - ${row.value.color}` : ''}
          </div>
        ),
      },
      {
        Header: 'Jarak (KM)',
        accessor: 'jarak',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => Number(row.original.kmAkhir) - Number(row.original.kmAwal),
      },
      {
        Header: 'Bahan bakar diajukan',
        accessor: 'fuel',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
      },
    ]

    this.setState({
      optKendaraan,
      dataKendaraan,
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
    const { createGABahanBakar, updateGABahanBakar } = this.props
    if (!invalidValues.includes(id)) {
      const { vehicle } = values
      if (vehicle && Object.keys(vehicle).length > 0) {
        values.vehicle = vehicle.id || vehicle
      }
      updateGABahanBakar(values, id, this.doRefresh)
    } else {
      createGABahanBakar(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteGABahanBakar } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGABahanBakar(id, this.doRefresh)
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
    const { optKendaraan, dataKendaraan, isShow, columns } = this.state
    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        width: 150,
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
          </>
        ),
      },
    ]
    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Bahan Bakar'
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
                          <ExcelColumn
                            label="Jarak"
                            value={(col) => Number(col.kmAkhir) - Number(col.kmAwal)}
                          />
                          <ExcelColumn
                            label="Bahan Bakar yang diajukan"
                            value={(col) => col.fuel}
                          />
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
                {({ values, isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Data Bahan Bakar</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          isRequired
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
                          label="Km Awal"
                          type="number"
                          name="kmAwal"
                          isRequired
                          disabled
                          value={
                            dataKendaraan.find(
                              (obj) => obj.id === values.vehicle || obj.id === values.vehicle?.id
                            )?.kmAkhir
                          }
                          placeholder="Masukkan Km Awal"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Km Akhir"
                          type="number"
                          name="kmAkhir"
                          isRequired
                          placeholder="Masukkan Km Akhir"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Bahan Bakar Diajukan (Opsional)"
                          type="text"
                          name="fuel"
                          placeholder="Masukkan Bahan Bakar Diajukan"
                          component={CfInput}
                        />
                      </FormGroup>
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

BahanBakar.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGABahanBakar: PropTypes.func.isRequired,
  updateGABahanBakar: PropTypes.func.isRequired,
  deleteGABahanBakar: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.generalAffairBahanBakar.isLoading,
  message: state.generalAffairBahanBakar.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGABahanBakar: (formData, refresh) => dispatch(createGABahanBakar(formData, refresh)),
  updateGABahanBakar: (formData, id, refresh) =>
    dispatch(updateGABahanBakar(formData, id, refresh)),
  deleteGABahanBakar: (id, refresh) => dispatch(deleteGABahanBakar(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGABahanBakar(p),
    Component: withToggle({
      Component: BahanBakar,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
