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
import { CfInputDate, CfInputFile, ListCheckboxShow } from '../../../../components'
import { AlertMessage, invalidValues } from '../../../../helpers'
import {
  createGASmkpt,
  updateGASmkpt,
  deleteGASmkpt,
  uploadGASmkpt,
} from '../../../../modules/generalAffair/dataPekerja/smkpt/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class SMKPT extends Component {
  state = {
    tahun: '',
    bulan: '',
    isShow: false,
    columns: [],
  }

  initialValues = {
    nama: '',
    id: '',
  }

  componentDidMount() {
    // const { fetchQueryProps } = this.props
    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'No.',
        width: 50,
        show: true,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.index + 1}</p>,
      },
      {
        Header: 'Nama',
        accessor: `name`,
        show: true,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'PN',
        accessor: `pn`,
        show: true,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Tahun Sebelumnya',
        accessor: `previous`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value?.value}</p>,
      },
      {
        Header: 'Tahun Sekarang',
        accessor: `current`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value?.value}</p>,
      },
      {
        Header: 'Tahun Berikutnya',
        accessor: `next`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value?.value}</p>,
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
    const { id, excel } = values
    const { createGASmkpt, updateGASmkpt, uploadGASmkpt } = this.props
    if (!invalidValues.includes(id)) {
      updateGASmkpt(values, id, this.doRefresh)
    } else if (excel) {
      uploadGASmkpt(values, this.doRefresh)
    } else {
      createGASmkpt(values, this.doRefresh)
    }
  }

  handleChangeSelect = (name, value) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.doRefresh()
      }
    )
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteGASmkpt } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGASmkpt(id, this.doRefresh)
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

  filterData = async (e) => {
    e.preventDefault()
    const { bulan, tahun } = this.state
    if (invalidValues.includes(bulan)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }
    if (invalidValues.includes(tahun)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }

    try {
      const { fetchQueryProps } = this.props
      fetchQueryProps.setFilteredByObject({
        'month-year$createdAt': `${tahun}-${bulan}`,
      })

      this.doRefresh()
    } catch (error) {
      AlertMessage.error(error)
    }
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
    // const { optBulan, optTahun } = this.state
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { isShow, columns } = this.state

    const pageName = 'Sistem Manajemen Kinerja Pekerja Tetap'
    const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card style={{ borderRadius: '20px' }}>
              <CardHeader style={{ backgroundColor: 'white', borderRadius: '20px 20px 0px 0px' }}>
                <Row>
                  <Col sm="8">
                    <Button
                      color="default"
                      className="mr-1"
                      style={{ color: '#2D69AF', fontSize: '1.1rem' }}
                    >
                      {pageName}
                    </Button>
                  </Col>
                  <Col sm="4">
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        color="primary"
                        onClick={() => modalForm.show({ data: this.initialValues, upload: true })}
                        className="mr-1"
                      >
                        <i className="fa fa-plus" style={isIcon} />
                        &nbsp;Upload
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    {/* <Row>
                      <Col>
                        <FormGroup>
                          <Select
                            isClearable
                            placeholder="Pilih Bulan..."
                            options={optBulan}
                            name="bulan"
                            onChange={(e) => this.setState({ bulan: e?.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Select
                            isClearable
                            placeholder="Pilih tahun..."
                            options={optTahun}
                            name="tahun"
                            className=""
                            onChange={(e) => this.setState({ tahun: e?.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <Button type="submit" color="primary" onClick={(e) => this.filterData(e)}>
                          <i className="fa fa-filter" />
                        </Button>
                      </Col>
                    </Row> */}
                  </Col>

                  <Col>
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
                          <ExcelColumn label="Nama" value={(col) => col.name} />
                          <ExcelColumn label="PN" value={(col) => col.pn} />
                          <ExcelColumn
                            label="Tahun Sebelumnya"
                            value={(col) => col.previous.value}
                          />
                          <ExcelColumn label="Tahun Sekarang" value={(col) => col.current.value} />
                          <ExcelColumn label="Tahun Berikutnya" value={(col) => col.next.value} />
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
                    <ModalHeader toggle={modalForm.hide}>Upload File</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Bulan/Tahun"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          // minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          showMonthYearPicker
                          showFullMonthYearPicker
                          // dateFormat="MM/yyyy"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field label="File Excel" name="excel" isRequired component={CfInputFile} />
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

SMKPT.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGASmkpt: PropTypes.func.isRequired,
  updateGASmkpt: PropTypes.func.isRequired,
  deleteGASmkpt: PropTypes.func.isRequired,
  uploadGASmkpt: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGASmkpt: (formData, refresh) => dispatch(createGASmkpt(formData, refresh)),
  updateGASmkpt: (formData, id, refresh) => dispatch(updateGASmkpt(formData, id, refresh)),
  deleteGASmkpt: (id, refresh) => dispatch(deleteGASmkpt(id, refresh)),
  uploadGASmkpt: (formData, refresh) => dispatch(uploadGASmkpt(formData, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGASmkpt(p),
    Component: withToggle({
      Component: SMKPT,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
