import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Save token and redirect to dashboard
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <label className="block mb-2 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
