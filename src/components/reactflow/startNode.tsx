import { Handle, Position } from 'reactflow';

function StartNode({ id, data, isConnectable }: any) {
  const handleStyle = { backgroundColor: 'red' };

  return (
    <div 
      className={`bg-white border-black border rounded-lg p-4 shadow-lg w-36 flex items-center justify-center`} // Flexbox styles added here
    >
      <div className="text-center">{data.label}</div> {/* Text centering style */}
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id}-bottom`}
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default StartNode;