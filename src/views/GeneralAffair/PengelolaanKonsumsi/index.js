import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PengelolaanKonsumsi = (props) => {
  const { auth } = props

  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-konsumsi/working-order"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Working Order</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-konsumsi/konsumsi-rapat"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Konsumsi Rapat</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-konsumsi/konsumsi-kegiatan"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Konsumsi Kegiatan</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

PengelolaanKonsumsi.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(PengelolaanKonsumsi)
