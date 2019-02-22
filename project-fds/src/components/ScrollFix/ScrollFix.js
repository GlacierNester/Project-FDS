import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ScrollFix extends Component {

		static propTypes = {
			children:PropTypes.any,
			location:PropTypes.any
		}

		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location) {
				window.scrollTo(0, 0);
			}
		}

		render() {
			return this.props.children;
		}
}

export default withRouter(ScrollFix);