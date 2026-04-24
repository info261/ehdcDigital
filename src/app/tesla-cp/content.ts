export const teslaCpHtml = `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cenová ponuka – Tesla Energy Holding | ehdcDigital</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=open-runde@400,600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  :root {
    --bg: #f7f7f6;
    --foreground: #0f172a;
    --muted: #94a3b8;
    --border: #e2e8f0;
    --white: #ffffff;
    --shadow-subtle: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-card: 0 4px 16px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
    --shadow-button: 0 1px 3px rgba(15,23,42,0.12), 0 1px 2px rgba(15,23,42,0.08);
    --shadow-button-hover: 0 4px 12px rgba(15,23,42,0.15), 0 2px 4px rgba(15,23,42,0.08);
    --tesla-blue: #125EC3;
    --tesla-dark: #0D3F8A;
    --tesla-light: #EBF3FF;
    --green: #16a34a;
    --amber: #d97706;
    --radius: 16px;
    --radius-sm: 10px;
  }

  body {
    font-family: 'Open Runde', 'Inter', sans-serif;
    background: var(--bg);
    color: var(--foreground);
    line-height: 1.6;
    min-height: 100vh;
  }

  .grain-overlay { position: relative; }
  .grain-overlay::after {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 1;
  }

  .layout { display: flex; flex-direction: column; min-height: 100vh; }
  @media (min-width: 1024px) { .layout { flex-direction: row; } }

  .sidebar {
    background: var(--white);
    border-right: 0.5px solid var(--border);
    width: 100%; padding: 28px 24px;
    display: flex; flex-direction: column;
  }
  @media (min-width: 1024px) {
    .sidebar {
      width: 360px; min-width: 360px;
      position: sticky; top: 0;
      height: 100vh; overflow-y: auto;
      padding: 32px 32px;
    }
    .sidebar::-webkit-scrollbar { display: none; }
    .sidebar { -ms-overflow-style: none; scrollbar-width: none; }
  }
  @media (min-width: 1280px) { .sidebar { width: 380px; min-width: 380px; } }

  .sidebar-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; }
  .brand-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 1.5px solid var(--border); }
  .brand-name { font-size: 0.875rem; font-weight: 600; }

  .sidebar-eyebrow { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
  .sidebar-project-title { font-family: 'Titillium Web', sans-serif; font-size: 1.35rem; font-weight: 700; line-height: 1.2; color: var(--foreground); margin-bottom: 6px; }
  .sidebar-project-title .dot { color: var(--tesla-blue); }
  .sidebar-project-sub { font-size: 0.78rem; color: var(--muted); line-height: 1.5; margin-bottom: 24px; }

  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; }
  .meta-pill { background: var(--bg); border-radius: var(--radius-sm); padding: 10px 12px; border: 0.5px solid var(--border); }
  .meta-pill dt { font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
  .meta-pill dd { font-size: 0.78rem; font-weight: 600; }

  .overview-grid { display: flex; flex-direction: column; gap: 7px; margin-bottom: 24px; }
  .ov-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; background: var(--bg); border-radius: var(--radius-sm); border: 0.5px solid var(--border); }
  .ov-icon { width: 28px; height: 28px; border-radius: 7px; background: white; border: 0.5px solid var(--border); box-shadow: var(--shadow-subtle); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--muted); }
  .ov-icon svg { width: 14px; height: 14px; }
  .ov-label { font-size: 0.62rem; color: var(--muted); margin-bottom: 2px; }
  .ov-value { font-size: 0.8rem; font-weight: 600; color: var(--foreground); }

  .sidebar-nav { margin-bottom: 24px; }
  .nav-label { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
  .nav-list { list-style: none; display: flex; flex-direction: column; gap: 1px; }
  .nav-item a { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 8px; text-decoration: none; color: var(--muted); font-size: 0.8rem; transition: all 0.15s; }
  .nav-item a:hover { background: var(--bg); color: var(--foreground); }
  .nav-num { width: 20px; height: 20px; border-radius: 6px; background: var(--bg); border: 0.5px solid var(--border); font-size: 0.62rem; font-weight: 600; color: var(--muted); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .sidebar-contact { margin-top: auto; padding-top: 16px; border-top: 0.5px solid var(--border); }
  .contact-email { font-size: 0.78rem; color: var(--muted); text-decoration: none; display: block; transition: color .15s; }
  .contact-email:hover { color: var(--foreground); }
  .contact-validity { font-size: 0.65rem; color: var(--muted); margin-top: 5px; }

  .main { flex: 1; padding: 28px 20px 80px; }
  @media (min-width: 1024px) { .main { padding: 40px 44px 80px; max-width: 760px; } }

  .fade-up { opacity: 0; transform: translateY(14px); filter: blur(5px); animation: fu .45s ease forwards; }
  @keyframes fu { to { opacity:1; transform:translateY(0); filter:blur(0); } }
  .fade-up:nth-child(1){animation-delay:.04s}
  .fade-up:nth-child(2){animation-delay:.09s}
  .fade-up:nth-child(3){animation-delay:.14s}
  .fade-up:nth-child(4){animation-delay:.19s}
  .fade-up:nth-child(5){animation-delay:.24s}
  .fade-up:nth-child(6){animation-delay:.29s}
  .fade-up:nth-child(7){animation-delay:.34s}

  .sec-eyebrow { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
  .sec-title { font-family: 'Titillium Web', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin-bottom: 14px; }
  .sec-title .dot { color: var(--tesla-blue); }

  .card { background: var(--white); border-radius: var(--radius); padding: 24px; margin-bottom: 20px; border: 0.5px solid var(--border); box-shadow: var(--shadow-subtle); }
  .card p { font-size: 0.855rem; color: #475569; line-height: 1.7; }
  .muted-p { color: var(--muted) !important; font-size: 0.8rem !important; margin-bottom: 14px; }

  .scope-base { background: var(--bg); border-radius: var(--radius-sm); padding: 14px 16px; border: 0.5px solid var(--border); margin-bottom: 14px; }
  .scope-base-label { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
  .tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .tag { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 20px; background: white; border: 0.5px solid var(--border); font-size: 0.72rem; color: #475569; box-shadow: var(--shadow-subtle); }
  .tag::before { content: '–'; color: var(--tesla-blue); font-weight: 700; }

  .scope-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
  @media (max-width: 560px) { .scope-grid { grid-template-columns: 1fr; } }

  .scope-card { background: var(--bg); border-radius: var(--radius-sm); padding: 14px; border: 0.5px solid var(--border); transition: border-color .2s; }
  .scope-card:hover { border-color: #cbd5e1; }
  .sc-num { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 5px; background: var(--foreground); color: white; font-size: 0.62rem; font-weight: 700; margin-bottom: 7px; }
  .scope-card h3 { font-size: 0.8rem; font-weight: 600; margin-bottom: 7px; }
  .scope-card ul { list-style: none; }
  .scope-card ul li { font-size: 0.75rem; color: #64748b; padding: 2px 0; display: flex; align-items: flex-start; gap: 6px; }
  .scope-card ul li::before { content: '–'; color: var(--tesla-blue); font-weight: 700; flex-shrink: 0; }

  .tbl-wrap { border-radius: var(--radius-sm); overflow: hidden; border: 0.5px solid var(--border); margin-top: 4px; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.815rem; min-width: 500px; }
  thead { background: var(--foreground); }
  thead th { color: white; font-weight: 500; padding: 10px 13px; text-align: left; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; }
  thead th:last-child { text-align: right; }
  .gr td { background: var(--bg); color: #64748b; font-weight: 600; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 7px 13px; border-bottom: 0.5px solid var(--border); }
  tbody tr { border-bottom: 0.5px solid var(--border); transition: background .1s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:not(.gr):not(.tot):hover { background: #fafafa; }
  tbody td { padding: 10px 13px; vertical-align: top; }
  td.it { font-weight: 600; width: 28%; }
  td.de { color: #64748b; }
  td.pr { text-align: right; font-weight: 600; white-space: nowrap; }
  .tot td { background: var(--tesla-light); color: var(--tesla-dark); font-weight: 700; border-top: 1px solid #bfd6f5; padding: 12px 13px; }
  .tot td:last-child { text-align: right; font-size: 0.9rem; }

  .disc { margin-top: 14px; background: var(--foreground); border-radius: var(--radius-sm); padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .disc-l .disc-lbl { font-size: 0.68rem; color: rgba(255,255,255,0.45); margin-bottom: 3px; }
  .disc-l .disc-nm { font-size: 0.845rem; font-weight: 600; color: white; }
  .disc-r { text-align: right; }
  .disc-r .disc-sm { font-size: 0.68rem; color: rgba(255,255,255,0.38); }
  .disc-r .disc-amt { font-family:'Titillium Web',sans-serif; font-size: 1.7rem; font-weight: 700; color: white; line-height: 1; }
  .disc-r .disc-amt span { font-size: 0.82rem; font-weight: 300; opacity: .45; margin-left: 3px; }

  .note { margin-top: 11px; padding: 11px 13px; background: var(--bg); border-radius: 8px; border-left: 2px solid var(--tesla-blue); font-size: 0.775rem; color: #64748b; }
  .note strong { color: var(--foreground); }

  .loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  @media (max-width: 540px) { .loc-grid { grid-template-columns: 1fr; } }

  .loc-opt { border-radius: var(--radius-sm); border: 0.5px solid var(--border); overflow: hidden; }
  .loc-hdr { padding: 13px 15px; display: flex; align-items: center; gap: 8px; }
  .loc-opt.rec .loc-hdr { background: var(--foreground); }
  .loc-opt.alt .loc-hdr { background: var(--bg); }
  .loc-badge { font-size: 0.6rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
  .loc-opt.rec .loc-badge { background: rgba(255,255,255,.12); color: rgba(255,255,255,.8); }
  .loc-opt.alt .loc-badge { background: var(--border); color: var(--muted); }
  .loc-nm { font-weight: 600; font-size: 0.845rem; }
  .loc-opt.rec .loc-nm { color: white; }
  .loc-opt.alt .loc-nm { color: var(--foreground); }
  .loc-body { padding: 13px 15px; background: white; }
  .loc-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 0.5px solid var(--border); font-size: 0.77rem; }
  .loc-row:last-child { border-bottom: none; }
  .lk { color: var(--muted); }
  .lv { font-weight: 600; text-align: right; }
  .lv.good { color: var(--green); }
  .lv.warn { color: var(--amber); }

  th.gh { background: #15803d !important; }
  th.oh { background: #b45309 !important; }
  td.g { color: var(--green); font-weight: 600; text-align: center; }
  td.o { color: var(--amber); font-weight: 600; text-align: center; }
  td.cn { text-align: center; color: var(--muted); }

  .rec-note { margin-top: 11px; padding: 11px 13px; background: var(--tesla-light); border-radius: 8px; border-left: 2px solid var(--tesla-blue); font-size: 0.775rem; color: #334155; }
  .rec-note strong { color: var(--tesla-dark); }

  .pay-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-bottom: 20px; }
  @media (max-width: 520px) { .pay-steps { grid-template-columns: 1fr; } }
  .pay-step { background: var(--bg); border: 0.5px solid var(--border); border-radius: var(--radius-sm); padding: 16px 14px; text-align: center; transition: border-color .2s; }
  .pay-step:hover { border-color: #cbd5e1; }
  .ps-pct { font-family:'Titillium Web',sans-serif; font-size: 1.9rem; font-weight: 700; color: var(--foreground); line-height: 1; }
  .ps-eur { font-size: 0.72rem; color: var(--muted); margin: 2px 0 9px; }
  .ps-phase { font-size: 0.62rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: var(--tesla-blue); margin-bottom: 3px; }
  .ps-desc { font-size: 0.75rem; color: #64748b; line-height: 1.4; }

  .tl { display: flex; flex-direction: column; }
  .tl-item { display: flex; align-items: flex-start; gap: 13px; padding: 11px 0; border-bottom: 0.5px solid var(--border); }
  .tl-item:last-child { border-bottom: none; }
  .tl-n { width: 24px; height: 24px; border-radius: 7px; background: var(--foreground); color: white; font-size: 0.66rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .tl-n.s { background: var(--tesla-blue); }
  .tl-ttl { font-weight: 600; font-size: 0.845rem; margin-bottom: 2px; }
  .tl-dur { font-size: 0.775rem; color: var(--muted); }

  .excl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  @media (max-width: 520px) { .excl-grid { grid-template-columns: 1fr; } }
  .excl-item { display: flex; align-items: flex-start; gap: 9px; padding: 9px 11px; background: var(--bg); border-radius: 8px; border: 0.5px solid var(--border); font-size: 0.775rem; color: #64748b; }
  .excl-item::before { content: '×'; color: #cbd5e1; font-weight: 700; flex-shrink: 0; }

  .footer-bar { background: var(--white); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .fb-name { font-weight: 600; font-size: 0.875rem; }
  .fb-role { font-size: 0.75rem; color: var(--muted); }
  .fb-email { font-size: 0.8rem; font-weight: 500; color: var(--foreground); text-decoration: none; display: block; text-align: right; }
  .fb-email:hover { color: var(--tesla-blue); }
  .fb-val { font-size: 0.68rem; color: var(--muted); text-align: right; }

  .about-wrap { display: flex; gap: 16px; align-items: flex-start; }
  .about-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid var(--border); box-shadow: var(--shadow-subtle); }
  .about-body { flex: 1; }
  .about-badge { display: inline-flex; align-items: center; gap: 5px; background: var(--bg); border: 0.5px solid var(--border); border-radius: 20px; padding: 3px 10px; font-size: 0.68rem; font-weight: 500; color: var(--muted); margin-bottom: 8px; box-shadow: var(--shadow-subtle); }
  .about-name { font-size: 1rem; font-weight: 700; color: var(--foreground); margin-bottom: 2px; }
  .about-role { font-size: 0.75rem; color: var(--muted); margin-bottom: 10px; }
  .about-bio { font-size: 0.835rem; color: #475569; line-height: 1.65; margin-bottom: 14px; }
  .about-prev { background: var(--bg); border-radius: 8px; padding: 11px 13px; border: 0.5px solid var(--border); }
  .about-prev-label { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .about-prev-items { display: flex; gap: 8px; flex-wrap: wrap; }
  .about-prev-item { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: white; border-radius: 20px; border: 0.5px solid var(--border); box-shadow: var(--shadow-subtle); font-size: 0.775rem; font-weight: 500; color: var(--foreground); text-decoration: none; transition: border-color .15s, box-shadow .15s; }
  .about-prev-item:hover { border-color: #cbd5e1; box-shadow: var(--shadow-card); }
  .prev-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
</style>
</head>
<body>
<div class="layout">
  <aside class="sidebar grain-overlay">
    <div class="sidebar-brand">
      <img src="https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg" alt="Erik Hudec" class="brand-avatar">
      <span class="brand-name">ehdcDigital</span>
    </div>
    <div class="sidebar-eyebrow">Cenová ponuka</div>
    <div class="sidebar-project-title">Tesla Energy<br>Holding<span class="dot">.</span></div>
    <p class="sidebar-project-sub">Jednotný design system pre 4 weby holdingu na platforme Webflow.</p>
    <div class="meta-grid">
      <dl class="meta-pill"><dt>Klient</dt><dd>Tesla EH a.s.</dd></dl>
      <dl class="meta-pill"><dt>Platforma</dt><dd><img src="https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg" style="width:12px;height:12px;vertical-align:middle;margin-right:4px">Webflow</dd></dl>
      <dl class="meta-pill"><dt>Dátum</dt><dd id="d">—</dd></dl>
      <dl class="meta-pill"><dt>Platnosť</dt><dd>30 dní</dd></dl>
    </div>
    <div class="overview-grid">
      <div class="ov-item">
        <div class="ov-icon"><img src="https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg" style="width:14px;height:14px"></div>
        <div><div class="ov-label">Platforma</div><div class="ov-value">Webflow</div></div>
      </div>
      <div class="ov-item">
        <div class="ov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
        <div><div class="ov-label">Počet webov</div><div class="ov-value">4 weby holdingu</div></div>
      </div>
      <div class="ov-item">
        <div class="ov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        <div><div class="ov-label">Harmonogram</div><div class="ov-value">14–18 týždňov</div></div>
      </div>
      <div class="ov-item">
        <div class="ov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
        <div><div class="ov-label">Jazykové mutácie</div><div class="ov-value">SK / CZ / EN / PL / DE</div></div>
      </div>
      <div class="ov-item">
        <div class="ov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div><div class="ov-label">Štandard</div><div class="ov-value">WCAG 2.1 AA</div></div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-label">Obsah ponuky</div>
      <ul class="nav-list">
        <li class="nav-item"><a href="#scope"><span class="nav-num">01</span>Rozsah prác</a></li>
        <li class="nav-item"><a href="#pricing"><span class="nav-num">02</span>Ceny</a></li>
        <li class="nav-item"><a href="#loc"><span class="nav-num">03</span>Lokalizácia</a></li>
        <li class="nav-item"><a href="#pay"><span class="nav-num">04</span>Platba &amp; harmonogram</a></li>
        <li class="nav-item"><a href="#excl"><span class="nav-num">05</span>Čo nie je v cene</a></li>
      </ul>
    </nav>
    <div class="sidebar-contact">
      <div class="ov-label" style="margin-bottom:5px">Kontakt</div>
      <a href="mailto:info@ehdcdigital.com" class="contact-email">info@ehdcdigital.com</a>
      <div class="contact-validity">Platnosť ponuky: 30 dní</div>
    </div>
  </aside>

  <main class="main">
    <div class="section fade-up">
      <div class="sec-eyebrow">Úvod</div>
      <div class="sec-title">Kontext &amp; prístup<span class="dot">.</span></div>
      <div class="card">
        <p>Na základe zadania pre webové riešenie Tesla Energy Holding skupiny predkladám cenovú ponuku na vývoj štyroch vzájomne prepojených webových stránok v platforme Webflow. Všetky weby budú zdieľať jednotný design system, brand identity a template – meniť sa bude iba obsah a špecifické funkcionality každej divízie.</p>
        <p style="margin-top:8px;color:var(--muted);font-size:.825rem">Keďže som pre Tesla skupinu realizoval už projekty <strong style="color:var(--foreground)">enstra.sk</strong> a <strong style="color:var(--foreground)">teslaservices.sk</strong>, poznám štandardy, komunikačný štýl aj technické požiadavky klienta – čo výrazne uľahčí a urýchli priebeh celého projektu.</p>
      </div>
    </div>

    <div class="section fade-up" id="scope">
      <div class="sec-eyebrow">01 — Rozsah prác</div>
      <div class="sec-title">Čo bude súčasťou<span class="dot">.</span></div>
      <div class="card">
        <div class="scope-base">
          <div class="scope-base-label">Spoločný základ — všetky 4 weby</div>
          <div class="tags">
            <span class="tag">Design system (Titillium Web)</span>
            <span class="tag">Responsívny dizajn</span>
            <span class="tag">WCAG 2.1 AA</span>
            <span class="tag">Core Web Vitals</span>
            <span class="tag">Cookie consent</span>
            <span class="tag">On-page SEO</span>
            <span class="tag">CMS + návod</span>
          </div>
        </div>
        <div class="scope-grid">
          <div class="scope-card"><div class="sc-num">1</div><h3>Tesla Energy Group</h3><ul><li>Redesign &amp; migrácia do Webflow</li><li>CMS: blog, referencie, produkty</li><li>AI/SEO štruktúra (schema markup)</li><li>Lead gen formulár</li><li>Jazyky: CZ / EN / PL (+HU/DE/HR)</li></ul></div>
          <div class="scope-card"><div class="sc-num">2</div><h3>Tesla Energy Holding</h3><ul><li>Vizitkový web holdingu</li><li>Prezentácia dcérskych firiem</li><li>Navigácia na weby skupiny</li><li>CMS správa</li><li>Jazyky: CZ / EN / PL</li></ul></div>
          <div class="scope-card"><div class="sc-num">3</div><h3>Tesla Transformátory</h3><ul><li>Produktové portfólio + kategórie</li><li>CMS: katalóg + parametre + filter</li><li>PDF download centrum</li><li>Navigácia pre inžinierov</li><li>Jazyky: CZ / EN</li></ul></div>
          <div class="scope-card"><div class="sc-num">4</div><h3>Tesla Liptovský Hrádok</h3><ul><li>Adaptácia obsahu z teslalh.eu</li><li>Zapracovanie do jednotného DS</li><li>CMS: referencie, certifikáty</li><li>Jazyky: SK / CZ / EN / DE</li></ul></div>
        </div>
      </div>
    </div>

    <div class="section fade-up" id="pricing">
      <div class="sec-eyebrow">02 — Cenová kalkulácia</div>
      <div class="sec-title">Vývojové práce<span class="dot">.</span></div>
      <div class="card">
        <p class="muted-p">Ceny bez DPH. Zahŕňajú jednorazovú vývojovú prácu vrátane technického nastavenia lokalizácie. Mesačné platformové náklady sú v sekcii 03.</p>
        <div class="tbl-wrap">
          <table>
            <thead><tr><th style="width:28%">Položka</th><th>Popis</th><th style="width:110px">Cena</th></tr></thead>
            <tbody>
              <tr class="gr"><td colspan="3">Design system — spoločný základ</td></tr>
              <tr><td class="it">Design system</td><td class="de">Jednotný vizuálny systém, komponenty, typografia – podľa brand manuálu</td><td class="pr">900 €</td></tr>
              <tr><td class="it">Webflow template</td><td class="de">Hlavný template (reusable sekcie, symboly) pre všetky 4 weby</td><td class="pr">700 €</td></tr>
              <tr class="gr"><td colspan="3">1 · Tesla Energy Group</td></tr>
              <tr><td class="it">Web design &amp; dev</td><td class="de">Redesign a vývoj webu, responsívny dizajn, on-page SEO</td><td class="pr">2 000 €</td></tr>
              <tr><td class="it">CMS – blog &amp; referencie</td><td class="de">CMS kolekcie pre blog a realizované projekty</td><td class="pr">400 €</td></tr>
              <tr><td class="it">CMS – produkty</td><td class="de">Produktové portfólio s parametrami a filtrovaním</td><td class="pr">400 €</td></tr>
              <tr><td class="it">Lokalizácia – setup</td><td class="de">Technické nastavenie CZ/EN/PL + príprava pre HU/DE/HR</td><td class="pr">200 €</td></tr>
              <tr><td class="it">AI/SEO štruktúra</td><td class="de">Schema markup, structured data, sémantické HTML</td><td class="pr">200 €</td></tr>
              <tr class="gr"><td colspan="3">2 · Tesla Energy Holding</td></tr>
              <tr><td class="it">Web design &amp; dev</td><td class="de">Vizitkový web holdingu, prezentácia firiem, navigácia</td><td class="pr">900 €</td></tr>
              <tr><td class="it">Lokalizácia – setup</td><td class="de">Nastavenie lokalizačnej platformy CZ/EN/PL</td><td class="pr">200 €</td></tr>
              <tr><td class="it">AI/SEO štruktúra</td><td class="de">Schema markup, structured data, sémantické HTML</td><td class="pr">200 €</td></tr>
              <tr class="gr"><td colspan="3">3 · Tesla Transformátory</td></tr>
              <tr><td class="it">Web design &amp; dev</td><td class="de">Produktový web s kategóriami, PDF download centrum</td><td class="pr">1 600 €</td></tr>
              <tr><td class="it">CMS – produkty</td><td class="de">Filtrovateľné portfólio transformátorov podľa kategórií</td><td class="pr">500 €</td></tr>
              <tr><td class="it">Lokalizácia – setup</td><td class="de">Nastavenie lokalizačnej platformy CZ/EN</td><td class="pr">200 €</td></tr>
              <tr><td class="it">AI/SEO štruktúra</td><td class="de">Schema markup, structured data, sémantické HTML</td><td class="pr">200 €</td></tr>
              <tr class="gr"><td colspan="3">4 · Tesla Liptovský Hrádok</td></tr>
              <tr><td class="it">Adaptácia do DS</td><td class="de">Migrácia obsahu z teslalh.eu, zapracovanie do jednotného dizajnu</td><td class="pr">900 €</td></tr>
              <tr><td class="it">Lokalizácia – setup</td><td class="de">Nastavenie lokalizačnej platformy SK/CZ/EN/DE</td><td class="pr">200 €</td></tr>
              <tr><td class="it">AI/SEO štruktúra</td><td class="de">Schema markup, structured data, sémantické HTML</td><td class="pr">200 €</td></tr>
              <tr class="gr"><td colspan="3">Spoločné položky</td></tr>
              <tr><td class="it">WCAG 2.1 AA</td><td class="de">Accessibility audit a opravy pre všetky weby</td><td class="pr">300 €</td></tr>
              <tr><td class="it">Performance</td><td class="de">Core Web Vitals, lazy loading, optimalizácia obrázkov</td><td class="pr">200 €</td></tr>
              <tr><td class="it">Cookie consent</td><td class="de">Implementácia pre všetky weby</td><td class="pr">100 €</td></tr>
              <tr><td class="it">Testovanie &amp; QA</td><td class="de">Cross-browser, cross-device testovanie pred spustením</td><td class="pr">200 €</td></tr>
              <tr><td class="it">Dokumentácia</td><td class="de">Návod na správu CMS, Loom video walkthrough</td><td class="pr">100 €</td></tr>
              <tr class="tot"><td colspan="2"><strong>CELKOM vývojové práce (bez DPH)</strong></td><td><strong>11 200 €</strong></td></tr>
            </tbody>
          </table>
        </div>
        <div class="disc">
          <div class="disc-l">
            <div class="disc-lbl">Zľava pre existujúceho klienta — 8 %</div>
            <div class="disc-nm">Tesla Energy Holding · doterajšia spolupráca</div>
          </div>
          <div class="disc-r">
            <div class="disc-sm">Celková cena po zľave</div>
            <div class="disc-amt">10 304 €<span>bez DPH</span></div>
          </div>
        </div>
        <div class="note"><strong>Poznámka:</strong> Cena za <em>Lokalizácia – setup</em> zahŕňa technickú implementáciu (lokály, locale switcher, prepojenie CMS). Nezahŕňa preklad textov ani mesačné poplatky za platformu.</div>
      </div>
    </div>

    <div class="section fade-up" id="loc">
      <div class="sec-eyebrow">03 — Ongoing náklady</div>
      <div class="sec-title">Jazykové mutácie — platforma<span class="dot">.</span></div>
      <div class="card">
        <p class="muted-p">Tieto náklady idú priamo od poskytovateľa klientovi — nie cez mňa. Dve odporúčané možnosti:</p>
        <div class="loc-grid">
          <div class="loc-opt rec">
            <div class="loc-hdr"><span class="loc-badge">Odporúčam</span><span class="loc-nm"><img src="https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg" width="14" height="14" style="vertical-align:middle;margin-right:5px;filter:brightness(0) invert(1)">Webflow Localization</span></div>
            <div class="loc-body">
              <div class="loc-row"><span class="lk">Model platby</span><span class="lv good">$9 / locale / mes. (Basic)</span></div>
              <div class="loc-row"><span class="lk">Preklady žijú</span><span class="lv good">vo Webflow</span></div>
              <div class="loc-row"><span class="lk">Vlastníctvo</span><span class="lv warn">Len počas platného plánu</span></div>
              <div class="loc-row"><span class="lk">SEO (hreflang)</span><span class="lv warn">Nie je v Basic pláne</span></div>
              <div class="loc-row"><span class="lk">Správa</span><span class="lv">V Webflow Designeri</span></div>
            </div>
          </div>
          <div class="loc-opt alt">
            <div class="loc-hdr"><span class="loc-badge">Alternatíva</span><span class="loc-nm">Weglot</span></div>
            <div class="loc-body">
              <div class="loc-row"><span class="lk">Model platby</span><span class="lv warn">Per word count</span></div>
              <div class="loc-row"><span class="lk">Preklady žijú</span><span class="lv warn">Servery Weglot</span></div>
              <div class="loc-row"><span class="lk">Vlastníctvo</span><span class="lv warn">Strata pri zrušení</span></div>
              <div class="loc-row"><span class="lk">SEO (hreflang)</span><span class="lv">Automatické</span></div>
              <div class="loc-row"><span class="lk">Správa</span><span class="lv">Externý dashboard</span></div>
            </div>
          </div>
        </div>
        <div class="tbl-wrap">
          <table>
            <thead><tr><th>Web</th><th>Jazyky</th><th>Lok.</th><th class="gh">WF Localize</th><th class="oh">Weglot</th></tr></thead>
            <tbody>
              <tr><td>Tesla Energy Group</td><td class="cn">CZ, EN, PL</td><td class="cn">3</td><td class="g">~$27/mes.</td><td class="o">~$32–87/mes.</td></tr>
              <tr><td>Tesla Energy Holding</td><td class="cn">CZ, EN, PL</td><td class="cn">3</td><td class="g">~$27/mes.</td><td class="o">~$32/mes.</td></tr>
              <tr><td>Tesla Transformátory</td><td class="cn">CZ, EN</td><td class="cn">2</td><td class="g">~$18/mes.</td><td class="o">~$17–32/mes.</td></tr>
              <tr><td>Tesla Liptovský Hrádok</td><td class="cn">SK, CZ, EN, DE</td><td class="cn">4</td><td class="g">~$36/mes.</td><td class="o">~$87/mes.</td></tr>
              <tr class="tot"><td colspan="3"><strong>CELKOM mesačne</strong></td><td class="g" style="font-size:.88rem;font-weight:700">~$108/mes.</td><td class="o" style="font-size:.88rem;font-weight:700">~$168–238/mes.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="rec-note"><strong>Odporúčanie:</strong> Pre tento projekt odporúčam <strong>Webflow Localization Basic</strong> ($9/locale/mes.) — najlacnejšia možnosť, preklady spravované priamo vo Webflow. Bez hreflang SEO tagov – tie sú dostupné až v Advanced pláne. Weglot má hreflang v základe a môže byť výhodnejší ak je SEO pre jazykové verzie priorita.</div>
      </div>
    </div>

    <div class="section fade-up" id="pay">
      <div class="sec-eyebrow">04 — Podmienky</div>
      <div class="sec-title">Platba &amp; harmonogram<span class="dot">.</span></div>
      <div class="card">
        <div class="pay-steps">
          <div class="pay-step"><div class="ps-pct">40 %</div><div class="ps-eur">≈ 4 122 €</div><div class="ps-phase">Záloha</div><div class="ps-desc">Po odsúhlasení ponuky — štart projektu</div></div>
          <div class="pay-step"><div class="ps-pct">30 %</div><div class="ps-eur">≈ 3 091 €</div><div class="ps-phase">Midpoint</div><div class="ps-desc">Po odovzdaní TEG + Holding na review</div></div>
          <div class="pay-step"><div class="ps-pct">30 %</div><div class="ps-eur">≈ 3 091 €</div><div class="ps-phase">Finál</div><div class="ps-desc">Po spustení všetkých 4 webov</div></div>
        </div>
        <div class="tl">
          <div class="tl-item"><div class="tl-n">1</div><div><div class="tl-ttl">Tesla Energy Group</div><div class="tl-dur">5–6 týždňov od schválenia design systému · priorita č. 1</div></div></div>
          <div class="tl-item"><div class="tl-n">2</div><div><div class="tl-ttl">Tesla Energy Holding</div><div class="tl-dur">2–3 týždne · paralelne alebo po TEG</div></div></div>
          <div class="tl-item"><div class="tl-n">3</div><div><div class="tl-ttl">Tesla Transformátory</div><div class="tl-dur">4–5 týždňov</div></div></div>
          <div class="tl-item"><div class="tl-n">4</div><div><div class="tl-ttl">Tesla Liptovský Hrádok</div><div class="tl-dur">3–4 týždne</div></div></div>
          <div class="tl-item"><div class="tl-n s">∑</div><div><div class="tl-ttl">Celková dĺžka projektu</div><div class="tl-dur">cca 14–18 týždňov · závisí od rýchlosti dodania podkladov a feedbacku</div></div></div>
        </div>
      </div>
    </div>

    <div class="section fade-up" id="excl">
      <div class="sec-eyebrow">05 — Transparentnosť</div>
      <div class="sec-title">Čo nie je zahrnuté<span class="dot">.</span></div>
      <div class="card">
        <div class="excl-grid">
          <div class="excl-item">Webflow site plán (~$23–39/mes. per web)</div>
          <div class="excl-item">Lokalizačná platforma — Webflow Localize alebo Weglot</div>
          <div class="excl-item">Copywriting / tvorba textov</div>
          <div class="excl-item">Preklad textov do jazykov</div>
          <div class="excl-item">Fotografovanie, ilustrácie, stock foto</div>
          <div class="excl-item">Registrácia a správa domén</div>
          <div class="excl-item">Integrácie tretích strán (HubSpot, CRM…)</div>
          <div class="excl-item">Správa webov po spustení (možný retainer)</div>
        </div>
      </div>
    </div>

    <div class="section fade-up">
      <div class="sec-eyebrow">Dodávateľ</div>
      <div class="sec-title">O mne<span class="dot">.</span></div>
      <div class="card">
        <div class="about-wrap">
          <img class="about-avatar" src="https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg" alt="Erik Hudec">
          <div class="about-body">
            <div class="about-badge"><img src="https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg" width="12" height="12"> Webflow Certified Partner</div>
            <div class="about-name">Erik Hudec</div>
            <div class="about-role">Web Designer &amp; Webflow Developer · Praha</div>
            <p class="about-bio">Navrhujem a vyvíjam weby, ktoré premieňajú návštevníkov na zákazníkov. Špecializujem sa na komplexné Webflow projekty – od CMS architektúry cez GSAP animácie až po multijazyčné riešenia a accessibility.</p>
            <div class="about-prev">
              <div class="about-prev-label">Doterajšia spolupráca s Tesla skupinou</div>
              <div class="about-prev-items">
                <a href="https://enstra.sk" target="_blank" class="about-prev-item"><span class="prev-dot"></span>enstra.sk</a>
                <a href="https://teslaservices.sk" target="_blank" class="about-prev-item"><span class="prev-dot"></span>teslaservices.sk</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fade-up">
      <div class="footer-bar">
        <div><div class="fb-name">Erik Hudec · ehdcDigital</div><div class="fb-role">Webflow Development Studio · Praha</div></div>
        <div>
          <a href="mailto:info@ehdcdigital.com" class="fb-email">info@ehdcdigital.com</a>
          <div class="fb-val">Platnosť ponuky: 30 dní</div>
        </div>
      </div>
    </div>
  </main>
</div>
<script>
  document.getElementById('d').textContent =
    new Date().toLocaleDateString('sk-SK', {day:'numeric',month:'numeric',year:'numeric'});
</script>
</body>
</html>`
