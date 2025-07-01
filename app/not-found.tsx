import { Suspense } from "react"
import Loading from "@/app/loading"

export default function NotFound() {
  return (
    <Suspense fallback={<Loading />}>
      <section>
        <div className="py-8 px-4 mx-auto mt-10 mb-20 md:mt-20 md:mb-40 lg:py-16 lg:px-6 lg:mt-40 lg:mb-60">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-900 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-gray-600 dark:text-gray-400">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <a href="/" className="inline-flex text-gray-900 hover:text-gray-50 border-[0.15rem] border-purple-200 hover:bg-purple-500 hover:shadow-md focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
          </div>   
        </div>
      </section>
    </Suspense>
  );
}
