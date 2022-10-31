import React from "react";
import { withRouter, useHistory } from "react-router-dom";

function AdminPage(props) {
  let history = useHistory();

  function handleClick() {
    history.push("/AddClientPage");
    //      state: 'test',
  }
  return (
    <div>
      <h2> AdminPage</h2>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        add Client
      </button>
      <h3>Here will be the list of Clients</h3>

      <button onClick={() => props.history.goBack()}>Back</button>
    </div>
  );
}

export default withRouter(AdminPage);
