"use client"

import { Handle, Position } from 'reactflow';
import { Label } from '../ui/label';
import { useCallback, useState } from 'react';

interface InputValues {
  [key: string]: string; 
}

function CustomNode({ id, data, isConnectable, selected, onInputChange }: any) {
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
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const newValue = event.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
    onInputChange(id, key, newValue); // Call the callback function
  }, [onInputChange]);

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
      {data.details?.inputs && data.details.inputs.length > 0 && (
        <>
          <div className="text-xs font-semibold text-gray-700 mt-2">
            Inputs:
          </div>
          {data.details.inputs.map((input: any, index: number) => {
            const key = `${id}-input-${index}`;
            return (
              <div key={key} className="mt-2">
                <Label htmlFor={key} className="block text-xs mb-1">
                  Input {index + 1} ({input.type}):
                </Label>
                <input
                  id={key}
                  type="text"
                  className="w-full p-2 border rounded border-gray-300 text-xs"
                  onChange={(event) => handleInputChange(event, key)}
                  value={inputValues[key]}
                />
              </div>
            );
          })}
        </>
      )}

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