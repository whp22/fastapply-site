// Small helpers for the site
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Downloads page dynamic release load
  async function loadRelease(){
    const els = ['version','release-date','release-notes','win-url','mac-url','win-sha','mac-sha','all-releases']
      .reduce((acc,id)=> (acc[id]=document.getElementById(id),acc),{});
    if(!els.version) return;

    try{
      const res = await fetch('releases.json', {cache: 'no-cache'});
      if(!res.ok) throw new Error('release not found');
      const data = await res.json();

      els.version.textContent = 'v' + data.version;
      els['release-date'].textContent = new Date(data.release_date).toLocaleDateString();
      els['release-notes'].textContent = data.notes || 'Latest stable release';

      els['win-url'].href = data.windows.url;
      els['mac-url'].href = data.macos.url;
      els['win-sha'].textContent = data.windows.sha256.slice(0, 16) + '…';
      els['mac-sha'].textContent = data.macos.sha256.slice(0, 16) + '…';
      if (els['all-releases'] && data.all_releases_url) {
        els['all-releases'].href = data.all_releases_url;
      }
    }catch(e){
      // Fallback text
      els['release-notes'].textContent = 'Could not fetch release info. Please try again later.';
    }
  }
  loadRelease();
})();