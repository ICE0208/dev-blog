import PostItem from "@/components/post-item";
import QueryPagination from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { posts } from "@content/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "My Posts...",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function PostsPage({ searchParams }: BlogPageProps) {
  const currentPage = Number((await searchParams).page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const tags = getAllTags(posts.filter((post) => post.published));
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="px-8 max-w-4xl py-6 lg:py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            Posts
          </h1>
          <p className="text-xl text-muted-foreground">My dev blog</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      title={title}
                      description={description}
                      date={date}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet.</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end sm:justify-center mt-4"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => (
              <Tag
                tag={tag}
                key={tag}
                count={tags[tag]}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
