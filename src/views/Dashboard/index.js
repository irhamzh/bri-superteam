// export { default } from './Dashboard'
import React, { Component } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Service from '../../config/services'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Dashboard extends Component{    

    state = {
        percentageFA:0,
        percentageGA:0,
        percentagePR:0,
        percentageFI:0,
    }
    
    async componentDidMount(){
        await this.faPercentage() 
        await this.prPercentage() 
        await this.gaPercentage() 
        await this.fiPercentage() 
    }
    
    faPercentage = async () =>{
        var list = await Service.getDailyActivitiesByName("fixed_asset");
        var trueCount = 0;
        var allCount = 0;
        list.data.data.forEach(element => {
            if (element['isChecked'] == true){
                trueCount++;
            }
            allCount++;
        });
        // console.log(Math.round((trueCount / allCount) * 100) + "%");
        this.setState({ percentageFA: Math.round((trueCount / allCount) * 100) });
    }

    gaPercentage = async () =>{
        var list = await Service.getDailyActivitiesByName("general_affair");
        var trueCount = 0;
        var allCount = 0;
        list.data.data.forEach(element => {
            if (element['isChecked'] == true){
                trueCount++;
            }
            allCount++;
        });
        // console.log(Math.round((trueCount / allCount) * 100) + "%");
        this.setState({ percentageGA: Math.round((trueCount / allCount) * 100) });
    }

    prPercentage = async () =>{
        var list = await Service.getDailyActivitiesByName("procurement");
        var trueCount = 0;
        var allCount = 0;
        list.data.data.forEach(element => {
            if (element['isChecked'] == true){
                trueCount++;
            }
            allCount++;
        });
        // console.log(Math.round((trueCount / allCount) * 100) + "%");
        this.setState({ percentagePR: Math.round((trueCount / allCount) * 100) });
    }

    fiPercentage = async () =>{
        var list = await Service.getDailyActivitiesByName("financial_admin");
        var trueCount = 0;
        var allCount = 0;
        list.data.data.forEach(element => {
            if (element['isChecked'] == true){
                trueCount++;
            }
            allCount++;
        });
        // console.log(Math.round((trueCount / allCount) * 100) + "%");
        this.setState({ percentageFI: Math.round((trueCount / allCount) * 100) });
    }

    render(){
        const { auth } = this.props
        const { percentageFA, percentagePR, percentageGA, percentageFI } = this.state

        if (!auth) return <Redirect to="/login" />
        return (
            <div className="animated fadeIn">
                <Col>
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
                        <Col xs="2">
                            <div style={{ width: 75, height: 75 }}>
                                <CircularProgressbar value={percentageFA} text={`${percentageFA}%`} />
                            </div>
                        </Col>

                    </Row>

                    <Row>

                        <Col xs="8">
                            <Link to="/dashboard/procurement" style={{ textDecoration: 'none' }}>
                            <Card className="" outline color="info">
                                <CardBody>
                                <div className="text-value">Procurement</div>
                                </CardBody>
                            </Card>
                            </Link>
                        </Col>
                        <Col xs="2">
                            <div style={{ width: 75, height: 75 }}>
                                <CircularProgressbar value={percentagePR} text={`${percentagePR}%`} />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="8">
                            <Link to="/dashboard/general-affair" style={{ textDecoration: 'none' }}>
                            <Card className="" outline color="info">
                                <CardBody>
                                <div className="text-value">General Affair</div>
                                </CardBody>
                            </Card>
                            </Link>
                        </Col>
                        <Col xs="2">
                            <div style={{ width: 75, height: 75 }}>
                                <CircularProgressbar value={percentageGA} text={`${percentageGA}%`} />
                            </div>
                        </Col>
                    </Row>

                    <Row>

                        <Col xs="8">
                            <Link to="/dashboard/financial-admin" style={{ textDecoration: 'none' }}>
                            <Card className="" outline color="info">
                                <CardBody>
                                <div className="text-value">Financial Admin</div>
                                </CardBody>
                            </Card>
                            </Link>
                        </Col>
                        <Col xs="2">
                            <div style={{ width: 75, height: 75 }}>
                                <CircularProgressbar value={percentageFI} text={`${percentageFI}%`} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </div>
        )

    }
}
const mapStateToProps = (state) => ({
    auth: state.auth.authenticated,
    isLoading: state.role.isLoading,
    message: state.role.message,
})
export default connect(mapStateToProps)(Dashboard)
