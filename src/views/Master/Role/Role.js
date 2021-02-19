/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import { deleteRole } from '../../../modules/master/role/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'
import ModalForm from './ModalForm/ModalForm'
import IconSuccessOrFailed from '../../../components/IconSuccessOrFailed'

const initialValues = {
  fixedAsset: {
    create: false,
    update: false,
    delete: false,
    read: false,
    dashboard: false,
    approvalKabag: false,
    approvalWakabag: false,
    approvalSupervisor: false,
  },
  procurement: {
    create: false,
    update: false,
    delete: false,
    read: false,
    dashboard: false,
    approvalKabag: false,
    approvalWakabag: false,
    approvalSupervisor: false,
  },
  generalAffair: {
    create: false,
    update: false,
    delete: false,
    read: false,
    dashboard: false,
    approvalKabag: false,
    approvalWakabag: false,
    approvalSupervisor: false,
  },
  financialAdmin: {
    create: false,
    update: false,
    delete: false,
    read: false,
    dashboard: false,
    approvalKabag: false,
    approvalWakabag: false,
    approvalSupervisor: false,
  },
  masterData: {
    create: false,
    update: false,
    delete: false,
    read: false,
  },
}

function Role(props) {
  const { auth, className, fetchQueryProps, modalForm } = props
  const { tableProps } = fetchQueryProps

  function doRefresh() {
    const { fetchQueryProps, modalForm } = props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  function handleDelete(e, state) {
    e.preventDefault()

    const { id } = state
    const { deleteRole } = props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteRole(id, doRefresh)
        }
      })
      .catch((err) => {
        // Internal Server Error
        AlertMessage.error(err)
      })
  }

  const numbData = (row) => tableProps.pageSize * tableProps.page + row.index + 1

  const columns = [
    {
      Header: '#',
      width: 60,
      filterable: false,
      Cell: (row) => <span>{numbData(row)}</span>,
    },
    {
      Header: 'Role',
      accessor: 'name',
      filterable: true,
    },
    {
      Header: 'Fixed Asset',
      columns: [
        {
          Header: 'Create',
          accessor: 'fixedAsset.create',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Update',
          accessor: 'fixedAsset.update',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Delete',
          accessor: 'fixedAsset.delete',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Read',
          accessor: 'fixedAsset.read',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Dashboard',
          accessor: 'fixedAsset.dashboard',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Kabag',
          accessor: 'fixedAsset.approvalKabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Wakabag',
          accessor: 'fixedAsset.approvalWakabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Supervisor',
          accessor: 'fixedAsset.approvalSupervisor',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
      ],
    },
    {
      Header: 'Procurement',
      columns: [
        {
          Header: 'Create',
          accessor: 'procurement.create',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Update',
          accessor: 'procurement.update',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Delete',
          accessor: 'procurement.delete',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Read',
          accessor: 'procurement.read',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Dashboard',
          accessor: 'procurement.dashboard',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Kabag',
          accessor: 'procurement.approvalKabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Wakabag',
          accessor: 'procurement.approvalWakabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Supervisor',
          accessor: 'procurement.approvalSupervisor',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
      ],
    },
    {
      Header: 'General Affair',
      columns: [
        {
          Header: 'Create',
          accessor: 'generalAffair.create',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Update',
          accessor: 'generalAffair.update',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Delete',
          accessor: 'generalAffair.delete',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Read',
          accessor: 'generalAffair.read',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Dashboard',
          accessor: 'generalAffair.dashboard',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Kabag',
          accessor: 'generalAffair.approvalKabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Wakabag',
          accessor: 'generalAffair.approvalWakabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Supervisor',
          accessor: 'generalAffair.approvalSupervisor',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
      ],
    },
    {
      Header: 'Financial Admin',
      columns: [
        {
          Header: 'Create',
          accessor: 'financialAdmin.create',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Update',
          accessor: 'financialAdmin.update',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Delete',
          accessor: 'financialAdmin.delete',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Read',
          accessor: 'financialAdmin.read',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Dashboard',
          accessor: 'financialAdmin.dashboard',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Kabag',
          accessor: 'financialAdmin.approvalKabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Wakabag',
          accessor: 'financialAdmin.approvalWakabag',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Approval Supervisor',
          accessor: 'financialAdmin.approvalSupervisor',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
      ],
    },
    {
      Header: 'Master Data',
      columns: [
        {
          Header: 'Create',
          accessor: 'masterData.create',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Update',
          accessor: 'masterData.update',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Delete',
          accessor: 'masterData.delete',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
        {
          Header: 'Read',
          accessor: 'masterData.read',
          filterable: false,
          headerClassName: 'wordwrap',
          Cell: (row) => <IconSuccessOrFailed value={row.value} />,
        },
      ],
    },
    {
      Header: 'Edit',
      width: 60,
      filterable: false,
      Cell: (row) => (
        <Button
          color="success"
          onClick={() => modalForm.show({ data: row.original })}
          className="mr-1"
          title="Edit"
        >
          <i className="fa fa-pencil" />
        </Button>
      ),
    },
    {
      Header: 'Delete',
      width: 60,
      filterable: false,
      Cell: (row) => (
        <Button
          color="danger"
          onClick={(e) => handleDelete(e, row.original)}
          className="mr-1"
          title="Delete"
        >
          <i className="fa fa-trash" />
        </Button>
      ),
    },
  ]

  const pageName = 'Role'
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
                      onClick={() => modalForm.show({ data: initialValues })}
                      className="mr-1"
                    >
                      <i className="fa fa-plus" style={isIcon} />
                      &nbsp;Tambah
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <ReactTable
                filterable={false}
                columns={columns}
                defaultPageSize={10}
                className="-highlight"
                {...tableProps}
              />
            </CardBody>
          </Card>

          <ModalForm modalForm={modalForm} doRefresh={doRefresh} className={className} />
        </Col>
      </Row>
    </div>
  )
}

Role.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
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
  deleteRole: (id, refresh) => dispatch(deleteRole(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getRoles(p),
    Component: withToggle({
      Component: Role,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
