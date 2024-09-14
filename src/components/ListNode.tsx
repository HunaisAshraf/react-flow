import { Handle, Position } from "@xyflow/react";
import React, { useContext, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import { DataContext } from "../context/DataProvider";

const ListNode = ({ data }: any) => {
  const { setOpen, getMeal } = useContext(DataContext);
  const handleClick = async () => {
    if (data.label.title === "Details") {
      getMeal();
      setOpen(true);
    }
  };

  return (
    <div
      className="p-3  border-2 rounded-full flex justify-start items-center gap-3 cursor-pointer w-[150px]"
      onClick={handleClick}
    >
      <span className="bg-white p-1 rounded-md">
        <PiShareFat className="text-green-400" />
      </span>
      <span className="text-sm">{data.label.title}</span>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default ListNode;
