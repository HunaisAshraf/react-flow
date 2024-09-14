import { useContext } from "react";
import { Handle, Position } from "@xyflow/react";
import { PiShareFat } from "react-icons/pi";
import { DataContext } from "../context/DataProvider";

const OptionNode = () => {
  const { fetchMeals } = useContext(DataContext);
  return (
    <div
      className="p-3  border-2 rounded-full flex justify-start items-center gap-3 cursor-pointer w-[150px]"
      onClick={fetchMeals}
    >
      <span className="bg-white p-1 rounded-md">
        <PiShareFat className="text-green-400" />
      </span>
      <span className="text-sm">View Meals</span>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default OptionNode;
