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
import { CfInput, CfInputDate, CfInputRadio, CfSelect } from '../../../../../components'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../../helpers'
import {
  createEngineerGedungRoom,
  updateEngineerGedungRoom,
  deleteEngineerGedungRoom,
} from '../../../../../modules/engineer/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class Ruangan extends Component {
  state = {
    optJenisGedung: [],
    optJenisRuangan: [],
    optRuangan: [],
  }

  initialValues = {
    plafond: 'Baik',
    dinding: 'Baik',
    lantai: 'Baik',
    pintu: 'Baik',
    jendela: 'Baik',
    kursi: 'Baik',
    meja: 'Baik',
    lampu: 'Baik',
    kasur: 'Baik',
    lemari: 'Baik',
    toilet: 'Baik',
    peralatanLain: 'Baik',
  }

  async componentDidMount() {
    const resDataJenisGedung = await Service.getJenisGedung()
    const dataJenisGedung = resDataJenisGedung.data.data
    const optJenisGedung = dataJenisGedung.map((row) => ({ label: row.name, value: row.id }))

    const resDataJenisRuangan = await Service.getJenisRuangan()
    const dataJenisRuangan = resDataJenisRuangan.data.data
    const optJenisRuangan = dataJenisRuangan.map((row) => ({ label: row.name, value: row.id }))

    const resDataRuangan = await Service.getRoom()
    const dataRuangan = resDataRuangan.data.data
    const optRuangan = dataRuangan.map((row) => ({ label: row.name, value: row.id }))

    this.setState({ optJenisGedung, optJenisRuangan, optRuangan })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createEngineerGedungRoom, updateEngineerGedungRoom } = this.props
    if (!invalidValues.includes(id)) {
      updateEngineerGedungRoom(values, id, this.doRefresh)
    } else {
      createEngineerGedungRoom(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteEngineerGedungRoom } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteEngineerGedungRoom(id, this.doRefresh)
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

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optJenisGedung, optJenisRuangan, optRuangan } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Gedung',
        accessor: 'buildingType.name',
        filterable: false,
      },
      {
        Header: 'Jenis Ruangan',
        accessor: 'roomType.name',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Ruangan',
        accessor: 'ruangan.name',
        filterable: false,
      },
      {
        Header: 'Plafond',
        accessor: 'plafond',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Dinding',
        accessor: 'dinding',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Lantai',
        accessor: 'lantai',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Pintu',
        accessor: 'pintu',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Jendela',
        accessor: 'jendela',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Kursi',
        accessor: 'kursi',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Meja',
        accessor: 'meja',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Lampu',
        accessor: 'lampu',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Kasur',
        accessor: 'kasur',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Lemari',
        accessor: 'lemari',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Toilet',
        accessor: 'toilet',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Peralatan Lainnya',
        accessor: 'peralatanLainnya',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        filterable: false,
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

    const pageName = 'Ruangan'
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
                          <ExcelColumn
                            label="Jenis Gedung"
                            value={(col) => col.buildingType?.name}
                          />
                          <ExcelColumn label="Jenis Ruangan" value={(col) => col.roomType?.name} />
                          <ExcelColumn label="Ruangan" value={(col) => col.ruangan?.name} />
                          <ExcelColumn label="Plafond" value="plafond" />
                          <ExcelColumn label="Dinding" value="dinding" />
                          <ExcelColumn label="Lantai" value="lantai" />
                          <ExcelColumn label="Pintu" value="pintu" />
                          <ExcelColumn label="Jendela" value="jendela" />
                          <ExcelColumn label="Kursi" value="kursi" />
                          <ExcelColumn label="Meja" value="meja" />
                          <ExcelColumn label="Lampu" value="lampu" />
                          <ExcelColumn label="Kasur" value="kasur" />
                          <ExcelColumn label="Lemari" value="lemari" />
                          <ExcelColumn label="Toilet" value="toilet" />
                          <ExcelColumn label="Peralatan Lainnya" value="peralatanLainnya" />
                          <ExcelColumn label="Keterangan" value="information" />
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
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Tambah Data</ModalHeader>
                    <ModalBody>
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Tanggal"
                              name="tanggal"
                              classIcon="fa fa-calendar"
                              blockLabel
                              minDate={new Date()}
                              isRequired
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Jenis Gedung"
                              options={optJenisGedung}
                              isRequired
                              name="buildingType"
                              placeholder="Pilih atau Cari Jenis Gedung"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Jenis Ruangan"
                              options={optJenisRuangan}
                              isRequired
                              name="roomType"
                              placeholder="Pilih atau Cari Jenis Ruangan"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Ruangan"
                              options={optRuangan}
                              isRequired
                              name="ruangan"
                              placeholder="Pilih atau Cari Ruangan"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <strong>Kondisi</strong>
                      <br />
                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Plafond</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="plafond" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="plafond"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Dinding</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="dinding" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="dinding"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Lantai</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="lantai" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lantai"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Pintu</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="pintu" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="pintu"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Jendela</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="jendela" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="jendela"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <em>Kursi</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="kursi" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="kursi"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Meja</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="meja" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="meja"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <em>Lampu</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="lampu" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lampu"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Kasur</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="kasur" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="kasur"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Lemari</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="lemari" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lemari"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Toilet</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="toilet" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="toilet"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Peralatan Lainnya</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="peralatanLainnya"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="peralatanLainnya"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <br />
                      <Row>
                        <Col sm="6">
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

Ruangan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createEngineerGedungRoom: PropTypes.func.isRequired,
  updateEngineerGedungRoom: PropTypes.func.isRequired,
  deleteEngineerGedungRoom: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.engineer.isLoading,
  message: state.engineer.message,
})

const mapDispatchToProps = (dispatch) => ({
  createEngineerGedungRoom: (formData, refresh) =>
    dispatch(createEngineerGedungRoom(formData, refresh)),
  updateEngineerGedungRoom: (formData, id, refresh) =>
    dispatch(updateEngineerGedungRoom(formData, id, refresh)),
  deleteEngineerGedungRoom: (id, refresh) => dispatch(deleteEngineerGedungRoom(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getEngineerGedungRoom(p),
    Component: withToggle({
      Component: Ruangan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
