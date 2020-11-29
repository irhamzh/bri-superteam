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
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createEngineerBasementPlumbing,
  updateEngineerBasementPlumbing,
  deleteEngineerBasementPlumbing,
} from '../../../../../modules/engineer/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class Plumbing extends Component {
  state = {
    optPompa: [],
    optUnitPompa: [],
  }

  initialValues = {
    valve: 'Baik',
    bearing: 'Baik',
    oli: 'Baik',
  }

  async componentDidMount() {
    const resDataPompa = await Service.getPompa()
    const dataPompa = resDataPompa.data.data
    const optPompa = dataPompa.map((row) => ({ label: row.name, value: row.id }))

    const resDataUnitPompa = await Service.getUnitPompa()
    const dataUnitPompa = resDataUnitPompa.data.data
    const optUnitPompa = dataUnitPompa.map((row) => ({ label: row.nameUnit, value: row.id }))

    this.setState({ optPompa, optUnitPompa })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createEngineerBasementPlumbing, updateEngineerBasementPlumbing } = this.props
    if (!invalidValues.includes(id)) {
      updateEngineerBasementPlumbing(values, id, this.doRefresh)
    } else {
      createEngineerBasementPlumbing(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteEngineerBasementPlumbing } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteEngineerBasementPlumbing(id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Huff',
            text: 'Hampir saja kamu kehilangan data ini',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Plumbing Server Error
      })
  }

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optPompa, optUnitPompa } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        width: 100,
        filterable: false,
      },
      {
        Header: 'Pompa',
        accessor: 'pump.name',
        filterable: false,
      },
      {
        Header: 'Unit',
        accessor: 'unit.nameUnit',
        filterable: false,
      },
      {
        Header: 'Voltase',
        accessor: 'voltase',
        filterable: false,
      },
      {
        Header: 'Kondisi Valve',
        accessor: 'valve',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Kondisi Bearing',
        accessor: 'bearing',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Oli',
        accessor: 'oli',
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Kebocoran',
        accessor: 'kebocoran',
        filterable: false,
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

    const pageName = 'Evaluasi Plumbing'
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
                          <ExcelColumn label="Pompa" value={(col) => col.pump?.name} />
                          <ExcelColumn label="Unit Pompa" value={(col) => col.unit?.nameUnit} />
                          <ExcelColumn label="Voltase" value="voltase" />
                          <ExcelColumn
                            label="Kondisi Valve"
                            value={(col) => (col.valve === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Kondisi Bearing"
                            value={(col) => (col.bearing === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Oli"
                            value={(col) => (col.oli === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn label="Kebocoran" value="kebocoran" />
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

                      <FormGroup>
                        <Field
                          label="Pompa"
                          options={optPompa}
                          isRequired
                          name="pump"
                          placeholder="Pilih atau Cari Pompa"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Unit"
                          options={optUnitPompa}
                          isRequired
                          name="unit"
                          placeholder="Pilih atau Cari Unit"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Voltase"
                          type="text"
                          name="voltase"
                          isRequired
                          placeholder="Masukkan Voltase"
                          component={CfInput}
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <h6>Kondisi Valve</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="valve" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="valve"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <h6>Kondisi Bearing</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="bearing" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="bearing"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <h6>Oli</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="oli" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Tidak Baik" name="oli" id="no" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Field
                          label="Kebocoran"
                          type="text"
                          name="kebocoran"
                          isRequired
                          placeholder="Masukkan Kebocoran"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Keterangan"
                          type="text"
                          name="information"
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

Plumbing.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createEngineerBasementPlumbing: PropTypes.func.isRequired,
  updateEngineerBasementPlumbing: PropTypes.func.isRequired,
  deleteEngineerBasementPlumbing: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.engineer.isLoading,
  message: state.engineer.message,
})

const mapDispatchToProps = (dispatch) => ({
  createEngineerBasementPlumbing: (formData, refresh) =>
    dispatch(createEngineerBasementPlumbing(formData, refresh)),
  updateEngineerBasementPlumbing: (formData, id, refresh) =>
    dispatch(updateEngineerBasementPlumbing(formData, id, refresh)),
  deleteEngineerBasementPlumbing: (id, refresh) =>
    dispatch(deleteEngineerBasementPlumbing(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getEngineerBasementPlumbing(p),
    Component: withToggle({
      Component: Plumbing,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
