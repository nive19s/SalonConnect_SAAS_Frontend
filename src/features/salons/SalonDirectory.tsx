import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSalons } from '@/mocks/marketplaceApi';
import { useAsync } from '@/hooks/useAsync';
import Container from '@/components/ui/Container';
import Spinner from '@/components/ui/Spinner';
import SalonCard from './components/SalonCard';
import CategoryFilter from './components/CategoryFilter';

export default function SalonDirectory() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const category = params.get('category') ?? '';
  const { data: salons, loading, error } = useAsync(getSalons, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (salons ?? []).filter(
      (s) =>
        (!category || s.categories.includes(category)) &&
        (!q || `${s.name} ${s.area}`.toLowerCase().includes(q)),
    );
  }, [salons, category, query]);

  const setCategory = (id: string) => setParams(id ? { category: id } : {}, { replace: true });

  return (
    <Container className="py-14 md:py-20">
      <h1 className="font-display text-display">Find a salon</h1>
      <p className="mt-4 max-w-xl text-lg text-ash">Search by name or area, or filter by the treatment you want.</p>

      <div className="mt-10 space-y-8">
        <div>
          <label htmlFor="salon-search" className="sr-only">Search salons</label>
          <input
            id="salon-search"
            type="search"
            className="field max-w-md"
            placeholder="Search by salon or area"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="mt-12" aria-live="polite">
        {loading && <Spinner label="Loading salons" />}
        {error != null && <p>We could not load salons. Check your connection and refresh the page.</p>}
        {!loading && !error && results.length === 0 && (
          <p className="text-ash">No salons match. Try a different area or clear the filter.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => <SalonCard key={s.id} salon={s} />)}
        </div>
      </div>
    </Container>
  );
}
