/**
 * Picker.tsx - Apparently called a "dual list selector"
 */
"use client";

// import "../styles/Picker.css";

interface ListItem {
  id: string;
  display: string;
}

function Picker({
  items,
  onClickItem,
}: {
  items: ListItem[];
  onClickItem: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 h-[40vh] overflow-y-auto shadow-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
      {items.map((item) => (
        <div className="p-2 border rounded shadow-sm" key={item.id}>
          <button className="w-full h-12 text-lg font-bold rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200"
            onClick={() => {
              onClickItem(item.id);
            }}
          >
            {item.display}
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * Picker that presents two panes, allowing the user to add and remove items
 *
 * @param { items: ListItem[], selectedItems: ListItem[], setSelected: function(items: ListItem[]): void} props
 * @returns
 */
export default function DualPanePicker({
  items,
  selectedItems,
  setSelected,
}: {
  items: ListItem[];
  selectedItems: ListItem[];
  setSelected: (list: ListItem[]) => void;
}) {
  function addItem(id: string) {
    const item = items.find((item) => id === item.id);
    if (selectedItems.includes(item)) return;
    let arr = selectedItems.concat(item);
    setSelected(arr);
  }

  function removeItem(id: string) {
    setSelected(selectedItems.filter((item) => id !== item.id));
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Picker items={items} onClickItem={addItem} />
        </div>
        <div>
          <Picker items={selectedItems} onClickItem={removeItem} />
        </div>
      </div>
    </div>
  );
}
