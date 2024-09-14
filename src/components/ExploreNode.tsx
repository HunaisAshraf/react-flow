import React, { useContext } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaGlobe } from "react-icons/fa";
import { DataContext } from "../context/DataProvider";

const ExploreNode = () => {
  const { fetchCategory } = useContext(DataContext);

  return (
    <div
      className="p-3 bg-slate-100 border-2 rounded-md flex justify-between items-center gap-3 cursor-pointer"
      onClick={fetchCategory}
    >
      <span className="bg-slate-400 p-1 rounded-sm">
        <FaGlobe className="text-white" />
      </span>
      <span>Explore</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default ExploreNode;
