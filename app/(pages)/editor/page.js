"use client";

import "../../components/styles/Mainpage.css";
import "../../components/styles/Editor.css";
import Graph from "../../components/graph/Graph";
import DualPanePicker from "../../components/picker/Picker";
import { AccessAll } from "../../data/access";

import { useEffect, useState } from "react";
import SearchBar from "../../components/search/SearchBar";
import { Search } from "../../data/search";

import "../../components/styles/SearchBar.css"

export default function Page({ params }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelected] = useState([]);
  const [courses, setCourses] = useState([]);
  const [displayOptions, setDisplayOptions] = useState({orientation: "BT"});

  function changeOrientation(event) {
    setDisplayOptions({orientation: event.target.value})
  }

  // update selectable items when search query changes
  useEffect(() => {
    if (search === "") {
      setItems([]);
      return;
    }
    const items = Search()
      .courseByName(search)
      .map((course) => ({ id: course.code, display: course.code }))
      .splice(0, 20);
    setItems(items);
  }, [search]);

  // update graph when selected items changes
  useEffect(() => {
    const itemCourses = selectedItems
      .map((item) => {
        //todo: keep Course/CourseShell with item somehow
        return AccessAll.getCourse(item.display);
      })
      .filter((item) => item !== null);
    setCourses(itemCourses);
  }, [selectedItems, setCourses]);

  // TODO: move into search bar
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div id="editor">
      <div id="resultGraph">
        {courses.length === 0 ? (
          <h2>Add courses to the right to get started</h2>
        ) : (
          <div>
            <div>
              <label for="orientation-picker">Orientation: </label>
              <select name="orientation" id="orientation-picker" onChange={changeOrientation}>
                <option value="TB">Top-to-Bottom</option>
                <option value="BT" selected>Bottom-to-Top</option>
                <option value="LR">Left-to-Right</option>
                <option value="RL">Right-to-Left</option>
              </select>
            </div>
            <Graph build={{ includes: courses }} display={displayOptions} />
          </div>
        )}
      </div>
      <div id="picker">
        <div id="picker-header">
          <div id="searchPicker">
            <SearchBar value={search} sendQuery={handleSearch} />
          </div>
          <div id="selectedPicker">
            <div id="selectedTitle"><h2>Selected</h2></div>
          </div>
        </div>
        <DualPanePicker
          items={items}
          selectedItems={selectedItems}
          setSelected={setSelected}
        />
      </div>
      {/* why does this work */}
      <title>Flowchart Editor</title>
    </div>
  );
}

// export const metadata = {
//   title: `Flowchart Editor`,
// };
