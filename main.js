(function () {
  const root = document.getElementById("song");
  if (!root) return;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
  const id = new URLSearchParams(location.search).get("id");
  const i = SONGS.findIndex((s) => s.slug === id);
  if (i < 0) { root.appendChild(el("p", "", "曲が見つかりませんでした。")); return; }
  const s = SONGS[i];
  document.title = s.title + " | シャニカマエール";

  const top = el("div", "song-top");
  const art = el("div", "art");
  const img = el("img"); img.src = s.jacket; img.alt = s.title + " ジャケット"; art.appendChild(img);
  const info = el("div", "song-info");
  info.appendChild(el("h1", "song-title", s.title));
  if (s.description) info.appendChild(el("p", "song-desc", s.description));

  const links = el("div", "song-links");
  [["YouTube", s.youtube], ["Spotify", s.spotify], ["Apple Music", s.apple]].forEach(([name, url]) => {
    if (!url) return;
    const a = el("a", "btn", name); a.href = url; a.target = "_blank"; a.rel = "noopener"; links.appendChild(a);
  });
  info.appendChild(links.children.length ? links : el("p", "soon", "配信準備中です。"));
  top.append(art, info);
  root.appendChild(top);

  const m = (s.youtube || "").match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  if (m) {
    const v = el("div", "video"); const f = el("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + m[1]; f.title = s.title + " 動画"; f.loading = "lazy"; f.allowFullscreen = true;
    v.appendChild(f); root.appendChild(v);
  }
  if (s.lyrics) {
    root.appendChild(el("h2", "sec-title", "Lyrics"));
    root.appendChild(el("div", "lyrics", s.lyrics));
  }
  const nav = el("div", "song-nav");
  const link = (song, label) => { const a = el("a", "btn alt", label + "：" + song.title); a.href = "song.html?id=" + song.slug; return a; };
  nav.appendChild(i > 0 ? link(SONGS[i - 1], "← 前の曲") : el("span"));
  nav.appendChild(i < SONGS.length - 1 ? link(SONGS[i + 1], "次の曲 →") : el("span"));
  root.appendChild(nav);
  const back = el("p", "back"); const b = el("a", "", "← 曲一覧へ戻る"); b.href = "index.html#releases"; back.appendChild(b);
  root.appendChild(back);
})();
