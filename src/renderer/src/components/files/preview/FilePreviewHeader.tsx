import { Download, ExternalLink, FolderOpen, X } from "lucide-react";
import type { FilePreviewDescriptor } from "../../../../../shared/files";

export interface FilePreviewHeaderProps {
  descriptor?: FilePreviewDescriptor;
  fallbackTitle?: string;
  onOpenExternal: () => void;
  onReveal: () => void;
  onSaveAs: () => void;
  onClose: () => void;
}

/** Header row: file name/type badge on the left, file actions on the right. */
export function FilePreviewHeader({
  descriptor,
  fallbackTitle,
  onOpenExternal,
  onReveal,
  onSaveAs,
  onClose,
}: FilePreviewHeaderProps): React.JSX.Element {
  const title = descriptor?.title || fallbackTitle || "Preview";
  const canOpenExternal = descriptor?.canOpenExternal ?? false;
  const canSaveAs = descriptor?.canSaveAs ?? false;

  return (
    <div className="file-preview-header">
      <div className="file-preview-header-title">
        {descriptor?.type && (
          <span className="file-preview-type-badge">{descriptor.type}</span>
        )}
        <span className="file-preview-filename" title={title}>
          {title}
        </span>
      </div>
      <div className="file-preview-actions">
        <button
          type="button"
          className="file-preview-btn"
          onClick={onReveal}
          disabled={!descriptor}
          title="Reveal in folder"
        >
          <FolderOpen size={15} />
        </button>
        <button
          type="button"
          className="file-preview-btn"
          onClick={onSaveAs}
          disabled={!canSaveAs}
          title="Save As…"
        >
          <Download size={15} />
        </button>
        <button
          type="button"
          className="file-preview-btn"
          onClick={onOpenExternal}
          disabled={!canOpenExternal}
          title="Open with default app"
        >
          <ExternalLink size={15} />
        </button>
        <button
          type="button"
          className="file-preview-btn"
          onClick={onClose}
          title="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
