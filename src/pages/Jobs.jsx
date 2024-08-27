const Jobs = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
        <tr>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            title
          </th>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            description
          </th>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            requirements
          </th>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            location
          </th>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            posted date
          </th>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            status
          </th>
          <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        {/* Render job listings here */}
        <tr>
          <td>
            
          </td>
        </tr>
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          // onClick={() => handlePageChange(currentPage - 1)}
          // disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
            {/*Page {currentPage} of {totalPages}*/}
          </span>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          // onClick={() => handlePageChange(currentPage + 1)}
          // disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;