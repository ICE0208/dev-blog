import { Post } from "@content/index";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import { slug as githubSlugger } from "github-slugger";
type PostItemProps = Pick<
  Post,
  "slug" | "title" | "description" | "date" | "tags"
> & {
  currentTag?: string;
};

export default function PostItem({
  slug,
  title,
  description,
  date,
  tags,
  currentTag,
}: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={`/${slug}`}>{title}</Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <Tag
            tag={tag}
            key={tag}
            current={githubSlugger(tag) === currentTag}
          />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4"></Calendar>
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
