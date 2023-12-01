import { Handle, Position } from "reactflow";

function StartNode({ id, data, isConnectable }: any) {
  const handleStyle = { backgroundColor: "red" };

  return (
    <div
      className={
        "flex w-36 items-center justify-center rounded-lg border border-black bg-white p-4 shadow-lg"
      } // Flexbox styles added here
    >
      <div className="text-center">{data.label}</div>{" "}
      {/* Text centering style */}
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
