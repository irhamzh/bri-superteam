/* eslint-disable no-param-reassign */
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
import {
  CfAsyncSelect,
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  CfInputMultiFile,
  CfSelect,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../components'
import { AlertMessage, invalidValues, formatDate } from '../../../../helpers'
import {
  createFIPayment,
  updateFIPayment,
  deleteFIPayment,
} from '../../../../modules/financialAdmin/payment/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class Hotel extends Component {
  state = {
    optHotel: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    seksi: 'Procurement',
    typePayment: 'Hotel',
    invoiceBermaterai: false,
    copySPKPKS: false,
    evaluasiBrismart: false,
    rekapBiayaHotel: false,
    suratPemesanan: false,
    fakturPajak: false,
    absensiHotel: false,
    room: false,
    laundry: false,
    dinner: false,
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      seksi: 'Procurement',
      typePayment: 'Hotel',
    })

    const resDataHotel = await Service.getHotel()
    const dataHotel = resDataHotel.data.data
    const optHotel = dataHotel.map((row) => ({ label: row.name, value: row.id }))

    // const { tableProps } = fetchQueryProps
    // const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Seksi',
        accessor: 'seksi',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Pendidikan',
        accessor: 'namaPendidikan',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Hotel',
        accessor: 'hotelName.name',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Periode',
        accessor: 'periode',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Invoice Bermaterai',
        accessor: 'invoiceBermaterai',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Copy SPK',
        accessor: 'copySPKPKS',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Evaluasi Brismart',
        accessor: 'evaluasiBrismart',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Rekap Biaya Hotel',
        accessor: 'rekapBiayaHotel',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Surat Pemesanan',
        accessor: 'suratPemesanan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Faktur Pajak',
        accessor: 'fakturPajak',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Absensi Hotel',
        accessor: 'absensiHotel',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Room List',
        accessor: 'roomList',
        show: true,
        filterable: false,
        columns: [
          {
            Header: 'Room',
            accessor: 'room',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <IconSuccessOrFailed value={row.value} />,
          },
          {
            Header: 'Laundry',
            accessor: 'laundry',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <IconSuccessOrFailed value={row.value} />,
          },
          {
            Header: 'Dinner',
            accessor: 'dinner',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <IconSuccessOrFailed value={row.value} />,
          },
        ],
      },
      {
        Header: 'Biaya',
        accessor: 'biaya',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },

      {
        Header: 'Lampiran',
        accessor: 'lampiran',
        show: true,
        filterable: false,
        Cell: (row) => {
          if (row.value && row.value.length > 0) {
            return row.value.map((item) => (
              <div>
                <a href={item} target="_blank" rel="noreferrer">
                  Download
                </a>
              </div>
            ))
          }
        },
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    this.setState({
      optHotel,
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
    const { createFIPayment, updateFIPayment } = this.props
    if (!invalidValues.includes(id)) {
      const { hotel } = values
      if (hotel && Object.keys(hotel).length > 0) {
        values.hotel = hotel.id || hotel
      }
      updateFIPayment(values, id, this.doRefresh)
    } else {
      createFIPayment(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteFIPayment } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteFIPayment(id, this.doRefresh)
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
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = true
        })
      }
    } else {
      selected[keyIndex].show = false
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = false
        })
      }
    }

    this.setState({ columns: selected })
  }

  handleInputHotel = async (value) => {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getHotel(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: row.name,
        value: row.id,
      }))
    })
    return option
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { optHotel, isShow, columns } = this.state
    const tableCols = [
      ...columns,
      {
        Header: 'Aksi',
        width: 200,
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
    const pageName = 'Hotel'
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
                        Tambah Data
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
                {/* Card Show */}
                <ListCheckboxShow
                  data={columns}
                  isShow={isShow}
                  handleShowCheckbox={this.handleShowCheckbox}
                />
                <ReactTable
                  filterable
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
                          label="Seksi"
                          options={[{ value: 'Procurement', label: 'Procurement' }]}
                          isRequired
                          name="seksi"
                          isDisabled
                          placeholder="Pilih atau Cari"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Pendidikan"
                          type="text"
                          name="namaPendidikan"
                          isRequired
                          placeholder="Masukkan Nama Pendidikan"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Nama Hotel"
                          cacheOptions
                          options={optHotel}
                          defaultOptions
                          loadOptions={this.handleInputHotel}
                          name="hotel"
                          isRequired
                          placeholder="Pilih atau cari"
                          defaultValue={
                            values.hotelName
                              ? { value: values.hotelName.id, label: values.hotelName.name }
                              : null
                          }
                          component={CfAsyncSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Periode"
                          type="text"
                          name="periode"
                          isRequired
                          placeholder="Masukkan Periode"
                          component={CfInput}
                        />
                      </FormGroup>

                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field
                            label="Invoice Bermaterai"
                            name="invoiceBermaterai"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Copy SPK" name="copySPKPKS" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Evaluasi Brismart"
                            name="evaluasiBrismart"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Rekap Biaya Hotel"
                            name="rekapBiayaHotel"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Surat Pemesanan"
                            name="suratPemesanan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Faktur Pajak"
                            name="fakturPajak"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Absensi Hotel"
                            name="absensiHotel"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <h6>Room List</h6>
                      <br />
                      <div style={{ marginLeft: '20px' }}>
                        <FormGroup>
                          <Field label="Room" name="room" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Laundry" name="laundry" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Dinner" name="dinner" component={CfInputCheckbox} />
                        </FormGroup>
                      </div>

                      <FormGroup>
                        <Field
                          label="Lampiran"
                          name="lampiran"
                          isRequired
                          accept="image/*"
                          multiple
                          component={CfInputMultiFile}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Biaya"
                          type="number"
                          name="biaya"
                          isRequired
                          placeholder="Masukkan Biaya"
                          component={CfInput}
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

Hotel.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createFIPayment: PropTypes.func.isRequired,
  updateFIPayment: PropTypes.func.isRequired,
  deleteFIPayment: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.payment.isLoading,
  message: state.payment.message,
})

const mapDispatchToProps = (dispatch) => ({
  createFIPayment: (formData, refresh) => dispatch(createFIPayment(formData, refresh)),
  updateFIPayment: (formData, id, refresh) => dispatch(updateFIPayment(formData, id, refresh)),
  deleteFIPayment: (id, refresh) => dispatch(deleteFIPayment(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getFIPayment(p),
    Component: withToggle({
      Component: Hotel,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
