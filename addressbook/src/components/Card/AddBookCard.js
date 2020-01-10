import React, { Component } from 'react'
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

export default class AddBookCard extends Component {
   constructor(props) {
       super(props)
   
       this.state = {
            loading:true
       }
   }
   
      onChange = checked => {
        this.setState({ loading: !checked });
      };
    
    render() {
        return (
            <div>
            <Switch checked={!this.state.loading} onChange={this.onChange} />
    
            <Card style={{ width: 300, marginTop: 16 }} loading={this.state.loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
    
            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <Skeleton loading={this.state.loading} avatar active>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
          </div>

        )
    }
}
