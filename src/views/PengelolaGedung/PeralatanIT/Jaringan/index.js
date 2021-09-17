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
import { CfAsyncSelect, CfInput, CfInputRadio, CfSelect } from '../../../../components'
import { AlertMessage, invalidValues } from '../../../../helpers'
import {
  createPGPeralatanIT,
  updatePGPeralatanIT,
  deletePGPeralatanIT,
} from '../../../../modules/peralatan-it/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class PeralatanJaringan extends Component {
  state = {
    optLantai: [],
    optRuangan: [],
  }

  initialValues = {
    typePeralatanIT: 'jaringan',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      typePeralatanIT: 'jaringan',
    })
    const resDataRuangan = await Service.getRoom()
    const dataRuangan = resDataRuangan.data.data
    const optRuangan = dataRuangan.map((row) => ({ label: row.name, value: row.id }))

    const resDataLantai = await Service.getLantai()
    const dataLantai = resDataLantai.data.data
    const optLantai = dataLantai.map((row) => ({ label: row.name, value: row.id }))

    // const resDataItem = await Service.getItem()
    // const dataItem = resDataItem.data.data
    // const optItem = dataItem.map((row) => ({ label: row.name, value: row.id }))

    this.setState({ optRuangan, optLantai })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, floor, ruangan } = values
    const { createPGPeralatanIT, updatePGPeralatanIT } = this.props
    if (!invalidValues.includes(id)) {
      if (floor && Object.keys(floor).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.floor = floor.id || floor
      }
      if (ruangan && Object.keys(ruangan).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.ruangan = ruangan.id || ruangan
      }
      updatePGPeralatanIT(values, id, this.doRefresh)
    } else {
      createPGPeralatanIT(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePGPeralatanIT } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePGPeralatanIT(id, this.doRefresh)
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

  handleInputLantai = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getLantai(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  handleInputRuangan = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getRoom(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { optRuangan, optLantai } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Lantai',
        accessor: 'floor.name',
        filterable: true,
      },

      {
        Header: 'Ruangan',
        accessor: 'ruangan.name',
        filterable: true,
      },
      {
        Header: 'Item',
        accessor: 'itemJaringan',
        filterable: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
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

    const pageName = 'Teknisi IT - Jaringan'
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
                    <ModalHeader toggle={modalForm.hide}>Tambah Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Lantai"
                          cacheOptions
                          options={optLantai}
                          defaultOptions
                          loadOptions={this.handleInputLantai}
                          name="floor"
                          isRequired
                          placeholder="Pilih atau cari Lantai"
                          defaultValue={
                            values.floor
                              ? { value: values.floor.id, label: values.floor.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Ruangan"
                          cacheOptions
                          options={optRuangan}
                          defaultOptions
                          loadOptions={this.handleInputRuangan}
                          name="ruangan"
                          isRequired
                          placeholder="Pilih atau cari Ruangan"
                          defaultValue={
                            values.ruangan
                              ? { value: values.ruangan.id, label: values.ruangan.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Item"
                          options={[
                            { value: 'Antivirus', label: 'Antivirus' },
                            { value: 'Jaringan', label: 'Jaringan' },
                          ]}
                          isRequired
                          name="itemJaringan"
                          placeholder="Pilih atau Cari item"
                          component={CfSelect}
                        />
                      </FormGroup>
                      {values.itemJaringan && (
                        <Row>
                          <Col sm="3">
                            <h6>Status Item</h6>
                          </Col>
                          <Col sm="4">
                            <FormGroup>
                              <Field
                                label={
                                  values.itemJaringan === 'Antivirus' ? 'Updated' : 'Connected'
                                }
                                name="status"
                                id={values.itemJaringan === 'Antivirus' ? 'Updated' : 'Connected'}
                                component={CfInputRadio}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Field
                                label={
                                  values.itemJaringan === 'Antivirus'
                                    ? 'Not Updated'
                                    : 'Disconnected'
                                }
                                name="status"
                                id={
                                  values.itemJaringan === 'Antivirus'
                                    ? 'Not Updated'
                                    : 'Disconnected'
                                }
                                component={CfInputRadio}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      )}

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

PeralatanJaringan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPGPeralatanIT: PropTypes.func.isRequired,
  updatePGPeralatanIT: PropTypes.func.isRequired,
  deletePGPeralatanIT: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.peralatanIt.isLoading,
  message: state.peralatanIt.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPGPeralatanIT: (formData, refresh) => dispatch(createPGPeralatanIT(formData, refresh)),
  updatePGPeralatanIT: (formData, id, refresh) =>
    dispatch(updatePGPeralatanIT(formData, id, refresh)),
  deletePGPeralatanIT: (id, refresh) => dispatch(deletePGPeralatanIT(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPGPeralatanIT(p),
    Component: withToggle({
      Component: PeralatanJaringan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
