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
import { CfInput, CfSelect } from '../../../../components'
import { AlertMessage, invalidValues } from '../../../../helpers'
import {
  createPeralatanIT,
  updatePeralatanIT,
  deletePeralatanIT,
} from '../../../../modules/peralatan-it/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class PersonalComputer extends Component {
  state = {
    optRuangan: [],
    optJenisPC: [],
  }

  initialValues = {
    jenisPeralatan: 'PC',
    condition: 'Baik',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      jenisPeralatan: 'PC',
    })

    const resDataRuangan = await Service.getRoom()
    const dataRuangan = resDataRuangan.data.data
    const resDataJenisPC = await Service.getJenisPC()
    const dataJenisPC = resDataJenisPC.data.data

    const optJenisPC = dataJenisPC.map((row) => ({ label: row.name, value: row.id }))
    const optRuangan = dataRuangan.map((row) => ({ label: row.name, value: row.id }))

    this.setState({
      optRuangan,
      optJenisPC,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, jenisPc, ruangan } = values
    const { createPeralatanIT, updatePeralatanIT } = this.props
    if (!invalidValues.includes(id)) {
      if (jenisPc && Object.keys(jenisPc).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.jenisPc = jenisPc.id || jenisPc
      }
      if (ruangan && Object.keys(ruangan).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.ruangan = ruangan.id || ruangan
      }
      updatePeralatanIT(values, id, this.doRefresh)
    } else {
      createPeralatanIT(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePeralatanIT } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePeralatanIT(id, this.doRefresh)
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
    const { optJenisPC, optRuangan } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Nama Pengguna',
        accessor: 'namaPengguna',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Ruangan',
        accessor: 'ruangan.name',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Merk',
        accessor: 'merk',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'SN PC',
        accessor: 'sn',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jenis PC',
        accessor: 'jenisPc.name',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah PC',
        accessor: 'jumlahPc',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'SN Monitor',
        accessor: 'snMonitor',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Monitor',
        accessor: 'jumlahMonitor',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        filterable: false,
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

    const pageName = 'Personal Computer'
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
                    <ModalHeader toggle={modalForm.hide}>Form Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Jenis PC"
                          options={optJenisPC}
                          isRequired
                          name="jenisPc"
                          placeholder="Pilih atau Cari Jenis PC"
                          defaultValue={
                            values.jenisPc
                              ? { value: values.jenisPc.id, label: values.jenisPc.name }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Pengguna"
                          type="text"
                          name="namaPengguna"
                          isRequired
                          placeholder="Masukkan Nama Pengguna"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Merk"
                          type="text"
                          name="merk"
                          isRequired
                          placeholder="Masukkan Merk"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="SN PC"
                          type="text"
                          name="sn"
                          isRequired
                          placeholder="Masukkan Serial Number PC"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jumlah PC"
                          type="number"
                          name="jumlahPc"
                          isRequired
                          placeholder="Masukkan Jumlah PC"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="SN Monitor"
                          type="text"
                          name="snMonitor"
                          isRequired
                          placeholder="Masukkan Serial Number Monitor"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jumlah Monitor"
                          type="number"
                          name="jumlahMonitor"
                          isRequired
                          placeholder="Masukkan Jumlah Monitor"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Ruangan"
                          options={optRuangan}
                          isRequired
                          name="ruangan"
                          placeholder="Pilih atau Cari Ruangan"
                          defaultValue={
                            values.ruangan
                              ? { value: values.ruangan.id, label: values.ruangan.name }
                              : null
                          }
                          component={CfSelect}
                        />
                      </FormGroup>

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

PersonalComputer.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPeralatanIT: PropTypes.func.isRequired,
  updatePeralatanIT: PropTypes.func.isRequired,
  deletePeralatanIT: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.peralatanIt.isLoading,
  message: state.peralatanIt.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPeralatanIT: (formData, refresh) => dispatch(createPeralatanIT(formData, refresh)),
  updatePeralatanIT: (formData, id, refresh) => dispatch(updatePeralatanIT(formData, id, refresh)),
  deletePeralatanIT: (id, refresh) => dispatch(deletePeralatanIT(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPeralatanIT(p),
    Component: withToggle({
      Component: PersonalComputer,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
