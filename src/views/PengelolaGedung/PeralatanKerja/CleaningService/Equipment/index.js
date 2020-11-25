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
import { CfInput, CfInputDate, CfInputRadio } from '../../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createPeralatanKerja,
  updatePeralatanKerja,
  deletePeralatanKerja,
} from '../../../../../modules/peralatankerja/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class Equipment extends Component {
  initialValues = {
    typePeralatanKerja: 'equipment consumable',
    doubleBucket: 'yes',
    singleBucket: 'yes',
    lobbyDusterStick: 'yes',
    mopSet: 'yes',
    windowSqueeze: 'yes',
    windowWasher: 'yes',
    teleskopicPool: 'yes',
    floorSqueeze: 'yes',
    ember: 'yes',
    gayung: 'yes',
    tanggaAlumunium: 'yes',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typePeralatanKerja: 'equipment consumable',
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPeralatanKerja, updatePeralatanKerja } = this.props
    if (!invalidValues.includes(id)) {
      updatePeralatanKerja(values, id, this.doRefresh)
    } else {
      createPeralatanKerja(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePeralatanKerja } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePeralatanKerja(id, this.doRefresh)
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

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        width: 100,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Double Bucket',
        accessor: 'doubleBucket',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Single Bucket',
        accessor: 'singleBucket',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Lobby Duster-stick',
        accessor: 'lobbyDusterStick',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Mop Set',
        accessor: 'mopSet',
        filterable: false,
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Window Squeeze',
        accessor: 'windowSqueeze',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Window Washer',
        accessor: 'windowWasher',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Teleskop Pool 6',
        accessor: 'teleskopicPool',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Floor Squeeze',
        accessor: 'floorSqueeze',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Ember 15 lt',
        accessor: 'ember',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Gayung',
        accessor: 'gayung',
        filterable: false,
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Tangga Alumunium 2 M',
        accessor: 'tanggaAlumunium',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
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

    const pageName = 'Equipment & Consumable'
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
                          <ExcelColumn
                            label="Double Bucket"
                            value={(col) => (col.doubleBucket === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Single Bucket"
                            value={(col) => (col.singleBucket === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Lobby Duster-stick"
                            value={(col) =>
                              col.lobbyDusterStick === 'yes' ? 'Baik' : 'Tidak Baik'}
                          />
                          <ExcelColumn
                            label="Mop Set"
                            value={(col) => (col.mopSet === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Window Squeeze"
                            value={(col) => (col.windowSqueeze === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Window Washer"
                            value={(col) => (col.windowWasher === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Teleskop Pool 6"
                            value={(col) => (col.teleskopicPool === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Floor Squeeze"
                            value={(col) => (col.floorSqueeze === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Ember 15 lt"
                            value={(col) => (col.ember === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Gayung"
                            value={(col) => (col.gayung === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Tangga Alumunium 2M"
                            value={(col) => (col.tanggaAlumunium === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
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

                      <Row>
                        <Col sm="6">
                          <h6>Double Bucket</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="doubleBucket"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="doubleBucket"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Single Bucket</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="singleBucket"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="singleBucket"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Lobby Duster-stick</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="lobbyDusterStick"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lobbyDusterStick"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Mop Set</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="mopSet" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="mopSet"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Window Squeeze</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="windowSqueeze"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="windowSqueeze"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Window Washer</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="windowWasher"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="windowWasher"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Teleskopic Pool 6 M</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="teleskopicPool"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="teleskopicPool"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Floor Squeeze</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="floorSqueeze"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="floorSqueeze"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Ember 15 lt</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="ember" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="ember"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Gayung</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="gayung" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="gayung"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Tangga Alumunium 2M</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="tanggaAlumunium"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="tanggaAlumunium"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

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

Equipment.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPeralatanKerja: PropTypes.func.isRequired,
  updatePeralatanKerja: PropTypes.func.isRequired,
  deletePeralatanKerja: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.peralatanKerja.isLoading,
  message: state.peralatanKerja.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPeralatanKerja: (formData, refresh) => dispatch(createPeralatanKerja(formData, refresh)),
  updatePeralatanKerja: (formData, id, refresh) =>
    dispatch(updatePeralatanKerja(formData, id, refresh)),
  deletePeralatanKerja: (id, refresh) => dispatch(deletePeralatanKerja(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPeralatanKerja(p),
    Component: withToggle({
      Component: Equipment,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
