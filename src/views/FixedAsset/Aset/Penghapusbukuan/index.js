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
} from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Checkbox } from '@material-ui/core'
import Service from '../../../../config/services'
import { AlertMessage, ErrorMessage, userData } from '../../../../helpers'
import { approveAsset, penghapusbukuanAsset, deleteAsset } from '../../../../modules/asset/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class Penghapusbukuan extends Component {
  state = {
    assetIds: [],
  }

  initialValues = {}

  componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      in$status: [
        'Approved oleh Supervisor I',
        'Diajukan Penihilan',
        'Approved oleh Supervisor II',
        'Approved oleh Wakabag',
        'Approved oleh Kabag',
      ],
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
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
    const { deleteAsset } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteAsset(id, this.doRefresh)
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

  handleApprove = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { approveAsset } = this.props
    const message = {
      title: 'Apa kamu yakin?',
      text: 'Setelah approve, Kamu tidak dapat memulihkan data ini!',
      confirmButtonText: 'Ya, Approve!',
      cancelButtonText: 'Kembali',
    }

    AlertMessage.warning(message)
      .then((result) => {
        if (result.value) {
          approveAsset(state, id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Notice!',
            text: 'Proses Approval Dibatalkan',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Internal Server Error
      })
  }

  handlePenghapusbukuan = (e) => {
    e.preventDefault()

    const { assetIds } = this.state
    const { penghapusbukuanAsset } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          penghapusbukuanAsset({ assetIds }, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Notice!',
            text: 'Proses Penghapusbukuan Dibatalkan',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Internal Server Error
      })
  }

  isSelected = (id) => {
    const { assetIds } = this.state
    return assetIds.includes(id)
  }

  onCheckboxChange = (id) => {
    const { assetIds } = this.state

    const selected = [...assetIds]
    const keyIndex = selected.indexOf(id)
    if (keyIndex > -1) {
      selected.splice(keyIndex, 1)
    } else {
      selected.push(id)
    }

    this.setState({ assetIds: selected })
  }

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Checked',
        width: 100,
        accessor: 'id',
        filterable: false,
        Cell: (row) => (
          <span>
            <Checkbox
              color="primary"
              checked={this.isSelected(row.value)}
              onChange={() => this.onCheckboxChange(row.value)}
            />
          </span>
        ),
      },
      {
        Header: 'Kode',
        accessor: 'id',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nama Aset',
        accessor: 'name',
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

    const user = userData()
    const allowedRole = ['admin', 'supervisor', 'wakil kepala bagian', 'kepala bagian']
    if (user && allowedRole.includes(user.role?.name.toLowerCase())) {
      columns.push({
        Header: 'Aksi',
        width: 200,
        accessor: 'id',
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={(e) => this.handleApprove(e, props.original)}
              className="mr-1"
              title="Approve"
            >
              Approve
            </Button>
            &nbsp; | &nbsp;
            <Button
              color="danger"
              onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              Deny
            </Button>
          </>
        ),
      })
    }

    const pageName = 'Penghapusbukuan Aset'
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
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        color="primary"
                        onClick={(e) => this.handlePenghapusbukuan(e)}
                        className="mr-1"
                      >
                        Submit
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
                    <ModalHeader toggle={modalForm.hide}>Data Aset</ModalHeader>
                    <ModalBody>{ErrorMessage(message)}</ModalBody>
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

Penghapusbukuan.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  penghapusbukuanAsset: PropTypes.func.isRequired,
  approveAsset: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.asset.isLoading,
  message: state.asset.message,
})

const mapDispatchToProps = (dispatch) => ({
  penghapusbukuanAsset: (formData, refresh) => dispatch(penghapusbukuanAsset(formData, refresh)),
  approveAsset: (formData, id, refresh) => dispatch(approveAsset(formData, id, refresh)),
  deleteAsset: (id, refresh) => dispatch(deleteAsset(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getAsset(p),
    Component: withToggle({
      Component: Penghapusbukuan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
