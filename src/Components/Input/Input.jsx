import { forwardRef } from "react";

// Define a functional component Input with forwardRef
const Input = forwardRef(({ ...rest }, ref) => (
    <input
        ref={ref} // Forwarding the ref to the input element
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md" // Styling classes for the input element
        {...rest} // Spread rest props onto the input element
    />
));

export default Input;
