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
import Service from '../../../../config/services'
import { CfInput, CfInputDate, CfInputFile } from '../../../../components'
import { AlertMessage } from '../../../../helpers'
import {
  createGAPekerja,
  updateGAPekerja,
  deleteGAPekerja,
  uploadGAPekerja,
} from '../../../../modules/generalAffair/dataPekerja/pekerja/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class UploadData extends Component {
  state = {}

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
    const { excel, id } = values
    const { updateGAPekerja, uploadGAPekerja } = this.props
    if (excel) {
      uploadGAPekerja(values, this.doRefresh)
    } else {
      updateGAPekerja(values, id, this.doRefresh)
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
    const { deleteGAPekerja } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteGAPekerja(id, this.doRefresh)
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

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Nama',
        accessor: 'name',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'NIP',
        accessor: 'nip',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Umur',
        accessor: 'age',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Deksripsi Posisi',
        accessor: 'position',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'PERNR',
        accessor: 'pernr',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Level Jabatan',
        accessor: 'levelJabatan',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Jobgrade',
        accessor: 'jobgrade',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'MKJG',
        accessor: 'mkjg',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'PG',
        accessor: 'pg',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'MKPG',
        accessor: 'mkpg',
        filterable: false,
        headerClassName: 'wordwrap',
      },
      {
        Header: 'Aksi',
        width: 150,
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={() => modalForm.show({ data: props.original, upload: false })}
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

    const pageName = 'Upload Data'
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
                      {modalForm.prop.upload && (
                        <>
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
                              label="File Excel"
                              name="excel"
                              isRequired
                              component={CfInputFile}
                            />
                          </FormGroup>
                        </>
                      )}

                      {!modalForm.prop.upload && (
                        <>
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
                              label="NIP"
                              type="text"
                              name="nip"
                              isRequired
                              placeholder="Masukkan NIP"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="PERNR"
                              type="text"
                              name="pernr"
                              isRequired
                              placeholder="Masukkan PERNR"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Umur"
                              type="number"
                              name="age"
                              isRequired
                              placeholder="Masukkan Umur"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Posisi"
                              type="text"
                              name="position"
                              isRequired
                              placeholder="Masukkan Jabatan"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Level Jabatan"
                              type="text"
                              name="levelJabatan"
                              isRequired
                              placeholder="Masukkan Level Jabatan"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="Jobgrade"
                              type="text"
                              name="jobgrade"
                              isRequired
                              placeholder="Masukkan Jobgrade"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="MKJG"
                              type="text"
                              name="mkjg"
                              isRequired
                              placeholder="Masukkan MKJG"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="PG"
                              type="text"
                              name="pg"
                              isRequired
                              placeholder="Masukkan PG"
                              component={CfInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Field
                              label="MKPG"
                              type="text"
                              name="mkpg"
                              isRequired
                              placeholder="Masukkan MKPG"
                              component={CfInput}
                            />
                          </FormGroup>
                        </>
                      )}

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

UploadData.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGAPekerja: PropTypes.func.isRequired,
  updateGAPekerja: PropTypes.func.isRequired,
  deleteGAPekerja: PropTypes.func.isRequired,
  uploadGAPekerja: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGAPekerja: (formData, refresh) => dispatch(createGAPekerja(formData, refresh)),
  updateGAPekerja: (formData, id, refresh) => dispatch(updateGAPekerja(formData, id, refresh)),
  deleteGAPekerja: (id, refresh) => dispatch(deleteGAPekerja(id, refresh)),
  uploadGAPekerja: (id, refresh) => dispatch(uploadGAPekerja(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGAPekerja(p),
    Component: withToggle({
      Component: UploadData,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
