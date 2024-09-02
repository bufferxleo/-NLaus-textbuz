import { useState } from "react";
import EditableContentContextText from "./EditableContentContextText";

const TnCandPrivacy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleTandCClick = () => {
    setModalContent("Terms and Conditions");
    setIsModalOpen(true);
  };

  const handlePrivacyClick = () => {
    setModalContent("Privacy Policy");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-x-1 text-left">
      <EditableContentContextText className="text-sm inline">
        By signing up, you agree to our
      </EditableContentContextText>
      <div
        onClick={handleTandCClick}
        className="text-sm  inline text-secondaryColor cursor-pointer ml-1"
      >
        Terms and Conditions
      </div>
      <EditableContentContextText className="text-sm inline">
        and our
      </EditableContentContextText>
      <div
        onClick={handlePrivacyClick}
        className="text-sm  inline text-secondaryColor cursor-pointer ml-1"
      >
        Privacy Policy
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">{modalContent}</h2>
              <hr className="mb-4 border-gray-300" />
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vehicula, mi vel tincidunt volutpat, lectus sem dapibus orci, in
                interdum magna enim nec quam. Suspendisse potenti.
              </p>
              <div className="w-full flex items-center justify-center mt-4">
                <button
                  onClick={handleCloseModal}
                  className="border border-black w-[150px] px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={handleCloseModal}
                  className="border border-primaryColor w-[150px] bg-primaryColor text-white px-4 py-2 ml-2 rounded-md hover:bg-secondaryColor"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TnCandPrivacy;
