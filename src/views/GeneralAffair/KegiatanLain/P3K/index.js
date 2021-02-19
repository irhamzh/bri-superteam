/* eslint-disable no-param-reassign */
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
import {
  CfAsyncSelect,
  CfInput,
  CfInputDate,
  CfSelect,
  ListCheckboxShow,
} from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createAktivitasFirstAid,
  updateAktivitasFirstAid,
  deleteAktivitasFirstAid,
} from '../../../../modules/generalAffair/aktivitas/firstAid/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class P3K extends Component {
  state = {
    optJenisObat: [],
    optArea: [],
    isShow: false,
    columns: [],
  }

  initialValues = {}

  async componentDidMount() {
    // const { fetchQueryProps } = this.props

    const resDataJenisObat = await Service.getJenisObat()
    const dataJenisObat = resDataJenisObat.data.data
    const optJenisObat = dataJenisObat.map((row) => ({ label: row.name, value: row.id }))

    // const resDataArea = await Service.getArea()
    // const dataArea = resDataArea.data.data
    // const optArea = dataArea.map((row) => ({ label: row.name, value: row.id }))

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
        Header: 'Area',
        accessor: 'area',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jenis Obat',
        accessor: 'medicineType.name',
        show: true,
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah',
        accessor: 'jumlah',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Expired Date',
        accessor: 'expired',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    this.setState({
      optJenisObat,
      // optArea,
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
    const { createAktivitasFirstAid, updateAktivitasFirstAid } = this.props
    if (!invalidValues.includes(id)) {
      const { medicineType } = values
      // if (area && Object.keys(area).length > 0) {
      //   values.area = area.id || area
      // }
      if (medicineType && Object.keys(medicineType).length > 0) {
        values.medicineType = medicineType.id || medicineType
      }
      updateAktivitasFirstAid(values, id, this.doRefresh)
    } else {
      createAktivitasFirstAid(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteAktivitasFirstAid } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteAktivitasFirstAid(id, this.doRefresh)
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

  handleInputJenisObat = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getJenisObat(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: row.name,
        value: row.id,
      }))
    })
    return option
  }

  handleInputArea = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getArea(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: row.name,
        value: row.id,
      }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optJenisObat, isShow, columns } = this.state
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

    const pageName = 'P3K'
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
                          <ExcelColumn label="Area" value={(col) => col.area} />
                          <ExcelColumn label="Jenis Obat" value={(col) => col.medicineType?.name} />
                          <ExcelColumn label="Jumlah" value={(col) => col.jumlah} />
                          <ExcelColumn
                            label="Expired Date"
                            value={(col) => formatDate(col.expired)}
                          />
                          <ExcelColumn label="Keterangan" value={(col) => col.information} />
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
                    <ModalHeader toggle={modalForm.hide}>Data P3K</ModalHeader>
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

                      {/* <FormGroup>
                        <Field
                          label="Area"
                          cacheOptions
                          options={optArea}
                          defaultOptions
                          loadOptions={this.handleInputArea}
                          name="area"
                          isRequired
                          placeholder="Pilih atau cari"
                          defaultValue={
                            values.area
                              ? {
                                  value: values.area.id,
                                  label: values.area.name,
                                }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup> */}

                      <FormGroup>
                        <Field
                          label="Area"
                          options={[
                            { value: 'Lantai 1', label: 'Lantai 1' },
                            { value: 'Lantai 2', label: 'Lantai 2' },
                            { value: 'Lantai 3', label: 'Lantai 3' },
                            { value: 'Lantai 4', label: 'Lantai 4' },
                            { value: 'Lantai 5', label: 'Lantai 5' },
                            { value: 'Lantai 6', label: 'Lantai 6' },
                          ]}
                          isRequired
                          name="area"
                          isDisabled={!!values.id}
                          placeholder="Pilih atau Cari"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jenis Obat"
                          cacheOptions
                          options={optJenisObat}
                          defaultOptions
                          loadOptions={this.handleInputJenisObat}
                          name="medicineType"
                          isRequired
                          placeholder="Pilih atau cari"
                          defaultValue={
                            values.medicineType
                              ? {
                                  value: values.medicineType.id,
                                  label: values.medicineType.name,
                                }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jumlah"
                          type="number"
                          name="jumlah"
                          isRequired
                          placeholder="Masukkan Jumlah"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Expired Date"
                          name="expired"
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
                          label="Keterangan"
                          type="text"
                          name="information"
                          isRequired
                          placeholder="Masukkan Keterangan"
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

P3K.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createAktivitasFirstAid: PropTypes.func.isRequired,
  updateAktivitasFirstAid: PropTypes.func.isRequired,
  deleteAktivitasFirstAid: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.aktivitasFirstAid.isLoading,
  message: state.aktivitasFirstAid.message,
})

const mapDispatchToProps = (dispatch) => ({
  createAktivitasFirstAid: (formData, refresh) =>
    dispatch(createAktivitasFirstAid(formData, refresh)),
  updateAktivitasFirstAid: (formData, id, refresh) =>
    dispatch(updateAktivitasFirstAid(formData, id, refresh)),
  deleteAktivitasFirstAid: (id, refresh) => dispatch(deleteAktivitasFirstAid(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getAktivitasFirstAid(p),
    Component: withToggle({
      Component: P3K,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
