import Button from "../Button/Button"
import PostList from "../PostList/PostList";

// Define a functional component GroupList
const GroupList = ({ group, setDeleteGroupModal, setCurrentId, index, setEditGroupModal, setGroupToEditIndex, setAddPostModal }) => {
    // Destructure properties from the group object
    const { name, description, createdAt } = group;

    // Rendering JSX for a single group item
    return (
        <li className="border border-gray-400 shadow-xl my-3 p-3 flex space-y-4 flex-col rounded-lg bg-gray-200 scale-95 hover:scale-110 transition-all duration-500 ">
            <p>
                <span className="font-bold"> Group name :</span> {name} {/* Displaying group name */}
            </p>
            <p>
                {" "}
                <span className="font-bold">Group description</span> :{" "}
                {description} {/* Displaying group description */}
            </p>
            <p className="pt-5 text-xs">
                This group Created at :{" "}
                <span className="underline p-1">{createdAt}</span> {/* Displaying creation date */}
            </p>
            {/* Buttons for group actions */}
            <div className="flex space-x-5">
                {/* Button to delete group */}
                <Button
                    className="bg-red-500"
                    onClick={() => {
                        setDeleteGroupModal(true); // Set delete group modal to true
                        setCurrentId(group.id); // Set current ID to group ID
                    }}
                >
                    Delete
                </Button>
                {/* Button to edit group */}
                <Button
                    className="bg-lime-500"
                    onClick={() => {
                        setEditGroupModal(true); // Set edit group modal to true
                        setCurrentId(group.id); // Set current ID to group ID
                        setGroupToEditIndex(index); // Set index of group to edit
                    }}
                >
                    Update
                </Button>
                {/* Button to add post to group */}
                <Button
                    className="bg-sky-500"
                    onClick={() => {
                        setCurrentId(group.id); // Set current ID to group ID
                        setGroupToEditIndex(index); // Set index of group to edit
                        setAddPostModal(true); // Set add post modal to true
                    }}
                >
                    Add Post
                </Button>
            </div>
            {/* Render PostList component for displaying posts of the group */}
            <PostList key={index} posts={group.posts} />
        </li>
    );
};

export default GroupList;
