import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Checkbox } from '@material-ui/core'
import Service from '../../../../config/services'
import { AlertMessage, formatDate, invalidValues, userData } from '../../../../helpers'
import {
  createPersekot,
  updatePersekot,
  deletePersekot,
  approvePersekot,
  penihilanPersekot,
} from '../../../../modules/persekot/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class PenihilanPersekot extends Component {
  state = {
    persekotIds: [],
  }

  initialValues = { division: 'Procurement' }

  async componentDidMount() {
    const { fetchQueryProps } = this.props
    fetchQueryProps.setFilteredByObject({
      division: 'Procurement',
      in$status: [
        'Approved oleh Supervisor I',
        'Diajukan Penihilan',
        'Approved oleh Supervisor II',
      ],
    })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createPersekot, updatePersekot } = this.props
    if (!invalidValues.includes(id)) {
      updatePersekot(values, id, this.doRefresh)
    } else {
      createPersekot(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deletePersekot } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deletePersekot(id, this.doRefresh)
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
    const { approvePersekot } = this.props
    const message = {
      title: 'Apa kamu yakin?',
      text: 'Setelah approve, Kamu tidak dapat memulihkan data ini!',
      confirmButtonText: 'Ya, Approve!',
      cancelButtonText: 'Kembali',
    }

    AlertMessage.warning(message)
      .then((result) => {
        if (result.value) {
          approvePersekot(state, id, this.doRefresh)
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

  handlePenihilan = (e) => {
    e.preventDefault()

    const { persekotIds } = this.state
    const { penihilanPersekot } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          penihilanPersekot({ persekotIds }, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Notice!',
            text: 'Proses Penihilan Dibatalkan',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Internal Server Error
      })
  }

  isSelected = (id) => {
    const { persekotIds } = this.state
    return persekotIds.includes(id)
  }

  onCheckboxChange = (id) => {
    const { persekotIds } = this.state

    const selected = [...persekotIds]
    const keyIndex = selected.indexOf(id)
    if (keyIndex > -1) {
      selected.splice(keyIndex, 1)
    } else {
      selected.push(id)
    }

    this.setState({ persekotIds: selected })
  }

  render() {
    const { auth, fetchQueryProps } = this.props
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
        Header: 'Tanggal',
        width: 100,
        accessor: 'date',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Nama Kegiatan',
        accessor: 'name',
        filterable: true,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Nominal Biaya',
        accessor: 'costNominal',
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      {
        Header: 'Status',
        width: 250,
        accessor: 'status',
        align: 'center',
        filterable: false,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
    ]

    const user = userData()
    const allowedRole = ['admin', 'supervisor', 'wakil kepala bagian', 'kepala bagian']
    const showAction = (status) => {
      const role = user.role?.name
      if (role.includes('Supervisor') && status === 'Diajukan Penihilan') return true
      if (role.includes('Kepala Bagian') && status === 'Approved oleh Supervisor II') return true
      if (role.includes('Wakil Kepala Bagian') && status === 'Approved oleh Supervisor II')
        return true

      return false
    }
    if (
      user &&
      (allowedRole.includes(user.role?.name.toLowerCase()) ||
        user.role?.name.includes('Supervisor'))
    ) {
      columns.push({
        Header: 'Aksi',
        width: 200,
        accessor: 'id',
        filterable: false,
        Cell: (props) => (
          <>
            {showAction(props.original?.status) && (
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
            )}
          </>
        ),
      })
    }

    const pageName = 'Penihilan Persekot'
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
                        onClick={(e) => this.handlePenihilan(e)}
                        className="mr-1"
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
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

PenihilanPersekot.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createPersekot: PropTypes.func.isRequired,
  updatePersekot: PropTypes.func.isRequired,
  penihilanPersekot: PropTypes.func.isRequired,
  deletePersekot: PropTypes.func.isRequired,
  approvePersekot: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.persekot.isLoading,
  message: state.persekot.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPersekot: (formData, refresh) => dispatch(createPersekot(formData, refresh)),
  updatePersekot: (formData, id, refresh) => dispatch(updatePersekot(formData, id, refresh)),
  deletePersekot: (id, refresh) => dispatch(deletePersekot(id, refresh)),
  approvePersekot: (formData, id, refresh) => dispatch(approvePersekot(formData, id, refresh)),
  penihilanPersekot: (formData, refresh) => dispatch(penihilanPersekot(formData, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getPersekot(p),
    Component: withToggle({
      Component: PenihilanPersekot,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
