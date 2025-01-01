import { getNews } from "@/actions/news";
import { CategoryTags } from "@/components/category-tags";
import { NewsInfiniteScroll } from "@/components/news-infinite-scroll";

export default async function Home() {
  // Preload the first page of news on the server
  const initialNews = await getNews({ page: 1 });

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Top Headlines</h1>
        <CategoryTags />
        <div className="mt-12">
          <NewsInfiniteScroll initialNews={initialNews} />
        </div>
      </main>
    </div>
  );
}
