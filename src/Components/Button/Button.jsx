// Define a functional component Button with destructured props
const Button = ({ children, className, width = "w-fit", ...rest }) => {
    // Return a button element with dynamic classNames and other props
    return (
        <button
            // Concatenate className and width props with additional tailwind CSS classes
            className={`${className} ${width} text-white p-3 rounded-md hover:opacity-80 hover:scale-110 transition-all duration-500`}
            // Spread rest props onto the button element
            {...rest}
        >
            {/* Render the children passed to the Button component */}
            {children}
        </button>
    );
};

export default Button;