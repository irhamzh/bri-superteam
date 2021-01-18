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
import Service from '../../../../../config/services'
import { CfInput, CfInputDate, CfInputRadio, ListCheckboxShow } from '../../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../../helpers'
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

class Machinery extends Component {
  state = {
    isShow: false,
    columns: [],
  }

  initialValues = {
    typePeralatanKerja: 'machinery',
    lowSpeedPolisherMachine: 'yes',
    wetDryVacuumCleaner: 'yes',
    jetSprayer: 'yes',
    blower: 'yes',
    signed: 'yes',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typePeralatanKerja: 'machinery',
    })

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
        Header: 'Low Speed Polisher Machine 17"',
        accessor: 'lowSpeedPolisherMachine',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Wet & Dry Vacuum Cleaner 20 lt',
        accessor: 'wetDryVacuumCleaner',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Jet Sprayer',
        accessor: 'jetSprayer',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Blower',
        accessor: 'blower',
        show: true,
        filterable: false,
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Signed',
        accessor: 'signed',
        show: true,
        filterable: false,
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
      },
    ]

    this.setState({ columns })
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

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { isShow, columns } = this.state
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

    const pageName = 'Machinery'
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
                          <ExcelColumn
                            label='Low Speed Polisher Machine 17"'
                            value={(col) =>
                              col.lowSpeedPolisherMachine === 'yes' ? 'Baik' : 'Tidak Baik'
                            }
                          />
                          <ExcelColumn
                            label="Wet &amp; Dry Vacuum Cleaner 20 lt"
                            value={(col) =>
                              col.wetDryVacuumCleaner === 'yes' ? 'Baik' : 'Tidak Baik'
                            }
                          />
                          <ExcelColumn
                            label="Jet Sprayer"
                            value={(col) => (col.jetSprayer === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Blower"
                            value={(col) => (col.blower === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Signed"
                            value={(col) => (col.signed === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn label="Keterangan" value="information" />
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
                          <h6>Low Speed Polisher Machine 17&quot;</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="lowSpeedPolisherMachine"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lowSpeedPolisherMachine"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Wet & Dry Vacuum Cleaner 20 lt</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="wetDryVacuumCleaner"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="wetDryVacuumCleaner"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Jet Sprayer</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="jetSprayer"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="jetSprayer"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Blower</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="blower" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="blower"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="6">
                          <h6>Signed</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="signed" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="signed"
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

Machinery.propTypes = {
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
      Component: Machinery,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
