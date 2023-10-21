//import { useState } from 'react';
//import React from "react";

// function Dummy(props) {
//   const scale = 1

//   return (
//     <div style={{ transform: `scale(${scale})` }}>
//       This is a dummy page with data: {props.data}
//       <button onClick={() => setScale(prev => prev + 0.1)}>Zoom In</button>
//       <button onClick={() => setScale(prev => prev - 0.1)}>Zoom Out</button>
//     </div>
//   );
// }

// Create functions to fetch and load the page

export default async function getInitialProps() {
  // Simulate an API call
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Sample data fetched after 1 second");
    }, 1000);
  });

  return (
    <div>
      aaaaa
    </div>
  );
}

//export default Dummy;
