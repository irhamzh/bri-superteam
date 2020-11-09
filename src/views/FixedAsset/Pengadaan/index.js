import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Service from '../../../config/services'
import withTableFetchQuery from '../../../HOC/withTableFetchQuery'
import withToggle from '../../../HOC/withToggle'

const Pengadaan = (props) => {
  const { auth } = props
  if (!auth) return <Redirect to="/login" />

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="8">
          <Link to="/fixed-asset/pengadaan/working-order" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Working Order</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/fixed-asset/pengadaan/barang-jasa" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Pengadaan Barang dan/atau Jasa (IT &amp; Non IT)</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/fixed-asset/pengadaan/jasa-konsultan" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Pengadaan Jasa Konsultan</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/fixed-asset/pengadaan/purchase-order" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Purchase Order</div>
              </CardBody>
            </Card>
          </Link>
        </Col>

        <Col xs="8">
          <Link to="/fixed-asset/pengadaan/tanda-terima" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Tanda Terima Barang</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col xs="8">
          <Link to="/fixed-asset/pengadaan/evaluasi-supplier" style={{ textDecoration: 'none' }}>
            <Card className="" outline color="info">
              <CardBody>
                <div className="text-value">Evaluasi Supplier</div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

Pengadaan.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getRoles(p),
    Component: withToggle({
      Component: Pengadaan,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
