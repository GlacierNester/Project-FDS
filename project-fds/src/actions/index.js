import axios from "axios";
import History from "../history.js";
import aws4 from "aws4";
import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_TENANT,
	UPDATE_USER
} from "./types";

export const signinUser = ({ email, pass }) => {
	return (dispatch) => {

		let body = {
			typeOfUser: "tenant",
			email: email,
			pass: pass

		};

		const opts = {
			method: "POST",
			service: "execute-api",
			region: "us-east-1",
			path: "/default/login",
			host: "shr4ny5edi.execute-api.us-east-1.amazonaws.com",
			headers: {
				"x-api-key": "uQ7ipyNhNb7xNSNJr65Hy3JvplPPXmF49FwTNIRg",
				"Content-Type": "application/json"
			},
			url: "https://shr4ny5edi.execute-api.us-east-1.amazonaws.com/default/login",
			data: body,
			body: JSON.stringify(body)
		};

		const request = aws4.sign(opts);
		delete request.headers.Host;
		delete request.headers["Content-Length"];

		axios(request)
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem("token", response.data.body.awsUserInfo.SessionToken);
				localStorage.setItem("id", response.data.body.dbUserInfo.id);
				History.push("/portal/tenant/home");
				window.location.reload();

			}).catch(() => {

				dispatch(authError("Bad Login Info"));
			});
	};
};

export const authError = (error) => {
	return {
		type: AUTH_ERROR,
		payload: error
	};
};

export const signoutUser = () => {
	localStorage.removeItem("token");
	return { type: UNAUTH_USER };
};

export const editEmail = (email) =>{
	return{
		type:UPDATE_USER,
		payload:email
	};
};

export const fetchTenant = ( ) => {


	const opts = {
		method: "GET",
		service: "execute-api",
		region: "us-east-1",
		path: "/default/tenant?operation=read",
		host: "shr4ny5edi.execute-api.us-east-1.amazonaws.com",
		headers: {
			authorization: localStorage.getItem("token"),
			"x-api-key": "uQ7ipyNhNb7xNSNJr65Hy3JvplPPXmF49FwTNIRg",
			"Content-Type": "application/json"
		},
		url: "https://shr4ny5edi.execute-api.us-east-1.amazonaws.com/default/tenant?operation=read&id="+localStorage.getItem("id")
	};

	const request = aws4.sign(opts);
	delete request.headers.Host;
	delete request.headers["Content-Length"];
	return (dispatch) => {
		axios(request)
			.then(response => {
				let body = JSON.parse(response.data.body);
				dispatch({
					type: FETCH_TENANT,
					payload: body,
				});
			});
	};
};