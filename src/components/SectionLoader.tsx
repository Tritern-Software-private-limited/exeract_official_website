import React from 'react';

interface SectionLoaderProps {
  label?: string;
  minHeightClassName?: string;
}

export function SectionLoader({ label, minHeightClassName }: SectionLoaderProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center gap-3 ${minHeightClassName || 'min-h-[220px]'}`}
    >
      <div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      {label ? (
        <div className="text-sm text-gray-500 font-medium">{label}</div>
      ) : null}
    </div>
  );
}
