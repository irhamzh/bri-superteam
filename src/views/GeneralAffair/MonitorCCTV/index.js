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
import Service from '../../../config/services'
import {
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../helpers'
import {
  createMonitorCCTV,
  updateMonitorCCTV,
  deleteMonitorCCTV,
} from '../../../modules/generalAffair/monitorCCTV/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class MonitorCCTV extends Component {
  state = {
    isShow: false,
    columns: [],
  }

  initialValues = {
    cctvOutdor: false,
    gedungAlantai1: false,
    gedungAlantai2: false,
  }

  componentDidMount() {
    // const { fetchQueryProps } = this.props
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
        Header: 'Backup CCTV',
        accessor: 'backupCCTV',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        columns: [
          {
            Header: 'Gedung A - Lantai 1',
            accessor: 'gedungAlantai1',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <IconSuccessOrFailed value={row.value} />,
          },
          {
            Header: 'Gedung A - Lantai 2',
            accessor: 'gedungAlantai2',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <IconSuccessOrFailed value={row.value} />,
          },
          {
            Header: 'CCTV Outdoor',
            accessor: 'cctvOutdoor',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <IconSuccessOrFailed value={row.value} />,
          },
        ],
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
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
    const { createMonitorCCTV, updateMonitorCCTV } = this.props
    if (!invalidValues.includes(id)) {
      updateMonitorCCTV(values, id, this.doRefresh)
    } else {
      createMonitorCCTV(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteMonitorCCTV } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteMonitorCCTV(id, this.doRefresh)
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
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = true
        })
      }
    } else {
      selected[keyIndex].show = false
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = false
        })
      }
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

    const pageName = 'Monitor CCTV'
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
                          <ExcelColumn
                            label="Gedung A - Lantai 1"
                            value={(col) => (col.gedungAlantai1 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Gedung A - Lantai 1"
                            value={(col) => (col.gedungAlantai2 ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="CCTV Outdoor"
                            value={(col) => (col.cctvOutdoor ? '✓' : '❌')}
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
                    <ModalHeader toggle={modalForm.hide}>Data Monitor CCTV</ModalHeader>
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

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field
                            label="Gedung A - Lantai 1"
                            name="gedungAlantai1"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Gedung A - Lantai 2"
                            name="gedungAlantai2"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="CCTV Outdoor"
                            name="cctvOutdoor"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

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

MonitorCCTV.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createMonitorCCTV: PropTypes.func.isRequired,
  updateMonitorCCTV: PropTypes.func.isRequired,
  deleteMonitorCCTV: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.generalAffairMonitorCCTV.isLoading,
  message: state.generalAffairMonitorCCTV.message,
})

const mapDispatchToProps = (dispatch) => ({
  createMonitorCCTV: (formData, refresh) => dispatch(createMonitorCCTV(formData, refresh)),
  updateMonitorCCTV: (formData, id, refresh) => dispatch(updateMonitorCCTV(formData, id, refresh)),
  deleteMonitorCCTV: (id, refresh) => dispatch(deleteMonitorCCTV(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getMonitorCCTV(p),
    Component: withToggle({
      Component: MonitorCCTV,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
