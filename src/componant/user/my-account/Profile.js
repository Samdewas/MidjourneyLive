import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import swal from "sweetalert";
import { base_url } from "../../../Store/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../../../Assets/img/user.png";
const Profile = ({ Logout }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.persistedReducer.home.userData);
  const [image, setImage] = useState(userImg);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const deleteAccount = () => {
    swal({
      title: "Are you sure?",
      text: "Do you really want to delete your account ?",
      icon: "info",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        axios
          .get(base_url + "/user/deleteUser", {
            headers: { Authorization: `Bearer ${userData?.token}` },
          })
          .then((response) => {
            if (response.status == 200) {
              swal(
                "Your account has been successfully deleted!",
                "",
                "success"
              );
              Logout();
              navigate("/");
            } else {
              swal(response.data.msg, "", "error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="profile">
      <h3 className="title">Basic Details</h3>
      <hr />
      <Form>
        <div className="preview">
          <img id="img-preview" src={image} alt="Profile Preview" />

          <input
            accept="image/*"
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="custom-input"
          />
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={userData?.user?.full_name}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={userData?.user?.email} disabled />
        </Form.Group>
      </Form>
      <button onClick={deleteAccount} className="theme-btn mt-2">
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
