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
import {
  CfAsyncSelect,
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createKebersihanPendukung,
  updateKebersihanPendukung,
  deleteKebersihanPendukung,
} from '../../../../../modules/kebersihan/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Musholla extends Component {
  state = {
    optLokasi: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    typeSaranaPendukung: 'Musholla',
    dinding: true,
    pintu: true,
    ceiling: true,
    carpetSholat: true,
    sajadah: true,
    jamDinding: true,
    pajangan: true,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeSaranaPendukung: 'Musholla',
    })
    const resDataLokasi = await Service.getLokasi()
    const dataLokasi = resDataLokasi.data.data
    const optLokasi = dataLokasi.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        filterable: false,
        show: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Lokasi',
        accessor: 'location.name',
        show: true,
        filterable: true,
      },
      {
        Header: 'Pintu & List',
        accessor: 'pintu',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Dinding',
        accessor: 'dinding',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Ceiling',
        accessor: 'ceiling',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Carpet Sholat',
        accessor: 'carpetSholat',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Sajadah',
        accessor: 'sajadah',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Jam Dinding',
        accessor: 'jamDinding',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pajangan',
        accessor: 'pajangan',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
      },
    ]

    this.setState({ optLokasi, columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, location } = values
    const { createKebersihanPendukung, updateKebersihanPendukung } = this.props
    if (!invalidValues.includes(id)) {
      if (location && Object.keys(location).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.location = location.id || location
      }
      updateKebersihanPendukung(values, id, this.doRefresh)
    } else {
      createKebersihanPendukung(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteKebersihanPendukung } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteKebersihanPendukung(id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Huff',
            text: 'Hampir saja kamu kehilangan data ini',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Ruangan Server Error
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

  handleInputLokasi = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getLokasi(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optLokasi, isShow, columns } = this.state
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

    const pageName = 'Musholla'
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
                          <ExcelColumn label="Lokasi" value={(col) => col.location?.name} />
                          <ExcelColumn
                            label="Pintu & List"
                            value={(col) => (col.pintu ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Dinding"
                            value={(col) => (col.dinding ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Ceiling"
                            value={(col) => (col.ceiling ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Carpet Sholat"
                            value={(col) => (col.carpetSholat ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Sajadah"
                            value={(col) => (col.sajadah ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Jam Dinding"
                            value={(col) => (col.jamDinding ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pajangan"
                            value={(col) => (col.pajangan ? '✓' : '❌')}
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
              // size="lg"
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
                      <Row>
                        <Col sm="12">
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
                        </Col>

                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Lokasi"
                              cacheOptions
                              options={optLokasi}
                              defaultOptions
                              loadOptions={this.handleInputLokasi}
                              name="location"
                              isRequired
                              placeholder="Pilih atau cari Lokasi"
                              defaultValue={
                                values.location
                                  ? { value: values.location.id, label: values.location.name }
                                  : null
                              }
                              component={CfAsyncSelect}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <strong>Kondisi</strong>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field label="Pintu & List" name="pintu" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Dinding" name="dinding" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Ceiling" name="ceiling" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Carpet Sholat"
                            name="carpetSholat"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Sajadah" name="sajadah" component={CfInputCheckbox} />
                        </FormGroup>
                        <FormGroup>
                          <Field
                            label="Jam Dinding"
                            name="jamDinding"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Pajangan" name="pajangan" component={CfInputCheckbox} />
                        </FormGroup>
                      </div>

                      <br />
                      <Row>
                        <Col sm="12">
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
                        </Col>
                      </Row>
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

Musholla.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createKebersihanPendukung: PropTypes.func.isRequired,
  updateKebersihanPendukung: PropTypes.func.isRequired,
  deleteKebersihanPendukung: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.kebersihan.isLoading,
  message: state.kebersihan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createKebersihanPendukung: (formData, refresh) =>
    dispatch(createKebersihanPendukung(formData, refresh)),
  updateKebersihanPendukung: (formData, id, refresh) =>
    dispatch(updateKebersihanPendukung(formData, id, refresh)),
  deleteKebersihanPendukung: (id, refresh) => dispatch(deleteKebersihanPendukung(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getKebersihanPendukung(p),
    Component: withToggle({
      Component: Musholla,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
