"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
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

  const { theme, systemTheme } = useTheme();

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
        emitMetadata="1"
        inputPosition="top"
        theme={
          (theme === "system" ? systemTheme : theme) === "dark"
            ? "dark_tritanopia"
            : "light_tritanopia"
        }
        lang="ko"
        loading="lazy"
      />
    </>
  );
}
