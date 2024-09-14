import { ReactFlow, Background } from "@xyflow/react";

import ExploreNode from "./ExploreNode";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import CategoryNode from "./CategoryNode";
import OptionNode from "./OptionNode";
import MealsNode from "./MealsNode";
import ListNode from "./ListNode";

const nodeTypes = {
  exploreNode: ExploreNode,
  categoryNode: CategoryNode,
  optionNode: OptionNode,
  mealsNode: MealsNode,
  listNode: ListNode,
};

const Flow = () => {
  const { nodes, edges } = useContext(DataContext);
  return (
    <div className="h-screen px-10 pt-24">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
