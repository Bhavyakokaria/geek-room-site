"use client";

import { useState } from "react";
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { FormSubmissionData } from "@/app/actions/eventActions";

export default function ResponsesClient({
  submissions,
  fieldLabels,
  fieldKeys,
  eventId,
}: {
  submissions: FormSubmissionData[];
  fieldLabels: string[];
  fieldKeys: string[];
  eventId: string;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 10;

  const filtered = submissions.filter(s => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return fieldKeys.some(key => {
      const val = s.data[key];
      return val && String(val).toLowerCase().includes(searchLower);
    });
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);

  function downloadCSV() {
    window.open(`/api/events/${eventId}/responses/csv`, "_blank");
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search responses..."
            className="w-full pl-9 pr-3 py-2 bg-black border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#4F9EFF] transition-colors"
          />
        </div>
        <button
          onClick={downloadCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F9EFF] text-black rounded-lg text-sm font-medium hover:bg-[#4F9EFF]/80 transition-colors"
        >
          <Download className="w-4 h-4" />
          CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left px-4 py-3 text-zinc-500 font-medium w-12">#</th>
              {fieldLabels.map(label => (
                <th key={label} className="text-left px-4 py-3 text-zinc-500 font-medium whitespace-nowrap">
                  {label}
                </th>
              ))}
              <th className="text-left px-4 py-3 text-zinc-500 font-medium whitespace-nowrap">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((s, i) => (
              <tr key={s.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <td className="px-4 py-3 text-zinc-500">{page * perPage + i + 1}</td>
                {fieldKeys.map(key => {
                  const val = s.data[key];
                  return (
                    <td key={key} className="px-4 py-3 text-zinc-200 max-w-[200px] truncate">
                      {typeof val === "string" && val.startsWith("data:") ? (
                        <span className="text-[#4F9EFF] text-xs">[file]</span>
                      ) : Array.isArray(val) ? (
                        val.join(", ")
                      ) : (
                        String(val ?? "—")
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">
                  {new Date(s.submitted).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>Showing {page * perPage + 1}–{Math.min((page + 1) * perPage, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2">{page + 1} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
