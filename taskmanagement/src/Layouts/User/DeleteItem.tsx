import React from "react";

interface DeleteProps {
  onCancel: () => void;
  onDeleteConfirm: () => void;
}

const DeleteItem: React.FC<DeleteProps> = ({ onCancel, onDeleteConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onDeleteConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
