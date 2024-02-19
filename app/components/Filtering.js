function Filtering() {
  useEffect(() => {
    const inputField = document.getElementsByClassName("searchBar");
    const list = document.getElementsByClassName("list");
    if (inputField == undefined) {
      list.style.display = "none";
    } else {
      // If there's input, populate and display the list
      list.style.display = "block";
    }
  });
}

export default Filtering;
