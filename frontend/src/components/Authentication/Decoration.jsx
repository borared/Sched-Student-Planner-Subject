/**
 * Decoration
 * The right panel — decorative teal background with a philosophy quote card.
 * Pure presentational component — no props, no state.
 */
export default function Decoration() {
  return (
    <div
      className="relative w-1/2 flex flex-col items-center justify-end pb-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #5eb8c4 0%, #3a9aab 30%, #1e7a8a 60%, #155f6e 100%)",
      }}
    >
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[5px] scale-110"
        style={{
          backgroundImage: `url('https://blog-cdn.lottiefiles.com/cdn-cgi/image/width=640,quality=80,format=auto/2024/02/Comprehensive-Guide-to-Lottie-Creator---Cover.png')`,
        }}
      />

      {/* Slide indicator dots — top right */}
      <div className="absolute top-10 right-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white opacity-80" />
        <div className="w-2 h-2 rounded-full bg-white opacity-30" />
        <div className="w-2 h-2 rounded-full bg-white opacity-30" />
      </div>

      {/* Philosophy quote card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 mx-10 w-[340px]">
        {/* Tag */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-blue-600 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
            The Philosophy
          </span>
        </div>

        {/* Quote */}
        <p className="text-xl font-extrabold text-gray-900 leading-snug mb-5">
          Focus is not the absence of noise, but the presence of clarity.
        </p>

        {/* Attribution */}
        <div className="flex items-center gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
            alt="Marcus Aurelius"
            className="w-9 h-9 rounded-full bg-gray-200 object-cover shrink-0"
          />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">
              Marcus Aurelius
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Design Lead, Sanctuary</p>
          </div>
        </div>
      </div>
    </div>
  );
}
