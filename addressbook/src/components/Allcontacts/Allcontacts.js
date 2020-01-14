import React, { Component } from "react";
import { Card, Icon, Avatar, Tooltip } from "antd";
import "./allcontacts.css";
export default class Allcontacts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Card hoverable style={{ width: 240 }}>
          <Avatar style={{ backgroundColor: "#102844",justifyContent:'center',}} icon="user" />
          <hr className="underline"></hr>
          <div className="additional">
            <p className="price">
              First Name: <span className="quantity">KImmy</span>
            </p>
            <p>
              Last Name: <span className="quantity">Dora</span>
            </p>
            <p>
              Contact Number: <span className="quantity">092122333</span>
            </p>
          </div>
          <hr className="underline"></hr>
          
          <div className="allActions">
            <Tooltip placement="bottomRight" title='Edit'>
              <Icon type="edit" key="edit" />
            </Tooltip>
            <Tooltip placement="bottomRight" title='Delete'>
              <Icon type="delete" key="edit" />
            </Tooltip>
            <Tooltip placement="bottomRight" title='Show All Info'>
              <Icon type="eye" key="edit" />
            </Tooltip>
          </div>
        </Card>
        {/* <div>
           <Card
           hoverable
           style={{ width: 240 }}
           cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
         >
           <Meta
             title="Europe Street beat"
             description="www.instagram.com"
           />
           <div className="additional">
             <p className="price">Price: <span className="quantity">20$</span></p>
             <p>Author: <span className="quantity">John Doe</span></p>
           </div>
         </Card>
         </div> */}
      </div>
    );
  }
}
