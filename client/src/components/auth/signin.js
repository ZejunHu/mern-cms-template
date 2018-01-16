import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to do someting to log user in
    this.props.signinUser({ email, password });
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
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            type="password"
            component="input"
            className="form-control"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// Wrap Signin with redux Form
const reduxFormSignin = reduxForm({
  form: "signin",
  fields: ["email", "password"]
})(Signin);

// Export wrapped Signin container with connect helper
export default connect(mapStateToProps, actions)(reduxFormSignin);
