import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to GoInvesto</h1>
      <p className="mb-8 text-lg text-gray-700 max-w-xl text-center">
        Connect Startups, Investors, and Incubators in one platform.
      </p>
      <div className="space-x-4">
        <Link href="/auth/signup">
          <a className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Signup
          </a>
        </Link>
        <Link href="/auth/login">
          <a className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
            Login
          </a>
        </Link>
      </div>
    </div>
  );
}
