"use client"

import { Handle, Position } from 'reactflow';
import { Label } from '../ui/label';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ComboboxDemo } from '../custom/combobox';
import useStore from '@/store';

interface InputValues {
  [key: string]: string; 
}
type ShowCustomInputsType = {
  [key: string]: boolean;
};

function CustomNode({ id, data, isConnectable, selected, onInputChange }: any) {
  const { graphData } = useStore();

  const [showCustomInputs, setShowCustomInputs] = useState<ShowCustomInputsType>({});

  // Determine the border style based on whether the node is selected
  const borderStyle = selected ? 'border-blue-500' : 'border-black';
  const inputHandleStyle = { backgroundColor: 'green' };
  const outputHandleStyle = { backgroundColor: 'red' };

  // Initialize state with the correct type
  const [inputValues, setInputValues] = useState<InputValues>(() => {
    const initialValues: InputValues = {};
    data.details?.inputs.forEach((input: any, index: number) => {
      const key = `${id}-input-${index}`; // Construct a unique key using the node ID and index
      initialValues[key] = '';
    });
    return initialValues;
  });

  // Handler to update the state when an input changes
  const handleInputChange = (event: any, inputIndex: number) => {
    const newValue = event.target.value;
    const key = `${id}-input-${inputIndex}`;
    setInputValues(prevValues => ({
      ...prevValues,
      [key]: newValue,
    }));
    onInputChange(id, inputIndex, newValue); // Pass the input index to the parent
  };

  const handleComboboxChange = (inputIndex: number, value: string) => {
    onInputChange(id, inputIndex, value);
  };

  const handleCustomSelection = (key: string, isCustomSelected: boolean) => {
    setShowCustomInputs(prev => ({ ...prev, [key]: isCustomSelected }));
  };


  // Compute connected outputs
  const connectedOutputs = useMemo(() => {
    const connectedEdges = graphData.edges.filter(edge => edge.target === id);
    // console.log('Connected Edges:', connectedEdges); // Log the connected edges
  
    return connectedEdges.flatMap(edge => {
      const sourceNode = graphData.nodes.find(node => node.id === edge.source);
      // console.log('Source Node for Edge:', sourceNode); // Log the source node
  
      // Use node name and index of the output to create a unique identifier
      return sourceNode?.data?.details?.outputs?.map((output: any, index: number) => 
        `${sourceNode.data.label}-${index}`
      ) || [];
    });
  }, [id, graphData]);
    

  return (
    <div className={`bg-white ${borderStyle} border rounded-lg p-4 shadow-lg`}>
      {/* Displaying the method name */}
      <div className="text-sm font-semibold text-gray-700">
        {data.label}
      </div>

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
            <Label htmlFor={key} className="block text-xs mb-1">
              Input {index + 1} ({input.type}):
            </Label>

            {/* Render ComboboxDemo for each input */}
            <div className="mb-2">
            <ComboboxDemo
            onValueChange={(value: any) => handleComboboxChange(index, value)}
            onCustomSelected={() => handleCustomSelection(`${id}-input-${index}`, true)}
            onNonCustomSelected={() => handleCustomSelection(`${id}-input-${index}`, false)}
            connectedOutputs={connectedOutputs}
          />
            </div>

            {/* Conditional rendering of custom input field */}
            {showCustomInputs[key] && (
              <input
                id={key}
                type="text"
                className="w-full p-2 border rounded border-gray-300 text-xs"
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
          <div className="text-xs font-semibold text-gray-700 mt-2">
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