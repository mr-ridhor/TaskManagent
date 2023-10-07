// Pagination.tsx
interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
  }) => {
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageChange = (pageNumber: number) => {
      onPageChange(pageNumber);
    };
  
    return (
      <nav>
        <ul className="pagination">
          {Array.from({ length: pageNumbers }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link bg-red-300" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default Pagination
  