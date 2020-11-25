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
class Toilet extends Component {
  state = {
    optLokasi: [],
  }

  initialValues = {
    typeInnovationBuilding: 'Toilet',
    wastafel: true,
    kloset: true,
    urinoir: true,
    kaca: true,
    lantai: true,
    dinding: true,
    tempatSampah: true,
    handDryer: true,
    handSoap: true,
    tissue: true,
    pengharum: true,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typeInnovationBuilding: 'Toilet',
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
        Header: 'Wastafel',
        accessor: 'wastafel',
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
        Header: 'Kloset',
        accessor: 'kloset',
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
        Header: 'Urinoir',
        accessor: 'urinoir',
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
        Header: 'Kaca',
        accessor: 'kaca',
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
        Header: 'Lantai',
        accessor: 'lantai',
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
        Header: 'Dinding',
        accessor: 'dinding',
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
        Header: 'Tempat Sampah',
        accessor: 'tempatSampah',
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
        Header: 'Hand Dryer',
        accessor: 'handDryer',
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
        Header: 'Hand Soap',
        accessor: 'handSoap',
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
        Header: 'Tissue',
        accessor: 'tissue',
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
        Header: 'Pengharum',
        accessor: 'pengharum',
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

    const pageName = 'Toilet'
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
                            label="Wastafel"
                            value={(col) => (col.wastafel ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Kloset" value={(col) => (col.kloset ? '✓' : '❌')} />
                          <ExcelColumn
                            label="Urinoir"
                            value={(col) => (col.urinoir ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Kaca" value={(col) => (col.kaca ? '✓' : '❌')} />
                          <ExcelColumn label="Lantai" value={(col) => (col.lantai ? '✓' : '❌')} />
                          <ExcelColumn
                            label="Dinding"
                            value={(col) => (col.dinding ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Tempat Sampah"
                            value={(col) => (col.tempatSampah ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Hand Dryer"
                            value={(col) => (col.handDryer ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Hand Soap"
                            value={(col) => (col.handSoap ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Tissue" value={(col) => (col.tissue ? '✓' : '❌')} />
                          <ExcelColumn
                            label="Pengharum"
                            value={(col) => (col.pengharum ? '✓' : '❌')}
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
                          <Field label="Wastafel" name="wastafel" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Kloaset" name="kloset" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Urinoir" name="urinoir" component={CfInputCheckbox} />
                        </FormGroup>
                        <FormGroup>
                          <Field label="Kaca" name="kaca" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Lantai" name="lantai" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Dinding" name="dinding" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Tempat Sampah"
                            name="tempatSampah"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Hand Dryer" name="handDryer" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Hand Soap" name="handSoap" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Tissue" name="tissue" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Pengharum" name="pengharum" component={CfInputCheckbox} />
                        </FormGroup>
                      </div>
                      {/* <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Wastafel</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="wastafel"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="wastafel"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Kloset</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="kloset" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="kloset"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Urinoir</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="urinoir" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="urinoir"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Kaca</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="kaca" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="kaca"
                              id="Tidak Baik"
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
                            <Field label="Baik" name="lantai" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lantai"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Dinding</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="dinding" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="dinding"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Tempat Sampah</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="tempatSampah"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="tempatSampah"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Hand Dryer</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="handDryer"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="handDryer"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Hand Soap</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="handSoap"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="handSoap"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Tissue</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="tissue" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="tissue"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Pengharum</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="pengharum"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="pengharum"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col />
                        <Col />
                        <Col />
                      </Row> */}

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

Toilet.propTypes = {
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
      Component: Toilet,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
