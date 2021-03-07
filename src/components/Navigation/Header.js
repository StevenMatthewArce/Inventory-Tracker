import React from 'react';

function Header(props){

    return(
        <div class="ui top inverted attached menu">
            <span class="item link grey" onClick = {props.onToggleMenu}>Menu</span>
        </div>
    );
}

export default Header;