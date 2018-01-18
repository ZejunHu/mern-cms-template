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
  handleFormSubmit({ email, password, passwordConfirm }) {
    console.log(email, password, passwordConfirm);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          className="form-control"
          name="email"
          type="email"
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
        <button action="submit" className="btn btn-primary">
          Sign Up!
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

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
