import React from "react";

function Header(props) {
  return (
    <div
      class="ui top inverted attached menu"
      style={{ backgroundColor: "#4c4743" }}
    >
      <span class="item link grey" onClick={props.onToggleMenu}>
        Menu
      </span>
    </div>
  );
}

export default Header;
