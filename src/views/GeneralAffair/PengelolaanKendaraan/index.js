import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PengelolaanKendaraan = (props) => {
  const { auth } = props

  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-kendaraan/penugasan-driver"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Penugasan Driver</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-kendaraan/kendaraan"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Kendaraan</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-kendaraan/bahan-bakar"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Bahan Bakar</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link
            to="/general-affair/pengelolaan-kendaraan/pemesanan-diluar-dinas"
            style={{ textDecoration: 'none' }}
          >
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Pemesanan Diluar Kendaraan Dinas</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

PengelolaanKendaraan.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(PengelolaanKendaraan)
