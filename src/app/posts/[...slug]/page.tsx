import { MDXConect } from "@/components/mdx-component";
import { posts } from "@content/index";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = (await params)?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 670,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

// Next.js의 정적 페이지 생성을 위한 함수
// 빌드 시점에 어떤 동적 경로들을 미리 생성할지 Next.js에게 알려줌
export function generateStaticParams(): Awaited<PostPageProps["params"]>[] {
  // posts 배열의 각 포스트에 대해 정적 경로 생성
  // 예시: post.slugAsParams가 "2024/hello"인 경우
  // -> { slug: ["2024", "hello"] }가 되어
  // -> /posts/2024/hello 경로로 정적 페이지가 생성됨
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="px-8 py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag
            tag={tag}
            key={tag}
          />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground1">
          {post.description}
        </p>
      ) : null}
      <hr className="my-4" />
      <MDXConect code={post.body} />
    </article>
  );
}
