import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import "./ColourPicker.scss";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function ColourPicker() {
  const value = useContext(Requiredvalue);
  const [selected, setSelected] = useState(value.color);

  return (
    <AnimateSharedLayout>
      <ul aria-label="Color picker options">
        {/* When an option is clicked, the selected color is updated and the setColor 
      method from the Requiredvalue context is called to set the selected color in the context. */}
        {colors.map((color) => (
          <Item
            key={color}
            color={color}
            isSelected={selected === color}
            aria-label={`${color} option`}
            onClick={() => {
              setSelected(color);
              value.setColor(color);
            }}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
  );
}

function Item({ color, isSelected, onClick }) {
  // Receives the color, whether it is selected or not, and an onClick function as props.
  // It renders the color option as a li element with the background color set to the color prop.
  return (
    <li
      className="item"
      onClick={onClick}
      style={{ backgroundColor: color }}
      aria-label={`${color} option`}
    >
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="outline"
          initial={false}
          aria-label={`Selected ${color} color`}
          animate={{ borderColor: color }}
          transition={spring}
        />
      )}
    </li>
  );
}

//The colors constant is an array of 8 hex color codes that are used as options for the user to select from.
const colors = [
  "#ff0055",
  "#ff758e",
  "#e55cff",
  "#8247f5",
  "#0099ff",
  "#0ae8f0",
  "#17e885",
  "#ccf000",
];

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
