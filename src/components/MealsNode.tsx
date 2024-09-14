import { Handle, Position } from "@xyflow/react";
import React, { useContext } from "react";
import { BiDish } from "react-icons/bi";
import { DataContext } from "../context/DataProvider";

const MealsNode = ({ data }: any) => {
  const { setSelectedMeal } = useContext(DataContext);
  return (
    <div
      className="p-3 bg-white border-2 rounded-full flex justify-start items-center gap-3 cursor-pointer min-w-[250px]"
      onClick={() =>
        setSelectedMeal({ id: data.label.id, title: data.label.title })
      }
    >
      <span className="bg-blue-500 p-1 rounded-md">
        <BiDish className="text-white" />
      </span>
      <span className="text-sm">{data.label.title}</span>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default MealsNode;
