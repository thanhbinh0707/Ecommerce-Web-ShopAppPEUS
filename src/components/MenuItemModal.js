import React,{useState,useEffect} from 'react';
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import AxiosInstance from '../helper/AxiosInstance';
import Swal from 'sweetalert2';
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import DefaultProfilePicture from "../media/img/sample_profile.png";

const MenuItemModal = ({ menuItem, show, onHide, onSaveChanges }) => {
    const axiosInstance = AxiosInstance();
    const preset_key = "dn5qfc9m";
    const cloud_name = "dd74nv7rp";
    const [editDetails, setEditDetails] = useState({
      name: "",
      description: "",
      price: 0,
      category: "",
      isAvailable: true,
      itemPic: "",
    });
  
    useEffect(() => {
      if (menuItem) {
        setEditDetails(menuItem);
      }
    }, [menuItem]);
    
//https://neomartpro.com/wp-content/uploads/2020/05/cafedenda-1.jpg
    const handleItemPicChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", preset_key);
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
              formData
            );
            setEditDetails((prevDetails) => ({
              ...prevDetails,
              itemPic: response.data.secure_url, // Update the profilePic in the state
            }));
            console.log("Image URL:", response.data.secure_url); // Log the URL
          } catch (error) {
            console.error("Upload error:", error);
          }
        }
      };


    const handleSave = () => {
      onSaveChanges(editDetails);
      console.log(axiosInstance); // Check if it's an Axios instance

      console.log("Edit!!: ", editDetails);
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Swal.fire("Saved!", "", "success");
          try {
            console.log("Edit id: ", editDetails._id);
            const response = await axiosInstance.put(
              `menuitems/update/${editDetails._id}`,
              {
                name: editDetails.name,
                description: editDetails.description,
                price: editDetails.price,
                category: editDetails.category,
                isAvailable: editDetails.isAvailable,
                itemPic: editDetails.itemPic,
              }
            );
            console.log("response: ", response);
            if (response || response.data) {
              Swal.fire("Saved!", "", "success");
              // Refresh the user list
              onSaveChanges();
              onHide();

              console.log("Updated item:", response); // This should now display in the console
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Update failed",
              showConfirmButton: false,
              timer: 1500,
            });
            console.error(
              "Error updating item:",
              error.response ? error.response.data : error
            );
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      onHide();
    };
  
    const handleInputChange = (e) => {
      setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
    };
  
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Edit Menu Item Details</Modal.Title>
          <Button className="btn-close" onClick={onHide}></Button>
        </Modal.Header>
        <Modal.Body>
          {editDetails && (
            <Form>
               <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  // src={editUserDetails.profilePic === "default" ?  DefaultProfilePicture :editUserDetails.profilePic }
                  src={
                    editDetails.itemPic || 'default_item_pic.jpg'
                  }
                  alt="Profile"
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: "50%",
                    marginBottom: 20,
                  }}
                />
                <Button
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                  style={{
                    position: "absolute",
                    bottom: "1.2rem", // adjust as needed
                    right: "11.8rem", // adjust as needed
                    backgroundColor: "#49B2EB",
                    borderRadius: "50%",
                    height: "1.5rem",
                    width: "1.5rem",
                    border: "none",
                  }}
                >
                  <Icon.Eyedropper
                    size="1rem"
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 3,
                      color: "white",
                    }}
                  />
                </Button>
                <input
                  id="profilePicInput"
                  type="file"
                  accept="image/*"
                  onChange={handleItemPicChange}
                  style={{ display: "none" }}
                />
              </div>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={editDetails.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  name="description"
                  value={editDetails.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={editDetails.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  name="category"
                  value={editDetails.category}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formIsAvailable">
                <Form.Label>Availability</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Available"
                  name="isAvailable"
                  checked={editDetails.isAvailable}
                  onChange={(e) => setEditDetails({ ...editDetails, isAvailable: e.target.checked })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default MenuItemModal;
  


