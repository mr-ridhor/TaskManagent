import React, { useState } from "react";
import { ItemTypes } from "../../Types/ItemsTypes";
import { BsTrash } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
import axiosClient from "../../axiosClient";

interface TaskTableProps {
  userItems: ItemTypes[];
  onDelete: (itemId: number) => void;
  refresh: () => void;
  currentPage: number;
  pageSize: number;
}
const TaskTable: React.FC<TaskTableProps> = ({
  userItems,
  onDelete,
  refresh,
  currentPage,
  pageSize,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  console.log(userItems);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const handleDeleteClick = (itemId: number) => {
    setItemToDelete(itemId);
    console.log(itemId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      onDelete(itemToDelete);
      setItemToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleUpdateClick = (itemId: number) => {
    setSelectedItemId(itemId);
    setShowUpdateModal(true);
  };

  const getSelectedItem = () => {
    if (selectedItemId !== null) {
      return userItems.find((item) => item.id === selectedItemId) || null;
    }
    return null;
  };
  const handleUpdate = async (updatedData: ItemTypes) => {
    try {
      // Make a PUT request to update the item
      const response = await axiosClient.put(
        `/items/${selectedItemId}`,
        updatedData
      );

      console.log(response.data);
      // return toast.success(response.data)

      refresh();

      setShowUpdateModal(false);
    } catch (error) {
      // Handle update error, e.g., display an error message
      console.error("Update error:", error);
    }
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the userItems based on pagination
  const itemsToDisplay = userItems.slice(startIndex, endIndex);
  return (
    <div className="w-full ">
      <table className="w-full border-collapse border ">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Tags</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border w-fit">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userItems && itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((task: any) => (
              <tr key={task.id}>
                <td className="p-2 border text-center">{task.id}</td>
                <td className="p-2 border text-center">{task.title}</td>
                <td className="p-2 border text-center">{task.description}</td>
                <td className="p-2 border text-center">{task.tags}</td>
                <td className="p-2 border text-center">
                  {formatDate(task.due_date)}
                </td>
                <td className="p-2 border flex gap-1 justify-center">
                  {/* Add action buttons here */}
                  <button
                    onClick={() => handleUpdateClick(task.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    <BiSolidPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showUpdateModal && selectedItemId !== null && (
        <UpdateItem
          item={getSelectedItem() as ItemTypes}
          onUpdate={handleUpdate}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteItem
          onCancel={() => setShowDeleteModal(false)}
          onDeleteConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TaskTable;
