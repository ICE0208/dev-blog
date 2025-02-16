import PostItem from "@/components/post-item";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "@content/index";
import Link from "next/link";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 mt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="px-8 flex flex-col gap-6 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            {"Hello, I'm Ice28"}
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to my blog.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row px-8 mt-8">
            <Link
              href={"/posts"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-fit py-6"
              )}
            >
              View My Posts
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit py-6"
              )}
            >
              Github
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto px-8 max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-36">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li
              key={post.slug}
              className="first-border-t first:border-border"
            >
              <PostItem
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
