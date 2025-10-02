import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"

interface PaymentStatusBadgeProps {
  status: "pending" | "processing" | "completed" | "failed"
  className?: string
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = {
    pending: {
      label: "Ausstehend",
      variant: "secondary" as const,
      icon: Clock,
    },
    processing: {
      label: "In Bearbeitung",
      variant: "default" as const,
      icon: AlertCircle,
    },
    completed: {
      label: "Abgeschlossen",
      variant: "default" as const,
      icon: CheckCircle2,
    },
    failed: {
      label: "Fehlgeschlagen",
      variant: "destructive" as const,
      icon: XCircle,
    },
  }

  const { label, variant, icon: Icon } = config[status]

  return (
    <Badge variant={variant} className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  )
}
