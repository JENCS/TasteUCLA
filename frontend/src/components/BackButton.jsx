import "../styles/BackButton.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex">
      <Button
        onClick={handleGoBack}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </Button>
    </div>
  );
};

export default BackButton;
