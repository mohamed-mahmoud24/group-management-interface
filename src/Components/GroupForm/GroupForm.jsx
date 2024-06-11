import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import InputErrorMessage from "../InputErrorMessage/InputErrorMessage";
import Button from "../Button/Button";

// Array containing input fields for the form
const formInputs = [
    {
        name: "name",
        type: "text",
        placeholder: "Group Name",
        rules: {
            required: true,
            minLength: 4,
            maxLength: 10,
        },
        valvalidations: {
            required: "This field is required",
            minLength: "Please enter a name between 4 and 10 characters",
            maxLength: "Please enter a name between 4 and 10 characters",
        },
    },
    {
        name: "description",
        type: "text",
        placeholder: "Group description",
        rules: {
            required: true,
            minLength: 15,
            maxLength: 60,
        },
        valvalidations: {
            required: "This field is required",
            minLength:
                "Please enter a description between 15 and 60 characters",
            maxLength:
                "Please enter a description between 15 and 60 characters",
        },
    },
];

// Functional component for the GroupForm
const GroupForm = ({ closeModal, setGroups, edit, index, groupToEdit }) => {
    // useForm hook to manage form state
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Function to handle form submission for adding a group
    const onSubmit = (data) => {
        data.createdAt = new Date().toLocaleDateString(); // Adding creation date
        data.id = Date.now(); // Generating unique ID
        data.posts = []; // Initializing posts array
        setGroups((prev) => [...prev, data]); // Adding new group to groups array
        closeModal(); // Closing modal after form submission
    };

    // Function to handle form submission for editing a group
    const onSubmitEdit = (data) => {
        // Updating name and description of the group to edit
        groupToEdit.name = data.name;
        groupToEdit.description = data.description;
        setGroups((prev) => {
            prev[index] = groupToEdit; // Updating the group in the groups array
            return [...prev];
        });
        closeModal(); // Closing modal after form submission
    };

    // If in edit mode, register the initial values for the fields
    if (edit) {
        const { name, description } = groupToEdit;
        register("name", { value: name });
        register("description", { value: description });
    }

    // Rendering the form
    return (
        <form
            onSubmit={handleSubmit(edit ? onSubmitEdit : onSubmit)} // Handling form submission based on edit mode
            className="flex flex-col space-y-3 "
        >
            {/* Mapping through formInputs array to render input fields */}
            {formInputs.map(
                ({ name, placeholder, type, valvalidations, rules }) => (
                    <div className="flex flex-col space-y-1" key={name}>
                        {/* Input component */}
                        <Input
                            placeholder={placeholder}
                            type={type}
                            {...register(name, rules)} // Registering input field with validation rules
                        />
                        {/* Displaying error message if any */}
                        {errors[name] && (
                            <InputErrorMessage
                                msg={valvalidations[errors[name].type]} // Showing validation error message
                            />
                        )}
                    </div>
                )
            )}
            {/* Buttons for form actions */}
            <div className="flex space-x-3">
                <Button width="w-full" className="bg-lime-600">
                    {edit ? "Update" : "Add"} {/* Text on the button based on edit mode */}
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

export default GroupForm;
