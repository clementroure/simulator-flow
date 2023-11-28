"use client"

import { Handle, Position } from 'reactflow';
import { Label } from '../ui/label';
import { useCallback, useState } from 'react';

interface InputValues {
  [key: string]: string; 
}

const handleStyle = { left: 10 };

function CustomNode({ id, data, isConnectable, selected }: any) {
  // Determine the border style based on whether the node is selected
  const borderStyle = selected ? 'border-blue-500' : 'border-black';
  const inputHandleStyle = { backgroundColor: 'green' };
  const outputHandleStyle = { backgroundColor: 'red' };

  // Initialize state with the correct type
  const [inputValues, setInputValues] = useState<InputValues>(() => {
    const initialValues: InputValues = {};
    data.details?.inputs.forEach((input: any) => {
      initialValues[input.name] = '';
    });
    return initialValues;
  });

  // Handler to update the state when an input changes
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: event.target.value,
    }));
  }, []);

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
          {data.details.inputs.map((input: any, index: number) => (
            <div key={index} className="mt-2">
              <Label htmlFor={`${id}-${input.name}`} className="block text-xs mb-1">
                {input.name} ({input.type}):
              </Label>
              <input
                id={`${id}-${input.name}`}
                type="text"
                className="w-full p-2 border rounded border-gray-300 text-xs"
                onChange={(event) => handleInputChange(event, input.name)}
                value={inputValues[input.name]}
              />
            </div>
          ))}
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

{/*       <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
 */}
      {/* Left handle for first output */}
      <Handle
        type="source"
        position={Position.Left}
        id={`${id}-left`}
        isConnectable={isConnectable}
        style={outputHandleStyle}
      />

      {/* Right handle for second output */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-right`}
        isConnectable={isConnectable}
        style={outputHandleStyle}
      />
    </div>
  );
}


export default CustomNode;