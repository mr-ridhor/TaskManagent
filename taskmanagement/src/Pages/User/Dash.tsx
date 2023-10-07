import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card';
import { PrimaryButton } from '../../Components/Button';
import SearchBox from '../../Layouts/User/SearchBox';
import TaskTable from '../../Layouts/User/TaskTable';
import CreateItem from '../../Layouts/User/CreateItem';
import axiosClient from '../../axiosClient';
import { fetchUserItemsData } from '../../Service/AuthService';
import { ItemTypes } from '../../Types/ItemsTypes';

const Dash: React.FC = () => {
  const [userItems, setUserItems] = useState<ItemTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<ItemTypes[]>(userItems);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchData = async () => {
    try {
      const data = await fetchUserItemsData();
      setUserItems(data);
    } catch (error:any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate('/auth/login');
      }
    }
  };
  const handleLogout = () => {
   localStorage.clear()
    navigate('/auth/login');
  };

  const onDelete = async (itemId: number) => {
    try {
      await axiosClient.delete(`/items/${itemId}`);
      fetchData();
      console.log(`Item with ID ${itemId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting item with ID ${itemId}:`, error);
    }
  };

  const handleSearch = (newSearchTerm: string) => {
    filterItems(newSearchTerm);
  };

  const filterItems = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredItems(userItems);
    } else {
      const filteredItems = userItems.filter((item) => {
        const itemName = item.title.toLowerCase();
        searchTerm = searchTerm.toLowerCase();
        return itemName.startsWith(searchTerm);
      });
      setFilteredItems(filteredItems);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      fetchData();
    }
  }, [isModalOpen]);

  useEffect(() => {
    setFilteredItems(userItems);
  }, [userItems]);

  const pageSize = 5;

  const handleNextPage = () => {
    const totalPages = Math.ceil(userItems.length / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='mt-2 w-f flex flex-col justify-center'>
      <div className="flex justify-center mt-2">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center w-full">
        <Card className='bg-gray-100'>
          <div className="flex items-center w-full justify-between">
            <div className="w-1/2 md:w-fit relative">
              <SearchBox userItems={userItems} onSearch={handleSearch} />
            </div>
            <div className="md:w-fit">
              <PrimaryButton onClick={toggleModal}>
                Create
              </PrimaryButton>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex items-center justify-center">
        <Card className='rounded-lg h-'>
          {filteredItems.length === 0 ? (
            <div className="text-center text-gray-500">No items found</div>
          ) : (
            <TaskTable userItems={filteredItems} onDelete={onDelete} refresh={fetchData} currentPage={currentPage} pageSize={pageSize} />
          )}
        </Card>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={handlePreviousPage}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Next
        </button>
      </div>
      {isModalOpen && <CreateItem onClose={toggleModal} />}
    </div>
  );
};

export default Dash;
