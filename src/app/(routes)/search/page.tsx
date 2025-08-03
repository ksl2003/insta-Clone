import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import {Suspense} from "react";

export default async function SearchPage({
  searchParams: {query},
}:{
  searchParams: {query:string},
}) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold font-serif">Search</h1>
        <p className="text-muted-foreground">Find people and posts</p>
      </div>
      
      <div className="card p-6 hover-lift">
        <SearchForm />
        
        {typeof query !== 'undefined' && (
          <div className="mt-6">
            <Suspense fallback={<Preloader />}>
              <SearchResults query={query} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}