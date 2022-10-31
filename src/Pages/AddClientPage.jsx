import React, { Component } from "react";
import { withRouter, useHistory } from "react-router-dom";

class AddClientPage extends Component {
  AddClient = () => {
    console.log("Add the client");
  };
  render() {
    return (
      <div>
        <h2>AddClientPage</h2>

        <h3>Enter Client name:-</h3>
        <input></input>
        <h3>Enter Client password:-</h3>
        <input></input>
        <h1></h1>
        <button
          onClick={() => {
            this.AddClient();
          }}
        >
          add Client
        </button>
        <h1></h1>
        <button onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    );
  }
}
export default withRouter(AddClientPage);
