/**
 * StatsBlock
 * Displays the statistics summary for a specific context (middle column in the mock).
 */
export default function StatsBlock() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top Row: Two side-by-side stats */}
      <div className="flex gap-4 flex-1">
        
        {/* Mid Term */}
        <div className="bg-white dark:bg-[#1e212b] rounded-3xl p-6 flex flex-col justify-center flex-1 border border-gray-100 dark:border-gray-800 border-none hover:shadow-md transition-shadow">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
            Mid Term
          </span>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            Oct 14
          </span>
        </div>

        {/* Final Exam */}
        <div className="bg-white dark:bg-[#1e212b] rounded-3xl p-6 flex flex-col justify-center flex-1 border border-gray-100 dark:border-gray-800 border-none hover:shadow-md transition-shadow">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
            Final Exam
          </span>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            Dec 20
          </span>
        </div>

      </div>

      {/* Bottom Row: Recent Topic */}
      <div className="bg-white dark:bg-[#1e212b] rounded-3xl p-6 flex-1 flex flex-col justify-center border border-gray-100 dark:border-gray-800 border-none hover:shadow-md transition-shadow">
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
          Recent Topic
        </span>
        <h4 className="text-base font-extrabold text-gray-900 leading-tight">
          Memory Paging & Virtualization
        </h4>
      </div>
    </div>
  );
}
