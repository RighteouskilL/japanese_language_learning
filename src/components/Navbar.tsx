import { NavLink } from 'react-router-dom';
import { BookOpen, GraduationCap, Languages, HelpCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <GraduationCap size={28} style={{ stroke: 'url(#brand-grad)' }} />
        <span style={{ fontFamily: 'var(--sans)', letterSpacing: '0.5px' }}>nihongoGO 日本語</span>
        {/* SVG gradient definition for the icon */}
        <svg width="0" height="0">
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </svg>
      </NavLink>
      <div className="nav-links">
        <NavLink 
          to="/kana" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <Languages size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          <span>ตัวอักษร Kana</span>
        </NavLink>
        <NavLink 
          to="/kanji" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <BookOpen size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          <span>คันจิ Kanji</span>
        </NavLink>
        <NavLink 
          to="/vocab" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <Languages size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          <span>คำศัพท์ Vocab</span>
        </NavLink>
        <NavLink 
          to="/situations" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <HelpCircle size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          <span>บทสนทนา Situations</span>
        </NavLink>
      </div>
    </nav>
  );
}
