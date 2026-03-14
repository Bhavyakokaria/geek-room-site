"use client";

import { useState } from "react";
import { registerForEvent } from "@/app/actions/eventActions";
import { useParams, useRouter } from "next/navigation";

export default function RegisterEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const registrationData = {
      eventId,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      college: formData.get("college") as string,
    };

    const result = await registerForEvent(registrationData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/events");
      }, 3000);
    } else {
      setError(result.error || "Failed to register.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center bg-zinc-900/50 p-12 rounded-2xl border border-green-500/30 max-w-md w-full">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-zinc-400">You have successfully registered for the event. Redirecting back to events...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Event Registration</h1>
          <p className="text-zinc-400">Please fill out the form below to secure your spot.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-zinc-400 mb-2">College / University</label>
            <input
              type="text"
              id="college"
              name="college"
              required
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/20"
          >
            {loading ? "Submitting..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}
