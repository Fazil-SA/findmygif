export default function LoadingState() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%_100%] animate-shimmer rounded-xl border border-gray-200 dark:border-neutral-800"
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
}
