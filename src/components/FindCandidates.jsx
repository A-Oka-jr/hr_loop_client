const FindCandidates = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Find Candidates</h1>
      <div className="flex justify-end">
        <button className="bg-primary text-white py-2 px-4 rounded-lg mr-2">
          loop
        </button>
        <button className="bg-primary text-white py-2 px-4 rounded-lg mr-2">
          search
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              type
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Name
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Date
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="text-center py-4">
              No candidates found.
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FindCandidates;
