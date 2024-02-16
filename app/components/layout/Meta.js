import { usePathname, useSearchParams } from 'next/navigation';

import { headers } from 'next/headers';

const defaultMetadata = {
  // title: {
  //   template: '%s | Gopher Prerequisite',
  //   default: 'Gopher Prerequisite',
  // },
  title: "Gopher Prerequisite",
  description: "Explore and plan your academic journey with Gopher Prerequisite, your ultimate guide to course prerequisites at the University of Minnesota. Find detailed course information, prerequisites, and plan your curriculum efficiently.",
  keywords: ["University of Minnesota", "course prerequisites", "academic planning", "curriculum guide", "Gopher Prerequisite"],
  icons: "/logo.png"
};

let Meta = defaultMetadata;

const generateMetadata = () => {
  const heads = headers();

  const pathname = heads.get('next-url');

  Meta.title = pathname;
};

generateMetadata();

console.log(Meta.title)

export default Meta;