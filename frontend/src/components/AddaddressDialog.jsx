import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import React from "react";
import axios from "axios";

export default function AddaddressDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      pincode === "" ||
      phone === ""
    ) {
      alert("All fields are required");
      return;
    }

    if (isNaN(pincode) || isNaN(phone)) {
      alert("Pincode and Phone must be a number");
      return;
    }

    if (pincode.length !== 6) {
      alert("Pincode must be 6 digit");
      return;
    }

    const addressData = {
      fullName:name,
      address,
      city,
      state,
      postalCode:pincode,
      phoneNumber:phone,
    };
    // console.log(addressData);
    try {
      const response = await axios.post(
        "https://backend-sigma-ecru.vercel.app/api/address/add",
        addressData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Address added successfully");
        handleClose();
      } else {
        alert("Error in adding address");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      sx={{
        borderRadius: "20px",
        scrollbarWidth: "none",
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Add Address
      </DialogTitle>
      <form>
        <div className="p-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 rounded-lg border"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full p-2 rounded-lg border"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="p-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full p-2 rounded-lg border"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="p-4">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full p-2 rounded-lg  border"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="p-4">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="w-full p-2 rounded-lg border"
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="p-4">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full p-2 rounded-lg border"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="p-4 text-center">
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSubmit}
          >
            Add Address
          </button>
        </div>
      </form>
    </Dialog>
  );
}

AddaddressDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
