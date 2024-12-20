// this solely exists for a editor page prototype

/**
 * Picker.tsx - Apparently called a "dual list selector"
 */
"use client";

import "@/components/styles/Picker.css";

interface ListItem {
  id: string;
  display: string;
}

function ItemBox({ item, onClickItem }) {
  return (
    <div className="itemBox">
      <button
        className="item"
        onClick={() => {
          onClickItem(item.id);
        }}
      >
        {item.display}
      </button>
    </div>
  );
}

function Picker({
  items,
  onClickItem,
}: {
  items: ListItem[];
  onClickItem: (id: string) => void;
}) {
  return (
    <div>
      {items.map((item) => (
        <ItemBox key={item.id} item={item} onClickItem={onClickItem} />
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
    const arr = selectedItems.concat(item);
    setSelected(arr);
  }

  function removeItem(id: string) {
    setSelected(selectedItems.filter((item) => id !== item.id));
  }

  return (
    <div id="bars">
      <div id="items">
        <Picker items={items} onClickItem={addItem} />
      </div>
      <div id="selectedItems">
        <Picker items={selectedItems} onClickItem={removeItem} />
      </div>
    </div>
  );
}
