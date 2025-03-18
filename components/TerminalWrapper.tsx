'use client';

import dynamic from 'next/dynamic';

const TerminalSimulation = dynamic(() => import('./TerminalSimulation'), {
  ssr: false
});

export default function TerminalWrapper() {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/30 rounded-lg blur"></div>
      <div className="relative">
        <TerminalSimulation />
      </div>
    </div>
  );
} 