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
import { CfInput, CfInputDate, ListCheckboxShow } from '../../../../components'
import {
  AlertMessage,
  formatCurrencyIDR,
  formatDate,
  invalidValues,
  userData,
} from '../../../../helpers'
import {
  createPersekot,
  updatePersekot,
  deletePersekot,
  approvePersekot,
} from '../../../../modules/persekot/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'
import createSchema from '../../../../validations/mvPersekot'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class InputPersekot extends Component {
  state = {
    isShow: false,
    columns: [],
  }

  initialValues = { division: 'Fixed Asset' }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      division: 'Fixed Asset',
      status: 'Unapproved',
    })

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        align: 'center',
        accessor: 'date',
        filterable: false,
        show: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Nama Kegiatan',
        accessor: 'name',
        align: 'center',
        show: true,
        filterable: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nominal Biaya',
        accessor: 'costNominal',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatCurrencyIDR(row.value)}</div>,
      },
      {
        Header: 'Status',
        width: 250,
        accessor: 'status',
        align: 'center',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    const user = userData()
    if (user && user.role?.name.includes('Supervisor')) {
      columns.push({
        Header: 'Aksi',
        width: 200,
        accessor: 'id',
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={(e) => this.handleApprove(e, props.original)}
              className="mr-1"
              title="Approve"
            >
              Approve
            </Button>
            &nbsp; | &nbsp;
            <Button
              color="danger"
              onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              Deny
            </Button>
          </>
        ),
      })
    }

    this.setState({ columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPersekot, updatePersekot } = this.props
    if (!invalidValues.includes(id)) {
      updatePersekot(values, id, this.doRefresh)
    } else {
      createPersekot(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePersekot } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deletePersekot(id, this.doRefresh)
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

  handleApprove = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { approvePersekot } = this.props
    const message = {
      title: 'Apa kamu yakin?',
      text: 'Setelah approve, Kamu tidak dapat memulihkan data ini!',
      confirmButtonText: 'Ya, Approve!',
      cancelButtonText: 'Kembali',
    }

    AlertMessage.warning(message)
      .then((result) => {
        if (result.value) {
          approvePersekot(state, id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Notice!',
            text: 'Proses Approval Dibatalkan',
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

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { isShow, columns } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Input Persekot'
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
                        filename="Input Persekot"
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
                        <ExcelSheet data={data} name="Input Persekot">
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.date)} />
                          <ExcelColumn label="Nama Kegiatan" value="name" />
                          <ExcelColumn label="Nominal Biaya" value="costNominal" />
                          <ExcelColumn label="Status" value="status" />
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
                  // data={dataDummy}
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
            >
              <Formik
                initialValues={modalForm.prop.data}
                validationSchema={createSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Input Persekot</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="date"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Kegiatan"
                          type="text"
                          name="name"
                          isRequired
                          placeholder="Masukkan Nama Kegiatan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nominal Biaya"
                          type="number"
                          name="costNominal"
                          isRequired
                          placeholder="Masukkan Nominal Biaya"
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

InputPersekot.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPersekot: PropTypes.func.isRequired,
  updatePersekot: PropTypes.func.isRequired,
  deletePersekot: PropTypes.func.isRequired,
  approvePersekot: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.persekot.isLoading,
  message: state.persekot.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPersekot: (formData, refresh) => dispatch(createPersekot(formData, refresh)),
  updatePersekot: (formData, id, refresh) => dispatch(updatePersekot(formData, id, refresh)),
  deletePersekot: (id, refresh) => dispatch(deletePersekot(id, refresh)),
  approvePersekot: (formData, id, refresh) => dispatch(approvePersekot(formData, id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPersekot(p),
    Component: withToggle({
      Component: InputPersekot,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
