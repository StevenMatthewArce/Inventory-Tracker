import React, {useContext} from "react";
import { Icon, Menu, Sidebar, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/index";
import { AuthContext } from "../App/Auth";

 //!! Signing out from dashboard gives you an error

const Sidenav = props => {
  const { currentUser } = useContext(AuthContext);
 
  return (
    <Sidebar
      style={{ backgroundColor: "#4c4743" }}
      as={Menu}
      animation="slide along"
      direction="left"
      icon="labeled"
      inverted
      vertical
      visible={props.toggleMenu}
      width="thin"
    >
      {(currentUser!=null)?
      (<div style={{padding: 10, margin: 10}}>
        <Image src='https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/profile_pic_ic5t.svg' size='medium' circular />
        <Header style={{color: "white"}}content={(currentUser != null) ? currentUser.displayName : ""}/>   
        </div>):
        (<div></div>)  
    }
      <Menu.Item as={Link} to="/dashboard">
        <Icon name="server" />
        Dashboard
      </Menu.Item>
      <Menu.Item as={Link} to="/inventory">
        <Icon name="boxes" />
        Inventory
      </Menu.Item>
      <Menu.Item as={Link} to="/orders">
        <Icon name="tasks" />
        Orders
      </Menu.Item>
      <Menu.Item as={Link} to="/budget">
        <Icon name="sticky note" />
        Budget
      </Menu.Item>
      <Menu.Item onClick={() => auth.signOut()}>
        <Icon name="sign out" />
        Sign Out
      </Menu.Item>
    </Sidebar>
  );
};

export default Sidenav;
