import { FileText, Video, Mic, Megaphone, FlaskConical, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { contentTypeLabel } from "@/lib/labels";
import type { ContentPost, ContentType } from "@/lib/types";

const typeIcon: Record<ContentType, LucideIcon> = {
  article: FileText,
  announcement: Megaphone,
  video: Video,
  podcast: Mic,
  research: FlaskConical,
  case_study: BookOpen,
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ContentCard({ post }: { post: ContentPost }) {
  const Icon = typeIcon[post.type];

  return (
    <article className="group glass-panel flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="outline" className="border-white/15 bg-white/5 text-gold">
          <Icon className="mr-1 size-3" />
          {contentTypeLabel[post.type]}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {formatDate(post.createdAt)}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {post.category}
      </div>
    </article>
  );
}
