/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-newline */
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
import Select from 'react-select'
import Service from '../../../config/services'
import { CfInput, CfInputDate, CfSelect, ListCheckboxShow } from '../../../components'
import {
  AlertMessage,
  formatCurrencyIDR,
  formatDate,
  getYearOptions,
  invalidValues,
} from '../../../helpers'
import {
  createGAAnggaran,
  updateGAAnggaran,
  deleteGAAnggaran,
} from '../../../modules/generalAffair/anggaran/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class AnggaranRepresentatif extends Component {
  state = {
    tahun: '',
    bulan: '',
    isShow: false,
    columns: [],
    optBulan: [
      { label: 'Januari', value: 1 },
      { label: 'Februari', value: 2 },
      { label: 'Maret', value: 3 },
      { label: 'April', value: 4 },
      { label: 'Mei', value: 5 },
      { label: 'Juni', value: 6 },
      { label: 'Juli', value: 7 },
      { label: 'Agustus', value: 8 },
      { label: 'September', value: 9 },
      { label: 'Oktober', value: 10 },
      { label: 'November', value: 11 },
      { label: 'Desember', value: 12 },
    ],
    optTahun: getYearOptions(),
  }

  initialValues = {
    categoryAnggaran: 'Representatif',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1
    fetchQueryProps.setFilteredByObject({
      categoryAnggaran: 'Representatif',
      year: thisYear,
      month: thisMonth,
    })

    const { tableProps } = fetchQueryProps
    const { modalForm } = tableProps
    const { data } = tableProps

    const columns = [
      {
        Header: 'No.',
        width: 50,
        // accessor: `none`,
        show: true,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.index + 1}</p>,
      },
      {
        Header: 'Bulan',
        accessor: `month`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: () => <p style={{ textAlign: 'center' }}>{data[0]?.month}</p>,
      },
      {
        Header: 'Tahun',
        accessor: `year`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: () => <p style={{ textAlign: 'center' }}>{data[0]?.year}</p>,
      },
      {
        Header: 'Kategori Anggaran',
        accessor: `categoryAnggaran`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: () => <p style={{ textAlign: 'center' }}>{data[0]?.categoryAnggaran}</p>,
      },
      {
        Header: 'Tipe Anggaran',
        accessor: `type`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Nilai',
        accessor: `nilai`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{formatCurrencyIDR(props.value)}</p>,
      },
      {
        Header: 'Tanggal Pembukuan',
        accessor: `tanggalPembukuan`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (
          <p style={{ textAlign: 'center' }}>
            {props.value ? formatDate(props.value) : props.value}
          </p>
        ),
      },
      {
        Header: 'Keperluan',
        accessor: `keperluan`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Pelimpahan',
        accessor: `pelimpahan`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Tanggal Pelimpahan',
        accessor: `tanggalPelimpahan`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (
          <p style={{ textAlign: 'center' }}>
            {props.value ? formatDate(props.value) : props.value}
          </p>
        ),
      },
      {
        Header: 'Status',
        accessor: `status`,
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },

      {
        Header: 'Aksi',
        width: 150,
        show: true,
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={() =>
                modalForm.show({
                  data: {
                    ...props.original,
                    year: data[0]?.year,
                    month: data[0]?.month,
                    categoryAnggaran: data[0]?.categoryAnggaran,
                    parent: data[0]?.id,
                  },
                })
              }
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

    this.setState({ columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { parent } = values
    const { createGAAnggaran, updateGAAnggaran } = this.props
    if (!invalidValues.includes(parent)) {
      updateGAAnggaran(values, parent, this.doRefresh)
    } else {
      createGAAnggaran(values, this.doRefresh)
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
    const { deleteGAAnggaran } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteGAAnggaran(id, this.doRefresh)
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
        month: bulan,
        year: tahun,
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
    const { optBulan, optTahun, isShow, columns } = this.state
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Representatif'
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
                        &nbsp;Input Data
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
                        <ExcelSheet data={data[0]?.detail} name={pageName}>
                          <ExcelColumn label="Bulan" value={() => data[0]?.month} />
                          <ExcelColumn label="Tahun" value={() => data[0]?.year} />
                          <ExcelColumn
                            label="Kategori Anggaran"
                            value={() => data[0]?.categoryAnggaran}
                          />
                          <ExcelColumn label="Tipe Anggaran" value={(col) => col.type} />
                          <ExcelColumn
                            label="Nilai"
                            value={(col) => formatCurrencyIDR(col.nilai)}
                          />
                          <ExcelColumn
                            label="Tanggal Pembukuan"
                            value={(col) =>
                              col.tanggalPembukuan
                                ? formatDate(col.tanggalPembukuan)
                                : col.tanggalPembukuan
                            }
                          />
                          <ExcelColumn label="Keperluan" value={(col) => col.keperluan} />
                          <ExcelColumn label="Pelimpahan" value={(col) => col.pelimpahan} />
                          <ExcelColumn
                            label="Tanggal Pelimpahan"
                            value={(col) =>
                              col.tanggalPelimpahan
                                ? formatDate(col.tanggalPelimpahan)
                                : col.tanggalPelimpahan
                            }
                          />
                          <ExcelColumn label="Status" value={(col) => col.status} />
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
                  data={data[0]?.detail}
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
                    <ModalHeader toggle={modalForm.hide}>Anggaran Representatif</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Kategori Anggaran"
                          options={[
                            { value: 'Humas', label: 'Humas' },
                            { value: 'Representatif', label: 'Representatif' },
                            { value: 'Rapat', label: 'Rapat' },
                          ]}
                          isRequired
                          isDisabled
                          name="categoryAnggaran"
                          placeholder="Pilih atau Cari Kategori"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Tipe Anggaran"
                          options={[
                            { value: 'Breakdown', label: 'Breakdown' },
                            { value: 'Penggunaan', label: 'Penggunaan' },
                          ]}
                          isRequired
                          name="type"
                          placeholder="Pilih atau Cari type"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Bulan"
                              options={optBulan}
                              isRequired
                              name="month"
                              placeholder="Pilih atau Cari bulan"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tahun"
                              options={getYearOptions()}
                              isRequired
                              name="year"
                              placeholder="Pilih atau Cari tahun"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Field
                          label="Nilai"
                          type="number"
                          name="nilai"
                          isRequired
                          placeholder="Masukkan Nilai"
                          component={CfInput}
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tanggal Pembukuan"
                              name="tanggalPembukuan"
                              classIcon="fa fa-calendar"
                              blockLabel
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tanggal Pelimpahan"
                              name="tanggalPelimpahan"
                              classIcon="fa fa-calendar"
                              blockLabel
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Field
                          label="Keperluan"
                          type="text"
                          name="keperluan"
                          placeholder="Masukkan Keperluan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Pelimpahan"
                          options={[
                            { value: 'Done', label: 'Done' },
                            { value: 'Not Yet', label: 'Not Yet' },
                          ]}
                          name="pelimpahan"
                          placeholder="Pilih atau Cari pelimpahan"
                          component={CfSelect}
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

AnggaranRepresentatif.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createGAAnggaran: PropTypes.func.isRequired,
  updateGAAnggaran: PropTypes.func.isRequired,
  deleteGAAnggaran: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createGAAnggaran: (formData, refresh) => dispatch(createGAAnggaran(formData, refresh)),
  updateGAAnggaran: (formData, id, refresh) => dispatch(updateGAAnggaran(formData, id, refresh)),
  deleteGAAnggaran: (id, refresh) => dispatch(deleteGAAnggaran(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getGAAnggaran(p),
    Component: withToggle({
      Component: AnggaranRepresentatif,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
