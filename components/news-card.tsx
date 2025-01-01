"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useAnalytics } from "@/hooks/use-analytics";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  sectionId: string;
  webUrl: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  timeAgo: string;
  className?: string;
  featured?: boolean;
}

export function NewsCard({
  title,
  excerpt,
  image,
  sectionId,
  author,
  timeAgo,
  webUrl,
  className,
  featured = false,
}: NewsCardProps) {
  const router = useRouter();
  const { addAnalyticsData } = useAnalytics();

  const price = Math.floor(Math.random() * 10) + 1;
  return (
    <article className={cn("group relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          featured ? "aspect-[16/10]" : "aspect-square"
        )}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3
          className={cn(
            "font-semibold leading-tight tracking-tight",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {title}
        </h3>
        <p className="mt-2 text-muted-foreground line-clamp-2 text-sm">
          {excerpt}
        </p>
        {author && (
          <div className="mt-4 flex items-center gap-x-3">
            <Image
              src={author.avatar}
              alt={author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.role}</p>
            </div>
          </div>
        )}
        <p className="mt-2 text-xs text-muted-foreground">{timeAgo}</p>
      </div>
      <Button
        className="mt-4"
        onClick={() => {
          addAnalyticsData({
            amount: price,
            category: sectionId,
            date: new Date(),
          });
          router.push(webUrl);
        }}
      >
        Read for ${price}
      </Button>
    </article>
  );
}
