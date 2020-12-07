import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  FormGroup,
  Form,
} from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import Service from '../../../config/services'
import { CfInput, CfSelect } from '../../../components'
import { ErrorMessage, formatDate, invalidValues } from '../../../helpers'
import { createAsset, updateAsset, deleteAsset } from '../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'
import { updateAssetSchema } from '../../../validations/mvAsset'

class Selesai extends Component {
  state = {
    kondisiAsetId: '',
    optKondisiAset: [
      { label: 'All', value: 'All' },
      { label: 'Pengadan', value: 'Pengadaan' },
      { label: 'Aset', value: 'Aset' },
    ],
  }

  initialValues = {}

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
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
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
    ]

    const pageName = 'Kondisi Aset'
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
                    <Form onSubmit={(e) => {}}>
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
                  // {...tableProps}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Selesai.propTypes = {
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
    API: (p) => Service.getAsset(p),
    Component: withToggle({
      Component: Selesai,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
