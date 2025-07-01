import { Suspense } from "react"
import Loading from "@/app/loading"

export default function NotFoundDummy() {
  return (
    <Suspense fallback={<Loading />}>
      <section>
        <div className="py-8 px-4 mx-auto mt-10 mb-20 md:mt-20 md:mb-40 lg:py-16 lg:px-6 lg:mt-40 lg:mb-60">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-900 dark:text-gray-100">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-gray-100 md:text-4xl">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-gray-600 dark:text-gray-300">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <a href="/" className="inline-flex text-gray-900 dark:text-gray-50 hover:text-gray-50 border-[0.15rem] border-purple-200 dark:border-purple-500 hover:bg-purple-500 hover:shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</a>
          </div>   
        </div>
      </section>
    </Suspense>
  );
}
