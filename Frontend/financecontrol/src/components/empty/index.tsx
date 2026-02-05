"use client"

import * as React from "react"
import { FolderOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  actionComponent?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = "Nenhum registro encontrado",
  description = "Parece que você ainda não adicionou nenhum item. Comece criando um novo agora mesmo.",
  icon,
  actionLabel,
  onAction,
  actionComponent,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in zoom-in duration-300",
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
        {icon || (
          <FolderOpen className="h-10 w-10 text-muted-foreground/40" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground tracking-tight">
        {title}
      </h3>
      <p className="mt-2 mb-6 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>

      <div className="flex items-center justify-center">
        {actionComponent ? (
          actionComponent
        ) : (
          onAction && actionLabel && (
            <Button onClick={onAction} className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              {actionLabel}
            </Button>
          )
        )}
      </div>
    </div>
  )
}