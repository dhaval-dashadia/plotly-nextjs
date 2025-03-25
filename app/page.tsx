"use client";

import dynamic from "next/dynamic";
import Graph from "./graph";
import { DataGrid, textEditor } from "react-data-grid";
import { useState } from "react";

// const Spreadsheet = dynamic(() => import("./spreadsheet"), {
//   ssr: false, // Prevents server-side rendering
// });

const columns: any = [
  { key: "category", name: "Category", renderEditCell: textEditor },
  { key: "color", name: "Color", renderEditCell: textEditor },
];

const initialRows: any = [
  { category: "Very Low", color: "#DA4C2B" },
  { category: "Low", color: "#DD8435" },
  { category: "Medium", color: "#DFA33C" },
  { category: "High", color: "#BCCF4E" },
  { category: "Very High", color: "#70CD4B" },
];

export default function Home() {
  const [rows, setRows] = useState(initialRows);

  const [sliderValue, setSliderValue] = useState(30);

  const onRowsChange = (updatedRows: any[]) => {
    setRows(updatedRows);
  };

  const addNewRow = () => {
    const newRow = { category: "", color: "" };
    setRows([...rows, newRow]);
  };

  return (
    <div className="flex w-full p-[20px]">
      <div className="p-4 w-1/2">
        <button
          onClick={addNewRow}
          className="mb-2 p-2 bg-blue-500 text-white rounded"
        >
          + Add Row
        </button>
        <DataGrid columns={columns} rows={rows} onRowsChange={onRowsChange} />

        <div className="mt-4">
          <h2>Gauge value: {sliderValue}</h2>
          <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full mt-2"
        />
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Graph value={sliderValue} category={rows} />
      </div>
    </div>
  );
}
