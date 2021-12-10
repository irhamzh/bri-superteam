import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Service from '../../config/services'
// import withTableFetchQuery, { WithTableFetchQueryProp } from '../../HOC/withTableFetchQuery'
// import withToggle, { WithToggleProps } from '../../HOC/withToggle'
// import {
//   createDailyActivities,
//   deleteDailyActivities,
//   updateDailyActivities,
// } from '../../../modules/daily_activities/actions'


const Dashboard = (props) => {
  const { auth } = props
  var trueCountFA;
  var allCountFA = 0;
  var percentageFA;
  var trueCountGA;
  var allCountGA;
  var percentageGA;
  var trueCountPR;
  var allCountPR;
  var percentagePR;
  var trueCountFI;
  var allCountFI;
  var percentageFI;

  if (!auth) return <Redirect to="/login" />
  
  const faPercentage = async () =>{
    var list = await Service.getDailyActivitiesByName("fixed_asset");
    allCountFA = list.data.data.length;
    console.log(allCountFA);
    // load = false;
  }
  faPercentage();
  // faPercentage();
  return (
    <div className="animated fadeIn">
        <Row>
          <Col xs="8">
            <Link to="/dashboard/fixed-asset" style={{ textDecoration: 'none' }}>
              <Card className="" outline color="info">
                <CardBody>
                  <div className="text-value">Fixed Asset</div>
                </CardBody>
              </Card>
            </Link>
          </Col>
  
          <Col xs="8">
            <Link to="/dashboard/procurement" style={{ textDecoration: 'none' }}>
              <Card className="" outline color="info">
                <CardBody>
                  <div className="text-value">Procurement</div>
                </CardBody>
              </Card>
            </Link>
          </Col>
  
          <Col xs="8">
            <Link to="/dashboard/general-affair" style={{ textDecoration: 'none' }}>
              <Card className="" outline color="info">
                <CardBody>
                  <div className="text-value">General Affair</div>
                </CardBody>
              </Card>
            </Link>
          </Col>
  
          <Col xs="8">
            <Link to="/dashboard/financial-admin" style={{ textDecoration: 'none' }}>
              <Card className="" outline color="info">
                <CardBody>
                  <div className="text-value">Financial Admin</div>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

export default connect(mapStateToProps)(Dashboard)


