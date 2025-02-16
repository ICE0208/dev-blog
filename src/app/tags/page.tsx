import { Tag } from "@/components/tag";
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { posts } from "@content/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Topic I've written about",
};

export default async function TagPage() {
  const tags = getAllTags(posts.filter((post) => post.published));
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="mx-auto px-8 max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Tags</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-3">
        {sortedTags.map((tag) => (
          <Tag
            tag={tag}
            key={tag}
            count={tags[tag]}
          />
        ))}
      </div>
    </div>
  );
}
