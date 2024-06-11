import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoCloseSharp } from "react-icons/io5"; 

// Define a functional component Modal
const Modal = ({ isOpen, title, closeModal, children, description }) => {
    return (
        <div>
            {/* Transition component to handle modal appearance */}
            <Transition appear show={isOpen}>
                <Dialog
                    as="div"
                    className="relative z-[9998] "
                    onClose={closeModal} // Function to close the modal
                >
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 backdrop-blur-lg"
                        aria-hidden="true"
                    />
                    {/* Child transition for modal animation */}
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    ></Transition.Child>

                    {/* Main modal content */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-start align-middle shadow-xl transition-all border">
                                    {/* Close button */}
                                    <button
                                        onClick={closeModal}
                                        className="text-white bg-red-500 hover:bg-red-700 rounded-full absolute end-6 p-[2px]"
                                    >
                                        <IoCloseSharp /> {/* Close icon */}
                                    </button>
                                    {/* Modal title */}
                                    {title && (
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                    )}
                                    {/* Modal description */}
                                    {description && (
                                        <p className="text-sm text-gray-500 mt-3">
                                            {description}
                                        </p>
                                    )}
                                    {/* Modal content */}
                                    <div className="mt-4">{children}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Modal;
