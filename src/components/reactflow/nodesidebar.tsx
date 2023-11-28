import erc20Abi from './abi/UNISWAP_V2_FACTORY.json';

function NodeSidebar({ onDragStart }: any) {
  return (
    <aside className="w-64 p-2.5">
      {erc20Abi.map((abiItem: any, index: number) => {
        if (abiItem.type === 'function' || abiItem.type === 'variable') {
          return (
            <div
              key={index}
              onDragStart={(event) => onDragStart(event, JSON.stringify(abiItem))}
              draggable
              className="p-2.5 border border-gray-300 mb-2.5 cursor-pointer hover:shadow-lg rounded transition duration-200 ease-in-out"
            >
              {abiItem.name}
            </div>
          );
        }
        return null;
      })}
    </aside>
  );
}

export default NodeSidebar;
