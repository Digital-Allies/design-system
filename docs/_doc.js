// Copy code functionality for all <pre> blocks in documentation
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('pre').forEach(function (pre) {
    // Only add if not already present
    if (pre.querySelector('.copy-code-btn')) return;

    var btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.textContent = 'Copy';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code snippet');

    btn.addEventListener('click', function () {
      var clone = pre.cloneNode(true);
      var childBtn = clone.querySelector('.copy-code-btn');
      if (childBtn) childBtn.remove();
      var text = clone.innerText.trim();

      function showSuccess() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showSuccess).catch(function () {
          fallbackCopy(text, showSuccess);
        });
      } else {
        fallbackCopy(text, showSuccess);
      }
    });

    pre.appendChild(btn);
  });

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (cb) cb();
    } catch (e) {
      console.error('Failed to copy', e);
    }
    document.body.removeChild(ta);
  }
});
