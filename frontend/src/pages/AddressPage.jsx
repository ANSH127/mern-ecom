import React from 'react'
import Loadar from "../components/Loadar";
import axios from "axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddaddressDialog from "../components/AddaddressDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";



export default function AddressPage() {


  const [loading, setLoading] = React.useState(true);
  const [address, setAddress] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("ansh");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };



  const fetchUserAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://backend-sigma-ecru.vercel.app/api/address/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setAddress(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://backend-sigma-ecru.vercel.app/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserAddress();
    }
    catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchUserAddress();
  }, []);

  return (
    <div className="sm:w-4/5 w-full mx-auto text-black ">
        {loading ? (
          <Loadar />
        ) : (
          <div className='p-4'>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Your Addresses</h1>
              <AddaddressDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />

              <AddCircleIcon className="cursor-pointer" onClick={handleClickOpen} />
            </div>
            {address.map((address) => {
              return (
                <div key={address._id} className="shadow-md p-4 rounded-lg my-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{address.fullName}</h3>
                    <DeleteOutlineIcon className="cursor-pointer" onClick={() => deleteAddress(address._id)} />
                  </div>
                  <p>{address.address}</p>
                  <p>{address.city}</p>
                  <p>{address.postalCode}</p>
                  <p>{address.state}</p>
                  <p>{address.phoneNumber}</p>
                </div>

              );
            })}
          </div>
        )}
    </div>
  )
}
