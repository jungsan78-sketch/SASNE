function initReveal(){
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || targets.length === 0) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});

  targets.forEach(el=>io.observe(el));
}

function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initReveal();
  setActiveNav();
  populateYouTubeTitles();
  });
async function populateYouTubeTitles(){
  const cards = document.querySelectorAll("[data-yt]");
  if (!cards.length) return;

  const fetchTitle = async (id) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(id)}&format=json`;
    const res = await fetch(url, {mode:"cors"});
    if (!res.ok) throw new Error("oembed failed");
    const data = await res.json();
    return data.title;
  };

  await Promise.all(Array.from(cards).map(async (el)=>{
    const id = el.getAttribute("data-yt");
    const titleEl = el.querySelector(".yt-title");
    if (!id || !titleEl) return;
    try{
      const t = await fetchTitle(id);
      titleEl.textContent = t;
    }catch(_e){
      // fallback: keep placeholder
      titleEl.textContent = titleEl.textContent || "YouTube 영상";
    }
  }));
}

document.addEventListener("DOMContentLoaded", ()=>{
  initReveal();
  setActiveNav();
  populateYouTubeTitles();
  });
async function populateYouTubeTitles(){
  const cards = document.querySelectorAll("[data-yt]");
  if (!cards.length) return;

  const fetchTitle = async (id) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(id)}&format=json`;
    const res = await fetch(url, {mode:"cors"});
    if (!res.ok) throw new Error("oembed failed");
    const data = await res.json();
    return data.title;
  };

  await Promise.all(Array.from(cards).map(async (el)=>{
    const id = el.getAttribute("data-yt");
    const titleEl = el.querySelector(".yt-title");
    if (!id || !titleEl) return;
    try{
      const t = await fetchTitle(id);
      titleEl.textContent = t;
    }catch(_e){
      titleEl.textContent = titleEl.textContent || "YouTube 영상";
    }
  }));
}

function formatViews(n){
  if (n == null || isNaN(n)) return null;
  const num = Number(n);
  if (num >= 100000000) return (num/100000000).toFixed(1).replace(/\.0$/,'') + "억";
  if (num >= 10000) return (num/10000).toFixed(1).replace(/\.0$/,'') + "만";
  if (num >= 1000) return (num/1000).toFixed(1).replace(/\.0$/,'') + "천";
  return String(num);
}
function formatDuration(sec){
  if (sec == null || isNaN(sec)) return null;
  sec = Math.max(0, Math.floor(Number(sec)));
  const h = Math.floor(sec/3600);
  const m = Math.floor((sec%3600)/60);
  const s = sec%60;
  const mm = String(m).padStart(2,'0');
  const ss = String(s).padStart(2,'0');
  return h>0 ? `${h}:${mm}:${ss}` : `${m}:${ss.padStart(2,'0')}`;
}

async function populateYouTubeStats(){
  const cards = document.querySelectorAll("[data-yt]");
  if (!cards.length) return;

  const fetchStats = async (id) => {
    // Best-effort: Piped API (no key). If blocked, we'll gracefully hide stats.
    const url = `https://piped.video/api/v1/videos/${encodeURIComponent(id)}`;
    const res = await fetch(url, {mode:"cors"});
    if (!res.ok) throw new Error("piped failed");
    const data = await res.json();
    return { views: data.views, duration: data.duration };
  };

  await Promise.all(Array.from(cards).map(async (el)=>{
    const id = el.getAttribute("data-yt");
    const viewsEl = el.querySelector("[data-views]");
    const durEl = el.querySelector("[data-duration]");
    if (!id || !viewsEl || !durEl) return;

    try{
      const st = await fetchStats(id);
      const v = formatViews(st.views);
      const d = formatDuration(st.duration);
      if (v) viewsEl.textContent = "조회수 " + v;
      if (d) durEl.textContent = d;
      el.classList.add("has-stats");
    }catch(_e){
      // fallback: show minimal hint
      viewsEl.textContent = "YouTube에서 확인";
      durEl.textContent = "";
    }
  }));
}

document.addEventListener("DOMContentLoaded", ()=>{
  initReveal();
  setActiveNav();
  populateYouTubeTitles();
  });
