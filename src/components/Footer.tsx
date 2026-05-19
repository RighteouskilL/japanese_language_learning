import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
        <span>nihongoGO 日本語 - พัฒนาเพื่อการเรียนรู้ภาษาญี่ปุ่นด้วยตนเอง</span>
        <Heart size={14} style={{ color: 'var(--primary)', fill: 'var(--primary)' }} />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
