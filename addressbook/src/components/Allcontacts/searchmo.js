<div className="card">
        {!Array.isArray(this.props.search) || !this.props.search.length ? (
          this.props.searchinput.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Empty />
            </div>
          ) : (
        //     
        ) : (
        
        )}
      </div>
//  <h1
style={{
  whidth: "100px",
  display: "flex",
  justifyContent: "space-evenly"
}}
>
Contacts
<Search
  search={this.handleSearch}
  style={{ display: "flex", justifyContent: "center" }}
/>
</h1>

<hr className="underline"></hr>

<div className="mainCon">
{// this.props.allContacts

!Array.isArray(this.props.search) || !this.props.search.length ? (
  this.props.searchinput.length > 0 ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Empty />
    </div>
  ) : (
//     
) : (

)}
this.state.search
  .sort((a, b) => a.lastname.localeCompare(b.lastname))
  .map(contact => {
    let conID = contact.id;
    let contacts = contact;
    // console.log(conID)
    return (
      <Card
        // hoverable
        style={{
          width: 240,
          marginTop: "15px",
          marginLeft: "10px",
          borderRadius: "10px",
          boxShadow: "5px 10px 18px #888888"
          // backgroundColor: "aqua"
        }}
        key={contact.id}
      >
        <Avatar
          style={{
            // height:'10px',
            backgroundColor: "#102844",
            justifyContent: "center",
            width: "100%",
            boxShadow: "5px 4px 10px #888888"
          }}
          icon="user"
          size={70}
          shape="square"
        />
        <hr className="underline"></hr>
        <div className="additional">
          <p className="lastFirstname">
            Name:{" "}
            <span className="names1">
              {contact.lastname} {contact.firstname}
            </span>
          </p>

          <p>
            Contact Number:{" "}
            <span className="names">{contact.mobile_phone}</span>
          </p>
        </div>

        <hr className="underline"></hr>

        <div className="allActions">
          {/* <Tooltip placement="bottomRight" title="Edit">
            <Icon
              type="edit"
              key="edit"
              style={{ fontSize: "20px" }}
            />
          </Tooltip> */}
          <Popconfirm
            placement="top"
            title="Sure to delete?"
            onConfirm={re => this.onDelete(conID)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottomRight" title="Delete">
              <Icon type="delete" style={{ fontSize: "20px" }} />
            </Tooltip>
          </Popconfirm>

          <Tooltip placement="bottomRight" title="Show All Info">
            <Icon
              type="eye"
              key="edit"
              onClick={() => this.showModal(contacts)}
              style={{
                fontSize: "20px"
              }}
            />
          </Tooltip>
        </div>
      
      </Card>
    );
  })}
</div>
</div>

      <div>
      <Modal
        title="Contact Info"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div>
          <Form onSubmit={e => this.handleSubmit(conID)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="Last Name"
                >
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    placeholder="Last Name"
                    name="lname"
                    required
                    value={this.state.lastname}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="First Name"
                >
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    placeholder="First Name"
                    name="fname"
                    required
                    value={this.state.firstname}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="Home Phone Number"
                >
                  <Input
                    prefix={
                      <Icon
                        type="phone"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    style={{ width: "100%" }}
                    placeholder="Home Phone Number"
                    name="homephonenum"
                    value={this.state.home_phone}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="Mobile Phone Number"
                >
                  <Input
                    prefix={
                      <Icon
                        type="phone"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    style={{ width: "100%" }}
                    placeholder="Mobile Phone Number"
                    name="mobilePhone"
                    value={this.state.mobile_phone}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="Work Phone Number"
                >
                  <Input
                    prefix={
                      <Icon
                        type="phone"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    style={{ width: "100%" }}
                    placeholder="Work Phone Number"
                    name="workPhone"
                    value={this.state.work_phone}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip placement="bottomRight" title="Email">
                  <Input
                    name="email"
                    prefix={
                      <Icon
                        type="mail"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    onChange={e => this.handleChange(e.target)}
                    placeholder="Email"
                    value={this.state.email}
                    required
                  />
                </Tooltip>
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <Form.Item>
                <Tooltip placement="bottomRight" title="City">
                  <Input
                    prefix={
                      <Icon
                        type="environment"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    placeholder="City"
                    name="city"
                    required
                    value={this.state.city}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="State or Province"
                >
                  <Input
                    prefix={
                      <Icon
                        type="bank"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    placeholder="State or Province"
                    name="state"
                    value={this.state.stae_or_province}
                    required
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <Form.Item>
                <Tooltip
                  placement="bottomRight"
                  title="Postal Code"
                >
                  <Input
                    prefix={
                      <Icon
                        type="code"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    placeholder="Postal Code"
                    name="postalCode"
                    required
                    value={this.state.postal_code}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip placement="bottomRight" title="Country">
                  <Input
                    prefix={
                      <Icon
                        type="flag"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    disabled={this.state.disabled}
                    disabled={this.state.disabled}
                    placeholder="Country"
                    name="country"
                    required
                    value={this.state.country}
                    onChange={e => this.handleChange(e.target)}
                  />
                </Tooltip>
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Popconfirm
                    placement="topLeft"
                    title="Want to Add ?"
                    onConfirm={e => this.handleSubmit(conID)}
                    okText="Yes"
                    cancelText="No"
                    disabled={this.state.disabled}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      disabled={this.state.disabled}
                      visibility={false}
                      onSubmit={e => this.handleSubmit(e)}
                    >
                      Save
                    </Button>
                  </Popconfirm>
                  <Button
                    type="primary"
                    style={{ width: "100%", marginLeft: "5px" }}
                    onClick={this.handleEdit}
                  >
                    Edit
                  </Button>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>