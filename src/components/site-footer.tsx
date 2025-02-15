import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export default function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex  space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
          >
            <span className="sr-only">Mail</span>
            <Icons.gitHub className="size-6" />
          </a>
        </div>
        <span className="mb-2 text-muted-foreground">{siteConfig.author}</span>
      </div>
    </footer>
  );
}
