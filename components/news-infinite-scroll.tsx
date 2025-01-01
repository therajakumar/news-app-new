"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { NewsCard } from "@/components/news-card";
import { getNews } from "@/actions/news";

interface NewsItem {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  sectionId: string;
  webUrl: string;
  sectionName: string;
  excerpt: string;
  image: string;
}

export const NewsInfiniteScroll = ({
  initialNews,
}: {
  initialNews: NewsItem[];
}) => {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("query");
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);
      const newNews = await getNews({
        page: 1,
        section: category || undefined,
        query: query || undefined,
        fromDate: startDate || undefined,
        toDate: endDate || undefined,
      });

      setNews(
        newNews.map((item: NewsItem) => ({
          id: item.id,
          webTitle: item.webTitle,
          sectionId: item.sectionId,
          webPublicationDate: item.webPublicationDate,
          webUrl: item.webUrl,
          sectionName: item.sectionName,
          excerpt: item.excerpt ?? "No description available.",
          image: "/placeholder.svg?height=400&width=400",
        }))
      );

      setPage(2);
      setHasMore(newNews.length > 0);
      setLoading(false);
    };

    fetchCategoryNews();
  }, [category, query, startDate, endDate]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true);
          const newNews = await getNews({
            page,
            section: category || undefined,
          });

          if (newNews.length === 0) {
            setHasMore(false); // Stop fetching if no results
          } else {
            const formattedNews = newNews.map((item: NewsItem) => ({
              id: item.id,
              webTitle: item.webTitle,
              webPublicationDate: item.webPublicationDate,
              webUrl: item.webUrl,
              sectionName: item.sectionName,
              excerpt: item.excerpt ?? "No description available.",
              image: "/placeholder.svg?height=400&width=400",
            }));
            setNews((prev) => [...prev, ...formattedNews]);
            setPage((prev) => prev + 1);
          }
          setLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, loading, category, hasMore]);

  return (
    <div>
      {news.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No news found. Please try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 space-y-5">
          {news.map((item) => (
            <div key={item.id}>
              <NewsCard
                title={item.webTitle}
                excerpt={item.excerpt}
                sectionId={item.sectionId}
                image={item.image}
                webUrl={item.webUrl}
                timeAgo={new Date(item.webPublicationDate).toLocaleTimeString()}
              />
            </div>
          ))}
        </div>
      )}

      <div
        ref={observerRef}
        className="h-16 w-full flex items-center justify-center"
      >
        {loading && <span>Loading more news...</span>}
        {!hasMore && news.length > 0 && (
          <span className="text-gray-500">No more news to load.</span>
        )}
      </div>
    </div>
  );
};
