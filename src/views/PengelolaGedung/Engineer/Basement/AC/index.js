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
import Service from '../../../../../config/services'
import { CfAsyncSelect, CfInput, CfInputDate, ListCheckboxShow } from '../../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createEngineerBasementAC,
  updateEngineerBasementAC,
  deleteEngineerBasementAC,
} from '../../../../../modules/engineer/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class AC extends Component {
  state = {
    optGedung: [],
    optLantai: [],
    optCompressor: [],
    isShow: false,
    columns: [],
  }

  initialValues = {}

  async componentDidMount() {
    // const { fetchQueryProps } = this.props

    const resDataGedung = await Service.getGedung()
    const dataGedung = resDataGedung.data.data
    const optGedung = dataGedung.map((row) => ({ label: row.name, value: row.id }))

    const resDataLantai = await Service.getLantai()
    const dataLantai = resDataLantai.data.data
    const optLantai = dataLantai.map((row) => ({ label: row.name, value: row.id }))

    const resDataCompressor = await Service.getCompressor()
    const dataCompressor = resDataCompressor.data.data
    const optCompressor = dataCompressor.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        width: 100,
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Gedung',
        accessor: 'building.name',
        show: true,
        filterable: true,
      },
      {
        Header: 'Lantai',
        accessor: 'floor.name',
        show: true,
        filterable: true,
      },
      {
        Header: 'Compressor',
        accessor: 'compressor.name',
        show: true,
        filterable: true,
      },
      {
        Header: 'Ampere R',
        accessor: 'ukuranAmpereR',
        show: true,
        filterable: false,
      },
      {
        Header: 'Ampere S',
        accessor: 'ukuranAmpereS',
        show: true,
        filterable: false,
      },
      {
        Header: 'Ampere T',
        accessor: 'ukuranAmpereT',
        show: true,
        filterable: false,
      },
    ]

    this.setState({ optGedung, optLantai, optCompressor, columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, building, floor, compressor } = values
    const { createEngineerBasementAC, updateEngineerBasementAC } = this.props
    if (!invalidValues.includes(id)) {
      if (building && Object.keys(building).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.building = building.id || building
      }
      if (floor && Object.keys(floor).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.floor = floor.id || floor
      }
      if (compressor && Object.keys(compressor).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.compressor = compressor.id || compressor
      }
      updateEngineerBasementAC(values, id, this.doRefresh)
    } else {
      createEngineerBasementAC(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteEngineerBasementAC } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteEngineerBasementAC(id, this.doRefresh)
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

  handleInputGedung = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getGedung(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  handleInputLantai = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getLantai(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  handleInputCompressor = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getCompressor(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optCompressor, optGedung, optLantai, isShow, columns } = this.state
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

    const pageName = 'AC'
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
                          <ExcelColumn label="Gedung" value={(col) => col.building?.name} />
                          <ExcelColumn label="Lantai" value={(col) => col.floor?.name} />
                          <ExcelColumn label="Compressor" value={(col) => col.compressor?.name} />
                          <ExcelColumn label="Ampere R" value="ukuranAmpereR" />
                          <ExcelColumn label="Ampere S" value="ukuranAmpereS" />
                          <ExcelColumn label="Ampere T" value="ukuranAmpereT" />
                          <ExcelColumn
                            label="Penggunaan"
                            value={(col) => Number(col.meterAkhir) - Number(col.meterAwal)}
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
                {({ values, isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Tambah Data</ModalHeader>
                    <ModalBody>
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
                          label="Gedung"
                          cacheOptions
                          options={optGedung}
                          defaultOptions
                          loadOptions={this.handleInputGedung}
                          name="building"
                          isRequired
                          placeholder="Pilih atau cari Gedung"
                          defaultValue={
                            values.building
                              ? { value: values.building.id, label: values.building.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Lantai"
                          cacheOptions
                          options={optLantai}
                          defaultOptions
                          loadOptions={this.handleInputLantai}
                          name="floor"
                          isRequired
                          placeholder="Pilih atau cari Lantai"
                          defaultValue={
                            values.floor
                              ? { value: values.floor.id, label: values.floor.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Compressor"
                          cacheOptions
                          options={optCompressor}
                          defaultOptions
                          loadOptions={this.handleInputCompressor}
                          name="compressor"
                          isRequired
                          placeholder="Pilih atau cari Compressor"
                          defaultValue={
                            values.compressor
                              ? { value: values.compressor.id, label: values.compressor.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Ukuran Ampere R"
                          type="text"
                          name="ukuranAmpereR"
                          isRequired
                          placeholder="Masukkan Ampere R"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Ukuran Ampere S"
                          type="text"
                          name="ukuranAmpereS"
                          isRequired
                          placeholder="Masukkan Ampere S"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Ukuran Ampere T"
                          type="text"
                          name="ukuranAmpereT"
                          isRequired
                          placeholder="Masukkan Ampere T"
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

AC.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createEngineerBasementAC: PropTypes.func.isRequired,
  updateEngineerBasementAC: PropTypes.func.isRequired,
  deleteEngineerBasementAC: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.engineer.isLoading,
  message: state.engineer.message,
})

const mapDispatchToProps = (dispatch) => ({
  createEngineerBasementAC: (formData, refresh) =>
    dispatch(createEngineerBasementAC(formData, refresh)),
  updateEngineerBasementAC: (formData, id, refresh) =>
    dispatch(updateEngineerBasementAC(formData, id, refresh)),
  deleteEngineerBasementAC: (id, refresh) => dispatch(deleteEngineerBasementAC(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getEngineerBasementAC(p),
    Component: withToggle({
      Component: AC,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
