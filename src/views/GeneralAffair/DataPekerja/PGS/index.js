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
import Service from '../../../../config/services'
import { CfInput, CfInputDate, CfSelect, ListCheckboxShow } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createGAPgsPjs,
  updateGAPgsPjs,
  deleteGAPgsPjs,
} from '../../../../modules/generalAffair/dataPekerja/pgspjs/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class DataPGS extends Component {
  state = {
    optUker: [],
    isShow: false,
    columns: [],
  }

  initialValues = {}

  async componentDidMount() {
    const { fetchQueryProps } = this.props

    const resDataUker = await Service.getUker()
    const dataUker = resDataUker.data.data
    const optUker = dataUker.map((row) => ({
      label: row.name,
      value: row.id,
    }))

    const { tableProps } = fetchQueryProps
    const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Uker',
        accessor: 'uker.name',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Penugasan',
        accessor: 'penugasan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama',
        accessor: 'name',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jabatan',
        accessor: 'jabatan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Berlaku Dari',
        accessor: 'berlakuDari',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Sampai Dengan',
        accessor: 'sampaiDengan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Aksi',
        width: 170,
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

    this.setState({
      optUker,
      columns,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createGAPgsPjs, updateGAPgsPjs } = this.props
    if (!invalidValues.includes(id)) {
      const { uker } = values
      if (uker && Object.keys(uker).length > 0) {
        values.uker = uker.id || uker
      }
      updateGAPgsPjs(values, id, this.doRefresh)
    } else {
      createGAPgsPjs(values, this.doRefresh)
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
    const { deleteGAPgsPjs } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGAPgsPjs(id, this.doRefresh)
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
    } else {
      selected[keyIndex].show = false
    }

    this.setState({ columns: selected })
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optUker, isShow, columns } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Input Data PGS/PJS'
    const isIcon = { paddingRight: '7px' }

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
                        <i className="fa fa-plus" style={isIcon} />
                        &nbsp;Tambah Data
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
                          <ExcelColumn label="Penugasan" value={(col) => col.penugasan} />
                          <ExcelColumn label="Uker" value={(col) => col.uker?.name} />
                          <ExcelColumn label="Nama" value={(col) => col.name} />
                          <ExcelColumn label="Jabatan" value={(col) => col.jabatan} />
                          <ExcelColumn
                            label="Berlaku Dari"
                            value={(col) => formatDate(col.berlakuDari)}
                          />
                          <ExcelColumn
                            label="Sampai Dengan"
                            value={(col) => formatDate(col.sampaiDengan)}
                          />
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
                {({ values, isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Penugasan"
                          options={[
                            { value: 'PGS', label: 'PGS' },
                            { value: 'PJS', label: 'PJS' },
                          ]}
                          isRequired
                          name="penugasan"
                          placeholder="Pilih atau Cari"
                          component={CfSelect}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          // minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          // showMonthYearPicker
                          // showFullMonthYearPicker
                          // dateFormat="MM/yyyy"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Uker"
                          options={optUker}
                          isRequired
                          name="uker"
                          placeholder="Pilih atau Cari Uker"
                          defaultValue={
                            values.uker
                              ? {
                                  value: values.uker.id,
                                  label: values.uker.name,
                                }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama"
                          type="text"
                          name="name"
                          isRequired
                          placeholder="Masukkan Nama"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jabatan"
                          type="text"
                          name="jabatan"
                          isRequired
                          placeholder="Masukkan Jabatan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Berlaku Dari"
                              name="berlakuDari"
                              classIcon="fa fa-calendar"
                              blockLabel
                              isRequired
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Sampai Dengan"
                              name="sampaiDengan"
                              classIcon="fa fa-calendar"
                              blockLabel
                              isRequired
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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

DataPGS.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGAPgsPjs: PropTypes.func.isRequired,
  updateGAPgsPjs: PropTypes.func.isRequired,
  deleteGAPgsPjs: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.dataPekerjaPgsPjs.isLoading,
  message: state.dataPekerjaPgsPjs.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGAPgsPjs: (formData, refresh) => dispatch(createGAPgsPjs(formData, refresh)),
  updateGAPgsPjs: (formData, id, refresh) => dispatch(updateGAPgsPjs(formData, id, refresh)),
  deleteGAPgsPjs: (id, refresh) => dispatch(deleteGAPgsPjs(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGAPgsPjs(p),
    Component: withToggle({
      Component: DataPGS,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
