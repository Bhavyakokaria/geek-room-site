"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronDown } from "lucide-react";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "phone" | "textarea" | "file" | "url" | "dropdown" | "number";
  required: boolean;
  placeholder?: string;
  accept?: string;       // for file inputs: ".ppt,.pdf,.zip"
  options?: string[];    // for dropdowns
}

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "textarea", label: "Text Area" },
  { value: "file", label: "File Upload" },
  { value: "url", label: "URL" },
  { value: "dropdown", label: "Dropdown" },
  { value: "number", label: "Number" },
] as const;

const DEFAULT_FIELDS: FormField[] = [
  { id: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
  { id: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  { id: "phone", label: "Phone Number", type: "phone", required: true, placeholder: "+91 XXXXX XXXXX" },
  { id: "college", label: "College Name", type: "text", required: true, placeholder: "Your college / university" },
];

function generateId() {
  return "field_" + Math.random().toString(36).substring(2, 9);
}

export default function FormBuilder({
  value,
  onChange,
}: {
  value: FormField[];
  onChange: (fields: FormField[]) => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newField, setNewField] = useState<Partial<FormField>>({
    label: "",
    type: "text",
    required: false,
    placeholder: "",
    accept: "",
    options: [],
  });
  const [newOptionsText, setNewOptionsText] = useState("");

  const fields = value.length > 0 ? value : DEFAULT_FIELDS;

  function addField() {
    if (!newField.label?.trim()) return;
    const field: FormField = {
      id: generateId(),
      label: newField.label!.trim(),
      type: newField.type as FormField["type"],
      required: newField.required || false,
      placeholder: newField.placeholder?.trim() || undefined,
      accept: newField.type === "file" ? (newField.accept?.trim() || undefined) : undefined,
      options: newField.type === "dropdown"
        ? newOptionsText.split("\n").map(o => o.trim()).filter(Boolean)
        : undefined,
    };
    onChange([...fields, field]);
    setNewField({ label: "", type: "text", required: false, placeholder: "", accept: "", options: [] });
    setNewOptionsText("");
    setShowAddModal(false);
  }

  function removeField(id: string) {
    onChange(fields.filter(f => f.id !== id));
  }

  function toggleRequired(id: string) {
    onChange(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  }

  function moveField(fromIndex: number, toIndex: number) {
    const newFields = [...fields];
    const [moved] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, moved);
    onChange(newFields);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-400">Registration Form Fields</h3>
        <span className="text-xs text-zinc-500">{fields.length} fields</span>
      </div>

      {/* Field List */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 group"
          >
            <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white font-medium truncate">{field.label}</span>
                {field.required && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4F9EFF]/10 text-[#4F9EFF] font-medium">
                    Required
                  </span>
                )}
              </div>
              <span className="text-xs text-zinc-500">{field.type}</span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => toggleRequired(field.id)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  field.required
                    ? "bg-[#4F9EFF]/10 text-[#4F9EFF] hover:bg-[#4F9EFF]/20"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {field.required ? "Required" : "Optional"}
              </button>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => moveField(index, index - 1)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  ↑
                </button>
              )}
              {index < fields.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveField(index, index + 1)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  ↓
                </button>
              )}
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Field Button */}
      {!showAddModal ? (
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-zinc-700 text-zinc-400 hover:border-[#4F9EFF]/50 hover:text-[#4F9EFF] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Field
        </button>
      ) : (
        <div className="bg-zinc-900/80 border border-[#4F9EFF]/20 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Label</label>
              <input
                type="text"
                value={newField.label || ""}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                placeholder="e.g. PPT Upload"
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4F9EFF]"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Type</label>
              <select
                value={newField.type}
                onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField["type"] })}
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4F9EFF]"
              >
                {FIELD_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-1">Placeholder (optional)</label>
            <input
              type="text"
              value={newField.placeholder || ""}
              onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
              placeholder="Hint text for participants"
              className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4F9EFF]"
            />
          </div>

          {newField.type === "file" && (
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Accepted file types</label>
              <input
                type="text"
                value={newField.accept || ""}
                onChange={(e) => setNewField({ ...newField, accept: e.target.value })}
                placeholder=".ppt,.pdf,.zip"
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4F9EFF]"
              />
            </div>
          )}

          {newField.type === "dropdown" && (
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Options (one per line)</label>
              <textarea
                value={newOptionsText}
                onChange={(e) => setNewOptionsText(e.target.value)}
                rows={3}
                placeholder={"Option 1\nOption 2\nOption 3"}
                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4F9EFF]"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newField.required || false}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-[#4F9EFF]"
              />
              <span className="text-sm text-zinc-300">Required</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addField}
                disabled={!newField.label?.trim()}
                className="px-4 py-2 bg-[#4F9EFF] text-black text-sm font-medium rounded-lg hover:bg-[#4F9EFF]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden input to store form schema as JSON */}
      <input type="hidden" name="formSchema" value={JSON.stringify(fields)} />
    </div>
  );
}
