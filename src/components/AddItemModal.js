import React, { useState ,useEffect} from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import AxiosInstance from '../helper/AxiosInstance';
import Swal from 'sweetalert2';
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

const AddItemModal = ({ show, onHide, onAddNewMenuItem }) => {
  const axiosInstance = AxiosInstance();
  
  const preset_key = "dn5qfc9m";
  const cloud_name = "dd74nv7rp";
  // Initialize state with default values for a new item
  const [newItemDetails, setNewItemDetails] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    isAvailable: true,
    itemPic: "",
  });


  
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
          setNewItemDetails((prevDetails) => ({
            ...prevDetails,
            itemPic: response.data.secure_url, // Update the profilePic in the state
          }));
          console.log("Image URL:", response.data.secure_url); // Log the URL
        } catch (error) {
          console.error("Upload error:", error);
        }
      }
    };
  // ... (Keep the rest of the state and functions like handleItemPicChange)

  const handleInputChange = (e) => {
    setNewItemDetails({ ...newItemDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Implement logic to add a new menu item
    try {
      const response = await axiosInstance.post('/menuitems/add', newItemDetails);
      if (response || response.data) {
        Swal.fire("Added!", "New item added successfully.", "success");
        onHide(); // Close the modal
      }
    } catch (error) {
      Swal.fire("Failed to add item", "Please try again.", "error");
      console.error("Error adding new item:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add New Menu Item</Modal.Title>
        <Button className="btn-close" onClick={onHide}></Button>
      </Modal.Header>
      <Modal.Body>
          {newItemDetails && (
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
                   newItemDetails.itemPic || 'default_item_pic.jpg'
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
                  value={newItemDetails.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  name="description"
                  value={newItemDetails.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={newItemDetails.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  name="category"
                  value={newItemDetails.category}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formIsAvailable">
                <Form.Label>Availability</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Available"
                  name="isAvailable"
                  checked={newItemDetails.isAvailable}
                  onChange={(e) =>setNewItemDetails({ ...newItemDetails, isAvailable: e.target.checked })}
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
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
