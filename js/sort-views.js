(function(){
  function parseViews(text){
    if(!text) return 0;
    // Expect formats like: "조회수 9만", "조회수 1.5만", "조회수 1200", "조회수 3천", "조회수 2억"
    const t = String(text).replace(/\s+/g,'').replace(/조회수/,'');
    const m = t.match(/([0-9]+(?:\.[0-9]+)?)(억|만|천)?/);
    if(!m) return 0;
    const num = parseFloat(m[1]);
    const unit = m[2] || '';
    if(unit === '억') return Math.round(num * 100000000);
    if(unit === '만') return Math.round(num * 10000);
    if(unit === '천') return Math.round(num * 1000);
    return Math.round(num);
  }

  function getCardViews(card){
    // Prefer explicit data-views, otherwise parse from pill text.
    const dv = card.getAttribute('data-views');
    if(dv && !isNaN(Number(dv))) return Number(dv);
    const pill = card.querySelector('.workstats .pill.muted') || card.querySelector('.pill.muted') || card.querySelector('[data-views]');
    if(!pill) return 0;
    return parseViews(pill.textContent);
  }

  function sortGrid(grid){
    const cards = Array.from(grid.querySelectorAll(':scope > .workcard'));
    if(cards.length < 2) return;
    cards.sort((a,b)=>{
      const vb = getCardViews(b);
      const va = getCardViews(a);
      if(vb !== va) return vb - va;
      // Tie-breaker: keep original order (stable sort fallback)
      return 0;
    });
    cards.forEach(c=>grid.appendChild(c));
  }

  function run(){
    document.querySelectorAll('.section .grid').forEach(sortGrid);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();