import React, { useState, useEffect } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import AxiosInstance from "../helper/AxiosInstance";
import Swal from "sweetalert2";
import MenuItemModal from "../components/MenuItemModal";
import AddItemModal from "../components/AddItemModal";
const MenuItemsTable = () => {
  const axiosInstance = AxiosInstance();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleSaveNewMenuItem = async () => {
    // Implement logic to save new menu item
    // Example: axiosInstance.post('/menuitems/add', newMenuItemDetails);
    setShowAddModal(false);
    console.log("Save new menu item!:  ", newMenuItemDetails);
    fetchMenuItems(); // Refresh the list of items
  };
  const [newMenuItemDetails, setNewMenuItemDetails] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    isAvailable: true,
    itemPic: "",
  });

  const handleDeleteClick = async (menuItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Assuming `user._id` contains the user's ID
        if (menuItem._id) {
          try {
            const deletedItem = await axiosInstance.delete(
              `menuitems/delete/${menuItem._id}`
            );
            console.log("Deleted user:", deletedItem);
            if (deletedItem) {
              Swal.fire(
                "Deleted successfully!",
                "Your user has been deleted.",
                "success"
              );
              fetchMenuItems();
            }
          } catch (error) {
            Swal.fire(
              "Delete failed!",
              "Your user hasn't been deleted.",
              "error"
            );
            console.error(
              "Error deleting user:",
              error.response ? error.response.data : error
            );
          }
        } else {
          Swal.fire("Delete failed!", "User is null!", "error");
        }
      }
    });
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMenuItemDetails, setEditMenuItemDetails] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    isAvailable: true,
    itemPic: "",
  });

  const handleEditClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowEditModal(true);
  };
  // Fetch and set menu items
  const fetchMenuItems = async () => {
    try {
      const response = await axiosInstance.get("/menuitems/all");
      console.log("Server response:", response); // Log the server response
      setMenuItems(response);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Handlers for modal actions (add your own logic)
  const handleCloseModal = () => setShowModal(false);

  const handleSaveChanges = () => {
    // Implement save changes logic
    console.log("Save changes!");
    fetchMenuItems();
  };

  return (
    <Container style={{ paddingTop: 50 }}>
      <Button variant="primary" style={{marginLeft:'1135px',marginBottom:'10px'}}
    onClick={() => setShowAddModal(true)}>
    thêm sản phẩm
    </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th> {/* Added header for image column */}
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(menuItems) &&
            menuItems.map((menuItem, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={menuItem.itemPic || "path_to_default_image.jpg"} // Replace with your default image path
                    alt="Menu Item"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{menuItem.name}</td>
                <td>{menuItem.description}</td>
                <td>${menuItem.price.toFixed(2)}</td>
                <td>{menuItem.category}</td>
                <td>{menuItem.isAvailable ? "Yes" : "No"}</td>
                <td>
                  {/* <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                  >
                    thêm sản phẩm
                  </Button> */}
                  <Button
                    variant="info"
                    onClick={() => handleEditClick(menuItem)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(menuItem)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Modal and other components */}
      <MenuItemModal
        menuItem={selectedMenuItem}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSaveChanges={handleSaveChanges}
      />
      <AddItemModal
  menuItem={newMenuItemDetails}
  show={showAddModal}
  onHide={() => setShowAddModal(false)}
  onSaveChanges={handleSaveNewMenuItem}
/>
    </Container>
  );
};

export default MenuItemsTable;
