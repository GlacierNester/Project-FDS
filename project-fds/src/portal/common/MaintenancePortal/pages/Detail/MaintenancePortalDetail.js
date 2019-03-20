import React, { Component } from "react";
import PropTypes from "prop-types";
import EmployeeMaintenance from "../../../../../pages/EmployeeMaintenance/EmployeeMaintenance";
import { Card, Button } from "antd";
import { withRouter } from "react-router-dom";

import "./style.css";

class MaintenancePortalDetail extends Component {

	static get propTypes() {
		return {
			match: PropTypes.any,
			history: PropTypes.any
		};
	}

	render() {
		return (
			<React.Fragment>
				<Card title="Maintenance Request Details" bordered={false} id="maintenance_data">
					<h3>Details for {this.props.match.params.tenantName}</h3>
					<Button onClick={() => this.props.history.push("/portal/maintenance/home")} className="basic_button">Back</Button>
				</Card>
				<EmployeeMaintenance />
			</React.Fragment>
		);
	}
}

export default withRouter(MaintenancePortalDetail);