import './Table.css'

export default function CoursesTable() {
  const data = require('../../data/CSCI.json');

  const formatCard = (course) => {
    return (
    <div className="card">
      <h2>{course.name}</h2>
      <p className="popup">{course.info}</p>
    </div> 
    );
  }

  const formatTable = () => {
    return data.class.map((course) => (
      <div>
        {formatCard(course)}
      </div>
    ));
  }

  return (
    <div id="page">
      <h1 id="title">CSCI COURSES</h1>
      <div id="card_table">
        {formatTable()}
      </div>
    </div>
  );
}