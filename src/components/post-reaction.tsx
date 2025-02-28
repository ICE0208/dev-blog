"use client";

import Giscus from "@giscus/react";
import { useEffect } from "react";

export default function PostReaction({ giscusId }: { giscusId: string }) {
  useEffect(() => {
    // 메타 태그를 동적으로 추가
    const meta = document.createElement("meta");
    meta.name = "giscus:backlink";
    meta.content = "✌️";
    document.head.appendChild(meta);

    // 컴포넌트가 언마운트될 때 메타 태그 제거
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  return (
    <>
      <Giscus
        repo="ICE0208/dev-blog"
        repoId="R_kgDON6EPqg"
        category="Announcements"
        categoryId="DIC_kwDON6EPqs4CnazC"
        mapping="specific"
        term={giscusId}
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
      />
    </>
  );
}
