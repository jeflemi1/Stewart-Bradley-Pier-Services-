const SIGNUP_ENDPOINT='https://script.google.com/macros/s/AKfycbx_HSZyOC1ATM64M0V8L_706xT2efA7UctGnkBFNXQgd9WCI9_O9CAoccgHB6TkigK3gQ/exec';
const header=document.querySelector('.site-header');const toggle=document.querySelector('.nav-toggle');const nav=document.querySelector('.nav');const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>28);updateHeader();addEventListener('scroll',updateHeader,{passive:true});toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('open',!open)});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));document.querySelectorAll('[data-compare]').forEach(box=>{const range=box.querySelector('.compare-range');const before=box.querySelector('[data-before]');const line=box.querySelector('[data-line]');const set=()=>{const v=range.value;before.style.width=v+'%';line.style.left=v+'%'};range.addEventListener('input',set);set()});const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.getElementById('year').textContent=new Date().getFullYear();

(function(){
  var form=document.getElementById('checklist-form');
  if(!form) return;
  var placeholder=SIGNUP_ENDPOINT==='REPLACE_WITH_APPS_SCRIPT_EXEC_URL';
  var error=document.getElementById('checklist-error');
  form.addEventListener('submit',function(event){
    event.preventDefault();
    var email=(form.email.value||'').trim();
    var name=(form.name.value||'').trim();
    var website=(form.website.value||'').trim();
    var reminders=form.reminders.checked?'Y':'N';
    var valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!valid){
      if(error) error.hidden=false;
      form.email.focus();
      return;
    }
    if(error) error.hidden=true;
    if(!website&&!placeholder){
      var body=new URLSearchParams();
      body.set('email',email);
      body.set('name',name);
      body.set('reminders',reminders);
      body.set('source',location.pathname);
      body.set('website',website);
      fetch(SIGNUP_ENDPOINT,{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:body.toString()
      }).catch(function(){});
    }
    var thanks=document.createElement('div');
    thanks.className='checklist-thanks';
    thanks.setAttribute('role','status');
    thanks.innerHTML='<p>Thank you. Your Pier Care Checklist is ready.</p><p><a href="/downloads/pier-care-checklist.pdf">Download the Pier Care Checklist (PDF)</a></p>';
    form.replaceWith(thanks);
    var link=thanks.querySelector('a');
    if(link) link.focus();
  });
})();
