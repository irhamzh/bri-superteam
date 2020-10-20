import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Aset = (props) => {
  const { auth } = props

  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link to="/fixed-asset/aset/daftar-aset" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Daftar Aset</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/fixed-asset/aset/kondisi-aset" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Kondisi Aset</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/fixed-asset/aset/penghapusbukuan-aset" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Penghapusbukuan Aset (hanya yang tidak layak)</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

Aset.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(Aset)
