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
import { CfAsyncSelect, CfInput } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createTandaTerima,
  updateTandaTerima,
  deleteTandaTerima,
} from '../../../../modules/tandaTerima/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class TandaTerima extends Component {
  state = {
    optPengadaan: [],
    optProvider: [],
    dataProvider: [],
  }

  initialValues = {}

  async componentDidMount() {
    const resDataPengadaan = await Service.getAllPengadaan()
    const dataPengadaan = resDataPengadaan.data.data
    const optPengadaan = dataPengadaan.map((row) => ({ label: row.namaPengadaan, value: row.id }))

    const resDataProvider = await Service.getProvider()
    const dataProvider = resDataProvider.data.data
    const optProvider = dataProvider.map((row) => ({ label: row.name, value: row.id }))

    this.setState({ optPengadaan, optProvider, dataProvider })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createTandaTerima, updateTandaTerima } = this.props
    if (!invalidValues.includes(id)) {
      const { provider, pengadaan } = values
      if (provider && Object.keys(provider).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.provider = provider.id || provider
      }
      if (pengadaan && Object.keys(pengadaan).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.pengadaan = pengadaan.id || pengadaan
      }
      updateTandaTerima(values, id, this.doRefresh)
    } else {
      createTandaTerima(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteTandaTerima } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteTandaTerima(id, this.doRefresh)
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

  handleInputProvider = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getProvider(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  handleInputPengadaan = async (value) => {
    const filtered = [{ id: 'namaPengadaan', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getAllPengadaan(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.namaPengadaan, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { optPengadaan, optProvider, dataProvider } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        filterable: false,
        accessor: 'createdAt',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Nama Provider',
        accessor: 'provider.name',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },

      {
        Header: 'Alamat',
        filterable: false,
        accessor: 'provider.address',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kontak',
        accessor: 'provider.contact',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'pengadaan.namaPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Barang',
        accessor: 'jumlah',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
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

    const pageName = 'Tanda Terima Barang'
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
                        &nbsp;Tambah Tanda Terima
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <ReactTable
                  filterable={false}
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
                    <ModalHeader toggle={modalForm.hide}>Tanda Terima Barang</ModalHeader>
                    <ModalBody>
                      {/* <FormGroup>
                        <Field
                          label="Nama Pengadaan"
                          options={optPengadaan}
                          isRequired
                          name="pengadaan"
                          placeholder="Pilih atau Cari Nama Pengadaan"
                          defaultValue={
                            values.pengadaan
                              ? {
                                  value: values.pengadaan.id,
                                  label: values.pengadaan.namaPengadaan,
                                }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup> */}

                      <FormGroup>
                        <Field
                          label="Nama Pengadaan"
                          cacheOptions
                          options={optPengadaan}
                          defaultOptions
                          loadOptions={this.handleInputPengadaan}
                          name="pengadaan"
                          isRequired
                          placeholder="Pilih atau cari Nama Pengadaan"
                          defaultValue={
                            values.pengadaan
                              ? {
                                  value: values.pengadaan.id,
                                  label: values.pengadaan.namaPengadaan,
                                }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      {/* <FormGroup>
                        <Field
                          label="Nama Provider"
                          options={optProvider}
                          isRequired
                          name="provider"
                          placeholder="Pilih atau Cari Nama Provider"
                          defaultValue={
                            values.provider
                              ? { value: values.provider.id, label: values.provider.name }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup> */}

                      <FormGroup>
                        <Field
                          label="Nama Provider"
                          cacheOptions
                          options={optProvider}
                          defaultOptions
                          loadOptions={this.handleInputProvider}
                          name="provider"
                          isRequired
                          placeholder="Pilih atau cari Provider"
                          defaultValue={
                            values.provider
                              ? { value: values.provider.id, label: values.provider.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Alamat Provider"
                          type="text"
                          name="address"
                          isRequired
                          disabled
                          value={
                            dataProvider.find(
                              (obj) => obj.id === values.provider || obj.id === values.provider?.id
                            )?.address
                          }
                          placeholder="Masukkan Alamat Provider"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="No. Kontak Provider"
                          type="text"
                          name="contact"
                          isRequired
                          disabled
                          value={
                            dataProvider.find(
                              (obj) => obj.id === values.provider || obj.id === values.provider?.id
                            )?.contact
                          }
                          placeholder="Masukkan No. Kontak Provider"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jumlah"
                          type="text"
                          name="jumlah"
                          isRequired
                          placeholder="Masukkan Jumlah"
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

TandaTerima.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createTandaTerima: PropTypes.func.isRequired,
  updateTandaTerima: PropTypes.func.isRequired,
  deleteTandaTerima: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.tandaTerima.isLoading,
  message: state.tandaTerima.message,
})

const mapDispatchToProps = (dispatch) => ({
  createTandaTerima: (formData, refresh) => dispatch(createTandaTerima(formData, refresh)),
  updateTandaTerima: (formData, id, refresh) => dispatch(updateTandaTerima(formData, id, refresh)),
  deleteTandaTerima: (id, refresh) => dispatch(deleteTandaTerima(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getTandaTerima(p),
    Component: withToggle({
      Component: TandaTerima,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
