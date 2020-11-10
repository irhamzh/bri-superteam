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
import * as Yup from 'yup'
import Service from '../../../../config/services'
import { CfInput, CfInputDate, CfSelect } from '../../../../components'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../helpers'
import { createRole, updateRole, deleteRole } from '../../../../modules/master/role/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

const roleSchema = Yup.object().shape({
  nama: Yup.string().required('nama role belum diisi'),
})

const dataDummy = [
  {
    tanggal: '12/12/2020',
    namaPengguna: 'Parksis',
    merk: 'HP',
    model: 'Standard',
    serialNumberPC: 1234556677,
    jumlahPC: 1,
    jenisPC: 'HIGH END',
    jumlahMonitor: 1,
    serialNumberMonitor: 2987592375,
    ruangan: '101',
    kondisi: 'Baik',
    lampTimer: '30 Hari',
    gantiLampu: true,
    keterangan: 'Lorem Ipsum',
  },
  {
    tanggal: '12/12/2020',
    namaPengguna: 'Semongko',
    merk: 'Samsung',
    model: 'Standard',
    serialNumberPC: 1234556677,
    jumlahPC: 1,
    jumlahMonitor: 1,
    serialNumberMonitor: 2987592375,
    ruangan: '101',
    kondisi: 'Baik',
    jenisPC: 'HIGH END',
    lampTimer: '30 Hari',
    gantiLampu: false,
    keterangan: 'Lorem Ipsum',
  },
]

class PersonalComputer extends Component {
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
    const { id } = values
    const { createRole, updateRole } = this.props
    if (!invalidValues.includes(id)) {
      updateRole(values, id, this.doRefresh)
    } else {
      createRole(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteRole } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteRole(id, this.doRefresh)
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

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Nama Pengguna',
        accessor: 'namaPengguna',
        filterable: false,
      },
      {
        Header: 'Ruangan',
        accessor: 'ruangan',
        filterable: true,
      },
      {
        Header: 'Merk',
        accessor: 'merk',
        filterable: true,
      },
      {
        Header: 'SN PC',
        accessor: 'serialNumberPC',
        filterable: true,
      },
      {
        Header: 'Jenis PC',
        accessor: 'jenisPC',
        filterable: false,
      },
      {
        Header: 'Jumlah PC',
        accessor: 'jumlahPC',
        filterable: false,
      },
      {
        Header: 'SN Monitor',
        accessor: 'serialNumberMonitor',
        filterable: true,
      },
      {
        Header: 'Jumlah Monitor',
        accessor: 'jumlahPC',
        filterable: false,
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
        filterable: true,
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
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="6">
                    <Button color="default" className="mr-1">
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
                  data={dataDummy}
                  columns={columns}
                  defaultPageSize={10}
                  className="-highlight"
                  // {...tableProps}
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
                validationSchema={roleSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Data</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Jenis PC"
                          options={[
                            { value: 'HPPRO XP', label: 'HPPRO XP' },
                            { value: 'CBT', label: 'CBT' },
                            { value: 'HPDX', label: 'HPDX' },
                            { value: 'Acer', label: 'Acer' },
                            { value: 'HPPROP W7', label: 'HPPROP W7' },
                            { value: 'HPPRO WIN10', label: 'HPPRO WIN10' },
                            { value: 'HIGH END', label: 'HIGH END' },
                          ]}
                          isRequired
                          name="jenisPC"
                          placeholder="Pilih atau Cari Jenis PC"
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
                          name="serialNumberPC"
                          isRequired
                          placeholder="Masukkan Serial Number PC"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Jumlah PC"
                          type="number"
                          name="jumlahPC"
                          isRequired
                          placeholder="Masukkan Jumlah PC"
                          component={CfInput}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="SN Monitor"
                          type="text"
                          name="serialNumberMonitor"
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
                          options={[
                            { value: '101', label: '1010' },
                            { value: '102', label: '102' },
                          ]}
                          isRequired
                          name="ruangan"
                          placeholder="Pilih atau Cari Ruangan"
                          component={CfSelect}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Keterangan"
                          type="text"
                          name="keterangan"
                          isRequired
                          placeholder="Masukkan Keterangan"
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

PersonalComputer.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createRole: (formData, refresh) => dispatch(createRole(formData, refresh)),
  updateRole: (formData, id, refresh) => dispatch(updateRole(formData, id, refresh)),
  deleteRole: (id, refresh) => dispatch(deleteRole(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getRoles(p),
    Component: withToggle({
      Component: PersonalComputer,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
