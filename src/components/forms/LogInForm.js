// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Enviroment settings

import * as routes from '../../lib/routes';
import {login} from '../../redux/actions/auth';

// Containers

// Components

import InputField from './InputField';

// Component Code

import styles from '../../styles/AuthForms';
const CLASS = 'top-AuthForm';

class LogInForm extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
		this.handleMessageDone = this.handleMessageDone.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password;
	}

	submit() {
		this.props.login(this.state.email, this.state.password);
	}

	handleMessageDone() {
		this.props.clearAuthMessage();
	}

	onEnterPress = (e) => {
		if(e.keyCode === 13 && this.canSubmit()) {
			this.submit();
		}
	}

	render() {
		const classes = this.props.classes;
		const disabled = !this.canSubmit();

		return (
			<div className={CLASS} onKeyDown={this.onEnterPress}>
				<Card className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title="Sign In"
						subheader="Welcome back"
						classes={{
							title: classes.whiteText,
							subheader: classes.whiteText,
						}}
					/>
					<CardContent className={classes.cardContent}>
						<InputField
							id="userEmail"
							type="text"
							label="Email"
							onChange={val => this.setState({email: val})}
						/>
						<InputField
							className={classes.inputField}
							id="userPassword"
							type="password"
							label="Password"
							onChange={val => this.setState({password: val})}
						/>
					</CardContent>
					<CardActions className={classes.cardFooter}>
						<Button variant="raised" disabled={disabled} color="primary" onClick={this.submit}>
							SIGN IN
						</Button>
						<Typography
							style={{
								padding: '8px 0',
								textAlign: 'right',
							}}
							type="subheading"
						>
							Don't have an account?<br />
							<Link to={routes.AUTH_REGISTER}>Sign Up</Link>
						</Typography>
					</CardActions>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LogInForm));
