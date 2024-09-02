const JobFormDialog = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobData = {
      title: formData.get("title"),
      description: formData.get("description"),
      requirements: formData.get("requirements"),
      location: formData.get("location"),
    };
    onSubmit(jobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Requirements
            </label>
            <textarea
              name="requirements"
              id="requirements"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormDialog;
