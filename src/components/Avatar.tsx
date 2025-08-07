export default function Avatar({
  src,
  fallback = "U",
  size = "md",
}: {
  src: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={`${sizeClasses[size]} aspect-square overflow-hidden rounded-full bg-muted flex items-center justify-center`}
    >
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : null}
      <div
        className={`${
          src ? "hidden" : "flex"
        } items-center justify-center w-full h-full ig-gradient text-white font-medium`}
      >
        {fallback.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
