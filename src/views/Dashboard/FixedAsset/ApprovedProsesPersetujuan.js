import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Row, Form, FormGroup } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import Service from '../../../config/services'
import { formatDate } from '../../../helpers'
import { createAsset, updateAsset, deleteAsset } from '../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'

class ApprovedProsesPersetujuan extends Component {
  state = {}

  initialValues = {}

  componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      status: 'Approved oleh Wakabag',
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  // handleSaveChanges = (values) => {
  //   const { id } = values
  //   const { createAsset, updateAsset } = this.props
  //   if (!invalidValues.includes(id)) {
  //     updateAsset(values, id, this.doRefresh)
  //   } else {
  //     createAsset(values, this.doRefresh)
  //   }
  // }

  handleChangeSelect = (name, value) => {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      condition: value.value,
    })
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.doRefresh()
      }
    )
  }

  // handleDelete = (e, state) => {
  //   e.preventDefault()

  //   const { id } = state
  //   const { deleteDelete } = this.props

  //   AlertMessage.warning()
  //     .then((result) => {
  //       if (result.value) {
  //         console.log('delete object', id)
  //         deleteDelete(id, this.doRefresh)
  //       } else {
  //         const paramsResponse = {
  //           title: 'Huff',
  //           text: 'Hampir saja kamu kehilangan data ini',
  //         }
  //         AlertMessage.info(paramsResponse)
  //       }
  //     })
  //     .catch((err) => {
  //       AlertMessage.error(err) // Internal Server Error
  //     })
  // }

  render() {
    const { auth, fetchQueryProps } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggalPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value ? formatDate(row.value) : ''}</div>
        ),
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'namaPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Izin Prinsip User',
        accessor: 'izinPrinsipUser',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Izin Prinsip Pengadaan',
        accessor: 'izinPrinsipPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Izin Hasil Pengadaan',
        accessor: 'izinHasilPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Undangan',
        accessor: 'undangan',
        filterable: false,
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Aanwijzing',
        accessor: 'aanwijzing',
        filterable: false,
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Pemasukan Sampul Proposal Teknis',
        accessor: 'pemasukanSampulProposalTeknis',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Klarifikasi dan negosiasi',
        accessor: 'klarifikasiNegosiasi',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Pengumuman Pemenang',
        accessor: 'pengumumanPemenang',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Penilaian Proposal Teknis',
        accessor: 'penilaianProposalTeknis',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Pembukuan Proposal Financial',
        accessor: 'pembukuanProposalFinancial',
        filterable: false,
        headerClassName: 'wordwrap',

        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              <i className="icon-check text-success" style={{ fontSize: '25px' }} />
            </div>
          ) : (
            <div className="text-center">
              <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
            </div>
          ),
      },
      {
        Header: 'Jenis Anggaran',
        accessor: 'jenisAnggaran',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Biaya Putusan',
        accessor: 'biaya',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    // const pageName = 'Approved Proses Persetujuan'
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Form onSubmit={() => {}}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Select
                              isClearable
                              placeholder="Pilih Bulan..."
                              options={[
                                { label: 'Januari', value: 'Januari' },
                                { label: 'Februari', value: 'Februari' },
                                { label: 'Maret', value: 'Maret' },
                                { label: 'April', value: 'April' },
                                { label: 'Mei', value: 'Mei' },
                                { label: 'Juni', value: 'Juni' },
                                { label: 'Juli', value: 'Juli' },
                                { label: 'Agustus', value: 'Agustus' },
                                { label: 'September', value: 'September' },
                                { label: 'Oktober', value: 'Oktober' },
                                { label: 'November', value: 'November' },
                                { label: 'Desember', value: 'Desember' },
                              ]}
                              name="bulan"
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Select
                              isClearable
                              placeholder="Pilih tahun..."
                              options={[
                                { value: 2018, label: '2018' },
                                { value: 2019, label: '2019' },
                                { value: 2020, label: '2020' },
                                { value: 2021, label: '2021' },
                                { value: 2022, label: '2022' },
                              ]}
                              name="tahun"
                              className=""
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="1">
                          <Button type="submit" color="primary">
                            <i className="fa fa-filter" />
                          </Button>
                        </Col>
                        <Col sm="3" />
                      </Row>
                    </Form>
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
          </Col>
        </Row>
      </div>
    )
  }
}

ApprovedProsesPersetujuan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createAsset: (formData, refresh) => dispatch(createAsset(formData, refresh)),
  updateAsset: (formData, id, refresh) => dispatch(updateAsset(formData, id, refresh)),
  deleteAsset: (id, refresh) => dispatch(deleteAsset(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getFullFixedAsset(p),
    Component: withToggle({
      Component: ApprovedProsesPersetujuan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
