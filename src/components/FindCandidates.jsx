import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillFolderOpen } from "react-icons/ai";
import SearchDialog from "../components/dialogs/SearchDialog";
import { useSelector } from "react-redux";
import axios from "axios";

const FindCandidates = ({
  requests,
  setRequests,
  currentPage,
  totalPages,
  setCurrentPage,
  setLoading,
  setError,
  loading,
  error,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddSearch = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleJobSubmit = async (searchData, resetForm) => {
    setError(false);
    setLoading(true);
    searchData.company_id = currentUser.user.company_id;
    try {
      const response = await axios.post("/api/v1/search/create", searchData);

      const newSearch = response.data.data;
      if (newSearch.success === false) {
        setLoading(false);
        setError(true);
        console.log(newSearch.message);
        return;
      }
      setLoading(false);
      setError(false);
      setRequests([...requests, newSearch]);
      resetForm(); // Clear the form after a successful submission
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  const handleDeleteSearch = async (request) => {
    setError(false);
    setLoading(true);
    if (confirm("Are you sure you want to delete this search?")) {
      try {
        const response = await axios.delete(
          `/api/v1/search/delete/${request.id}`
        );
        const data = response.data.data;
        if (data.success === false) {
          setLoading(false);
          setError(true);
          console.log(data.message);
          return;
        }

        setLoading(false);
        setError(false);
        setRequests(requests.filter((search) => search.id !== request.id));
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Find Candidates</h1>

      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong
        </p>
      )}

      {requests.length === 0 && !loading && (
        <p className="text-center my-7 text-2xl">No candidates found</p>
      )}

      <div className="flex items-end justify-end">
        <button
          onClick={handleAddSearch}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {requests.length > 0 && (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Type
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Name
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Date
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-6 border-b border-gray-200">
                    {request.type}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {request.name}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    <div className="flex">
                      <Link className="mr-2">
                        <AiFillFolderOpen className="text-primary text-xl hover:text-violet-950" />
                      </Link>
                      <div>|</div>
                      <button
                        onClick={() => handleDeleteSearch(request)}
                        className="ml-2"
                      >
                        <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${
                    currentPage === pageNumber
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-700"
                  } py-2 px-4 rounded-lg mx-1`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
          <SearchDialog
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleJobSubmit}
          />
        </>
      )}
    </>
  );
};

FindCandidates.propTypes = {
  setError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setRequests: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default FindCandidates;
