import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content", // 콘텐츠를 찾을 루트 디렉토리
  output: {
    data: ".velite", // 생성되는 데이터 파일의 이름
    assets: "public/static", // 정적 자산을 저장할 디렉토리
    base: "/static/", // 정적 자산의 기본 URL 경로
    name: "[name]-[hash:6].[ext]", // 생성된 파일의 이름 형식
    clean: true, // 빌드 시 이전 파일 삭제 여부
  },
  collections: { posts }, // 사용할 컬렉션 정의 (여기서는 블로그 포스트)
  // MDX 구성: Markdown 파일 처리를 위한 설정
  mdx: {
    // rehype 플러그인: HTML 처리를 위한 플러그인
    rehypePlugins: [
      [rehypeSlug],
      [
        rehypeAutolinkHeadings,
        { behavior: "wrap", properties: { className: ["anchor"] } },
      ],
      [rehypePrettyCode, { theme: "github-dark" }],
    ],
    // remark 플러그인: Markdown 처리를 위한 플러그인
    remarkPlugins: [],
  },
});
