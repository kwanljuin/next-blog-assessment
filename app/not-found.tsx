import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Not Found</title>
      </Head>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          {`Sorry, the page you're looking for doesn't exist. Try searching for
          something else or go back to the homepage.`}
        </p>
        <button className="w-full outline text-white font-bold py-2 px-4 rounded">
          <Link href="/">Return Home</Link>
        </button>
      </div>
    </div>
  );
}
