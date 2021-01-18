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
  createEngineerBasementSTP,
  updateEngineerBasementSTP,
  deleteEngineerBasementSTP,
} from '../../../../../modules/engineer/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class STP extends Component {
  state = {
    isShow: false,
    columns: [],
  }

  initialValues = {}

  componentDidMount() {
    // const { fetchQueryProps } = this.props

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Bulan',
        accessor: 'yearMonth',
        width: 100,
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Kondisi Pompa',
        accessor: 'pompa',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Kondisi Oli',
        accessor: 'oli',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },

      {
        Header: 'Kondisi Water Level Kontrol',
        accessor: 'waterLevelControl',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value === 'yes' ? 'Baik' : 'Tidak Baik'}</div>
        ),
      },
      {
        Header: 'Test Operasional',
        accessor: 'operasional',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
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
    const { createEngineerBasementSTP, updateEngineerBasementSTP } = this.props
    if (!invalidValues.includes(id)) {
      updateEngineerBasementSTP(values, id, this.doRefresh)
    } else {
      createEngineerBasementSTP(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteEngineerBasementSTP } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteEngineerBasementSTP(id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Huff',
            text: 'Hampir saja kamu kehilangan data ini',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // STP Server Error
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

    const pageName = 'Evaluasi STP'
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.yearMonth)} />
                          <ExcelColumn
                            label="Kondisi Pompa"
                            value={(col) => (col.pompa === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Kondisi Oli"
                            value={(col) => (col.oli === 'yes' ? 'Baik' : 'Tidak Baik')}
                          />
                          <ExcelColumn
                            label="Kondisi Water Level Kontrol"
                            value={(col) =>
                              col.waterLevelControl === 'yes' ? 'Baik' : 'Tidak Baik'
                            }
                          />
                          <ExcelColumn
                            label="Test Operasional"
                            value={(col) => (col.operasional === 'yes' ? 'Baik' : 'Tidak Baik')}
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
                          label="Bulan/Tahun"
                          name="yearMonth"
                          classIcon="fa fa-calendar"
                          blockLabel
                          // minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          showMonthYearPicker
                          showFullMonthYearPicker
                          dateFormat="MM/yyyy"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <h6>Kondisi Pompa</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="pompa" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="pompa"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <h6>Kondisi Oli</h6>
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

                      <Row>
                        <Col>
                          <h6>Kondisi Water Level Control</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="waterLevelControl"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="waterLevelControl"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <h6>Test Operasional</h6>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="operasional"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="operasional"
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

STP.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createEngineerBasementSTP: PropTypes.func.isRequired,
  updateEngineerBasementSTP: PropTypes.func.isRequired,
  deleteEngineerBasementSTP: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.engineer.isLoading,
  message: state.engineer.message,
})

const mapDispatchToProps = (dispatch) => ({
  createEngineerBasementSTP: (formData, refresh) =>
    dispatch(createEngineerBasementSTP(formData, refresh)),
  updateEngineerBasementSTP: (formData, id, refresh) =>
    dispatch(updateEngineerBasementSTP(formData, id, refresh)),
  deleteEngineerBasementSTP: (id, refresh) => dispatch(deleteEngineerBasementSTP(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getEngineerBasementSTP(p),
    Component: withToggle({
      Component: STP,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
