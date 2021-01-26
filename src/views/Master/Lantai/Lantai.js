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
import { deleteLantai } from '../../../modules/lantai/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'
import ModalForm from './ModalForm/ModalForm'

const initialValues = {}

function Lantai(props) {
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
    const { deleteLantai } = props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteLantai(id, doRefresh)
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
      Cell: (row) => <div style={{ textAlign: 'center' }}>{numbData(row)}</div>,
    },
    {
      Header: 'Lantai',
      accessor: 'name',
      Cell: (row) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
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

  const pageName = 'Lantai'
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

Lantai.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  deleteLantai: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.lantai.isLoading,
  message: state.lantai.message,
})

const mapDispatchToProps = (dispatch) => ({
  deleteLantai: (id, refresh) => dispatch(deleteLantai(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getLantai(p),
    Component: withToggle({
      Component: Lantai,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
