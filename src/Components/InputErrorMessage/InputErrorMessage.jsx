// Define a functional component InputErrorMessage
const InputErrorMessage = ({ msg }) => {
    // Render the error message if msg is truthy, otherwise render null
    return msg ? (
        <span className="text-red-500 bg-pink-200 d-block fw-semibold fs-6 px-2 mb-2 rounded-lg">{msg}</span>
    ) : null;
};

export default InputErrorMessage;