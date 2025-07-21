'use client';

import { useState } from 'react';

// Define the expected structure of a medicine result
type ConceptProperty = {
  rxcui: string;
  name: string;
  synonym?: string;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ConceptProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle the form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setError('');

    try {
      const res = await fetch(`/api/search?name=${searchTerm}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');

      const concepts = data.flatMap((g: { conceptProperties?: ConceptProperty[] }) => g.conceptProperties || []);
      setResults(concepts);
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">🔎 Medicine Info by Name</h1>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 items-center w-full max-w-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter medicine name (e.g. Aspirin)"
          className="p-3 border border-gray-300 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-6 w-full max-w-xl space-y-4">
        {results.map((r) => (
          <div key={r.rxcui} className="bg-white p-4 rounded shadow border border-gray-200">
            <p className="text-lg font-semibold text-blue-800">{r.name}</p>
            <p className="text-sm text-gray-700"><strong>RxCUI:</strong> {r.rxcui}</p>
            <p className="text-sm text-gray-700"><strong>Synonym:</strong> {r.synonym || 'N/A'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
