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
  CfInputCheckbox,
  CfInputDate,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createKebersihanSmart,
  updateKebersihanSmart,
  deleteKebersihanSmart,
} from '../../../../modules/kebersihan/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class SmartBuilding extends Component {
  state = {
    optLokasi: [],
    optRuangan: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    plafond: true,
    dinding: true,
    lantai: true,
    pintu: true,
    jendela: true,
    kursi: true,
    meja: true,
    lampu: true,
  }

  async componentDidMount() {
    // const { fetchQueryProps } = this.props

    const resDataLokasi = await Service.getLokasi()
    const dataLokasi = resDataLokasi.data.data
    const optLokasi = dataLokasi.map((row) => ({ label: row.name, value: row.id }))

    const resDataRuangan = await Service.getRoom()
    const dataRuangan = resDataRuangan.data.data
    const optRuangan = dataRuangan.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
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
        Header: 'Ruangan',
        accessor: 'ruangan.name',
        show: true,
        filterable: true,
      },
      {
        Header: 'Plafond',
        accessor: 'plafond',
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
        Header: 'Lantai',
        accessor: 'lantai',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pintu',
        accessor: 'pintu',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Jendela',
        accessor: 'jendela',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Kursi',
        accessor: 'kursi',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Meja',
        accessor: 'meja',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Lampu',
        accessor: 'lampu',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'BKS',
        accessor: 'bks',
        show: true,
        filterable: false,
      },
      {
        Header: 'LH',
        accessor: 'lh',
        show: true,
        filterable: false,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
      },
    ]

    this.setState({ optLokasi, optRuangan, columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, location, ruangan } = values
    const { createKebersihanSmart, updateKebersihanSmart } = this.props
    if (!invalidValues.includes(id)) {
      if (location && Object.keys(location).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.location = location.id || location
      }
      if (ruangan && Object.keys(ruangan).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.ruangan = ruangan.id || ruangan
      }
      updateKebersihanSmart(values, id, this.doRefresh)
    } else {
      createKebersihanSmart(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteKebersihanSmart } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteKebersihanSmart(id, this.doRefresh)
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

  handleInputRuangan = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getRoom(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
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
    const { optLokasi, optRuangan, isShow, columns } = this.state
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

    const pageName = 'Smart Building'
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
                          <ExcelColumn label="Lokasi" value={(col) => col.location?.name} />
                          <ExcelColumn label="Ruangan" value={(col) => col.ruangan?.name} />
                          <ExcelColumn
                            label="Plafond"
                            value={(col) => (col.plafond ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Dinding"
                            value={(col) => (col.dinding ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Lantai" value={(col) => (col.lantai ? '✓' : '❌')} />
                          <ExcelColumn label="Pintu" value={(col) => (col.pintu ? '✓' : '❌')} />
                          <ExcelColumn
                            label="Jendela"
                            value={(col) => (col.jendela ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Kursi" value={(col) => (col.kursi ? '✓' : '❌')} />
                          <ExcelColumn label="Meja" value={(col) => (col.meja ? '✓' : '❌')} />
                          <ExcelColumn label="Lampu" value={(col) => (col.lampu ? '✓' : '❌')} />
                          <ExcelColumn label="BKS" value={(col) => col.bks} />
                          <ExcelColumn label="LH" value={(col) => col.lh} />
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
                    <ModalHeader toggle={modalForm.hide}>Form Smart Building</ModalHeader>
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

                      <FormGroup>
                        <Field
                          label="Ruangan"
                          cacheOptions
                          options={optRuangan}
                          defaultOptions
                          loadOptions={this.handleInputRuangan}
                          name="ruangan"
                          isRequired
                          placeholder="Pilih atau cari Ruangan"
                          defaultValue={
                            values.ruangan
                              ? { value: values.ruangan.id, label: values.ruangan.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <strong>Kondisi</strong>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field label="Plafond" name="plafond" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Dinding" name="dinding" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Lantai" name="lantai" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Pintu" name="pintu" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Jendela" name="jendela" component={CfInputCheckbox} />
                        </FormGroup>
                        <FormGroup>
                          <Field label="Kursi" name="kursi" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Meja" name="meja" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Lampu" name="lampu" component={CfInputCheckbox} />
                        </FormGroup>
                      </div>

                      <br />
                      <FormGroup>
                        <Field
                          label="BKS"
                          type="text"
                          name="bks"
                          isRequired
                          placeholder="Masukkan BKS"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="LH"
                          type="text"
                          name="lh"
                          isRequired
                          placeholder="Masukkan LH"
                          component={CfInput}
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

SmartBuilding.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createKebersihanSmart: PropTypes.func.isRequired,
  updateKebersihanSmart: PropTypes.func.isRequired,
  deleteKebersihanSmart: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.kebersihan.isLoading,
  message: state.kebersihan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createKebersihanSmart: (formData, refresh) => dispatch(createKebersihanSmart(formData, refresh)),
  updateKebersihanSmart: (formData, id, refresh) =>
    dispatch(updateKebersihanSmart(formData, id, refresh)),
  deleteKebersihanSmart: (id, refresh) => dispatch(deleteKebersihanSmart(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getKebersihanSmart(p),
    Component: withToggle({
      Component: SmartBuilding,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
