import React, { useEffect, useState } from 'react';

const TerminalSimulation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  
  const terminalLines = [
    { text: 'initiating security scan', color: 'text-green-400' },
    { text: 'scanning network ports...', color: 'text-green-400' },
    { text: 'checking firewall configuration...', color: 'text-green-400' },
    { text: 'analyzing system vulnerabilities...', color: 'text-amber-400' },
    { text: 'potential vulnerability detected: port 22 exposed', color: 'text-yellow-400' },
    { text: 'scanning for malware signatures...', color: 'text-green-400' },
    { text: 'suspicious activity detected in system32/config', color: 'text-yellow-400' },
    { text: 'initiating countermeasures...', color: 'text-green-400' },
    { text: 'How will you respond?', color: 'text-white' },
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
      <div className="flex items-center mb-4 border-b border-gray-700 pb-2">
        <span className="text-gray-400">❯</span>
        <span className="ml-2 text-white">Cyber Sim Lab Terminal</span>
      </div>
      <div className="space-y-2">
        {terminalLines.slice(0, currentLine + 1).map((line, index) => (
          <div key={index} className="flex items-start">
            <span className="text-gray-400 mr-2">$</span>
            <span className={line.color}>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalSimulation; 