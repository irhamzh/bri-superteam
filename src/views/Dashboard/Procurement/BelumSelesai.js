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
import { formatDate, invalidValues } from '../../../helpers'
import { createAsset, updateAsset, deleteAsset } from '../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'

class BelumSelesai extends Component {
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
      status: 'Belum Selesai',
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
        Header: 'Nama Pengadaan',
        accessor: 'namaPengadaan',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Provider',
        accessor: 'provider.name',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Alamat',
        accessor: 'provider.address',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Kontak',
        accessor: 'provider.contact',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Pengadaan',
        accessor: 'namaPengadaan',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Jumlah',
        accessor: 'jumlah',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Harga Barang',
        accessor: 'harga',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Penilaian Vendor',
        accessor: 'penilaian',
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
        Header: 'Status',
        accessor: 'status',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Aksi',
        filterable: false,
        Cell: () => (
          <>
            <Button
              color="success"
              // onClick={() => modalForm.show({ data: props.original })}
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
                      placeholder="Kegiatan Belum Selesai"
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

BelumSelesai.propTypes = {
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
      Component: BelumSelesai,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
