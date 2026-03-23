interface AnalysisLevelBadgeProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
}

export function AnalysisLevelBadge({ percentage, size = "md" }: AnalysisLevelBadgeProps) {
  const getLevelInfo = (percentage: number) => {
    if (percentage >= 80) {
      return {
        label: "Sehr gutes Systemverständnis",
        emoji: "🎓",
        color: "bg-emerald-100 text-emerald-700 border-emerald-300",
      };
    }
    if (percentage >= 60) {
      return {
        label: "Fortgeschritten",
        emoji: "📚",
        color: "bg-blue-100 text-blue-700 border-blue-300",
      };
    }
    return {
      label: "Grundlagen verstanden",
      emoji: "🌱",
      color: "bg-amber-100 text-amber-700 border-amber-300",
    };
  };

  const levelInfo = getLevelInfo(percentage);

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 gap-1",
    md: "text-sm px-3 py-2 gap-1.5",
    lg: "text-base px-4 py-2.5 gap-2",
  };

  return (
    <div
      className={`inline-flex items-center border rounded-full font-medium whitespace-nowrap ${levelInfo.color} ${sizeClasses[size]}`}
    >
      <span className="text-lg">{levelInfo.emoji}</span>
      <span>{levelInfo.label}</span>
    </div>
  );
}
