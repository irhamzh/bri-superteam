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
import { CfInput, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createPersediaan,
  updatePersediaan,
  deletePersediaan,
} from '../../../../modules/persediaan/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class Aktivitas extends Component {
  state = {
    optJenisBarang: [],
  }

  initialValues = {}

  async componentDidMount() {
    const resDataJenisBarang = await Service.getJenisBarang()
    const dataJenisBarang = resDataJenisBarang.data.data
    const optJenisBarang = dataJenisBarang.map((row) => ({ label: row.name, value: row.id }))
    this.setState({
      optJenisBarang,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPersediaan, updatePersediaan } = this.props
    if (!invalidValues.includes(id)) {
      updatePersediaan(values, id, this.doRefresh)
    } else {
      createPersediaan(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePersediaan } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deletePersediaan(id, this.doRefresh)
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
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optJenisBarang } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggal',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Jenis Barang',
        accessor: 'jenisBarang.name',
        filterable: true,
      },
      {
        Header: 'Nama Barang',
        accessor: 'name',
        filterable: false,
      },
      {
        Header: 'Stok Awal',
        accessor: 'stokAwal',
        filterable: false,
      },
      {
        Header: 'Penambahan',
        accessor: 'penambahan',
        filterable: false,
      },
      {
        Header: 'Pengurangan',
        accessor: 'pengurangan',
        filterable: false,
      },
      {
        Header: 'Stok Akhir',
        accessor: 'stokAkhir',
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

    const pageName = 'Aktivitas Persediaan'
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
                        Tambah Aktivitas
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
                        namaPengadaan
                        style={{ borderRadius: '20px' }}
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
                            label="Jenis Barang"
                            value={(col) => col.jenisBarang?.name}
                          />
                          <ExcelColumn label="Nama Barang" value="name" />
                          <ExcelColumn label="Stok Awal" value="stokAwal" />
                          <ExcelColumn label="Penambahan" value="penambahan" />
                          <ExcelColumn label="Pengurangan" value="pengurangan" />
                          <ExcelColumn label="Stok Akhir" value="stokAkhir" />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
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
                // validationSchema={roleSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Data Aktivitas</ModalHeader>
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

                      <FormGroup>
                        <Field
                          label="Jenis Barang"
                          options={optJenisBarang}
                          isRequired
                          name="jenisBarang"
                          placeholder="Pilih atau Cari Jenis Barang"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Barang"
                          type="text"
                          name="name"
                          isRequired
                          placeholder="Masukkan Nama Barang"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Stok Awal"
                          type="number"
                          name="stokAwal"
                          isRequired
                          placeholder="Masukkan Stok Awal"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Penambahan"
                          type="number"
                          name="penambahan"
                          isRequired
                          placeholder="Masukkan Penambahan Stok"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Pengurangan"
                          type="number"
                          name="pengurangan"
                          isRequired
                          placeholder="Masukkan Pengurangan Stok"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Stok Akhir"
                          type="number"
                          name="stokAkhir"
                          isRequired
                          placeholder="Masukkan Stok Akhir"
                          component={CfInput}
                        />
                      </FormGroup>

                      {ErrorMessage(message)}
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

Aktivitas.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPersediaan: PropTypes.func.isRequired,
  updatePersediaan: PropTypes.func.isRequired,
  deletePersediaan: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.persediaan.isLoading,
  message: state.persediaan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPersediaan: (formData, refresh) => dispatch(createPersediaan(formData, refresh)),
  updatePersediaan: (formData, id, refresh) => dispatch(updatePersediaan(formData, id, refresh)),
  deletePersediaan: (id, refresh) => dispatch(deletePersediaan(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPersediaan(p),
    Component: withToggle({
      Component: Aktivitas,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
