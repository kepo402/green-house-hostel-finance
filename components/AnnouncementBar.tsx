
import React from 'react';
import { Announcement } from '../types';

interface AnnouncementBarProps {
  announcements: Announcement[];
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcements }) => {
  return (
    <div className="relative border-b border-white/5 bg-slate-950/50 backdrop-blur-md overflow-hidden py-2 h-10 flex items-center group">
      {/* Blurred Edges for Ticker Tape Effect */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="ticker-scroll flex items-center">
        {announcements.concat(announcements).map((a, idx) => (
          <div key={idx} className="flex items-center px-10">
            <span className={`flex h-2 w-2 rounded-full mr-3 ${a.is_important ? 'bg-rose-500 animate-pulse' : 'bg-cyan-500'}`}></span>
            <span className={`text-[11px] font-semibold tracking-wider uppercase ${a.is_important ? 'text-white' : 'text-slate-400'}`}>
              {a.message}
            </span>
            <span className="mx-6 text-slate-800 font-black">/ /</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
