import React, { createContext, ReactNode, useEffect, useState } from "react";
import ExploreNode from "../components/ExploreNode";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import CategoryNode from "../components/CategoryNode";
import OptionNode from "../components/OptionNode";
import MealsNode from "../components/MealsNode";
import ListNode from "../components/ListNode";

type InitialData = {
  fetchCategory: () => void;
  nodes: Node[];
  edges: Edge[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<any>>;
  fetchMeals: () => void;
  getMeal: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMeal: React.Dispatch<React.SetStateAction<any>>;
  meal: any;
};

const initialData: InitialData = {
  fetchCategory: () => {},
  nodes: [],
  edges: [],
  setSelectedCategory: () => {},
  setSelectedMeal: () => {},
  fetchMeals: () => {},
  open: false,
  setOpen: () => {},
  getMeal: () => {},
  meal: {},
};

export const DataContext = createContext(initialData);

const DataProvider = ({ children }: { children: ReactNode }) => {
  const initialNodes: Node[] = [
    {
      id: "1",
      position: { x: 0, y: 200 },
      data: { ExploreNode },
      type: "exploreNode",
    },
  ];
  const initialEdges: Edge[] = [];

  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [selectedMeal, setSelectedMeal] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [meal, setMeal] = useState({});

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const fetchCategory = async () => {
    try {
      if (nodes.length > 1) return;
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const json = await data.json();
      let arr = json?.categories.slice(0, 5);
      setNodes((prev) => {
        let data = [...prev];
        arr?.forEach((cat: any, i: number) => {
          data.push({
            id: String(nodes.length + i + 1),
            position: { x: 200, y: i * 100 },
            data: {
              CategoryNode,
              label: {
                title: cat?.strCategory,
                id: String(nodes.length + i + 1),
              },
            },
            type: "categoryNode",
          });
        });
        return data;
      });
      setEdges((prev) => {
        let data = [...prev];
        arr.forEach((element: any, i: any) => {
          data.push({
            id: "e1-" + (data.length + 1),
            source: "1",
            target: String(i + 2),
          });
        });
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeals = async () => {
    try {
      if (nodes.length > 7) {
        setNodes((prev) => (prev = prev.slice(0, 7)));
        setEdges((prev) => (prev = prev.slice(0, 6)));
      }
      console.log("ed", edges);

      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.title}`
      );
      const json = await data.json();

      const arr = json?.meals.slice(0, 5);

      setNodes((prev) => {
        let data = [...prev];
        arr?.forEach((cat: any, i: number) => {
          data.push({
            id: String(nodes.length + i + 1),
            position: { x: 630, y: i * 100 },
            data: {
              MealsNode,
              label: {
                title: cat?.strMeal,
                id: String(nodes.length + i + 1),
              },
            },
            type: "mealsNode",
          });
        });
        return data;
      });

      setEdges((prev) => {
        let data = [...prev];
        arr.forEach((element: any, i: any) => {
          data.push({
            id: "e2-" + (data.length + 1),
            source: String(prev.length + 1),
            target: String(edges.length + i + 2),
          });
        });

        return data;
      });
      console.log("nneddd", nodes);
      console.log("eddd", edges);
    } catch (error) {
      console.log(error);
    }
  };

  const getMeal = async () => {
    try {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedMeal.title}`
      );
      const json = await data.json();
      setMeal(json.meals[0]);
      console.log(json.meals[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedCategory.id) {
      // console.log("nodesss", nodes);
      setNodes((prev) => [
        ...prev,
        {
          id: String(nodes.length + 1),
          position: { x: 420, y: 200 },
          data: {
            OptionNode,
          },
          type: "optionNode",
        },
      ]);
      setEdges((prev) => {
        // [
        //   ...prev,
        //   {
        //     id: "e-" + (edges.length + 1),
        //     source: selectedCategory.id,
        //     target: String(nodes.length + 1),
        //   },
        // ]
        let data = [...prev];
        data[5] = {
          id: "e-" + edges.length,
          source: selectedCategory.id,
          target: String(7),
        };

        return data;
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedMeal.id) {
      setNodes((prev) => {
        let data = [...prev];
        ["ingrediants", "tags", "Details"]?.forEach((cat: any, i: number) => {
          data.push({
            id: String(nodes.length + i + 1),
            position: { x: 1000, y: i * 100 + 130 },
            data: {
              ListNode,
              label: {
                title: cat,
                id: String(nodes.length + i + 1),
              },
            },
            type: "listNode",
          });
        });
        return data;
      });

      setEdges((prev) => {
        let data = [...prev];
        ["ingrediants", "tags", "Details"].forEach((element: any, i: any) => {
          data.push({
            id: "e2-" + (data.length + 1),
            source: selectedMeal.id,
            target: String(nodes.length + i + 1),
          });
        });
        return data;
      });
    }
  }, [selectedMeal]);

  return (
    <DataContext.Provider
      value={{
        fetchCategory,
        nodes,
        edges,
        setSelectedCategory,
        fetchMeals,
        open,
        setOpen,
        setSelectedMeal,
        getMeal,
        meal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
