import React from 'react';

// Define the interface for the props that the component accepts
interface TypeButtonsProps {
  // This callback function will be used to send the selected type back to the parent component.
  // The 'onTypeSelect' function takes a string (representing the type) as an argument.
  onTypeSelect: (type: string) => void;
}

// Define the TypeButtons component
const TypeButtons: React.FC<TypeButtonsProps> = ({ onTypeSelect }) => {
  // Define an array of strings representing different item types.
  // These strings will be used to create buttons for each type.
  const types = [
    "All",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Condiments",
    "Frozen Food",
    "Nuts & Seeds",
    "Berries",
    "Beans",
    "Legumes"
  ];

  // The component returns a div containing a list of buttons, each representing a different type of item.
  return (
    // The main container div for the buttons.
    // It uses flex to lay out the buttons with wrapping enabled, so they will move to the next line when needed.
    <div className="p-4 gap-2 mb-4 space-x-1 space-y-1 ">
      {/* Iterate over the 'types' array and create a button for each type */}
      {types.map((type) => (
        <button
          key={type} // 'key' is a unique identifier required by React for rendering lists.
          onClick={() => onTypeSelect(type)} // When a button is clicked, it calls the onTypeSelect function with the current type.
          // Apply multiple Tailwind CSS classes to style the button.
          // - 'bg-[#E38E49]': Sets the background color to orange.
          // - 'text-white': Sets the text color to white.
          // - 'hover:bg-[#1F509A]': Changes the background color to a blue shade when hovered.
          // - 'px-3 py-2': Adds padding on the X-axis (horizontal) and Y-axis (vertical).
          // - 'rounded-md': Rounds the button corners to medium size.
          // - 'text-sm font-medium': Sets the font size to small and weight to medium.
          // - 'border-2 border-black': Adds a 2-pixel black border for emphasis.
          className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black"
        >
          {/* Wrap the button text in a <span> to add a drop shadow effect */}
          {/* - The 'drop-shadow-[0_5px_2px_rgba(0,0,0,1)]' class adds a shadow effect to the button text */}
          <span className="drop-shadow-[0_5px_2px_rgba(0,0,0,1)]">
            {type} {/* Display the type name (e.g., Vegetables, Fruits) as the button label */}
          </span>
        </button>
      ))}
    </div>
  );
};

// Export the TypeButtons component so it can be imported and used in other parts of the app.
export default TypeButtons;
