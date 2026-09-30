import React, { useState } from 'react';
import Reveal from './Reveal';
import { Play, Hash, Users, Crown, MapPin } from 'lucide-react';

const CATEGORIES = [
  { id: 'Video', icon: Play },
  { id: 'Metadata', icon: Hash },
  { id: 'Social', icon: Users },
  { id: 'Exclusive', icon: Crown },
  { id: 'BTL', icon: MapPin }
];

const TOUCHPOINTS = [
  // Video
  { id: 1, cat: 'Video', name: 'Live-show title sponsor', pitch: '"Powered by X" on every stream', price: 8000 },
  { id: 2, cat: 'Video', name: 'Mid-stream mention', pitch: 'Verbal mention', price: 1500 },
  { id: 3, cat: 'Video', name: 'Lower-third logo', pitch: 'On videos', price: 3000 },
  { id: 4, cat: 'Video', name: 'Pre-roll on YouTube', pitch: 'Pre-roll on uploads', price: 2000 },
  { id: 5, cat: 'Video', name: 'Sponsored interview', pitch: 'Interview segment', price: 5000 },
  { id: 6, cat: 'Video', name: 'Product demo', pitch: 'Demo on video show', price: 4000 },
  { id: 7, cat: 'Video', name: 'Event live-stream', pitch: 'Live-stream sponsor', price: 10000 },
  { id: 8, cat: 'Video', name: 'Recorded show', pitch: '"Brought to you by"', price: 3500 },
  { id: 9, cat: 'Video', name: 'Highlight-reel', pitch: 'Highlight sponsor', price: 2500 },
  { id: 10, cat: 'Video', name: 'Podcast video sponsor', pitch: 'Podcast sponsor', price: 3000 },
  
  // Metadata
  { id: 11, cat: 'Metadata', name: 'Link in video desc.', pitch: 'Description link', price: 1000 },
  { id: 12, cat: 'Metadata', name: 'Pinned comment', pitch: 'Promo pinned comment', price: 1000 },
  { id: 13, cat: 'Metadata', name: 'Sponsored hashtag', pitch: 'Custom hashtag', price: 1500 },
  { id: 14, cat: 'Metadata', name: 'Caption mention', pitch: 'Mention in post caption', price: 1000 },
  { id: 15, cat: 'Metadata', name: 'Bio/website link', pitch: 'Feature link in bio', price: 2000 },
  { id: 16, cat: 'Metadata', name: 'Playlist sponsor', pitch: 'Sponsor a playlist', price: 2000 },
  { id: 17, cat: 'Metadata', name: 'Tagged partner', pitch: 'Tagged in metadata', price: 1000 },

  // Social
  { id: 18, cat: 'Social', name: 'Facebook sponsored', pitch: 'Sponsored post', price: 3000 },
  { id: 19, cat: 'Social', name: 'WhatsApp broadcast', pitch: 'Channel broadcast mention', price: 2000 },
  { id: 20, cat: 'Social', name: 'TikTok branded clip', pitch: 'Branded clip', price: 4000 },
  { id: 21, cat: 'Social', name: 'Instagram Reel feature', pitch: 'Feature in Reel', price: 3000 },
  { id: 22, cat: 'Social', name: 'Story/Status ad', pitch: '24h story ad', price: 1500 },
  { id: 23, cat: 'Social', name: 'Cross-platform package', pitch: 'All platforms', price: 10000 },
  { id: 24, cat: 'Social', name: 'Business of the week', pitch: 'Weekly feature', price: 5000 },
  { id: 25, cat: 'Social', name: 'Poll/contest sponsor', pitch: 'Sponsor a poll', price: 3000 },
  { id: 26, cat: 'Social', name: 'X headline sponsor', pitch: 'Headline sponsor', price: 1000 },

  // Exclusive
  { id: 27, cat: 'Exclusive', name: 'Agri-tips series', pitch: 'Targeting farmers', price: 6000 },
  { id: 28, cat: 'Exclusive', name: 'Branded prices board', pitch: 'Market prices board', price: 5000 },
  { id: 29, cat: 'Exclusive', name: 'Community showcase', pitch: 'Sponsored talent show', price: 8000 },
  { id: 30, cat: 'Exclusive', name: 'Podcast series', pitch: 'Exclusive sponsor', price: 10000 },
  { id: 31, cat: 'Exclusive', name: 'Weather/obituary', pitch: 'Branded segment', price: 4000 },

  // BTL
  { id: 32, cat: 'BTL', name: 'Branded Market Tent', pitch: 'Your logo tent at market', price: 10000 },
  { id: 33, cat: 'BTL', name: 'Stage Banner Placement', pitch: 'Logo on event backdrop', price: 5000 },
  { id: 34, cat: 'BTL', name: 'MC Verbal Mentions', pitch: 'Live shout-outs to crowd', price: 2000 },
  { id: 35, cat: 'BTL', name: 'Sampling Display', pitch: 'Hand out samples', price: 4000 },
  { id: 36, cat: 'BTL', name: 'Street Team T-Shirt', pitch: '20 walking billboards', price: 12000 },
  { id: 37, cat: 'BTL', name: 'Boda Boda Stickers', pitch: '500 moving ads', price: 8000 },
  { id: 38, cat: 'BTL', name: 'Flyer Distribution', pitch: 'Handout + sample', price: 3000 },
  { id: 39, cat: 'BTL', name: 'Noticeboard Poster', pitch: 'Church/trusted space', price: 2000 }
];

export default function TouchpointFilter() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' 
    ? TOUCHPOINTS 
    : TOUCHPOINTS.filter(t => t.cat === activeFilter);

  return (
    <div className="py-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button 
          onClick={() => setActiveFilter('All')}
          className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${activeFilter === 'All' ? 'bg-mulembe-green text-broadcast-night font-bold' : 'bg-white/5 text-static-grey hover:bg-white/10'}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${activeFilter === cat.id ? 'bg-mulembe-green text-broadcast-night font-bold' : 'bg-white/5 text-static-grey hover:bg-white/10'}`}
          >
            <cat.icon size={14} />
            {cat.id}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500">
        {filtered.map(item => (
          <div 
            key={item.id} 
            className="glass-panel p-4 flex flex-col justify-between h-32 animate-pop-in"
            style={{ animationDuration: '0.3s' }}
          >
            <div>
              <div className="flex justify-between items-start mb-1">
                <h6 className="text-maize-cream font-medium text-sm line-clamp-1 pr-2">{item.name}</h6>
                <span className="text-[9px] font-mono uppercase tracking-widest text-mulembe-green bg-mulembe-green/10 px-1.5 py-0.5 rounded">{item.cat}</span>
              </div>
              <p className="text-xs text-static-grey line-clamp-1">{item.pitch}</p>
            </div>
            <div className="font-mono text-mulembe-green text-sm">
              KES {item.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
