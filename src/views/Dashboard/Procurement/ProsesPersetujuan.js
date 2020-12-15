import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import { Formik, Form, Field } from 'formik'
import Select from 'react-select'
import Service from '../../../config/services'
// import { CfInput, CfSelect } from '../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../helpers'
import { createAsset, updateAsset, deleteAsset } from '../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'

class ProsesPersetujuan extends Component {
  state = {
    kondisiAsetId: '',
    optKondisiAset: [
      { label: 'All', value: 'All' },
      { label: 'Pengadan', value: 'Pengadaan' },
      { label: 'Aset', value: 'Aset' },
    ],
  }

  initialValues = {}

  componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      in$status: ['Proses Persetujuan', 'Approved oleh Wakabag'],
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createAsset, updateAsset } = this.props
    if (!invalidValues.includes(id)) {
      updateAsset(values, id, this.doRefresh)
    } else {
      createAsset(values, this.doRefresh)
    }
  }

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

  onClickApprove = async (id, status) => {
    const field = {
      title: 'Apa kamu yakin?',
      text: 'Setelah Approve, Kamu tidak dapat memulihkan data ini!',
      confirmButtonText: 'Ya, Setuju!',
      cancelButtonText: 'Kembali',
    }

    AlertMessage.warning(field)
      .then(async (result) => {
        if (result.value) {
          if (status === 'Proses Persetujuan') {
            await Service.approveWabagProcurement(id).then((res) => {
              if (res.data) {
                AlertMessage.success('', 'Pengadaan Behasil Disetujui!')
                this.doRefresh()
              }
            })
          } else {
            await Service.approveKabagProcurement(id).then((res) => {
              if (res.data) {
                AlertMessage.success('', 'Pengadaan Behasil Disetujui!')
                this.doRefresh()
              }
            })
          }
        }
      })
      .catch((err) => {
        // Internal Server Error
        AlertMessage.error(err)
      })
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
    const { optKondisiAset, kondisiAsetId } = this.state
    const { auth, fetchQueryProps } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal Awal',
        accessor: 'tanggalAwal',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value ? formatDate(row.value) : ''}</div>
        ),
      },
      {
        Header: 'Tanggal Akhir',
        accessor: 'tanggalAkhir',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => (
          <div style={{ textAlign: 'center' }}>{row.value ? formatDate(row.value) : ''}</div>
        ),
      },
      {
        Header: 'Jenis Pengadaan',
        accessor: 'jenisPengadaan',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
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
        Header: 'Anggaran Biaya',
        accessor: 'anggaranBiaya',
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
        Header: 'Surat Pemesanan',
        accessor: 'suratPemesanan',
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
        Header: 'TOR',
        accessor: 'tor',
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
        Header: 'Proposal Penawaran',
        accessor: 'proposalPenawaran',
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
        Header: 'Nomor SPK',
        accessor: 'nomorSPK',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Provider',
        accessor: 'provider.name',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Alamat Provider',
        accessor: 'provider.address',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nomor Contact Provider',
        accessor: 'provider.contact',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Pendidikan',
        accessor: 'namaPendidikan.name',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Peserta',
        accessor: 'jumlah',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Durasi',
        accessor: 'durasi',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah Biaya',
        accessor: 'jumlahBiaya',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Status',
        width: 200,
        accessor: 'status',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Aksi',
        width: 200,
        accessor: 'id',
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={() => this.onClickApprove(props.value, props.original?.status)}
              className="mr-1"
              title="Edit"
            >
              Approve
            </Button>
            &nbsp; | &nbsp;
            <Button
              color="danger"
              // onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              Deny
            </Button>
          </>
        ),
      },
    ]

    // const pageName = 'Kondisi Aset'
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="4">
                    <Select
                      // isClearable
                      onChange={(v) => this.handleChangeSelect('kondisiAsetId', v)}
                      options={optKondisiAset}
                      value={kondisiAsetId}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Kegiatan Belum Berjalan"
                    />
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

ProsesPersetujuan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createAsset: PropTypes.func.isRequired,
  updateAsset: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func.isRequired,
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
    API: (p) => Service.getFullProcurement(p),
    Component: withToggle({
      Component: ProsesPersetujuan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
