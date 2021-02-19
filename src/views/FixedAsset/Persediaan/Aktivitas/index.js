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
import { CfAsyncSelect, CfInput, CfInputDate, ListCheckboxShow } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
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
    isShow: false,
    columns: [],
  }

  initialValues = {}

  async componentDidMount() {
    // const { fetchQueryProps } = this.props

    const resDataJenisBarang = await Service.getJenisBarang()
    const dataJenisBarang = resDataJenisBarang.data.data
    const optJenisBarang = dataJenisBarang.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggal',
        filterable: false,
        show: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Jenis Barang',
        accessor: 'jenisBarang.name',
        filterable: false,
        show: true,
      },
      {
        Header: 'Nama Barang',
        accessor: 'name',
        show: true,
        filterable: true,
      },
      {
        Header: 'Stok Awal',
        accessor: 'stokAwal',
        show: true,
        filterable: false,
      },
      {
        Header: 'Penambahan',
        accessor: 'penambahan',
        show: true,
        filterable: false,
      },
      {
        Header: 'Pengurangan',
        accessor: 'pengurangan',
        show: true,
        filterable: false,
      },
      {
        Header: 'Stok Akhir',
        accessor: 'stokAkhir',
        show: true,
        filterable: false,
      },
    ]

    this.setState({
      optJenisBarang,
      columns,
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, jenisBarang } = values
    const { createPersediaan, updatePersediaan } = this.props
    if (!invalidValues.includes(id)) {
      if (jenisBarang && Object.keys(jenisBarang).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.jenisBarang = jenisBarang.id || jenisBarang
      }
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

  handleInputJenisBarang = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getJenisBarang(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optJenisBarang, isShow, columns } = this.state

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
                {/* Card Show */}
                <ListCheckboxShow
                  data={columns}
                  isShow={isShow}
                  handleShowCheckbox={this.handleShowCheckbox}
                />
                <ReactTable
                  filterable={false}
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
                // validationSchema={roleSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ values, isSubmitting }) => (
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
                          cacheOptions
                          options={optJenisBarang}
                          defaultOptions
                          loadOptions={this.handleInputJenisBarang}
                          name="jenisBarang"
                          isRequired
                          placeholder="Pilih atau cari Jenis Barang"
                          defaultValue={
                            values.jenisBarang
                              ? { value: values.jenisBarang.id, label: values.jenisBarang.name }
                              : null
                          }
                          component={CfAsyncSelect}
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
                          disabled
                          value={
                            Number(values.stokAwal) +
                            Number(values.penambahan) -
                            Number(values.pengurangan)
                          }
                          placeholder="Masukkan Stok Akhir"
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
