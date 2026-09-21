/* ============================================================
   Digital Allies — Site JS
   Nav toggle + the six working tool mini-apps.
   Each init no-ops if its root element isn't on the page.
   ============================================================ */
(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
  function el(tag,cls,html){var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e;}
  function money(n){return '$'+Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
  function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem('da_'+k)); localStorage.setItem('da_'+k,JSON.stringify(v));}catch(e){return null;}}

  /* shared toast ------------------------------------------------*/
  var toastEl;
  function toast(msg){
    if(!toastEl){toastEl=el('div','toast'); document.body.appendChild(toastEl);}
    toastEl.innerHTML='<span class="signal-dot" style="background:#3A7BD5"></span>'+msg;
    toastEl.classList.add('show');
    clearTimeout(toast._t); toast._t=setTimeout(function(){toastEl.classList.remove('show');},2200);
  }

  /* EN/ES language toggle --------------------------------------*/
  function initLang(){
    var btns=$$('[data-lang-btn]'); if(!btns.length) return;
    var cur=store('lang')||'en';
    function apply(l){
      cur=l; store('lang',l);
      $$('[data-en]').forEach(function(n){ n.textContent = l==='es' ? (n.getAttribute('data-es')||n.getAttribute('data-en')) : n.getAttribute('data-en'); });
      btns.forEach(function(b){ b.classList.toggle('is-current', b.getAttribute('data-lang-btn')===l); });
    }
    btns.forEach(function(b){ b.addEventListener('click',function(){apply(b.getAttribute('data-lang-btn'));}); });
    apply(cur);
  }

  /* ===== 1 · AUDIT ===========================================*/
  function initAudit(){
    var root=$('#audit-app'); if(!root) return;
    var form=$('#audit-form',root), out=$('#audit-report',root);
    var labels={meta:'Meta tags & titles',alt:'Image alt text',head:'Heading structure',
      schema:'Schema markup',links:'Internal links',perf:'Performance (Core Web Vitals)'};
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var url=$('#audit-url',root).value||'your site';
      var picks=$$('input[name=scope]:checked',root).map(function(c){return c.value;});
      if(!picks.length){toast('Pick at least one thing to check.');return;}
      // deterministic-ish pseudo scores from url length so reruns feel stable
      var seed=url.length;
      var results=picks.map(function(k,i){
        var r=(seed*7+i*13)%10;
        var state = r<2?'warn':(r<5?'ok':'pass');
        return {k:k,label:labels[k],state:state};
      });
      var passes=results.filter(function(r){return r.state==='pass';}).length;
      var score=Math.round(40+ (passes/results.length)*55 + (seed%6));
      if(score>99)score=99;
      out.innerHTML='';
      var sc=el('div','score');
      sc.innerHTML='<div><div class="score__num">'+score+'</div>'+
        '<div class="mono" style="font-size:.66rem;letter-spacing:.08em;opacity:.6;text-transform:uppercase">Audit score</div></div>'+
        '<div class="gauge"><div class="bar"><i></i></div>'+
        '<div class="mono" style="font-size:.68rem;opacity:.65;margin-top:.5rem">Scanned '+results.length+' checks for <b>'+url+'</b></div></div>';
      out.appendChild(sc);
      var list=el('div','checklist');
      results.forEach(function(r){
        var icon = r.state==='pass'
          ? '<svg viewBox="0 0 18 18" class="ic"><path d="M4 9.5l3 3 7-7.5" fill="none" stroke="#1f6e6e" stroke-width="1.6"/></svg>'
          : r.state==='ok'
          ? '<svg viewBox="0 0 18 18" class="ic"><circle cx="9" cy="9" r="6.4" fill="none" stroke="#3A7BD5" stroke-width="1.5"/></svg>'
          : '<svg viewBox="0 0 18 18" class="ic"><path d="M9 3l6.5 12H2.5z" fill="none" stroke="#C5301A" stroke-width="1.5" stroke-linejoin="round"/><line x1="9" y1="8" x2="9" y2="11.5" stroke="#C5301A" stroke-width="1.5"/></svg>';
        var st = r.state==='pass'?'Pass':(r.state==='ok'?'Minor':'Fix needed');
        var row=el('div','ck '+r.state, icon+'<span class="ttl">'+r.label+'</span><span class="st">'+st+'</span>');
        list.appendChild(row);
      });
      out.appendChild(list);
      var note=el('p','hint','Note: this is a client-side simulation. The live tool runs a full crawl of your URL.');
      note.style.marginTop='1rem';
      out.appendChild(note);
      out.classList.add('show');
      setTimeout(function(){var b=$('.bar i',out); if(b)b.style.width=score+'%';},80);
      out.scrollTop=0;
    });
  }

  /* ===== 2 · CMS =============================================*/
  function initCms(){
    var root=$('#cms-app'); if(!root) return;
    var panes={pages:$('#cms-pages',root),media:$('#cms-media',root),settings:$('#cms-settings',root)};
    $$('.cms-side a',root).forEach(function(a){
      a.addEventListener('click',function(e){e.preventDefault();
        $$('.cms-side a',root).forEach(function(x){x.classList.remove('active');});
        a.classList.add('active');
        var k=a.getAttribute('data-pane');
        for(var p in panes){if(panes[p])panes[p].style.display=(p===k?'block':'none');}
      });
    });
    // toggle publish/draft
    root.addEventListener('click',function(e){
      var b=e.target.closest('[data-toggle-pub]'); if(!b) return;
      var badge=b.querySelector('.badge')||b;
      var pub=badge.classList.contains('pub');
      badge.classList.toggle('pub',!pub); badge.classList.toggle('draft',pub);
      badge.textContent=pub?'Draft':'Published';
      toast(pub?'Moved to draft.':'Page published — live now.');
    });
    var addBtn=$('#cms-new',root), list=$('#cms-list',root), n=4;
    if(addBtn) addBtn.addEventListener('click',function(){
      n++;
      var row=el('div','cms-row');
      row.innerHTML='<span class="nm" contenteditable="true">Untitled page '+n+'</span>'+
        '<button class="badge draft" data-toggle-pub style="cursor:pointer;background:none">Draft</button>'+
        '<span class="mt">just now</span>';
      list.insertBefore(row,list.firstChild);
      toast('New page created. Click the title to rename.');
    });
  }

  /* ===== 3 · MANUSCRIPT ======================================*/
  function initMs(){
    var root=$('#ms-app'); if(!root) return;
    // tabs
    $$('.tab',root).forEach(function(t){
      t.addEventListener('click',function(){
        $$('.tab',root).forEach(function(x){x.classList.remove('active');});
        $$('.pane',root).forEach(function(x){x.classList.remove('active');});
        t.classList.add('active');
        $('#'+t.getAttribute('data-tab'),root).classList.add('active');
      });
    });
    // autosave
    var body=$('#ms-body',root), title=$('#ms-title',root), saved=$('#ms-saved',root);
    var stored=store('ms_doc')||{};
    if(stored.title&&title)title.value=stored.title;
    if(stored.body&&body)body.value=stored.body;
    function save(){ store('ms_doc',{title:title.value,body:body.value}); if(saved){saved.textContent='Saved · '+new Date().toLocaleTimeString();} }
    [title,body].forEach(function(n){ if(n){var t; n.addEventListener('input',function(){clearTimeout(t);t=setTimeout(save,500);});}});
    // version snapshots
    var vBtn=$('#ms-snap',root), vList=$('#ms-versions',root);
    var versions=store('ms_versions')||[];
    function renderVersions(){
      if(!vList)return; vList.innerHTML='';
      if(!versions.length){vList.innerHTML='<p class="hint">No snapshots yet. Create one to lock a moment in time.</p>';return;}
      versions.slice().reverse().forEach(function(v,i){
        var n=versions.length-i;
        vList.appendChild(el('div','cms-row','<span class="nm">v'+n+' · '+(v.title||'Untitled')+'</span><span class="mt">'+v.when+'</span>'));
      });
    }
    renderVersions();
    if(vBtn)vBtn.addEventListener('click',function(){
      versions.push({title:title.value||'Untitled',when:new Date().toLocaleString()});
      store('ms_versions',versions); renderVersions(); toast('Version snapshot saved.');
    });
    // glossary
    var gForm=$('#ms-gloss-form',root), gList=$('#ms-gloss-list',root), recent=$('#ms-recent',root);
    var gloss=store('ms_gloss')||[];
    function renderGloss(){
      if(gList){gList.innerHTML=''; gloss.forEach(function(g){
        gList.appendChild(el('div','cms-row','<span class="nm">'+g.term+'</span><span class="mt" style="opacity:.8;font-style:italic">'+g.def+'</span>'));
      });}
      if(recent){ recent.innerHTML = gloss.length ? '' : '<p class="hint" style="text-align:center;padding:.8rem">No notes yet.</p>';
        gloss.slice(-4).reverse().forEach(function(g){ recent.appendChild(el('div','task','<span class="nm">'+g.term+'</span><span class="due">glossary</span>')); }); }
    }
    renderGloss();
    if(gForm)gForm.addEventListener('submit',function(e){e.preventDefault();
      var term=$('#ms-term',root).value.trim(), def=$('#ms-def',root).value.trim();
      if(!term){toast('Name the concept first.');return;}
      gloss.push({term:term,def:def||'—'}); store('ms_gloss',gloss); renderGloss();
      gForm.reset(); toast('Added to glossary.');
    });
  }

  /* ===== 4 · DISCOVERY =======================================*/
  function initDisc(){
    var root=$('#disc-app'); if(!root) return;
    var palettes={
      Pulse:['#3A7BD5','#2D2D2D','#F9F6F0','#FADEEB'],
      Signal:['#C5301A','#2D2D2D','#F9F6F0','#FCFAED'],
      Forest:['#1f6e6e','#22311f','#F4F1E8','#D8E0C8'],
      Dusk:['#5b4b8a','#2b2740','#F6F2EE','#E9D8C5']
    };
    var name=$('#disc-name',root), font=$('#disc-font',root), board=$('#disc-board',root);
    var chosen='Pulse';
    var sw=$('#disc-swatches',root);
    Object.keys(palettes).forEach(function(p,i){
      var s=el('span','sw'+(i===0?' active':'')); s.style.background=palettes[p][0];
      s.title=p; s.setAttribute('data-pal',p); sw.appendChild(s);
    });
    sw.addEventListener('click',function(e){var t=e.target.closest('.sw'); if(!t)return;
      $$('.sw',sw).forEach(function(x){x.classList.remove('active');}); t.classList.add('active');
      chosen=t.getAttribute('data-pal'); render();});
    function render(){
      var pal=palettes[chosen]; var nm=name.value||'Your Brand'; var ff=font.value;
      board.innerHTML=
        '<div class="bb" style="grid-column:span 2"><h4>Logo lockup</h4>'+
          '<div style="display:flex;align-items:center;gap:.6rem"><span style="width:14px;height:14px;border-radius:50%;border:1px solid #2D2D2D;background:'+pal[0]+'"></span>'+
          '<b style="font-family:'+ff+';font-size:1.3rem;letter-spacing:-.01em">'+nm+'</b></div></div>'+
        '<div class="bb"><h4>Palette</h4><div class="swatches">'+pal.map(function(c){return '<span class="sw" style="background:'+c+';cursor:default"></span>';}).join('')+'</div></div>'+
        '<div class="bb"><h4>Type</h4><div style="font-family:'+ff+'"><div style="font-size:1.4rem;font-weight:700">Aa</div><div style="font-size:.72rem;opacity:.7">'+(font.options[font.selectedIndex].text)+'</div></div></div>'+
        '<div class="bb" style="grid-column:span 2;background:'+pal[1]+';color:'+pal[2]+'"><h4 style="color:'+pal[2]+';opacity:.7">Brand voice</h4>'+
          '<div style="font-family:'+ff+';font-size:1rem">"'+nm+' — built for people with better things to do."</div></div>';
    }
    [name,font].forEach(function(n){n.addEventListener('input',render);});
    $('#disc-gen',root).addEventListener('click',function(){render();toast('Brand board generated.');});
    render();
  }

  /* ===== 5 · LEDGER ==========================================*/
  function initLedger(){
    var root=$('#ledger-app'); if(!root) return;
    // tasks
    var tList=$('#led-tasks',root), tAdd=$('#led-task-add',root), tIn=$('#led-task-in',root);
    var tasks=store('led_tasks')||[
      {nm:'Dish Soap',due:'Due Oct 22',done:false},
      {nm:'Olive Oil',due:'Due Oct 25',done:false},
      {nm:'Coffee Filters',due:'Completed',done:true}
    ];
    function renderTasks(){tList.innerHTML=''; tasks.forEach(function(t,i){
      var r=el('div','task'+(t.done?' done':''));
      r.innerHTML='<input type="checkbox"'+(t.done?' checked':'')+'><span class="nm">'+t.nm+'</span><span class="due">'+t.due+'</span>';
      r.querySelector('input').addEventListener('change',function(){tasks[i].done=this.checked; tasks[i].due=this.checked?'Completed':'No due date'; store('led_tasks',tasks); renderTasks();});
      tList.appendChild(r);
    });}
    renderTasks();
    if(tAdd)tAdd.addEventListener('click',function(){var v=tIn.value.trim(); if(!v)return;
      tasks.push({nm:v,due:'No due date',done:false}); store('led_tasks',tasks); tIn.value=''; renderTasks();});
    if(tIn)tIn.addEventListener('keydown',function(e){if(e.key==='Enter')tAdd.click();});
    // expenses
    var eBody=$('#led-exp',root), eTotal=$('#led-total',root), eAdd=$('#led-exp-add',root);
    var exp=store('led_exp')||[
      {d:'2023-10-15',desc:'PGE Bill (Oct)',cat:'Utilities',who:'Sarah',amt:245.50},
      {d:'2023-10-18',desc:'Costco Run',cat:'Groceries',who:'Mike',amt:189.20},
      {d:'2023-10-20',desc:'Plumber Repair',cat:'Maintenance',who:'You',amt:150.00}
    ];
    function renderExp(){
      eBody.innerHTML=''; var total=0;
      exp.forEach(function(x){total+=Number(x.amt);
        eBody.appendChild(el('tr',null,
          '<td>'+x.d+'</td><td><b>'+x.desc+'</b><span class="sub">'+x.cat+'</span></td><td>'+x.who+'</td><td class="amt">'+money(x.amt)+'</td>'));
      });
      eTotal.textContent=money(total);
    }
    renderExp();
    if(eAdd)eAdd.addEventListener('click',function(){
      var desc=$('#exp-desc',root).value.trim(), amt=parseFloat($('#exp-amt',root).value), cat=$('#exp-cat',root).value;
      if(!desc||isNaN(amt)){toast('Add a description and amount.');return;}
      exp.push({d:new Date().toISOString().slice(0,10),desc:desc,cat:cat,who:'You',amt:amt});
      store('led_exp',exp); $('#exp-desc',root).value=''; $('#exp-amt',root).value=''; renderExp(); toast('Expense logged.');
    });
    var csv=$('#led-csv',root);
    if(csv)csv.addEventListener('click',function(){
      var rows=[['Date','Description','Category','Paid By','Amount']].concat(exp.map(function(x){return [x.d,x.desc,x.cat,x.who,x.amt];}));
      var txt=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
      var blob=new Blob([txt],{type:'text/csv'}); var a=el('a'); a.href=URL.createObjectURL(blob);
      a.download='expense-ledger.csv'; document.body.appendChild(a); a.click(); a.remove(); toast('CSV exported for your bookkeeper.');
    });
  }

  /* ===== 6 · REFRESH =========================================*/
  function initRefresh(){
    var root=$('#refresh-app'); if(!root) return;
    var steps=$$('.step',root), label=$('#rf-progress',root), cur=0;
    function render(){
      steps.forEach(function(s,i){s.classList.toggle('done',i<cur); s.classList.toggle('active',i===cur);});
      var pct=Math.round((cur/steps.length)*100);
      if(label)label.textContent='Session '+Math.min(cur+1,steps.length)+' of '+steps.length+' · '+pct+'% complete';
    }
    steps.forEach(function(s,i){s.addEventListener('click',function(){cur=(i<=cur?i+1:i); if(cur>steps.length)cur=steps.length; render();});});
    render();
    var done=$('#rf-done',root);
    if(done)done.addEventListener('click',function(){cur=steps.length; render(); toast('Brand-refresh brief assembled.');});
  }

  /* ===== 7 · ACCESSIBILITY GUIDE ==============================*/
  function initA11y(){
    var root=$('#a11y-app'); if(!root) return;
    $$('.tab',root).forEach(function(t){
      t.addEventListener('click',function(){
        $$('.tab',root).forEach(function(x){x.classList.remove('active');});
        $$('.pane',root).forEach(function(x){x.classList.remove('active');});
        t.classList.add('active');
        $('#'+t.getAttribute('data-tab'),root).classList.add('active');
      });
    });
    // contrast checker
    function hexToRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c;}).join('');
      var n=parseInt(h,16); return isNaN(n)?null:{r:(n>>16)&255,g:(n>>8)&255,b:n&255};}
    function lum(c){var a=[c.r,c.g,c.b].map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
      return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2];}
    function ratio(h1,h2){var c1=hexToRgb(h1),c2=hexToRgb(h2); if(!c1||!c2) return null;
      var l1=lum(c1)+0.05,l2=lum(c2)+0.05; return l1>l2?l1/l2:l2/l1;}
    var fgIn=$('#a11y-fg',root), bgIn=$('#a11y-bg',root), out=$('#a11y-result',root), swatch=$('#a11y-swatch',root);
    function runCheck(){
      var fg=fgIn.value.trim(), bg=bgIn.value.trim();
      var r=ratio(fg,bg);
      if(!r){ out.innerHTML='<p class="hint">Enter two valid hex colors (e.g. #2D2D2D and #F9F6F0).</p>'; return; }
      if(swatch){swatch.style.color=fg; swatch.style.background=bg;}
      var rows=[
        {label:'Normal text · AA (4.5:1)', pass:r>=4.5},
        {label:'Normal text · AAA (7:1)', pass:r>=7},
        {label:'Large text · AA (3:1)', pass:r>=3},
        {label:'Large text · AAA (4.5:1)', pass:r>=4.5}
      ];
      out.innerHTML='<div class="score" style="margin-bottom:1rem"><div><div class="score__num">'+r.toFixed(2)+':1</div>'+
        '<div class="mono" style="font-size:.66rem;letter-spacing:.08em;opacity:.6;text-transform:uppercase">Contrast ratio</div></div></div>'+
        '<div class="checklist">'+rows.map(function(row){
          var icon = row.pass
            ? '<svg viewBox="0 0 18 18" class="ic"><path d="M4 9.5l3 3 7-7.5" fill="none" stroke="#1f6e6e" stroke-width="1.6"/></svg>'
            : '<svg viewBox="0 0 18 18" class="ic"><path d="M9 3l6.5 12H2.5z" fill="none" stroke="#C5301A" stroke-width="1.5" stroke-linejoin="round"/><line x1="9" y1="8" x2="9" y2="11.5" stroke="#C5301A" stroke-width="1.5"/></svg>';
          return '<div class="ck '+(row.pass?'pass':'warn')+'">'+icon+'<span class="ttl">'+row.label+'</span><span class="st">'+(row.pass?'Pass':'Fail')+'</span></div>';
        }).join('')+'</div>';
    }
    var btn=$('#a11y-run',root);
    if(btn) btn.addEventListener('click',runCheck);
    if(fgIn&&bgIn) runCheck();
  }

  /* ===== 8 · BOOK DEVELOPMENT SUITE ==========================*/
  function initBook(){
    var root=$('#book-app'); if(!root) return;
    $$('.tab',root).forEach(function(t){
      t.addEventListener('click',function(){
        $$('.tab',root).forEach(function(x){x.classList.remove('active');});
        $$('.pane',root).forEach(function(x){x.classList.remove('active');});
        t.classList.add('active');
        $('#'+t.getAttribute('data-tab'),root).classList.add('active');
      });
    });
    var stages=$$('.step',root), label=$('#book-progress',root), cur=store('book_stage');
    if(cur==null) cur=1;
    function render(){
      stages.forEach(function(s,i){s.classList.toggle('done',i<cur); s.classList.toggle('active',i===cur);});
      if(label) label.textContent='Stage '+Math.min(cur+1,stages.length)+' of '+stages.length;
      store('book_stage',cur);
    }
    stages.forEach(function(s,i){s.addEventListener('click',function(){cur=(i<=cur?i+1:i); if(cur>stages.length)cur=stages.length; render();});});
    render();
    // task checklist per stage
    var chk=$$('#book-tasks input[type=checkbox]',root);
    var done=store('book_tasks')||{};
    chk.forEach(function(c){
      var k=c.getAttribute('data-k'); if(done[k]) c.checked=true;
      c.addEventListener('change',function(){done[k]=c.checked; store('book_tasks',done);});
    });
  }

  /* scroll reveal — used on case studies + tool pages -----------*/
  function initReveal(){
    var els=$$('[data-reveal]'); if(!els.length) return;
    if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in-view');}); return; }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    },{threshold:.2,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){ io.observe(e); });
  }

  document.addEventListener('DOMContentLoaded',function(){
    initLang(); initAudit(); initCms(); initMs(); initDisc(); initLedger(); initRefresh(); initA11y(); initBook(); initReveal();
    if(window.lucide) lucide.createIcons();
  });
})();
