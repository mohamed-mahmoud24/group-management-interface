import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";
import GroupList from "./Components/GroupList/GroupList";
import GroupForm from "./Components/GroupForm/GroupForm";
import PostForm from "./Components/PostForm/PostForm";

// Get data from local storage or initialize an empty array
const groupArray = JSON.parse(localStorage.getItem("groups")) || [];

// App component function
function App() {
    // State variables to manage various aspects of the application
    const [groups, setGroups] = useState(groupArray); // State for groups
    const [addFormModal, setAddFormModal] = useState(false); // State for add form modal
    const [deleteGroupModal, setDeleteGroupModal] = useState(false); // State for delete group modal
    const [editGroupModal, setEditGroupModal] = useState(false); // State for edit group modal
    const [addPostModal, setAddPostModal] = useState(false); // State for add post modal
    const [currentId, setCurrentId] = useState(false); // State for current group ID
    const [groupToEdit, setGroupToEdit] = useState({}); // State for group being edited
    const [groupToEditIndex, setGroupToEditIndex] = useState(0); // State for index of group being edited

    // Effect to get current group to delete or edit
    useEffect(() => {
        if (currentId) {
            setGroupToEdit(groups.find((group) => group.id === currentId));
        }
    }, [currentId, groups]);

    // Effect to save data in local storage
    useEffect(() => {
        localStorage.setItem("groups", JSON.stringify(groups));
    }, [groups]);

    // Function to delete a group
    const deleteGroup = () => {
        setGroups((prev) => prev.filter((group) => group.id !== currentId));
        setDeleteGroupModal(false); // Close the delete group modal
    };

    // Render the JSX structure of the app
    return (
        <div className="shadow-xl w-[600px] mx-auto max-w-[80%] text-center p-12 mt-5 border border-gray-300">
            {/* Button to add a new group */}
            <Button
                className="bg-sky-500 px-10"
                onClick={() => setAddFormModal(true)}
            >
                Add Group
            </Button>

            {/* Display all groups in a list */}
            <ul className="mt-5 text-start">
                {groups.map((group, index) => (
                    <GroupList
                        key={group.name}
                        group={group}
                        index={index}
                        setAddPostModal={setAddPostModal}
                        setGroupToEditIndex={setGroupToEditIndex}
                        setEditGroupModal={setEditGroupModal}
                        setCurrentId={setCurrentId}
                        setDeleteGroupModal={setDeleteGroupModal}
                    />
                ))}
            </ul>

            {/* Modal for adding a new group */}
            <Modal
                title={"Add Group Form"}
                description={"Fill this form to add a group"}
                isOpen={addFormModal}
                closeModal={() => setAddFormModal(false)}
            >
                <GroupForm
                    closeModal={() => setAddFormModal(false)}
                    setGroups={setGroups}
                />
            </Modal>

            {/* Modal for editing a group */}
            <Modal
                title={`Edit Group ${groupToEdit?.name}`}
                description={`You are now editing ${groupToEdit?.name}`}
                isOpen={editGroupModal}
                closeModal={() => setEditGroupModal(false)}
            >
                <GroupForm
                    closeModal={() => setEditGroupModal(false)}
                    setGroups={setGroups}
                    index={groupToEditIndex}
                    groupToEdit={groupToEdit}
                    edit={true}
                />
            </Modal>

            {/* Modal for deleting a group */}
            <Modal
                title={`Delete Group ${groupToEdit?.name}`}
                description={`Are you sure you want to delete ${groupToEdit?.name}?`}
                isOpen={deleteGroupModal}
                closeModal={() => setDeleteGroupModal(false)}
            >
                <div className="flex space-x-3">
                    {/* Button to delete the group */}
                    <Button
                        onClick={deleteGroup}
                        className="bg-red-500"
                        width="w-full"
                    >
                        Delete
                    </Button>
                    {/* Button to cancel the delete operation */}
                    <Button
                        onClick={() => setDeleteGroupModal(false)}
                        className="bg-gray-400"
                        width="w-full"
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>

            {/* Modal for adding a new post */}
            <Modal
                title={`Add a new post to ${groupToEdit?.name}`}
                description={`Fill this form to add a post to ${groupToEdit?.name}`}
                isOpen={addPostModal}
                closeModal={() => setAddPostModal(false)}
            >
                <PostForm
                    closeModal={() => setAddPostModal(false)}
                    setGroups={setGroups}
                    index={groupToEditIndex}
                    groupToEdit={groupToEdit}
                />
            </Modal>
        </div>
    );
}

export default App;
