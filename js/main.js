document.querySelectorAll('[data-year]').forEach((el)=>{el.textContent=new Date().getFullYear()});

const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.navlinks');
if(menuButton&&menu){
  menuButton.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.textContent=open?'CLOSE':'MENU';
  });
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'&&menu.classList.contains('open')){
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.textContent='MENU';
      menuButton.focus();
    }
  });
}

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    });
  },{threshold:.12});
  revealItems.forEach((item)=>observer.observe(item));
}else{revealItems.forEach((item)=>item.classList.add('is-visible'))}
