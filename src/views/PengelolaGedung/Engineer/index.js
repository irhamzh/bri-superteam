import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Engineer = (props) => {
  const { auth } = props

  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link to="/pengelola-gedung/engineer/basement" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Basement</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/pengelola-gedung/engineer/gedung" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Gedung</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

Engineer.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(Engineer)
