import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PeralatanIT = (props) => {
  const { auth } = props

  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link to="/pengelola-gedung/peralatan-it/fisik" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Teknisi IT - Fisik</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/pengelola-gedung/peralatan-it/jaringan" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Teknisi IT - Jaringan</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

PeralatanIT.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(PeralatanIT)
