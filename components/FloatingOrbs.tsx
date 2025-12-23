export function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-accent/30 blur-3xl animate-float" />
      <div className="absolute right-[8%] top-[20%] h-48 w-48 rounded-full bg-accent2/20 blur-3xl animate-float" />
      <div className="absolute bottom-[10%] left-[30%] h-40 w-40 rounded-full bg-pink-400/20 blur-3xl animate-float" />
    </div>
  );
}
