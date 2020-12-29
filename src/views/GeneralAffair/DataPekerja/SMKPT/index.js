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
import Select from 'react-select'
import Service from '../../../../config/services'
import { CfInput, CfInputDate, CfInputFile, CfSelect } from '../../../../components'
import { AlertMessage, invalidValues } from '../../../../helpers'
import {
  createGASmkpt,
  updateGASmkpt,
  deleteGASmkpt,
  uploadGASmkpt,
} from '../../../../modules/generalAffair/dataPekerja/smkpt/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class SMKPT extends Component {
  state = {
    tahun: '',
    bulan: '',
    optBulan: [
      { label: 'Januari', value: '1' },
      { label: 'Februari', value: '2' },
      { label: 'Maret', value: '3' },
      { label: 'April', value: '4' },
      { label: 'Mei', value: '5' },
      { label: 'Juni', value: '6' },
      { label: 'Juli', value: '7' },
      { label: 'Agustus', value: '8' },
      { label: 'September', value: '9' },
      { label: 'Oktober', value: '10' },
      { label: 'November', value: '11' },
      { label: 'Desember', value: '12' },
    ],
    optTahun: [
      { label: '2015', value: '2015' },
      { label: '2016', value: '2016' },
      { label: '2017', value: '2017' },
      { label: '2018', value: '2018' },
      { label: '2019', value: '2019' },
      { label: '2020', value: '2020' },
      { label: '2021', value: '2021' },
      { label: '2022', value: '2022' },
      { label: '2023', value: '2023' },
      { label: '2024', value: '2024' },
      { label: '2025', value: '2025' },
      { label: '2026', value: '2026' },
    ],
  }

  initialValues = {
    nama: '',
    id: '',
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

  render() {
    const { optBulan, optTahun } = this.state
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'No.',
        width: 50,
        // accessor: `none`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{numbData(props)}</p>,
      },
      {
        Header: 'Nama',
        accessor: `name`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      // {
      //   Header: 'Aksi',
      //   filterable: false,
      //   Cell: (props) => (
      //     <>
      //       <Button
      //         color="success"
      //         onClick={() => modalForm.show({ data: props.original, upload: false })}
      //         className="mr-1"
      //         title="Edit"
      //       >
      //         <i className="fa fa-pencil" />
      //       </Button>
      //     </>
      //   ),
      // },
    ]

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
                    <Row>
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
                    </Row>
                  </Col>

                  <Col>
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        className="mr-3 mb-2 px-4"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                      >
                        Show
                      </Button>
                      <Button
                        className="mr-1 mb-2 px-4"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                      >
                        Export
                      </Button>
                    </div>
                  </Col>
                </Row>
                <br />
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
                          dateFormat="MM/yyyy"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="File Excel"
                          name="file-eksploitasi"
                          isRequired
                          component={CfInputFile}
                        />
                      </FormGroup>

                      {/* {ErrorMessage(message)} */}
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
