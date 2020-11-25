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
import { CfInput, CfInputCheckbox, CfInputDate, CfSelect } from '../../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createKebersihanInnovation,
  updateKebersihanInnovation,
  deleteKebersihanInnovation,
} from '../../../../../modules/kebersihan/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class SelasarLobby extends Component {
  state = {
    optLokasi: [],
  }

  initialValues = {
    typeInnovationBuilding: 'Selasar Dan Lobby',
    lantaiGranit: true,
    dindingGranit: true,
    boxHydrant: true,
    signage: true,
    stainlessSteel: true,
    dropOffArea: true,
    kacaFasad: true,
    frontDesk: true,
    mediaInformasi: true,
    atm: true,
    standingAshtray: true,
    kacaDalam: true,
    plafond: true,
    grillAC: true,
    kapLampu: true,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeInnovationBuilding: 'Selasar Dan Lobby',
    })
    const resDataLokasi = await Service.getLokasi()
    const dataLokasi = resDataLokasi.data.data
    const optLokasi = dataLokasi.map((row) => ({ label: row.name, value: row.id }))

    this.setState({ optLokasi })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createKebersihanInnovation, updateKebersihanInnovation } = this.props
    if (!invalidValues.includes(id)) {
      updateKebersihanInnovation(values, id, this.doRefresh)
    } else {
      createKebersihanInnovation(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteKebersihanInnovation } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteKebersihanInnovation(id, this.doRefresh)
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
    const { optLokasi } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Lokasi',
        accessor: 'location.name',
        filterable: false,
      },
      {
        Header: 'Lantai Granit',
        accessor: 'lantaiGranit',
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
        Header: 'Dinding Granit',
        accessor: 'dindingGranit',
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
        Header: 'Box Hydrant',
        accessor: 'boxHydrant',
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
        Header: 'Signage',
        accessor: 'signage',
        filterable: false,
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
        Header: 'Stainless Steel',
        accessor: 'stainlessSteel',
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
        Header: 'Drop Off Area',
        accessor: 'dropOffArea',
        filterable: false,
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
        Header: 'Kaca Fasad',
        accessor: 'kacaFasad',
        filterable: false,
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
        Header: 'Front Desk',
        accessor: 'frontDesk',
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
        Header: 'Media Informasi',
        accessor: 'mediaInformasi',
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
        Header: 'ATM',
        accessor: 'atm',
        filterable: false,
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
        Header: 'Standing Ashtray',
        accessor: 'standingAshtray',
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
        Header: 'Kaca Dalam',
        accessor: 'kacaDalam',
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
        Header: 'Plafond',
        accessor: 'plafond',
        filterable: false,
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
        Header: 'Grill AC',
        accessor: 'grillAC',
        filterable: false,
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
        Header: 'Kap Lampu',
        accessor: 'kapLampu',
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

    const pageName = 'Selasar Dan Lobby'
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.tanggal)} />
                          <ExcelColumn label="Lokasi" value={(col) => col.location?.name} />
                          <ExcelColumn
                            label="Lantai Granit"
                            value={(col) => (col.lantaiGranit ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Dinding Granit"
                            value={(col) => (col.dindingGranit ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Box Hydrant"
                            value={(col) => (col.boxHydrant ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Signage"
                            value={(col) => (col.signage ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Stainless Steel"
                            value={(col) => (col.stainlessSteel ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Drop Off Area"
                            value={(col) => (col.dropOffArea ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Kaca Fasad"
                            value={(col) => (col.kacaFasad ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Front Desk"
                            value={(col) => (col.frontDesk ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Media Informasi"
                            value={(col) => (col.mediaInformasi ? '✓' : '❌')}
                          />
                          <ExcelColumn label="ATM" value={(col) => (col.atm ? '✓' : '❌')} />
                          <ExcelColumn
                            label="Standing Ashtray"
                            value={(col) => (col.standingAshtray ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Kaca Dalam"
                            value={(col) => (col.kacaDalam ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Plafond"
                            value={(col) => (col.plafond ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Grill AC"
                            value={(col) => (col.grillAC ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Kap Lampu"
                            value={(col) => (col.kapLampu ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Keterangan" value={(col) => col.information} />
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
                {({ isSubmitting }) => (
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
                              minDate={new Date()}
                              isRequired
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="12">
                          <FormGroup>
                            <Field
                              label="Lokasi"
                              options={optLokasi}
                              isRequired
                              name="location"
                              placeholder="Pilih atau Cari Lokasi"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <strong>Kondisi</strong>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field
                            label="Lantai Granit"
                            name="lantaiGranit"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Dinding Granit"
                            name="dindingGranit"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Box Hydrant"
                            name="boxHydrant"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Field label="Signage" name="signage" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Stainless Steel"
                            name="stainlessSteel"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Drop Off Area"
                            name="dropOffArea"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Kaca Fasad" name="kacaFasad" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Front Desk" name="frontDesk" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Media Informasi"
                            name="mediaInformasi"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="ATM" name="atm" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Standing Ashtray"
                            name="standingAshtray"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Kaca Dalam" name="kacaDalam" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Plafond" name="plafond" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Grill AC" name="grillAC" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Kap Lampu" name="kapLampu" component={CfInputCheckbox} />
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

SelasarLobby.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createKebersihanInnovation: PropTypes.func.isRequired,
  updateKebersihanInnovation: PropTypes.func.isRequired,
  deleteKebersihanInnovation: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.kebersihan.isLoading,
  message: state.kebersihan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createKebersihanInnovation: (formData, refresh) =>
    dispatch(createKebersihanInnovation(formData, refresh)),
  updateKebersihanInnovation: (formData, id, refresh) =>
    dispatch(updateKebersihanInnovation(formData, id, refresh)),
  deleteKebersihanInnovation: (id, refresh) => dispatch(deleteKebersihanInnovation(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getKebersihanInnovation(p),
    Component: withToggle({
      Component: SelasarLobby,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
