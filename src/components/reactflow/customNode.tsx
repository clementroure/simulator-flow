"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/store";
import { Handle, Position } from "reactflow";

import { ComboboxDemo } from "../custom/combobox";
import { Label } from "../ui/label";

interface InputValues {
  [key: string]: string;
}
type ShowCustomInputsType = {
  [key: string]: boolean;
};

function CustomNode({ id, data, isConnectable, selected, onInputChange }: any) {
  const { graphData } = useStore();

  const [showCustomInputs, setShowCustomInputs] =
    useState<ShowCustomInputsType>({});

  // Determine the border style based on whether the node is selected
  const borderStyle = selected ? "border-blue-500" : "border-black";
  const inputHandleStyle = { backgroundColor: "green" };
  const outputHandleStyle = { backgroundColor: "red" };

  // Initialize state with the correct type
  const [inputValues, setInputValues] = useState<InputValues>(() => {
    const initialValues: InputValues = {};
    data.details?.inputs.forEach((input: any, index: number) => {
      const key = `${id}-input-${index}`; // Construct a unique key using the node ID and index
      initialValues[key] = "";
    });
    return initialValues;
  });

  // Handler to update the state when an input changes
  const handleInputChange = (event: any, inputIndex: number) => {
    const newValue = event.target.value;
    const key = `${id}-input-${inputIndex}`;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
    onInputChange(id, inputIndex, newValue); // Pass the input index to the parent
  };

  const handleComboboxChange = (inputIndex: number, value: string) => {
    onInputChange(id, inputIndex, value);
  };

  const handleCustomSelection = (key: string, isCustomSelected: boolean) => {
    setShowCustomInputs((prev) => ({ ...prev, [key]: isCustomSelected }));
  };

  // Compute connected outputs
  const connectedOutputs = useMemo(() => {
    const connectedEdges = graphData.edges.filter((edge) => edge.target === id);
    // console.log('Connected Edges:', connectedEdges); // Log the connected edges

    return connectedEdges.flatMap((edge) => {
      const sourceNode = graphData.nodes.find(
        (node) => node.id === edge.source
      );
      // console.log('Source Node for Edge:', sourceNode); // Log the source node

      // Use node name and index of the output to create a unique identifier
      return (
        sourceNode?.data?.details?.outputs?.map(
          (output: any, index: number) => `${sourceNode.data.label}-${index}`
        ) || []
      );
    });
  }, [id, graphData]);

  return (
    <div className={`bg-white ${borderStyle} rounded-lg border p-4 shadow-lg`}>
      {/* Displaying the method name */}
      <div className="text-sm font-semibold text-gray-700">{data.label}</div>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={inputHandleStyle}
      />

      {/* Input fields section */}
      {data.details?.inputs.map((input: any, index: number) => {
        const key = `${id}-input-${index}`;

        return (
          <div key={key} className="mt-2">
            {/* Display input name instead of generic label */}
            <Label htmlFor={key} className="mb-1 block text-xs">
              Input {index + 1} ({input.type}):
            </Label>

            {/* Render ComboboxDemo for each input */}
            <div className="mb-2">
              <ComboboxDemo
                onValueChange={(value: any) =>
                  handleComboboxChange(index, value)
                }
                onCustomSelected={() =>
                  handleCustomSelection(`${id}-input-${index}`, true)
                }
                onNonCustomSelected={() =>
                  handleCustomSelection(`${id}-input-${index}`, false)
                }
                connectedOutputs={connectedOutputs}
              />
            </div>

            {/* Conditional rendering of custom input field */}
            {showCustomInputs[key] && (
              <input
                id={key}
                type="text"
                className="w-full rounded border border-gray-300 p-2 text-xs"
                onChange={(event) => handleInputChange(event, index)}
                value={inputValues[key]}
              />
            )}
          </div>
        );
      })}

      {/* Output fields section */}
      {data.details?.outputs && data.details.outputs.length > 0 && (
        <>
          <div className="mt-2 text-xs font-semibold text-gray-700">
            Outputs:
          </div>
          {data.details.outputs.map((output: any, index: number) => (
            <div key={index} className="mt-2">
              <div className="block text-xs">
                {output.name} ({output.type})
              </div>
            </div>
          ))}
        </>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={outputHandleStyle}
      />

      {/* <Handle
        type="source"
        position={Position.Left}
        id={`${id}-left`}
        isConnectable={isConnectable}
        style={outputHandleStyle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-right`}
        isConnectable={isConnectable}
        style={outputHandleStyle}
      /> */}
    </div>
  );
}

export default CustomNode;
