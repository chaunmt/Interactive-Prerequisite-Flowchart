import { access } from '../../data/access';
import './Table.module.css'

export default function CoursesTable() {
  const data = require('../../data/CSCI.json');

  const formatCard = (course) => {
    return (
    <div className="card">
      <h2>{course.name}</h2>
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
    <div>
      <div id="card_table">
        {formatTable()}
      </div>
    </div>
  );
}