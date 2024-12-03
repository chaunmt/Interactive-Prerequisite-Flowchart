/** dynamic route for individual programs */

import Link from "next/link";

// placeholder

export default function Page({ params }) {
  console.log(params);
  return (
    <div>
      <p>Page under construction</p>
      <Link href="/">Return home</Link>
    </div>
  );
}
