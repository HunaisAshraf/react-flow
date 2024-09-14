import { Handle, Position } from "@xyflow/react";
import { useContext } from "react";
import { FaSpoon } from "react-icons/fa6";
import { DataContext } from "../context/DataProvider";

const CategoryNode = ({ data }: any) => {
  const { setSelectedCategory } = useContext(DataContext);
  return (
    <div
      className="p-3 bg-slate-100 border-2 rounded-md flex justify-start items-center gap-3 cursor-pointer w-[150px]"
      onClick={() =>
        setSelectedCategory({ id: data.label.id, title: data.label.title })
      }
    >
      <span className="bg-red-500 p-1 rounded-md">
        <FaSpoon className="text-white" />
      </span>
      <span className="text-sm">{data.label.title}</span>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CategoryNode;
