const Popup = ({ setShowPopup, setUploadedData }) => {
  const delay = (ms = 500) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target.result;
      let data = await JSON.parse(fileContent);

      setUploadedData((prev) => [...prev, data]);
      await delay();
      setShowPopup(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg h-1/2">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="mb-4 text-xl font-semibold text-center">Upload Files</h2>

        {/* File Input */}
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="block w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
