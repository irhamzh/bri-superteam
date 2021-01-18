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
import { CfInputDate, CfInputFile } from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import { uploadAnggaranEksploitasi } from '../../../../modules/anggaran/eksploitasi/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class EksploitasiAnggaran extends Component {
  state = {
    tahun: null,
    bulan: null,
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
    const { uploadAnggaranEksploitasi } = this.props
    uploadAnggaranEksploitasi(values, this.doRefresh)
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
        Header: 'Tanggal',
        accessor: `tanggal`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{formatDate(props.value)}</p>,
      },
      {
        Header: 'Kode',
        accessor: `kode`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Deskripsi',
        accessor: `deskripsi`,
        filterable: false,
        width: 200,
        headerClassName: 'wordwrap',
        Cell: (props) => <p className="wordwrap">{props.value}</p>,
      },
      {
        Header: 'BRI CORPU',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'briCorpuBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'briCorpuRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'briCorpuSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'briCorpu',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Bandung',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusBandungBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusBandungRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusBandungSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusBandung',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Jakarta',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusJakartaBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusJakartaRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusJakartaSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusJakarta',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Makassar',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusMakassarBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusMakassarRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusMakassarSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusMakassar',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Medan',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusMedanBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusMedanRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusMedanSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusMedan',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Padang',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusPadangBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusPadangRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusPadangSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusPadang',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Surabaya',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusSurabayaBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusSurabayaRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusSurabayaSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusSurabaya',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Campus Yogyakarta',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'campusYogyakartaBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'campusYogyakartaRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'campusYogyakartaSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'campusYogyakarta',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
      {
        Header: 'Total Campus',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran (Rp)',
            accessor: 'totalCampusBreakdownAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Anggaran (Rp)',
            accessor: 'totalCampusRealisasiAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            accessor: 'totalCampusSisaAnggaran',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            accessor: 'totalCampus',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
    ]

    const pageName = 'Eksploitasi Anggaran'
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
                        &nbsp;Upload
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <div>
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
                    </div>
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
                {({ isSubmitting }) => (
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
                        <Field label="File Excel" name="excel" isRequired component={CfInputFile} />
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

EksploitasiAnggaran.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  uploadAnggaranEksploitasi: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.anggaranEksploitasi.isLoading,
  message: state.anggaranEksploitasi.message,
})

const mapDispatchToProps = (dispatch) => ({
  uploadAnggaranEksploitasi: (formData, refresh) =>
    dispatch(uploadAnggaranEksploitasi(formData, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getAnggaranEksploitasi(p),
    Component: withToggle({
      Component: EksploitasiAnggaran,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
