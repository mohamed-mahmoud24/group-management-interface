import { Disclosure } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";

// PostList component takes posts as props
const PostList = ({ posts }) => {
    // If there are no posts, display a message
    if (posts.length === 0)
        return <p className="w-full px-4 pt-6">No posts yet</p>;

    // If there are posts, render the post list
    return (
        <div className="w-full px-4 pt-6">
            <h2 className="text-xl font-bold underline">Posts</h2>
            {/* Map through posts array to render each post */}
            {posts.map((post) => (
                <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 my-2">
                    {/* Disclosure component for each post */}
                    <Disclosure>
                        {({ open }) => (
                            <>
                                {/* Disclosure button */}
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                    <span>{post.title}</span>{" "}
                                    {/* Display post title */}
                                    {/* ChevronUp icon */}
                                    <FaChevronUp
                                        className={`${
                                            open ? "transform" : "rotate-180 "
                                        } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                {/* Disclosure panel */}
                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                    {post.content} {/* Display post content */}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            ))}
        </div>
    );
};

export default PostList;
