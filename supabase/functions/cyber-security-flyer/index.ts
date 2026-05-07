const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cyber Security Awareness for Business &ndash; Course Flyer</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #e8edf2;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 40px 16px;
  }

  .page {
    width: 794px;
    background: #fff;
    box-shadow: 0 12px 48px rgba(0,0,0,0.18);
    border-radius: 6px;
    overflow: hidden;
  }

  /* ── HEADER ── */
  .header {
    background: linear-gradient(135deg, #07101f 0%, #0c1a38 55%, #0a1830 100%);
    padding: 52px 52px 44px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%);
    pointer-events: none;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -100px; left: 20px;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 65%);
    pointer-events: none;
  }
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }
  .header-inner { position: relative; }
  .header-badge {
    display: inline-block;
    background: rgba(6,182,212,0.12);
    border: 1px solid rgba(6,182,212,0.35);
    color: #67e8f9;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 22px;
  }
  .header h1 {
    font-size: 36px;
    font-weight: 900;
    color: #fff;
    line-height: 1.12;
    max-width: 540px;
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }
  .header h1 em { font-style: normal; color: #22d3ee; }
  .header-desc {
    font-size: 14px;
    color: #8fa3b8;
    max-width: 500px;
    line-height: 1.7;
  }
  .header-meta {
    display: flex;
    gap: 12px;
    margin-top: 30px;
    flex-wrap: wrap;
  }
  .meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.11);
    padding: 7px 16px;
    border-radius: 100px;
    font-size: 12px;
    color: #b8cce0;
    font-weight: 500;
  }

  /* ── ACCENT BAR ── */
  .accent-bar {
    height: 4px;
    background: linear-gradient(90deg, #0369a1, #0891b2, #06b6d4, #22d3ee, #67e8f9);
  }

  /* ── BODY ── */
  .body { padding: 48px 52px 40px; }

  .section-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #0891b2;
    margin-bottom: 6px;
  }
  h2 {
    font-size: 17px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 18px;
    letter-spacing: -0.01em;
  }

  /* TWO-COL */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }

  /* OUTCOMES */
  .outcomes-list { list-style: none; display: flex; flex-direction: column; gap: 11px; }
  .outcomes-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 12.5px;
    color: #334155;
    line-height: 1.55;
  }
  .check-wrap {
    width: 18px; height: 18px;
    background: #ecfeff;
    border: 1.5px solid #06b6d4;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  /* AUDIENCE */
  .audience-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .audience-list li {
    font-size: 12.5px;
    color: #334155;
    background: #f8fafc;
    border-left: 3px solid #06b6d4;
    padding: 9px 13px;
    border-radius: 0 6px 6px 0;
    line-height: 1.45;
  }

  /* MODULES */
  .modules-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 40px;
  }
  .module-card {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 14px 15px;
    border-radius: 8px;
  }
  .mod-num {
    width: 26px; height: 26px;
    background: linear-gradient(135deg, #0369a1, #06b6d4);
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .module-card p { font-size: 12px; color: #1e293b; font-weight: 500; line-height: 1.5; }

  /* STATS STRIP */
  .stats-strip {
    background: linear-gradient(135deg, #07101f 0%, #0c1a38 100%);
    border-radius: 10px;
    padding: 26px 32px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
  }
  .stats-strip::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px);
    background-size: 24px 24px;
    pointer-events: none;
  }
  .stat-item { text-align: center; position: relative; }
  .stat-val {
    font-size: 24px;
    font-weight: 900;
    color: #22d3ee;
    line-height: 1;
    margin-bottom: 5px;
  }
  .stat-lbl {
    font-size: 11px;
    color: #7a9ab5;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  .stat-divider {
    position: absolute;
    right: 0; top: 10%; bottom: 10%;
    width: 1px;
    background: rgba(255,255,255,0.08);
  }

  /* FOOTER */
  .footer {
    background: #f1f5f9;
    border-top: 1px solid #e2e8f0;
    padding: 22px 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .footer-brand { font-size: 15px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
  .footer-brand em { font-style: normal; color: #0891b2; }
  .footer-sub { font-size: 11.5px; color: #64748b; margin-top: 3px; }
  .enrol-btn {
    background: linear-gradient(135deg, #0369a1, #0891b2);
    color: #fff;
    font-size: 12.5px;
    font-weight: 700;
    padding: 11px 24px;
    border-radius: 8px;
    text-decoration: none;
    letter-spacing: 0.02em;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(6,182,212,0.3);
  }
  .footer-contact { font-size: 11.5px; color: #64748b; text-align: right; line-height: 1.6; }

  @media print {
    body { background: #fff; padding: 0; }
    .page { box-shadow: none; border-radius: 0; width: 100%; }
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="grid-overlay"></div>
    <div class="header-inner">
      <div class="header-badge">Digital &amp; Cyber Security</div>
      <h1>Cyber Security <em>Awareness</em><br>for Business</h1>
      <p class="header-desc">Protect your organisation from today&rsquo;s most common cyber threats. Practical, plain-language training aligned with the ASD Essential Eight framework.</p>
      <div class="header-meta">
        <span class="meta-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          4 Hours
        </span>
        <span class="meta-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          Online &amp; Flexible
        </span>
        <span class="meta-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Certificate Issued
        </span>
        <span class="meta-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          ASD Essential Eight
        </span>
      </div>
    </div>
  </div>

  <div class="accent-bar"></div>

  <div class="body">

    <div class="two-col">
      <div>
        <div class="section-eyebrow">Learning Outcomes</div>
        <h2>What You&rsquo;ll Learn</h2>
        <ul class="outcomes-list">
          <li>
            <span class="check-wrap">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            Identify common cyber threats including phishing, ransomware and social engineering
          </li>
          <li>
            <span class="check-wrap">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            Apply safe password, device and network practices across your organisation
          </li>
          <li>
            <span class="check-wrap">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            Respond appropriately to a suspected security incident or data breach
          </li>
          <li>
            <span class="check-wrap">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            Understand your obligations under the Australian Privacy Act 1988
          </li>
          <li>
            <span class="check-wrap">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            Apply the ASD Essential Eight mitigation strategies in practice
          </li>
        </ul>
      </div>
      <div>
        <div class="section-eyebrow">Audience</div>
        <h2>Who Is This For?</h2>
        <ul class="audience-list">
          <li>Business owners and managers responsible for IT decisions</li>
          <li>Office staff who handle sensitive data or customer information</li>
          <li>Remote and hybrid workers accessing company systems</li>
          <li>HR and finance teams targeted by social engineering</li>
          <li>Any employee required to complete mandatory cyber training</li>
        </ul>
      </div>
    </div>

    <div class="section-eyebrow">Course Content</div>
    <h2>What&rsquo;s Covered</h2>
    <div class="modules-grid">
      <div class="module-card">
        <div class="mod-num">1</div>
        <p>The Cyber Threat Landscape &ndash; phishing, ransomware, BEC and social engineering</p>
      </div>
      <div class="module-card">
        <div class="mod-num">2</div>
        <p>Password Security and Multi-Factor Authentication best practices</p>
      </div>
      <div class="module-card">
        <div class="mod-num">3</div>
        <p>Safe Browsing, Email and Device Hygiene in the workplace</p>
      </div>
      <div class="module-card">
        <div class="mod-num">4</div>
        <p>Data Classification and Handling sensitive business information</p>
      </div>
      <div class="module-card">
        <div class="mod-num">5</div>
        <p>Incident Response &ndash; what to do when something goes wrong</p>
      </div>
      <div class="module-card">
        <div class="mod-num">6</div>
        <p>ASD Essential Eight and your legal obligations under Australian law</p>
      </div>
    </div>

    <div class="stats-strip">
      <div class="stat-item">
        <div class="stat-val">4 hrs</div>
        <div class="stat-lbl">Flexible online learning</div>
        <div class="stat-divider"></div>
      </div>
      <div class="stat-item">
        <div class="stat-val">6</div>
        <div class="stat-lbl">Practical modules</div>
        <div class="stat-divider"></div>
      </div>
      <div class="stat-item">
        <div class="stat-val">ASD E8</div>
        <div class="stat-lbl">Framework aligned</div>
        <div class="stat-divider"></div>
      </div>
      <div class="stat-item">
        <div class="stat-val">100%</div>
        <div class="stat-lbl">Online &amp; self-paced</div>
      </div>
    </div>

  </div>

  <div class="footer">
    <div>
      <div class="footer-brand">Skill<em>Edge</em> Training</div>
      <div class="footer-sub">contact@skilledge.com.au &nbsp;&bull;&nbsp; 1300 000 000 &nbsp;&bull;&nbsp; www.skilledge.com.au</div>
    </div>
    <a class="enrol-btn" href="#">Contact Us for a Quote</a>
  </div>

</div>
</body>
</html>`;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SB_SECRET_KEY = Deno.env.get("SB_SECRET_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const STORAGE_PATH = "cyber-security-awareness.html";
const BUCKET = "flyers";

async function ensureFileUploaded() {
  const key = SB_SECRET_KEY || SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !key) {
    throw new Error("Missing SUPABASE_URL or SB_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY");
  }

  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${STORAGE_PATH}`;
  const headers = new Headers({
    "Content-Type": "text/html",
    "x-upsert": "true",
  });

  if (key.startsWith("sb_secret_")) {
    headers.set("apikey", key);
  } else {
    headers.set("Authorization", `Bearer ${key}`);
  }

  const res = await fetch(uploadUrl, {
    method: "POST",
    headers,
    body: HTML,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed ${res.status}: ${text}`);
  }
}

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    await ensureFileUploaded();
    return new Response(
      JSON.stringify({
        path: STORAGE_PATH,
        publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${STORAGE_PATH}`,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
