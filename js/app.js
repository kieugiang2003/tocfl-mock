/* TOCFL Mock Test — ứng dụng tĩnh, chạy hoàn toàn trên trình duyệt.
   Dữ liệu cá nhân (lịch sử, sổ từ) lưu trong localStorage của trình duyệt. */
(function () {
  "use strict";

  const TESTS = window.TOCFL_TESTS || [];
  const CFG = window.TOCFL_CONFIG || { maxScaled: 80, levels: { listening: { B1: 41, B2: 61 }, reading: { B1: 46, B2: 64 } }, readingMinutes: 60, goal: "B1" };
  const KEYS = ["A", "B", "C", "D"];
  const SKILL_VI = { listening: "Nghe", reading: "Đọc" };
  const $app = document.getElementById("app");

  /* ================= Storage ================= */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tocfl." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("tocfl." + k, JSON.stringify(v)); } catch (e) { toast("Không lưu được dữ liệu (bộ nhớ trình duyệt bị chặn)"); } }
  };
  const attempts = () => store.get("attempts", []);
  const saveAttempts = (a) => store.set("attempts", a);
  const vocab = () => store.get("vocab", []);
  const saveVocab = (v) => store.set("vocab", v);

  /* ================= Helpers ================= */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; };
  const testById = (id) => TESTS.find((t) => t.id === id);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); const m = Math.floor(s / 60), r = s % 60; return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`; };
  const fmtDate = (ts) => new Date(ts).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const DAY = 86400000;

  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
  }

  function scaled(correct, total) { return Math.round((correct * CFG.maxScaled) / (total || 50)); }
  function levelOf(skill, sc) {
    const L = CFG.levels[skill];
    if (sc >= L.B2) return "B2";
    if (sc >= L.B1) return "B1";
    return "none";
  }
  const LEVEL_TXT = { B2: "Đạt B2 · 高階級", B1: "Đạt B1 · 進階級", none: "Chưa đạt B1" };

  // Hiển thị script: tô màu "男：" / "女："
  function scriptHtml(text) {
    return esc(text).replace(/^(男|女)：/gm, '<span class="sp">$1：</span>');
  }

  /* ================= Router ================= */
  let cleanup = null;
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    hideSelBtn();
    const hash = location.hash.replace(/^#\/?/, "");
    const [page, arg, arg2] = hash.split("/");
    window.scrollTo(0, 0);
    if (page === "test") return pageTest(arg);
    if (page === "exam") return pageExamGuard();
    if (page === "result") return pageResult(arg, arg2);
    if (page === "history") return pageHistory();
    if (page === "vocab") return pageVocab();
    if (page === "flashcards") return pageFlash();
    return pageHome();
  }
  window.addEventListener("hashchange", route);

  function nav(active) {
    const items = [["", "Trang chủ"], ["history", "Lịch sử"], ["vocab", "Sổ từ vựng"], ["flashcards", "Flashcard"]];
    return `<nav class="topnav"><div class="inner">
      <a class="brand" href="#/"><span class="logo">華</span><span class="txt">TOCFL Mock</span></a>
      <div class="navlinks">${items.map(([k, v]) => `<a href="#/${k}" class="${active === k ? "active" : ""}">${v}</a>`).join("")}</div>
    </div></nav>`;
  }
  function render(active, inner) {
    $app.innerHTML = nav(active) + `<main class="container">${inner}</main>`;
  }

  /* ================= Home ================= */
  function bestFor(testId, skill) {
    let best = null;
    attempts().forEach((a) => {
      if (a.testId !== testId || !a.sections[skill]) return;
      const s = a.sections[skill].scaled;
      if (best === null || s > best) best = s;
    });
    return best;
  }

  function pageHome() {
    const all = attempts();
    const due = vocab().filter((w) => (w.due || 0) <= Date.now()).length;
    let bestL = null, bestR = null;
    all.forEach((a) => {
      if (a.sections.listening) bestL = Math.max(bestL ?? 0, a.sections.listening.scaled);
      if (a.sections.reading) bestR = Math.max(bestR ?? 0, a.sections.reading.scaled);
    });
    const cards = TESTS.map((t) => {
      const bl = bestFor(t.id, "listening"), br = bestFor(t.id, "reading");
      const tries = all.filter((a) => a.testId === t.id).length;
      return `<div class="card test-card">
        <div class="row"><span class="tag">Band ${esc(t.band)}</span>${tries ? `<span class="muted small">${tries} lần làm</span>` : `<span class="muted small">Chưa làm</span>`}</div>
        <div class="title">${esc(t.title)}</div>
        <div class="zh-name">${esc(t.name || "")}</div>
        <div class="best">
          <span class="tag ${bl == null ? "" : levelOf("listening", bl) === "none" ? "warn" : "ok"}">Nghe: ${bl == null ? "–" : bl + "/80"}</span>
          <span class="tag ${br == null ? "" : levelOf("reading", br) === "none" ? "warn" : "ok"}">Đọc: ${br == null ? "–" : br + "/80"}</span>
        </div>
        <a class="btn primary" href="#/test/${esc(t.id)}">Làm bài</a>
      </div>`;
    }).join("");

    render("", `
      <section class="hero">
        <div style="flex:1;min-width:240px">
          <h1>Luyện thi TOCFL Band B</h1>
          <p>Mục tiêu: <b>${esc(CFG.goal)}</b> · Nghe ≥ ${CFG.levels.listening.B1}/80 · Đọc ≥ ${CFG.levels.reading.B1}/80</p>
        </div>
        <div class="row">
          <div class="stat"><b>${all.length}</b><span>lần làm bài</span></div>
          <div class="stat"><b>${bestL ?? "–"}</b><span>Nghe cao nhất</span></div>
          <div class="stat"><b>${bestR ?? "–"}</b><span>Đọc cao nhất</span></div>
          <a class="stat" href="#/flashcards" style="color:#fff"><b>${due}</b><span>từ cần ôn hôm nay</span></a>
        </div>
      </section>
      <h2 class="mt2">Đề thi</h2>
      <div class="grid cols-3">${cards || `<div class="empty">Chưa có đề nào.</div>`}</div>
      <h2 class="mt2">Tiến bộ</h2>
      <div class="card">${chartHtml(all)}</div>
    `);
  }

  /* ================= Chart (SVG) ================= */
  function chartHtml(all) {
    const pts = all.slice().sort((a, b) => a.date - b.date);
    const L = pts.filter((a) => a.sections.listening).map((a) => ({ d: a.date, v: a.sections.listening.scaled }));
    const R = pts.filter((a) => a.sections.reading).map((a) => ({ d: a.date, v: a.sections.reading.scaled }));
    if (!L.length && !R.length) return `<div class="empty">Làm bài đầu tiên để thấy biểu đồ tiến bộ.</div>`;
    const W = 720, H = 240, pl = 34, pr = 14, pt = 14, pb = 28;
    const n = Math.max(L.length, R.length);
    const x = (i, len) => pl + (len <= 1 ? (W - pl - pr) / 2 : (i * (W - pl - pr)) / (Math.max(n, 2) - 1));
    const y = (v) => pt + (1 - v / 80) * (H - pt - pb);
    const line = (arr, color) => {
      if (!arr.length) return "";
      const p = arr.map((o, i) => `${x(i, arr.length).toFixed(1)},${y(o.v).toFixed(1)}`);
      return `<polyline fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" points="${p.join(" ")}"/>` +
        arr.map((o, i) => `<circle cx="${x(i, arr.length).toFixed(1)}" cy="${y(o.v).toFixed(1)}" r="4" fill="#fff" stroke="${color}" stroke-width="2"><title>${fmtDate(o.d)}: ${o.v}/80</title></circle>`).join("");
    };
    const grid = [0, 20, 40, 60, 80].map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" stroke="#eef1f7"/><text x="${pl - 6}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="#98a2b3">${v}</text>`).join("");
    const th = (v, c, lbl) => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" stroke="${c}" stroke-dasharray="4 4" opacity=".7"/><text x="${W - pr}" y="${y(v) - 4}" font-size="10" text-anchor="end" fill="${c}">${lbl}</text>`;
    return `<div class="chart">
      <div class="legend"><span><i style="background:#2f5bea"></i>Nghe</span><span><i style="background:#e0811b"></i>Đọc</span><span>Đường nét đứt: ngưỡng B1</span></div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ điểm theo thời gian">
        ${grid}
        ${th(CFG.levels.listening.B1, "#2f5bea", "B1 Nghe " + CFG.levels.listening.B1)}
        ${th(CFG.levels.reading.B1, "#e0811b", "B1 Đọc " + CFG.levels.reading.B1)}
        ${line(L, "#2f5bea")}${line(R, "#e0811b")}
        <text x="${pl}" y="${H - 8}" font-size="11" fill="#98a2b3">Lần làm bài →</text>
      </svg></div>`;
  }

  /* ================= Test setup ================= */
  function pageTest(id) {
    const t = testById(id);
    if (!t) return pageHome();
    let skill = "full", mode = "exam";
    const draw = () => {
      render("", `
        <a href="#/" class="muted small">← Trang chủ</a>
        <h1 class="mt">${esc(t.title)} <span class="zh muted" style="font-size:18px;font-weight:500">${esc(t.name || "")}</span></h1>
        <div class="card mt">
          <h3>Chọn phần thi</h3>
          <div class="choice-grid" data-g="skill">
            <button class="choice ${skill === "full" ? "on" : ""}" data-v="full"><b>Thi full</b><span class="muted small">Nghe 50 câu → Đọc 50 câu</span></button>
            <button class="choice ${skill === "listening" ? "on" : ""}" data-v="listening"><b>Chỉ Nghe</b><span class="muted small">50 câu · khoảng 60 phút</span></button>
            <button class="choice ${skill === "reading" ? "on" : ""}" data-v="reading"><b>Chỉ Đọc</b><span class="muted small">50 câu · ${CFG.readingMinutes} phút</span></button>
          </div>
          <h3 class="mt2">Chế độ</h3>
          <div class="choice-grid" data-g="mode">
            <button class="choice ${mode === "exam" ? "on" : ""}" data-v="exam"><b>Thi thật</b><span class="muted small">Audio tự chạy, chỉ nghe 1 lần, tự chuyển câu. Bài Đọc bấm giờ. Không quay lại câu trước.</span></button>
            <button class="choice ${mode === "practice" ? "on" : ""}" data-v="practice"><b>Luyện tập</b><span class="muted small">Nghe lại thoải mái, tự bấm sang câu tiếp, không giới hạn thời gian.</span></button>
          </div>
          <div class="row mt2">
            <button class="btn primary lg" id="go">Bắt đầu</button>
            <span class="muted small">Nên dùng tai nghe. Đừng tải lại trang khi đang làm bài.</span>
          </div>
        </div>`);
      $app.querySelectorAll("[data-g] .choice").forEach((b) => b.addEventListener("click", () => {
        const g = b.parentElement.dataset.g;
        if (g === "skill") skill = b.dataset.v; else mode = b.dataset.v;
        draw();
      }));
      document.getElementById("go").addEventListener("click", () => startExam(t, skill, mode));
    };
    draw();
  }

  /* ================= Exam engine ================= */
  let EXAM = null; // trạng thái bài đang làm

  function startExam(t, skill, mode) {
    EXAM = {
      id: uid(), test: t, mode, date: Date.now(),
      queue: skill === "full" ? ["listening", "reading"] : [skill],
      sections: {}
    };
    location.hash = "#/exam";
  }

  function pageExamGuard() {
    if (!EXAM) { location.hash = "#/"; return; }
    const onUnload = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", onUnload);
    const prevCleanup = () => window.removeEventListener("beforeunload", onUnload);
    runNextSection(prevCleanup);
  }

  function runNextSection(unloadCleanup) {
    const skill = EXAM.queue.find((s) => !EXAM.sections[s]);
    if (!skill) {
      unloadCleanup && unloadCleanup();
      finishExam();
      return;
    }
    if (skill === "listening") runListening(unloadCleanup);
    else runReading(unloadCleanup);
  }

  function examBar(title, right) {
    return `<div class="exam-bar"><div class="inner">
      <b>${esc(EXAM.test.title)}</b><span class="tag">${title}</span>
      ${EXAM.mode === "practice" ? '<span class="tag warn">Luyện tập</span>' : ""}
      <div class="progress"><i id="prog" style="width:0%"></i></div>
      <span id="qcount" class="muted small"></span>
      ${right || ""}
      <button class="btn" id="quit">Nộp bài</button>
    </div></div>`;
  }

  function optionsHtml(q, selected) {
    return `<div class="options">${q.options.map((o, i) => `
      <button class="opt ${selected === KEYS[i] ? "sel" : ""}" data-k="${KEYS[i]}"><span class="key">${KEYS[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
  }

  function bindOptions(container, onPick) {
    container.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
      container.querySelectorAll(".opt").forEach((x) => x.classList.remove("sel"));
      b.classList.add("sel");
      onPick(b.dataset.k);
    }));
  }

  /* ---------- Listening ---------- */
  function buildListeningSteps(L) {
    const steps = [];
    const seenGroup = {};
    let curSec = -1;
    L.questions.forEach((q) => {
      if (q.sec !== curSec) {
        curSec = q.sec;
        const s = L.sections[curSec];
        steps.push({ type: "instr", sec: s, audio: s.audio || [] });
      }
      if (q.group && !seenGroup[q.group]) {
        seenGroup[q.group] = true;
        const g = L.groups[q.group];
        steps.push({ type: "stem", group: g, gid: q.group, audio: [g.audio] });
      }
      steps.push({ type: "q", q, audio: [q.audio] });
    });
    if (L.endAudio) steps.push({ type: "end", audio: [L.endAudio] });
    return steps;
  }

  function runListening(unloadCleanup) {
    const t = EXAM.test, L = t.listening, practice = EXAM.mode === "practice";
    const steps = buildListeningSteps(L);
    const answers = {};
    const total = L.questions.length;
    const startedAt = Date.now();
    let idx = 0, fileIdx = 0, advanceTimer = null, done = false;
    const audio = new Audio();
    audio.preload = "auto";

    $app.innerHTML = examBar("Nghe 聽力") + `<div class="exam-wrap" id="stage"></div>`;
    const $stage = document.getElementById("stage");
    const $prog = document.getElementById("prog");
    const $count = document.getElementById("qcount");

    function finishSection() {
      if (done) return; done = true;
      clearTimeout(advanceTimer); audio.pause(); audio.src = "";
      const correct = L.questions.filter((q) => answers[q.n] === q.answer).length;
      EXAM.sections.listening = { answers, correct, total, scaled: scaled(correct, total), timeSec: Math.round((Date.now() - startedAt) / 1000) };
      cleanup = null;
      if (EXAM.queue.includes("reading") && !EXAM.sections.reading) interlude(unloadCleanup);
      else runNextSection(unloadCleanup);
    }

    document.getElementById("quit").addEventListener("click", () => {
      if (confirm("Nộp bài phần Nghe ngay bây giờ? Các câu chưa làm sẽ tính là sai.")) finishSection();
    });

    function playFiles(files, onEnd) {
      fileIdx = 0;
      const playOne = () => {
        if (fileIdx >= files.length) { onEnd(); return; }
        audio.src = t.audioBase + files[fileIdx];
        audio.onended = () => { fileIdx++; playOne(); };
        audio.play().catch(() => {
          // trình duyệt chặn autoplay → hiện nút phát
          const b = document.getElementById("manualplay");
          if (b) b.style.display = "";
        });
      };
      playOne();
    }

    function updateStatus() {
      const st = document.querySelector(".audio-status");
      if (st) st.classList.toggle("paused", audio.paused);
    }
    audio.addEventListener("play", updateStatus);
    audio.addEventListener("pause", updateStatus);

    function next() {
      clearTimeout(advanceTimer);
      if (cleanupAudio) { cleanupAudio(); cleanupAudio = null; }
      idx++;
      if (idx >= steps.length) { finishSection(); return; }
      show();
    }

    function statusBox(label) {
      if (practice) return `<div class="audio-status"><div style="flex:1"><div class="small muted" style="margin-bottom:4px">${label}</div><audio id="ctl" controls></audio></div></div>`;
      return `<div class="audio-status"><div class="eq"><i></i><i></i><i></i></div><span class="small">${label}</span><span class="spacer"></span>
        <button class="btn" id="manualplay" style="display:none">▶ Phát audio</button></div>`;
    }

    function show() {
      const s = steps[idx];
      const answeredCount = Object.keys(answers).length;
      const qPos = s.type === "q" ? L.questions.indexOf(s.q) + 1 : null;
      $prog.style.width = ((qPos || answeredCount) / total) * 100 + "%";
      $count.textContent = qPos ? `Câu ${s.q.n} / ${total}` : "";

      if (s.type === "instr") {
        $stage.innerHTML = `<div class="card">
          ${statusBox("Đang phát phần hướng dẫn…")}
          <h2 class="zh">${esc(s.sec.title)}</h2>
          <div class="instr-box">說明：${esc(s.sec.instr)}</div>
          <div class="exam-actions"><button class="btn primary" id="skip">Bỏ qua hướng dẫn →</button></div>
        </div>`;
        document.getElementById("skip").addEventListener("click", () => { audio.pause(); next(); });
      } else if (s.type === "stem") {
        $stage.innerHTML = `<div class="card">
          ${statusBox("Đang phát đoạn hội thoại / bài nói…")}
          <div class="instr-box">${esc(s.group.intro)}</div>
          ${practice ? `<div class="exam-actions"><button class="btn primary" id="nx">Sang câu hỏi →</button></div>` : ""}
        </div>`;
      } else if (s.type === "q") {
        const q = s.q;
        $stage.innerHTML = `<div class="card" style="max-width:760px;margin:0 auto">
          ${statusBox("Đang phát câu hỏi và các lựa chọn…")}
          <div class="qnum">Câu ${q.n}</div>
          ${q.prompt ? `<div class="prompt">${esc(q.prompt.replace(/^\d+\.\s*/, ""))}</div>` : ""}
          ${optionsHtml(q, answers[q.n])}
          ${practice ? `<div class="exam-actions"><button class="btn primary" id="nx">${idx === steps.length - 1 || steps[idx + 1].type === "end" ? "Kết thúc phần Nghe" : "Câu tiếp →"}</button></div>` : ""}
        </div>`;
        bindOptions($stage, (k) => { answers[q.n] = k; });
      } else if (s.type === "end") {
        $stage.innerHTML = `<div class="card">${statusBox("聽力考試到這裡全部結束")}<h2>Hết phần Nghe</h2></div>`;
      }

      const nx = document.getElementById("nx");
      if (nx) nx.addEventListener("click", () => { audio.pause(); next(); });
      const mp = document.getElementById("manualplay");
      if (mp) mp.addEventListener("click", () => { audio.play(); mp.style.display = "none"; });

      if (practice) {
        // Ở chế độ luyện tập: dùng thanh audio có nút tua
        const ctl = document.getElementById("ctl");
        audio.pause();
        let fi = 0;
        const files = s.audio;
        const load = () => { ctl.src = t.audioBase + files[fi]; ctl.play().catch(() => {}); };
        ctl.onended = () => { if (fi < files.length - 1) { fi++; load(); } else if (s.type === "instr" || s.type === "end") { if (s.type === "end") finishSection(); } };
        load();
        cleanupAudio = () => { ctl.pause(); };
      } else {
        playFiles(s.audio, () => { advanceTimer = setTimeout(next, s.type === "q" ? 800 : 400); });
      }
    }
    let cleanupAudio = null;

    cleanup = () => { done = true; clearTimeout(advanceTimer); audio.pause(); cleanupAudio && cleanupAudio(); unloadCleanup && unloadCleanup(); };
    show();
  }

  function interlude(unloadCleanup) {
    const r = EXAM.sections.listening;
    $app.innerHTML = `<div class="exam-wrap"><div class="card" style="max-width:620px;margin:40px auto;text-align:center">
      <h2>Hết phần Nghe 🎧</h2>
      <p class="muted">Bạn đã trả lời ${Object.keys(r.answers).length}/50 câu. Kết quả sẽ hiện sau khi làm xong phần Đọc.</p>
      <p>Phần Đọc: 50 câu · ${CFG.readingMinutes} phút${EXAM.mode === "practice" ? " (chế độ luyện tập: không giới hạn)" : ""}.</p>
      <button class="btn primary lg" id="goR">Bắt đầu phần Đọc</button>
    </div></div>`;
    document.getElementById("goR").addEventListener("click", () => runNextSection(unloadCleanup));
  }

  /* ---------- Reading ---------- */
  function passageHtml(t, p, curN, answers) {
    let body = "";
    if (p.image) body += `<img src="${esc(t.imageBase + p.image)}" alt="${esc(p.label)}">`;
    else if (p.cloze) {
      const seen = {};
      body += `<div class="passage-text">${esc(p.text).replace(/\[(\d+)\]/g, (m, n) => {
        n = +n; const first = !seen[n]; seen[n] = true;
        const a = answers && answers[n];
        const cls = n === curN ? "cur" : a ? "done" : "";
        return `<span class="blank ${cls}">${first ? n : n}${a && n !== curN ? "·" + a : ""}</span>`;
      })}</div>`;
    } else body += `<div class="passage-text">${esc(p.text)}</div>`;
    return `<div class="label">${esc(p.label)}</div>${body}`;
  }

  function runReading(unloadCleanup) {
    const t = EXAM.test, R = t.reading, practice = EXAM.mode === "practice";
    const answers = {};
    const total = R.questions.length;
    const limit = (R.durationMin || CFG.readingMinutes) * 60;
    const startedAt = Date.now();
    let i = 0, timerId = null, done = false;

    $app.innerHTML = examBar("Đọc 閱讀", practice ? "" : `<span class="timer" id="timer">${fmtTime(limit)}</span>`) + `<div class="exam-wrap" id="stage"></div>`;
    const $stage = document.getElementById("stage");

    function finishSection() {
      if (done) return; done = true;
      clearInterval(timerId);
      const correct = R.questions.filter((q) => answers[q.n] === q.answer).length;
      EXAM.sections.reading = { answers, correct, total, scaled: scaled(correct, total), timeSec: Math.round((Date.now() - startedAt) / 1000) };
      cleanup = null;
      runNextSection(unloadCleanup);
    }
    document.getElementById("quit").addEventListener("click", () => {
      if (confirm("Nộp bài phần Đọc ngay bây giờ? Các câu chưa làm sẽ tính là sai.")) finishSection();
    });

    if (!practice) {
      const $timer = document.getElementById("timer");
      timerId = setInterval(() => {
        const left = limit - (Date.now() - startedAt) / 1000;
        $timer.textContent = fmtTime(left);
        $timer.classList.toggle("low", left < 300);
        if (left <= 0) { toast("Hết giờ! Bài đã được nộp tự động."); finishSection(); }
      }, 500);
    }

    let lastSec = -1;
    function show() {
      const q = R.questions[i];
      document.getElementById("prog").style.width = (i / total) * 100 + "%";
      document.getElementById("qcount").textContent = `Câu ${q.n} / ${total}`;
      const p = R.passages[q.passage];
      const secHead = q.sec !== lastSec ? `<div class="card" style="margin-bottom:16px"><h3 class="zh" style="margin:0 0 4px">${esc(R.sections[q.sec].title)}</h3><div class="zh muted">說明：${esc(R.sections[q.sec].instr)}</div></div>` : "";
      lastSec = q.sec;
      const isLast = i === total - 1;
      $stage.innerHTML = secHead + `<div class="reading-layout">
        <div class="card passage">${passageHtml(t, p, q.n, answers)}</div>
        <div class="card">
          <div class="qnum">Câu ${q.n}</div>
          ${q.prompt ? `<div class="prompt">${esc(q.prompt.replace(/^\d+\.\s*/, ""))}</div>` : `<div class="muted small" style="margin-bottom:12px">Chọn từ phù hợp cho chỗ trống số ${q.n}</div>`}
          ${optionsHtml(q, answers[q.n])}
          <div class="exam-actions"><button class="btn primary" id="nx">${isLast ? "Nộp bài" : "Câu tiếp →"}</button></div>
        </div></div>`;
      bindOptions($stage, (k) => {
        answers[q.n] = k;
        if (p.cloze) $stage.querySelector(".passage").innerHTML = passageHtml(t, p, q.n, answers);
      });
      document.getElementById("nx").addEventListener("click", () => {
        if (!answers[q.n] && !confirm("Bạn chưa chọn đáp án. Không thể quay lại câu này. Vẫn sang câu tiếp?")) return;
        if (isLast) { finishSection(); return; }
        i++; show(); window.scrollTo(0, 0);
      });
    }
    cleanup = () => { done = true; clearInterval(timerId); unloadCleanup && unloadCleanup(); };
    show();
  }

  function finishExam() {
    const a = { id: EXAM.id, testId: EXAM.test.id, date: EXAM.date, mode: EXAM.mode, sections: EXAM.sections };
    const all = attempts(); all.push(a); saveAttempts(all);
    EXAM = null;
    location.hash = "#/result/" + a.id;
  }

  /* ================= Result & review ================= */
  function meter(skill, sc) {
    const L = CFG.levels[skill];
    const pct = (v) => (v / CFG.maxScaled) * 100;
    return `<div class="meter"><i style="width:${pct(sc)}%"></i>
      <span class="mark" style="left:${pct(L.B1)}%"></span><span class="mark" style="left:${pct(L.B2)}%"></span></div>
      <div class="meter-labels"><span style="left:${pct(L.B1)}%">B1 ${L.B1}</span><span style="left:${pct(L.B2)}%">B2 ${L.B2}</span></div>`;
  }

  function pageResult(id, tab) {
    const a = attempts().find((x) => x.id === id);
    if (!a) { render("history", `<div class="empty">Không tìm thấy kết quả.</div>`); return; }
    const t = testById(a.testId);
    if (!t) { render("history", `<div class="empty">Đề thi của kết quả này không còn trong hệ thống.</div>`); return; }
    const skills = ["listening", "reading"].filter((s) => a.sections[s]);
    const cur = skills.includes(tab) ? tab : skills[0];
    let filter = "all";

    const scoreCards = skills.map((s) => {
      const r = a.sections[s], lv = levelOf(s, r.scaled);
      return `<div class="card score-card">
        <div class="row"><b>${SKILL_VI[s]}</b><span class="spacer"></span><span class="level-badge level-${lv}">${LEVEL_TXT[lv]}</span></div>
        <div class="row mt" style="align-items:baseline;gap:18px">
          <div class="big">${r.scaled}<small>/80</small></div>
          <div class="muted">${r.correct}/${r.total} câu đúng<br><span class="small">Thời gian: ${fmtTime(r.timeSec)}</span></div>
        </div>
        ${meter(s, r.scaled)}
      </div>`;
    }).join("");

    let overall = "";
    if (skills.length === 2) {
      const lv = [levelOf("listening", a.sections.listening.scaled), levelOf("reading", a.sections.reading.scaled)];
      const rank = { none: 0, B1: 1, B2: 2 };
      const o = rank[lv[0]] <= rank[lv[1]] ? lv[0] : lv[1];
      overall = `<div class="card"><b>Kết luận chung</b><div class="mt"><span class="level-badge level-${o}">${LEVEL_TXT[o]}</span></div>
        <p class="small muted">Theo ngưỡng tham khảo, cả hai kỹ năng đều phải đạt mới tính là đạt cấp độ đó.</p></div>`;
    }

    const draw = () => {
      const sec = a.sections[cur];
      const data = t[cur];
      const qs = data.questions.filter((q) => {
        const u = sec.answers[q.n];
        if (filter === "wrong") return u !== q.answer;
        if (filter === "right") return u === q.answer;
        return true;
      });
      const cnt = { ok: 0, bad: 0, skip: 0 };
      const sheet = data.questions.map((q) => {
        const u = sec.answers[q.n];
        const cls = !u ? "skip" : u === q.answer ? "ok" : "bad";
        cnt[cls]++;
        const hidden = !qs.includes(q) ? " dim" : "";
        return `<a href="javascript:void 0" data-jump="${q.n}" class="${cls}${hidden}" title="Câu ${q.n}">${q.n}</a>`;
      }).join("");

      render("history", `
        <a href="#/history" class="muted small">← Lịch sử</a>
        <h1 class="mt">Kết quả · ${esc(t.title)}</h1>
        <div class="muted small">${fmtDate(a.date)} · ${a.mode === "practice" ? "Luyện tập" : "Thi thật"}</div>
        <div class="score-grid mt">${scoreCards}${overall}</div>
        <p class="small muted">Điểm /80 là ước lượng tuyến tính từ số câu đúng (TOCFL thật quy đổi theo IRT). Ngưỡng chỉnh được trong <code>data/config.js</code>.</p>

        <h2 class="mt2" style="margin-bottom:12px">Chữa bài</h2>
        <div class="review-layout">
          <aside class="review-board card">
            ${skills.length > 1 ? `<div class="seg full" id="tabs">${skills.map((s) => `<button class="${s === cur ? "on" : ""}" data-s="${s}">${SKILL_VI[s]}</button>`).join("")}</div>` : `<b>${SKILL_VI[cur]}</b>`}
            <div class="board-stats">
              <span class="st ok">${cnt.ok} đúng</span><span class="st bad">${cnt.bad} sai</span><span class="st skip">${cnt.skip} bỏ trống</span>
            </div>
            <div class="seg full small-seg" id="filt">
              <button data-f="all" class="${filter === "all" ? "on" : ""}">Tất cả</button>
              <button data-f="wrong" class="${filter === "wrong" ? "on" : ""}">Sai</button>
              <button data-f="right" class="${filter === "right" ? "on" : ""}">Đúng</button>
            </div>
            <div class="answer-sheet board-sheet">${sheet}</div>
            <div class="board-nav">
              <button class="btn sm" id="prevQ">↑ Câu trước</button>
              <button class="btn sm" id="nextQ">Câu sau ↓</button>
            </div>
            <label class="board-opt"><input type="checkbox" id="showTr" ${showTr ? "checked" : ""}> Hiện bản dịch tiếng Việt</label>
            <div class="small muted board-tip">💡 Bôi đen từ tiếng Trung để lưu vào sổ từ, hoặc bấm ＋ ở bảng từ vựng.</div>
          </aside>
          <div id="reviews" class="${showTr ? "" : "hide-tr"}">${qs.map((q) => reviewItem(t, cur, q, sec.answers[q.n])).join("") || `<div class="empty card">Không có câu nào.</div>`}</div>
        </div>
      `);

      $app.querySelectorAll("#tabs button").forEach((b) => b.addEventListener("click", () => { location.hash = `#/result/${a.id}/${b.dataset.s}`; }));
      $app.querySelectorAll("#filt button").forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; draw(); }));
      document.getElementById("showTr").addEventListener("change", (e) => {
        showTr = e.target.checked; store.set("showTr", showTr);
        document.getElementById("reviews").classList.toggle("hide-tr", !showTr);
      });

      const jump = (n) => {
        let target = document.getElementById("rv-" + n);
        if (!target && filter !== "all") { filter = "all"; draw(); target = document.getElementById("rv-" + n); }
        if (target) {
          const d = target.querySelector("details"); if (d) d.open = true;
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - topOffset() + 4, behavior: "smooth" });
          setCur(n);
        }
      };
      // Khoảng bị che phía trên: thanh menu (+ board khi ở màn hình điện thoại)
      const topOffset = () => {
        const nav = document.querySelector(".topnav"), bd = document.querySelector(".review-board");
        const mobile = bd && getComputedStyle(bd).position === "sticky" && window.innerWidth <= 900;
        return (nav ? nav.offsetHeight : 60) + (mobile ? bd.offsetHeight : 0) + 12;
      };
      $app.querySelectorAll("[data-jump]").forEach((el) => el.addEventListener("click", () => jump(+el.dataset.jump)));

      // Đánh dấu câu đang xem trên board
      let curN = null;
      const setCur = (n) => {
        curN = n;
        $app.querySelectorAll(".board-sheet a").forEach((el) => {
          const on = +el.dataset.jump === n;
          el.classList.toggle("cur", on);
          if (on) { const sh = el.parentElement; if (sh.scrollWidth > sh.clientWidth) sh.scrollLeft = el.offsetLeft - sh.clientWidth / 2 + el.offsetWidth / 2; }
        });
      };
      const step = (dir) => {
        const list = qs.map((q) => q.n);
        if (!list.length) return;
        const idx = curN == null ? -1 : list.indexOf(curN);
        const nx = list[Math.min(list.length - 1, Math.max(0, idx + dir))];
        jump(nx);
      };
      document.getElementById("prevQ").addEventListener("click", () => step(-1));
      document.getElementById("nextQ").addEventListener("click", () => step(1));

      // Câu đang xem = thẻ cuối cùng có mép trên đã cuộn qua dưới thanh menu
      if (obs) obs();
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const items = $app.querySelectorAll(".review-item");
          const thr = topOffset() + 40;
          let n = null;
          for (const el of items) { if (el.getBoundingClientRect().top <= thr) n = +el.id.slice(3); else break; }
          if (n == null && items.length) n = +items[0].id.slice(3);
          if (n !== curN) setCur(n);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      obs = () => window.removeEventListener("scroll", onScroll);

      $app.querySelectorAll("[data-save]").forEach((b) => b.addEventListener("click", () => {
        const card = b.closest(".review-item");
        const src = card.querySelector(".vocab-src.script");
        openWordModal({
          word: b.dataset.word, pinyin: b.dataset.py, meaning: b.dataset.vi,
          example: src ? findSentence(src.textContent, b.dataset.word) : "",
          source: t.title + " · " + SKILL_VI[cur] + " câu " + card.id.slice(3)
        }, () => { b.textContent = "✓"; b.disabled = true; });
      }));
    };
    let obs = null;
    let showTr = store.get("showTr", true);
    draw();
    cleanup = () => { if (obs) obs(); };
  }

  /* Bản dịch tiếng Việt (nếu đề có file .vi) */
  function viFor(t, skill) { return ((window.TOCFL_VI || {})[t.id] || {})[skill] || {}; }
  function trBlock(text, label) {
    if (!text) return "";
    return `<div class="tr-block"><div class="lbl">${label || "Bản dịch tiếng Việt"}</div><div class="tr-text">${esc(text).replace(/^(Nam|Nữ|Anh|Em):/gm, '<b class="sp">$1:</b>')}</div></div>`;
  }
  function vocabTable(list) {
    if (!list || !list.length) return "";
    const saved = new Set(vocab().map((w) => w.word));
    return `<div class="lbl">Từ vựng quan trọng</div>
      <div class="vocab-table">${list.map(([w, py, vi]) => `<div class="vrow">
        <span class="w zh">${esc(w)}</span><span class="py">${esc(py)}</span><span class="vi">${esc(vi)}</span>
        <button class="btn sm add" ${saved.has(w) ? "disabled" : ""} data-save data-word="${esc(w)}" data-py="${esc(py)}" data-vi="${esc(vi)}" title="Lưu vào sổ từ">${saved.has(w) ? "✓" : "＋"}</button>
      </div>`).join("")}</div>`;
  }
  function grammarList(list) {
    if (!list || !list.length) return "";
    return `<div class="lbl">Ngữ pháp</div>
      <ul class="gram-list">${list.map(([p, d]) => `<li><span class="gp zh">${esc(p)}</span><span class="gd">${esc(d)}</span></li>`).join("")}</ul>`;
  }

  function reviewItem(t, skill, q, user) {
    const ok = user === q.answer;
    const status = !user ? `<span class="tag warn">Bỏ trống</span>` : ok ? `<span class="tag ok">Đúng</span>` : `<span class="tag bad">Sai</span>`;
    const VI = viFor(t, skill);
    const qv = (VI.q || {})[q.n] || {};
    const opts = `<div class="options">${q.options.map((o, i) => {
      const k = KEYS[i];
      const cls = k === q.answer ? "correct" : k === user ? "wrong" : "";
      let ot = qv.opts && qv.opts[i] ? qv.opts[i] : "";
      if (ot.startsWith(o)) ot = ot.slice(o.length).trim().replace(/^\((.*)\)$/, "$1");
      const ov = ot ? `<span class="opt-tr">${esc(ot)}</span>` : "";
      return `<div class="opt ${cls}" disabled><span class="key">${k}</span><span class="opt-body"><span>${esc(o)}</span>${ov}</span></div>`;
    }).join("")}</div>`;

    let material = "";
    if (skill === "listening") {
      const L = t.listening;
      const g = q.group ? L.groups[q.group] : null;
      const gtr = g && VI.groups ? VI.groups[q.group] : "";
      var trHtml = trBlock((gtr ? gtr + "\n\n" : "") + (qv.tr || ""), "Bản dịch script");
      const audios = [];
      if (g) audios.push([g.audio, "Đoạn hội thoại / bài nói"]);
      audios.push([q.audio, "Câu hỏi " + q.n]);
      material = `
        <div class="lbl">Audio</div>
        <div class="audio-row">${audios.map(([f, cap]) => `<span class="cap">${cap}</span><audio controls preload="none" src="${esc(t.audioBase + f)}"></audio>`).join("")}</div>
        <div class="lbl">Script 聽力文本</div>
        <div class="script zh vocab-src">${g ? scriptHtml(g.intro.split("\n")[0]) + "\n\n" + scriptHtml(g.script) + "\n\n" : ""}${scriptHtml(q.script)}</div>`;
    } else {
      const p = t.reading.passages[q.passage];
      const ansWord = q.options[KEYS.indexOf(q.answer)].replace(/\s/g, "");
      const fill = (s) => s.replace(/\[(\d+)\]/g, (m, n) => (+n === q.n ? `【${ansWord}】` : "___"));
      const text = p.cloze ? fill(p.text) : p.text;
      const ptr = VI.passages ? VI.passages[q.passage] : "";
      var trHtml = trBlock(ptr ? (p.cloze ? fill(ptr) : ptr) : "", "Bản dịch bài đọc");
      material = `
        <div class="lbl">Bài đọc ${esc(p.label)}</div>
        ${p.image ? `<details><summary>Xem hình gốc</summary><img src="${esc(t.imageBase + p.image)}" style="max-width:100%;margin-top:8px;border-radius:8px;border:1px solid var(--line)"></details>` : ""}
        <div class="script zh vocab-src">${esc(text)}</div>`;
    }
    const promptTr = skill === "reading" || q.group ? qv.tr : "";

    return `<div class="card review-item" id="rv-${q.n}">
      <div class="review-head"><b>Câu ${q.n}</b>${status}<span class="muted small">Đáp án: <b>${q.answer}</b>${user && !ok ? ` · Bạn chọn: <b>${user}</b>` : ""}</span></div>
      ${q.prompt ? `<div class="prompt zh vocab-src" style="font-size:18px">${esc(q.prompt)}</div>` : ""}
      ${promptTr && (q.prompt || skill === "reading") ? `<div class="prompt-tr tr-only">${esc(promptTr)}</div>` : ""}
      ${opts}
      <details ${!ok ? "open" : ""}><summary class="mt">Giải thích, bản dịch & từ vựng</summary>
        <div class="explain">
          <div class="lbl">Giải thích</div>
          <div class="explain-text">${esc(q.explain || "Chưa có giải thích.")}</div>
          ${vocabTable(qv.vocab)}
          ${grammarList(qv.gram)}
          ${material}
          <div class="tr-only">${trHtml || ""}</div>
        </div>
      </details>
    </div>`;
  }

  /* ================= History ================= */
  function pageHistory() {
    const all = attempts().slice().sort((a, b) => b.date - a.date);
    const rows = all.map((a) => {
      const t = testById(a.testId);
      const cell = (s) => {
        const r = a.sections[s]; if (!r) return `<span class="muted">–</span>`;
        const lv = levelOf(s, r.scaled);
        return `<b>${r.scaled}</b>/80 <span class="muted small">(${r.correct}/${r.total})</span> <span class="tag ${lv === "none" ? "warn" : "ok"}">${lv === "none" ? "<B1" : lv}</span>`;
      };
      return `<tr>
        <td>${fmtDate(a.date)}</td><td>${esc(t ? t.title : a.testId)}</td>
        <td>${a.mode === "practice" ? "Luyện tập" : "Thi thật"}</td>
        <td>${cell("listening")}</td><td>${cell("reading")}</td>
        <td style="white-space:nowrap"><a class="btn" href="#/result/${a.id}">Xem</a> <button class="btn ghost danger" data-del="${a.id}">Xóa</button></td>
      </tr>`;
    }).join("");
    render("history", `
      <h1>Lịch sử làm bài</h1>
      <div class="card mt">${chartHtml(all)}</div>
      <div class="card mt">
        ${all.length ? `<div class="table-wrap"><table class="list"><thead><tr><th>Ngày</th><th>Đề</th><th>Chế độ</th><th>Nghe</th><th>Đọc</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="empty">Chưa có lần làm bài nào.</div>`}
      </div>
      <div class="card mt">
        <h3>Sao lưu dữ liệu</h3>
        <p class="small muted">Lịch sử và sổ từ chỉ lưu trong trình duyệt này. Hãy xuất file sao lưu định kỳ, hoặc để chuyển sang máy khác.</p>
        <div class="row"><button class="btn" id="exp">⬇ Xuất file sao lưu</button>
        <label class="btn">⬆ Nhập file sao lưu<input type="file" id="imp" accept=".json" hidden></label></div>
      </div>`);
    $app.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
      if (!confirm("Xóa lần làm bài này?")) return;
      saveAttempts(attempts().filter((a) => a.id !== b.dataset.del)); pageHistory();
    }));
    document.getElementById("exp").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ version: 1, exported: Date.now(), attempts: attempts(), vocab: vocab() }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `tocfl-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    document.getElementById("imp").addEventListener("change", (e) => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then((txt) => {
        const d = JSON.parse(txt);
        const ids = new Set(attempts().map((a) => a.id));
        const merged = attempts().concat((d.attempts || []).filter((a) => !ids.has(a.id)));
        const wids = new Set(vocab().map((w) => w.id));
        const mv = vocab().concat((d.vocab || []).filter((w) => !wids.has(w.id)));
        saveAttempts(merged); saveVocab(mv); toast("Đã nhập dữ liệu"); pageHistory();
      }).catch(() => toast("File không hợp lệ"));
    });
  }

  /* ================= Vocabulary: select-to-save ================= */
  let selBtn = null;
  function hideSelBtn() { if (selBtn) { selBtn.remove(); selBtn = null; } }
  const CJK = /[㐀-鿿]/;

  function onSelect() {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim().replace(/\s+/g, "") : "";
    if (!text || text.length > 16 || !CJK.test(text)) { hideSelBtn(); return; }
    const node = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
    const src = node && node.closest(".vocab-src");
    if (!src) { hideSelBtn(); return; }
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    hideSelBtn();
    selBtn = document.createElement("button");
    selBtn.className = "sel-btn"; selBtn.textContent = "＋ Lưu từ";
    selBtn.style.left = rect.left + window.scrollX + "px";
    selBtn.style.top = rect.bottom + window.scrollY + 6 + "px";
    const context = findSentence(src.textContent, text);
    const card = src.closest(".review-item");
    const source = card ? (document.querySelector("h1")?.textContent || "").replace("Kết quả · ", "") + " · " + card.querySelector("b").textContent : "";
    selBtn.addEventListener("mousedown", (e) => e.preventDefault());
    selBtn.addEventListener("click", () => { hideSelBtn(); openWordModal({ word: text, example: context, source }); });
    document.body.appendChild(selBtn);
  }
  document.addEventListener("mouseup", () => setTimeout(onSelect, 10));
  document.addEventListener("touchend", () => setTimeout(onSelect, 250));

  function findSentence(full, word) {
    const parts = full.split(/(?<=[。！？!?\n])/);
    const s = parts.find((p) => p.includes(word));
    return s ? s.trim().replace(/^(男|女)：/, "").slice(0, 120) : "";
  }

  function autoPinyin(word) {
    try { return window.pinyinPro ? window.pinyinPro.pinyin(word) : ""; } catch (e) { return ""; }
  }

  function openWordModal(w, onSaved) {
    const editing = !!w.id;
    const exists = !editing && vocab().find((x) => x.word === w.word);
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal">
      <h2>${editing ? "Sửa từ" : "Lưu từ vựng"}</h2>
      ${exists ? `<p class="tag warn">Từ này đã có trong sổ — lưu sẽ cập nhật.</p>` : ""}
      <div class="field"><label>Từ</label><input class="zh-in" id="fw" value="${esc(w.word)}"></div>
      <div class="field"><label>Pinyin</label><input id="fp" value="${esc(w.pinyin || autoPinyin(w.word))}"></div>
      <div class="field"><label>Nghĩa tiếng Việt</label><input id="fm" value="${esc(w.meaning || "")}" placeholder="Nhập nghĩa…"></div>
      <div class="field"><label>Câu ví dụ</label><textarea id="fe" rows="2" class="zh">${esc(w.example || "")}</textarea></div>
      <div class="row small"><a target="_blank" rel="noopener" id="lookup" href="#">Tra từ trên Google Dịch ↗</a></div>
      <div class="row mt" style="justify-content:flex-end"><button class="btn" id="fc">Hủy</button><button class="btn primary" id="fs">Lưu</button></div>
    </div>`;
    document.body.appendChild(bg);
    const $ = (id) => bg.querySelector("#" + id);
    const upd = () => { $("lookup").href = "https://translate.google.com/?sl=zh-TW&tl=vi&text=" + encodeURIComponent($("fw").value) + "&op=translate"; };
    upd();
    $("fw").addEventListener("input", () => { $("fp").value = autoPinyin($("fw").value); upd(); });
    const close = () => bg.remove();
    bg.addEventListener("click", (e) => { if (e.target === bg) close(); });
    $("fc").addEventListener("click", close);
    $("fs").addEventListener("click", () => {
      const word = $("fw").value.trim(); if (!word) return;
      const list = vocab();
      const base = editing ? list.find((x) => x.id === w.id) : list.find((x) => x.word === word);
      const rec = Object.assign(base || { id: uid(), added: Date.now(), due: Date.now(), box: 0, reps: 0, source: w.source || "" }, {
        word, pinyin: $("fp").value.trim(), meaning: $("fm").value.trim(), example: $("fe").value.trim()
      });
      if (!base) list.push(rec);
      saveVocab(list); close(); toast(editing ? "Đã cập nhật" : "Đã lưu vào sổ từ");
      onSaved && onSaved();
    });
    setTimeout(() => $("fm").focus(), 30);
  }

  function pageVocab() {
    let q = "";
    const draw = () => {
      const list = vocab().slice().sort((a, b) => b.added - a.added)
        .filter((w) => !q || w.word.includes(q) || (w.meaning || "").toLowerCase().includes(q.toLowerCase()) || (w.pinyin || "").toLowerCase().includes(q.toLowerCase()));
      const due = vocab().filter((w) => (w.due || 0) <= Date.now()).length;
      const rows = list.map((w) => `<tr>
        <td class="w">${esc(w.word)}</td><td>${esc(w.pinyin || "")}</td><td>${esc(w.meaning || "")}${!w.meaning ? '<span class="muted small">(chưa có nghĩa)</span>' : ""}</td>
        <td class="zh small muted">${esc(w.example || "")}</td>
        <td style="white-space:nowrap"><button class="btn ghost" data-edit="${w.id}">Sửa</button><button class="btn ghost danger" data-del="${w.id}">Xóa</button></td></tr>`).join("");
      render("vocab", `
        <div class="row"><h1 style="margin:0">Sổ từ vựng</h1><span class="spacer"></span>
          <button class="btn" id="add">＋ Thêm từ</button>
          <a class="btn primary" href="#/flashcards">Ôn flashcard (${due})</a></div>
        <p class="muted small">Tổng ${vocab().length} từ. Mẹo: ở trang chữa bài, bôi đen từ trong script để lưu nhanh.</p>
        <div class="card mt">
          <div class="field"><input id="q" placeholder="Tìm theo chữ Hán, pinyin hoặc nghĩa…" value="${esc(q)}"></div>
          ${list.length ? `<div class="table-wrap"><table class="list"><thead><tr><th>Từ</th><th>Pinyin</th><th>Nghĩa</th><th>Ví dụ</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="empty">Chưa có từ nào.</div>`}
        </div>`);
      const qi = document.getElementById("q");
      qi.addEventListener("input", () => { q = qi.value; draw(); const n = document.getElementById("q"); n.focus(); n.setSelectionRange(q.length, q.length); });
      document.getElementById("add").addEventListener("click", () => openWordModal({ word: "" }, draw));
      $app.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => openWordModal(vocab().find((w) => w.id === b.dataset.edit), draw)));
      $app.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
        if (!confirm("Xóa từ này?")) return; saveVocab(vocab().filter((w) => w.id !== b.dataset.del)); draw();
      }));
    };
    draw();
  }

  /* ================= Flashcards (lặp lại ngắt quãng) ================= */
  // box: 0..6 → khoảng cách ôn (ngày)
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30];
  function grade(w, g) {
    // g: 0 Quên, 1 Khó, 2 Nhớ, 3 Dễ
    let box = w.box || 0;
    if (g === 0) box = 0;
    else if (g === 1) box = Math.max(1, box);
    else if (g === 2) box = Math.min(6, box + 1);
    else box = Math.min(6, box + 2);
    w.box = box; w.reps = (w.reps || 0) + 1;
    w.due = g === 0 ? Date.now() + 60 * 1000 : Date.now() + INTERVALS[box] * DAY;
    return w;
  }

  function pageFlash() {
    let queue = vocab().filter((w) => (w.due || 0) <= Date.now()).sort(() => Math.random() - 0.5).map((w) => w.id);
    let flipped = false, reviewed = 0, mode = "due";
    const draw = () => {
      const list = vocab();
      const w = list.find((x) => x.id === queue[0]);
      if (!w) {
        render("flashcards", `<div class="flash-wrap"><h1>Flashcard</h1>
          <div class="card mt empty">${reviewed ? `🎉 Đã ôn xong ${reviewed} thẻ hôm nay!` : list.length ? "Không có thẻ nào cần ôn lúc này." : "Sổ từ đang trống. Hãy lưu từ khi chữa bài."}
          ${list.length ? `<div class="mt"><button class="btn" id="all">Ôn tất cả ${list.length} từ</button></div>` : ""}</div></div>`);
        const b = document.getElementById("all");
        if (b) b.addEventListener("click", () => { mode = "all"; queue = vocab().sort(() => Math.random() - 0.5).map((x) => x.id); draw(); });
        return;
      }
      render("flashcards", `<div class="flash-wrap">
        <div class="row"><h1 style="margin:0">Flashcard</h1><span class="spacer"></span><span class="muted small">Còn ${queue.length} thẻ${mode === "all" ? " (ôn tất cả)" : ""}</span></div>
        <div class="flash mt" id="card">
          <div class="word">${esc(w.word)}</div>
          ${flipped ? `<div class="py">${esc(w.pinyin || "")}</div><div class="mean">${esc(w.meaning || "(chưa có nghĩa)")}</div>${w.example ? `<div class="ex">${esc(w.example)}</div>` : ""}` : `<div class="muted small mt">Bấm vào thẻ hoặc phím Space để lật</div>`}
        </div>
        ${flipped ? `<div class="grade">
          <button class="g0" data-g="0">Quên<small>1 phút</small></button>
          <button class="g1" data-g="1">Khó<small>${INTERVALS[Math.max(1, w.box || 0)]} ngày</small></button>
          <button class="g2" data-g="2">Nhớ<small>${INTERVALS[Math.min(6, (w.box || 0) + 1)]} ngày</small></button>
          <button class="g3" data-g="3">Dễ<small>${INTERVALS[Math.min(6, (w.box || 0) + 2)]} ngày</small></button>
        </div>` : ""}
      </div>`);
      document.getElementById("card").addEventListener("click", () => { flipped = !flipped; draw(); });
      $app.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => doGrade(+b.dataset.g)));
    };
    const doGrade = (g) => {
      const list = vocab();
      const w = list.find((x) => x.id === queue[0]); if (!w) return;
      grade(w, g); saveVocab(list);
      queue.shift();
      if (g === 0) queue.push(w.id); // gặp lại trong lượt này
      reviewed++; flipped = false; draw();
    };
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); flipped = !flipped; draw(); }
      else if (flipped && ["1", "2", "3", "4"].includes(e.key)) doGrade(+e.key - 1);
    };
    document.addEventListener("keydown", onKey);
    cleanup = () => document.removeEventListener("keydown", onKey);
    draw();
  }

  route();
})();
