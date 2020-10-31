import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Kebersihan = (props) => {
  const { auth } = props

  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link
            to="/pengelola-gedung/kebersihan/innovation-building"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Innovation Building</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/pengelola-gedung/kebersihan/smart-building" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Smart Building</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/pengelola-gedung/kebersihan/halaman" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Halaman</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link
            to="/pengelola-gedung/kebersihan/sarana-pendukung"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Sarana Pendukung</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

Kebersihan.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(Kebersihan)
