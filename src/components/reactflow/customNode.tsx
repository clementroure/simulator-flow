import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable }: any) {
  return (
    <div className={`bg-white border border-black rounded-lg p-4 shadow-lg`}>
      {/* Displaying the method name */}
      <div className="text-sm font-semibold text-gray-700 mb-2">
        {data.label}
      </div>

      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

      {/* Rest of your node content */}
      {data.details?.inputs.map((input: any, index: number) => (
        <div key={index} className="mb-2">
          <label htmlFor={`${data.id}-${input.name}`} className="block text-xs mb-1">{input.name} ({input.type}):</label>
          <input
            id={`${data.id}-${input.name}`}
            type="text"
            className="w-full p-2 border rounded border-gray-300 text-xs"
          />
        </div>
      ))}

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}


export default CustomNode;