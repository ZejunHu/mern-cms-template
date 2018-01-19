import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type} />
    {touched && error && <span className="text-danger">{error}</span>}
  </fieldset>
);

class Signup extends Component {
  handleFormSubmit(formProps) {
    //console.log(formProps);
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          className="form-control"
          name="email"
          type=""
          component={renderField}
          label="Email"
        />
        <Field
          className="form-control"
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          className="form-control"
          name="passwordConfirm"
          type="password"
          component={renderField}
          label="Password Confirm"
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign Up!
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter an email";
  }

  if (!formProps.password) {
    errors.password = "Please enter an password";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter an password confirmation";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

const reduxFormSignup = reduxForm({
  form: "signup",
  validate
})(Signup);
export default connect(mapStateToProps, actions)(reduxFormSignup);
