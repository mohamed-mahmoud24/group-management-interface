import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import InputErrorMessage from "../InputErrorMessage/InputErrorMessage";
import Button from "../Button/Button";

// Array containing input fields for the form
const formInputs = [
    {
        name: "title",
        type: "text",
        placeholder: "Post Title",
        rules: {
            required: true,
            minLength: 4,
            maxLength: 10,
        },
        valvalidations: {
            required: "This field is required",
            minLength: "Please enter a title between 4 and 10 characters",
            maxLength: "Please enter a title between 4 and 10 characters",
        },
    },
    {
        name: "content",
        type: "text",
        placeholder: "Post Content",
        rules: {
            required: true,
            minLength: 15,
            maxLength: 60,
        },
        valvalidations: {
            required: "This field is required",
            minLength: "Please enter content between 15 and 100 characters",
            maxLength: "Please enter content between 15 and 100 characters",
        },
    },
];

// Functional component for the PostForm
const PostForm = ({ closeModal, setGroups, index, groupToEdit }) => {
    // useForm hook to manage form state
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Function to handle form submission
    const onSubmit = (data) => {
        // Add the new post to the group's posts array
        groupToEdit.posts.push(data);
        // Update the groups state with the modified group
        setGroups((prev) => {
            prev[index] = groupToEdit;
            return [...prev];
        });
        // Close the modal after form submission
        closeModal();
    };

    // Render the JSX structure of the form
    return (
        <form
            onSubmit={handleSubmit(onSubmit)} // Handle form submission
            className="flex flex-col space-y-3"
        >
            {/* Map through formInputs array to render input fields */}
            {formInputs.map(
                ({ name, placeholder, type, valvalidations, rules }) => (
                    <div className="flex flex-col space-y-1" key={name}>
                        {/* Input component */}
                        <Input
                            placeholder={placeholder}
                            type={type}
                            {...register(name, rules)} // Register input field with validation rules
                        />
                        {/* Display error message if any */}
                        {errors[name] && (
                            <InputErrorMessage
                                msg={valvalidations[errors[name].type]} // Show validation error message
                            />
                        )}
                    </div>
                )
            )}
            {/* Buttons for form actions */}
            <div className="flex space-x-3">
                <Button width="w-full" className="bg-lime-600">
                    Add
                </Button>
                <Button
                    type="button"
                    onClick={closeModal}
                    width="w-full"
                    className="bg-gray-400"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
