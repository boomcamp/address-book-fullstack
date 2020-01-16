import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { MDBCol, MDBRow } from "mdbreact";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "react-select";

export default class Modal extends React.Component {
  render() {
    const {
      handleModalClose,
      isModal,
      createContactHandler,
      editContactHandler,
      changeHandler,
      selectHandler,
      currentData,
      deleteContactHandler,
      deleteContact,
      addToGroup,
      addToGroupHandler,
      addAGroup,
      addAGroupHandler,
      editGroup,
      editGroupHandler,
      deleteGroup,
      deleteGroupHandler,
      groups
    } = this.props;

    const options = groups
      ? Object.keys(groups).map(x => {
          return {
            label: groups[x].group_name,
            value: groups[x].id
          };
        })
      : " ";

    return (
      <div>
        {deleteGroup ? (
          <Dialog
            open={isModal}
            onClose={handleModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Group"}</DialogTitle>
            <form
              className="needs-validation"
              onSubmit={e => deleteGroupHandler(e, currentData)}
              noValidate
            >
              <DialogContent></DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : editGroup ? (
          <Dialog
            open={isModal}
            onClose={handleModalClose}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Edit Group"}</DialogTitle>{" "}
            <form
              className="needs-validation"
              onSubmit={e => editGroupHandler(e, currentData)}
              noValidate
            >
              <DialogContent>
                <MDBRow>
                  <MDBCol md="12" className="mb-3">
                    <label htmlFor="groupName" className="grey-text">
                      Group Name
                    </label>
                    <input
                      defaultValue={currentData.group_name}
                      name="groupName"
                      onChange={changeHandler}
                      type="text"
                      id="groupName"
                      className="form-control"
                      placeholder="Group Name"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid group name.
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                </MDBRow>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Edit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : addAGroup ? (
          <Dialog
            open={isModal}
            onClose={handleModalClose}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Add a Group"}</DialogTitle>{" "}
            <form
              className="needs-validation"
              onSubmit={addAGroupHandler}
              noValidate
            >
              <DialogContent>
                <MDBRow>
                  <MDBCol md="12" className="mb-3">
                    <label htmlFor="groupName" className="grey-text">
                      Group Name
                    </label>
                    <input
                      name="groupName"
                      onChange={changeHandler}
                      type="text"
                      id="groupName"
                      className="form-control"
                      placeholder="Group Name"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid group name.
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                </MDBRow>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : addToGroup ? (
          <Dialog
            open={isModal}
            onClose={handleModalClose}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Add to Group"}</DialogTitle>{" "}
            <form
              className="needs-validation"
              onSubmit={e => addToGroupHandler(e, currentData)}
              noValidate
            >
              <DialogContent>
                <MDBRow>
                  <MDBCol md="12" className="mb-3">
                    <label htmlFor="fname" className="grey-text">
                      Select a Group
                    </label>
                    <Select
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: base => ({ ...base, zIndex: 9999 })
                      }}
                      className="basic-single"
                      name="groupSelect"
                      onChange={selectHandler}
                      classNamePrefix="select"
                      defaultValue={"Choose a Group"}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      options={options}
                    />
                  </MDBCol>
                </MDBRow>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : deleteContact ? (
          <Dialog
            open={isModal}
            onClose={handleModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete the Contact"}
            </DialogTitle>{" "}
            <form
              className="needs-validation"
              onSubmit={e => deleteContactHandler(e, currentData)}
              noValidate
            >
              <DialogContent></DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : currentData ? (
          <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isModal}
            onClose={handleModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Edit a Contact"}
            </DialogTitle>{" "}
            <form
              className="needs-validation"
              onSubmit={e => editContactHandler(e, currentData)}
              noValidate
            >
              <DialogContent>
                <div style={{ padding: "20px" }}>
                  <MDBRow>
                    <MDBCol md="6" className="mb-3">
                      <label htmlFor="fname" className="grey-text">
                        First name
                      </label>
                      <input
                        defaultValue={currentData.first_name}
                        name="fname"
                        onChange={changeHandler}
                        type="text"
                        id="fname"
                        className="form-control"
                        placeholder="First name"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid first name.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                      <label htmlFor="lname" className="grey-text">
                        Last name
                      </label>
                      <input
                        defaultValue={currentData.last_name}
                        name="lname"
                        onChange={changeHandler}
                        type="text"
                        id="lname"
                        className="form-control"
                        placeholder="Last name"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid last name.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="12" className="mb-3">
                      <label htmlFor="email" className="grey-text">
                        Email
                      </label>
                      <input
                        defaultValue={currentData.email}
                        onChange={changeHandler}
                        type="text"
                        id="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid country.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="hphone" className="grey-text">
                        Home Phone
                      </label>
                      <input
                        defaultValue={currentData.home_phone}
                        onChange={changeHandler}
                        type="text"
                        id="hphone"
                        className="form-control"
                        name="hphone"
                        placeholder="Home Phone"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a home phone.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="mphone" className="grey-text">
                        Mobile Phone
                      </label>
                      <input
                        defaultValue={currentData.mobile_phone}
                        onChange={changeHandler}
                        type="text"
                        id="mphone"
                        className="form-control"
                        name="mphone"
                        placeholder="Mobile Phone"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid mobile phone.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="wphone" className="grey-text">
                        Work Phone
                      </label>
                      <input
                        defaultValue={currentData.work_phone}
                        onChange={changeHandler}
                        type="text"
                        id="wphone"
                        className="form-control"
                        name="wphone"
                        placeholder="Work Phone"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid work phone.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="city" className="grey-text">
                        City
                      </label>
                      <input
                        defaultValue={currentData.city}
                        onChange={changeHandler}
                        type="text"
                        id="city"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid city.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="state_province" className="grey-text">
                        State or Province
                      </label>
                      <input
                        defaultValue={currentData.state_or_province}
                        onChange={changeHandler}
                        type="text"
                        id="state_province"
                        className="form-control"
                        name="state_province"
                        placeholder="State"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="zip" className="grey-text">
                        Postal Code
                      </label>
                      <input
                        defaultValue={currentData.postal_code}
                        onChange={changeHandler}
                        type="text"
                        id="zip"
                        className="form-control"
                        name="zip"
                        placeholder="Zip"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid postal code.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="12" className="mb-3">
                      <label htmlFor="country" className="grey-text">
                        Country
                      </label>
                      <input
                        defaultValue={currentData.country}
                        onChange={changeHandler}
                        type="text"
                        id="country"
                        className="form-control"
                        name="country"
                        placeholder="Country"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid country.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Edit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : (
          <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isModal}
            onClose={handleModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Create a Contact"}
            </DialogTitle>{" "}
            <form
              className="needs-validation"
              onSubmit={createContactHandler}
              noValidate
            >
              <DialogContent>
                <div style={{ padding: "20px" }}>
                  <MDBRow>
                    <MDBCol md="6" className="mb-3">
                      <label htmlFor="fname" className="grey-text">
                        First name
                      </label>
                      <input
                        name="fname"
                        onChange={changeHandler}
                        type="text"
                        id="fname"
                        className="form-control"
                        placeholder="First name"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid first name.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                      <label htmlFor="lname" className="grey-text">
                        Last name
                      </label>
                      <input
                        name="lname"
                        onChange={changeHandler}
                        type="text"
                        id="lname"
                        className="form-control"
                        placeholder="Last name"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid last name.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="12" className="mb-3">
                      <label htmlFor="email" className="grey-text">
                        Email
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid country.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="hphone" className="grey-text">
                        Home Phone
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="hphone"
                        className="form-control"
                        name="hphone"
                        placeholder="Home Phone"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a home phone.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="mphone" className="grey-text">
                        Mobile Phone
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="mphone"
                        className="form-control"
                        name="mphone"
                        placeholder="Mobile Phone"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid mobile phone.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="wphone" className="grey-text">
                        Work Phone
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="wphone"
                        className="form-control"
                        name="wphone"
                        placeholder="Work Phone"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid work phone.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="city" className="grey-text">
                        City
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="city"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid city.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="state_province" className="grey-text">
                        State or Province
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="state_province"
                        className="form-control"
                        name="state_province"
                        placeholder="State"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label htmlFor="zip" className="grey-text">
                        Postal Code
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="zip"
                        className="form-control"
                        name="zip"
                        placeholder="Zip"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid postal code.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="12" className="mb-3">
                      <label htmlFor="country" className="grey-text">
                        Country
                      </label>
                      <input
                        onChange={changeHandler}
                        type="text"
                        id="country"
                        className="form-control"
                        name="country"
                        placeholder="Country"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid country.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Create
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        )}
      </div>
    );
  }
}
