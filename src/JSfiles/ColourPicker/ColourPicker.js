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
      <ul>
        {colors.map((color) => (
          <Item
            key={color}
            color={color}
            isSelected={selected === color}
            onClick={() => {setSelected(color)
            value.setColor(color)}}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
  );
}

function Item({ color, isSelected, onClick }) {
  return (
    <li className="item" onClick={onClick} style={{ backgroundColor: color }}>
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="outline"
          initial={false}
          animate={{ borderColor: color }}
          transition={spring}
        />
      )}
    </li>
  );
}

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
