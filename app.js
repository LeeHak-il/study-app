/* ============================================================
   app.js — 메인 애플리케이션 로직 (v1.0)
   저장소: localStorage (기기별 저장, 서버 불필요)
   ============================================================ */

/* ---------- 전역 상태 ---------- */
var STORAGE_PROFILES = "studyapp_profiles";
var STORAGE_LAST_PROFILE = "studyapp_lastProfileId";
var currentProfile = null;
var newProfilePhotoData = null;   // 새 프로필 생성 시 선택한 사진 (dataURL)
var photoChangeTargetId = null;   // 기존 프로필 사진 변경 대상 id

var quiz = {
  subject: null,      // 'math' | 'korean' | 'sentence' | 'english' | 'gugudan'
  level: null,        // 1~5
  mode: null,         // 'time' | 'count'
  targetValue: null,  // 분 또는 문제수
  correct: 0,
  total: 0,
  startTime: null,
  endAt: null,         // time 모드일 때 종료 시각(ms)
  timerHandle: null,
  currentProblem: null,
  currentSpeakText: null, // 영어 단어 발음 듣기용 텍스트
  usedWords: [],
  awaitingNext: false
};

var SUBJECT_LABEL = {
  math: "수학",
  korean: "국어 낱말게임",
  sentence: "국어 문장",
  english: "영어 단어",
  gugudan: "구구단 게임"
};
var CHOSUNG = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

/* ---------- 화면 전환 ---------- */
function showScreen(id) {
  var screens = document.querySelectorAll(".screen");
  for (var i = 0; i < screens.length; i++) screens[i].classList.remove("active");
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

/* ---------- 저장소 헬퍼 ---------- */
function loadProfiles() {
  try {
    var raw = localStorage.getItem(STORAGE_PROFILES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}
function saveProfiles(list) {
  localStorage.setItem(STORAGE_PROFILES, JSON.stringify(list));
}
function getRecords(profileId) {
  try {
    var raw = localStorage.getItem("studyapp_records_" + profileId);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}
function saveRecordEntry(profileId, entry) {
  var list = getRecords(profileId);
  list.unshift(entry);
  if (list.length > 100) list = list.slice(0, 100);
  localStorage.setItem("studyapp_records_" + profileId, JSON.stringify(list));
}
function getStickerCount(profileId) {
  var v = localStorage.getItem("studyapp_stickers_" + profileId);
  return v ? parseInt(v, 10) : 0;
}
function addStickers(profileId, n) {
  var cur = getStickerCount(profileId);
  localStorage.setItem("studyapp_stickers_" + profileId, String(cur + n));
}

/* ---------- 프로필 사진 처리 ---------- */
function resizeImageFile(file, maxSize, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var w = img.width, h = img.height;
      if (w > h) {
        if (w > maxSize) { h = Math.round(h * (maxSize / w)); w = maxSize; }
      } else {
        if (h > maxSize) { w = Math.round(w * (maxSize / h)); h = maxSize; }
      }
      var canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function handleNewPhotoSelect(inputEl) {
  var file = inputEl.files && inputEl.files[0];
  if (!file) return;
  resizeImageFile(file, 200, function (dataUrl) {
    newProfilePhotoData = dataUrl;
    var preview = document.getElementById("newPhotoPreview");
    preview.innerHTML = '<img src="' + dataUrl + '" alt="프로필 사진 미리보기">';
    document.getElementById("newPhotoRemoveBtn").classList.remove("hidden");
  });
}
function removeNewPhoto() {
  newProfilePhotoData = null;
  document.getElementById("newPhotoPreview").innerHTML = "👤";
  document.getElementById("newPhotoRemoveBtn").classList.add("hidden");
  document.getElementById("newProfilePhoto").value = "";
}
function changeProfilePhoto(id, event) {
  event.stopPropagation();
  photoChangeTargetId = id;
  document.getElementById("profilePhotoChangeInput").click();
}
function handleExistingPhotoSelect(inputEl) {
  var file = inputEl.files && inputEl.files[0];
  if (!file || !photoChangeTargetId) return;
  resizeImageFile(file, 200, function (dataUrl) {
    var profiles = loadProfiles();
    var p = profiles.filter(function (x) { return x.id === photoChangeTargetId; })[0];
    if (p) {
      p.photo = dataUrl;
      saveProfiles(profiles);
      renderProfileList();
    }
    photoChangeTargetId = null;
    inputEl.value = "";
  });
}

/* ---------- 프로필 화면 ---------- */
function renderProfileList() {
  var profiles = loadProfiles();
  var box = document.getElementById("profileList");
  box.innerHTML = "";
  if (profiles.length === 0) {
    var empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "아직 프로필이 없어요. 아래에서 새로 만들어 보세요!";
    box.appendChild(empty);
    return;
  }
  profiles.forEach(function (p) {
    var card = document.createElement("div");
    card.className = "profile-card";
    card.onclick = function () { selectProfile(p.id); };

    var avatarWrap = document.createElement("div");
    avatarWrap.className = "profile-avatar-wrap";

    var avatar;
    if (p.photo) {
      avatar = document.createElement("img");
      avatar.className = "profile-avatar has-photo";
      avatar.src = p.photo;
      avatar.alt = p.nickname;
    } else {
      avatar = document.createElement("div");
      avatar.className = "profile-avatar";
      avatar.textContent = p.nickname.charAt(0);
    }
    avatarWrap.appendChild(avatar);

    var editBtn = document.createElement("button");
    editBtn.className = "avatar-edit-btn";
    editBtn.type = "button";
    editBtn.textContent = "✎";
    editBtn.onclick = function (e) { changeProfilePhoto(p.id, e); };
    avatarWrap.appendChild(editBtn);

    var meta = document.createElement("div");
    meta.className = "profile-meta";
    var nm = document.createElement("div");
    nm.className = "profile-name";
    nm.textContent = p.nickname;
    var gr = document.createElement("div");
    gr.className = "profile-grade";
    var metaParts = [];
    if (p.school) metaParts.push(p.school);
    metaParts.push(p.grade + "학년");
    if (p.classNum) metaParts.push(p.classNum + "반");
    if (p.number) metaParts.push(p.number + "번");
    gr.textContent = metaParts.join(" ") + (p.realName ? " · " + p.realName : "");
    meta.appendChild(nm); meta.appendChild(gr);

    var del = document.createElement("button");
    del.className = "profile-delete";
    del.textContent = "삭제";
    del.onclick = function (e) { e.stopPropagation(); deleteProfile(p.id); };

    card.appendChild(avatarWrap);
    card.appendChild(meta);
    card.appendChild(del);
    box.appendChild(card);
  });
}
function createProfile() {
  var school = document.getElementById("newProfileSchool").value.trim();
  var grade = parseInt(document.getElementById("newProfileGrade").value, 10);
  var classNum = document.getElementById("newProfileClass").value.trim();
  var number = document.getElementById("newProfileNumber").value.trim();
  var realName = document.getElementById("newProfileRealName").value.trim();
  var nickname = document.getElementById("newProfileNickname").value.trim();

  if (!school) { alert("학교를 입력해 주세요."); return; }
  if (!realName) { alert("이름을 입력해 주세요."); return; }
  if (!nickname) { alert("프로필명을 입력해 주세요."); return; }

  var profiles = loadProfiles();
  var id = "p_" + Date.now();
  profiles.push({
    id: id,
    school: school,
    grade: grade,
    classNum: classNum ? parseInt(classNum, 10) : null,
    number: number ? parseInt(number, 10) : null,
    realName: realName,
    nickname: nickname,
    photo: newProfilePhotoData,
    createdAt: Date.now()
  });
  saveProfiles(profiles);

  document.getElementById("newProfileSchool").value = "";
  document.getElementById("newProfileClass").value = "";
  document.getElementById("newProfileNumber").value = "";
  document.getElementById("newProfileRealName").value = "";
  document.getElementById("newProfileNickname").value = "";
  document.getElementById("newProfileGrade").value = "3";
  removeNewPhoto();

  selectProfile(id);
}
function deleteProfile(id) {
  if (!confirm("이 프로필과 학습 기록을 삭제할까요?")) return;
  var profiles = loadProfiles().filter(function (p) { return p.id !== id; });
  saveProfiles(profiles);
  localStorage.removeItem("studyapp_records_" + id);
  localStorage.removeItem("studyapp_stickers_" + id);
  if (localStorage.getItem(STORAGE_LAST_PROFILE) === id) {
    localStorage.removeItem(STORAGE_LAST_PROFILE);
  }
  renderProfileList();
}
function selectProfile(id) {
  var profiles = loadProfiles();
  var p = profiles.filter(function (x) { return x.id === id; })[0];
  if (!p) return;
  currentProfile = p;
  localStorage.setItem(STORAGE_LAST_PROFILE, id);
  document.getElementById("topbarActions").style.display = "flex";
  goToHome();
}
function goToProfileSelect() {
  currentProfile = null;
  document.getElementById("topbarActions").style.display = "none";
  renderProfileList();
  showScreen("screen-profile");
}

/* ---------- 홈 화면 ---------- */
function goToHome() {
  document.getElementById("homeGreeting").textContent =
    currentProfile.nickname + "님, 안녕하세요! (" + currentProfile.school + " " + currentProfile.grade + "학년)";
  var homeAvatar = document.getElementById("homeAvatar");
  if (currentProfile.photo) {
    homeAvatar.innerHTML = '<img src="' + currentProfile.photo + '" alt="' + currentProfile.nickname + '">';
  } else {
    homeAvatar.textContent = currentProfile.nickname.charAt(0);
  }
  renderStickers();
  showScreen("screen-home");
}
function renderStickers() {
  var strip = document.getElementById("stickerStrip");
  strip.innerHTML = "";
  var count = getStickerCount(currentProfile.id);
  var total = 20;
  for (var i = 0; i < total; i++) {
    var s = document.createElement("div");
    s.className = "sticker" + (i < count ? " earned" : "");
    s.textContent = i < count ? "⭐" : "";
    strip.appendChild(s);
  }
}

/* ---------- 요정이 챗봇 (규칙 기반, 실제 AI 아님) ---------- */
var MASCOT_QUICK_REPLIES = ["안녕!", "심심해", "오늘 뭐 할까?", "스티커 몇 개야?", "수학 어려워"];

function goToMascotChat() {
  var win = document.getElementById("chatWindow");
  win.innerHTML = "";
  appendChatBubble("mascot", currentProfile.nickname + "야, 안녕! 나는 공부요정이야 🧚 오늘 하고 싶은 말을 걸어봐!");
  renderMascotQuickReplies();
  document.getElementById("chatInput").value = "";
  showScreen("screen-mascot");
  setTimeout(function () {
    var input = document.getElementById("chatInput");
    if (input) input.focus();
  }, 50);
}
function renderMascotQuickReplies() {
  var box = document.getElementById("chatQuickReplies");
  box.innerHTML = "";
  MASCOT_QUICK_REPLIES.forEach(function (text) {
    var chip = document.createElement("div");
    chip.className = "chat-quick-reply";
    chip.textContent = text;
    chip.onclick = function () { sendMascotMessage(text); };
    box.appendChild(chip);
  });
}
function appendChatBubble(role, text) {
  var win = document.getElementById("chatWindow");
  var bubble = document.createElement("div");
  bubble.className = "chat-bubble " + role;
  bubble.textContent = text;
  win.appendChild(bubble);
  win.scrollTop = win.scrollHeight;
}
function sendMascotMessage(presetText) {
  var input = document.getElementById("chatInput");
  var text = (presetText !== undefined ? presetText : input.value).trim();
  if (!text) return;
  appendChatBubble("user", text);
  input.value = "";
  var reply = getMascotReply(text);
  setTimeout(function () { appendChatBubble("mascot", reply); }, 400);
}
function getMascotReply(text) {
  var lower = text.toLowerCase();

  // 동적 응답: 스티커 개수, 오늘 추천 과목
  for (var i = 0; i < MASCOT_DYNAMIC_KEYWORDS.sticker.length; i++) {
    if (lower.indexOf(MASCOT_DYNAMIC_KEYWORDS.sticker[i]) !== -1) {
      var count = getStickerCount(currentProfile.id);
      return "지금까지 모은 스티커는 " + count + "개야! " + (count > 0 ? "정말 잘하고 있어 ⭐" : "오늘부터 하나씩 모아보자!");
    }
  }
  for (var j = 0; j < MASCOT_DYNAMIC_KEYWORDS.recommend.length; j++) {
    if (lower.indexOf(MASCOT_DYNAMIC_KEYWORDS.recommend[j]) !== -1) {
      var subjects = ["수학", "국어 낱말게임", "영어 단어", "구구단 게임"];
      var pick = subjects[randInt(0, subjects.length - 1)];
      return "오늘은 " + pick + " 어때? 홈 화면에서 카드를 눌러서 시작해봐!";
    }
  }

  // 카테고리 순서대로 키워드 매칭
  for (var c = 0; c < MASCOT_CATEGORIES.length; c++) {
    var cat = MASCOT_CATEGORIES[c];
    for (var k = 0; k < cat.keywords.length; k++) {
      if (lower.indexOf(cat.keywords[k]) !== -1) {
        return cat.replies[randInt(0, cat.replies.length - 1)];
      }
    }
  }

  // 매칭 없으면 기본 응답
  return MASCOT_FALLBACK[randInt(0, MASCOT_FALLBACK.length - 1)];
}

/* ---------- 난이도 선택 화면 ---------- */
function goToDifficulty(subject) {
  quiz.subject = subject;
  document.getElementById("diffTitle").textContent = SUBJECT_LABEL[subject] + " - 난이도 선택";
  var grid = document.getElementById("levelGrid");
  grid.innerHTML = "";
  for (var lv = 1; lv <= 5; lv++) {
    (function (level) {
      var btn = document.createElement("div");
      btn.className = "level-btn";
      var label = document.createElement("div");
      label.className = "lv-label";
      label.textContent = level + "단계";
      var stars = document.createElement("div");
      stars.className = "lv-stars";
      var starStr = "";
      for (var s = 0; s < level; s++) starStr += "★";
      for (var s2 = level; s2 < 5; s2++) starStr += "☆";
      stars.textContent = starStr;
      btn.appendChild(label);
      btn.appendChild(stars);
      btn.onclick = function () { goToSetup(level); };
      grid.appendChild(btn);
    })(lv);
  }
  showScreen("screen-difficulty");
}
function goToDifficultyBack() {
  goToDifficulty(quiz.subject);
}

/* ---------- 설정 화면 (시간/문제수) ---------- */
function goToSetup(level) {
  quiz.level = level;
  quiz.mode = "time";
  document.getElementById("setupModeTime").classList.add("selected");
  document.getElementById("setupModeCount").classList.remove("selected");
  document.getElementById("setupTimeBox").classList.remove("hidden");
  document.getElementById("setupCountBox").classList.add("hidden");
  document.getElementById("setupTimeValue").textContent = "5";
  document.getElementById("setupCountValue").textContent = "10";
  showScreen("screen-setup");
}
function selectSetupMode(mode) {
  quiz.mode = mode;
  document.getElementById("setupModeTime").classList.toggle("selected", mode === "time");
  document.getElementById("setupModeCount").classList.toggle("selected", mode === "count");
  document.getElementById("setupTimeBox").classList.toggle("hidden", mode !== "time");
  document.getElementById("setupCountBox").classList.toggle("hidden", mode !== "count");
}
function changeSetupValue(delta) {
  if (quiz.mode === "time") {
    var el = document.getElementById("setupTimeValue");
    var v = parseInt(el.textContent, 10) + delta;
    if (v < 1) v = 1; if (v > 30) v = 30;
    el.textContent = v;
  } else {
    var el2 = document.getElementById("setupCountValue");
    var v2 = parseInt(el2.textContent, 10) + delta * 5;
    if (v2 < 5) v2 = 5; if (v2 > 50) v2 = 50;
    el2.textContent = v2;
  }
}

/* ---------- 퀴즈 시작/문제 생성 ---------- */
function startQuiz() {
  quiz.targetValue = quiz.mode === "time"
    ? parseInt(document.getElementById("setupTimeValue").textContent, 10)
    : parseInt(document.getElementById("setupCountValue").textContent, 10);
  quiz.correct = 0;
  quiz.total = 0;
  quiz.startTime = Date.now();
  quiz.usedWords = [];
  quiz.awaitingNext = false;

  if (quiz.mode === "time") {
    quiz.endAt = Date.now() + quiz.targetValue * 60 * 1000;
    quiz.timerHandle = setInterval(updateQuizTimer, 500);
  } else {
    document.getElementById("quizTimer").textContent = "";
  }

  showScreen("screen-quiz");
  nextProblem();
}
function updateQuizTimer() {
  var remain = quiz.endAt - Date.now();
  if (remain <= 0) {
    clearInterval(quiz.timerHandle);
    finishQuiz();
    return;
  }
  var mm = Math.floor(remain / 60000);
  var ss = Math.floor((remain % 60000) / 1000);
  document.getElementById("quizTimer").textContent =
    "남은 시간 " + mm + ":" + (ss < 10 ? "0" + ss : ss);
  updateProgressBarTime();
}
function updateProgressBarTime() {
  var total = quiz.targetValue * 60 * 1000;
  var elapsed = total - (quiz.endAt - Date.now());
  var pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
  document.getElementById("quizProgressBar").style.width = pct + "%";
}
function updateProgressBarCount() {
  var pct = Math.min(100, (quiz.total / quiz.targetValue) * 100);
  document.getElementById("quizProgressBar").style.width = pct + "%";
}

function getChosungHint(word) {
  var out = "";
  for (var i = 0; i < word.length; i++) {
    var code = word.charCodeAt(i);
    if (code >= 44032 && code <= 55203) {
      var idx = Math.floor((code - 44032) / 588);
      out += CHOSUNG[idx] + " ";
    } else {
      out += word.charAt(i) + " ";
    }
  }
  return out.trim();
}

function nextProblem() {
  if (quiz.mode === "count" && quiz.total >= quiz.targetValue) {
    finishQuiz();
    return;
  }
  quiz.awaitingNext = false;
  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("quizFeedback").className = "quiz-feedback";
  if (quiz.mode === "count") updateProgressBarCount();

  var inputArea = document.getElementById("quizInputArea");
  var hintEl = document.getElementById("quizHint");
  var qEl = document.getElementById("quizQuestion");
  var speakBtn = document.getElementById("speakWordBtn");
  hintEl.textContent = "";
  speakBtn.classList.add("hidden");
  quiz.currentSpeakText = null;
  qEl.classList.remove("small");

  if (quiz.subject === "math") {
    var p = generateMathProblem(quiz.level);
    quiz.currentProblem = p;
    qEl.textContent = p.question + " =";
    renderTextInput(inputArea, "숫자를 입력하세요");
  } else if (quiz.subject === "gugudan") {
    var g = generateGugudanProblem(quiz.level);
    quiz.currentProblem = g;
    qEl.textContent = g.question;
    renderTextInput(inputArea, "답을 입력하세요");
  } else if (quiz.subject === "korean") {
    var bank = KOREAN_WORDS[quiz.level];
    var pick = pickUnusedWord(bank, "word");
    quiz.currentProblem = { answer: pick.word };
    qEl.textContent = getChosungHint(pick.word);
    hintEl.textContent = "힌트: " + pick.hint;
    renderTextInput(inputArea, "낱말을 입력하세요");
  } else if (quiz.subject === "sentence") {
    if (quiz.level <= 2) {
      var sbank = SENTENCE_FILL_BLANK[quiz.level];
      var spick = pickUnusedWord(sbank, "sentence");
      quiz.currentProblem = { answer: spick.answers };
      qEl.classList.add("small");
      qEl.textContent = spick.sentence;
      hintEl.textContent = "빈칸에 알맞은 낱말을 써보세요";
      renderTextInput(inputArea, "정답을 입력하세요");
    } else {
      var stbank = SENTENCE_SITUATIONS[quiz.level];
      var stpick = pickUnusedWord(stbank, "situation");
      quiz.currentProblem = { answer: stpick.answer };
      qEl.classList.add("small");
      qEl.textContent = stpick.situation;
      hintEl.textContent = "가장 알맞은 행동을 골라보세요";
      var stchoices = shuffleArray(stpick.choices);
      renderChoiceInput(inputArea, stchoices);
    }
  } else if (quiz.subject === "english") {
    var ebank = ENGLISH_WORDS[quiz.level];
    var epick = pickUnusedWord(ebank, "word");
    quiz.currentProblem = { answer: epick.meaning };
    quiz.currentSpeakText = epick.word;
    qEl.textContent = epick.word;
    hintEl.textContent = "이 영어 단어의 뜻은 무엇일까요?";
    speakBtn.classList.remove("hidden");
    var choices = buildChoices(epick.meaning, ENGLISH_WORDS);
    renderChoiceInput(inputArea, choices);
  }
}
function speakCurrentWord() {
  if (!quiz.currentSpeakText) return;
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(quiz.currentSpeakText);
    utter.lang = "en-US";
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  } catch (e) { /* 음성 합성을 지원하지 않는 기기는 조용히 무시 */ }
}
function pickUnusedWord(bank, key) {
  var remaining = bank.filter(function (w) { return quiz.usedWords.indexOf(w[key]) === -1; });
  if (remaining.length === 0) { quiz.usedWords = []; remaining = bank; }
  var pick = remaining[randInt(0, remaining.length - 1)];
  quiz.usedWords.push(pick[key]);
  return pick;
}

function renderTextInput(container, placeholder) {
  container.innerHTML =
    '<input type="text" class="quiz-input" id="quizAnswerInput" placeholder="' + placeholder + '" autocomplete="off">' +
    '<button class="btn btn-primary" id="quizSubmitBtn">확인</button>';
  var input = document.getElementById("quizAnswerInput");
  document.getElementById("quizSubmitBtn").onclick = submitTextAnswer;
  input.onkeydown = function (e) { if (e.key === "Enter") submitTextAnswer(); };
  setTimeout(function () { input.focus(); }, 50);
}
function renderChoiceInput(container, choices) {
  container.innerHTML = '<div class="quiz-choice-grid" id="quizChoiceGrid"></div>';
  var grid = document.getElementById("quizChoiceGrid");
  choices.forEach(function (c) {
    var b = document.createElement("div");
    b.className = "quiz-choice";
    b.textContent = c;
    b.onclick = function () { submitChoiceAnswer(c, b); };
    grid.appendChild(b);
  });
}
function submitTextAnswer() {
  if (quiz.awaitingNext) return;
  var input = document.getElementById("quizAnswerInput");
  var raw = input.value.trim();
  if (raw === "") return;
  var correctAns = quiz.currentProblem.answer;
  var isCorrect;
  if (typeof correctAns === "number") {
    isCorrect = parseInt(raw, 10) === correctAns;
  } else if (Array.isArray(correctAns)) {
    isCorrect = correctAns.indexOf(raw) !== -1;
  } else {
    isCorrect = raw === correctAns;
  }
  handleAnswerResult(isCorrect, correctAns);
}
function submitChoiceAnswer(chosen, btnEl) {
  if (quiz.awaitingNext) return;
  var correctAns = quiz.currentProblem.answer;
  var isCorrect = chosen === correctAns;
  var buttons = document.querySelectorAll(".quiz-choice");
  buttons.forEach(function (b) {
    b.onclick = null;
    if (b.textContent === correctAns) b.classList.add("correct");
    else if (b === btnEl && !isCorrect) b.classList.add("wrong");
  });
  handleAnswerResult(isCorrect, correctAns);
}
function handleAnswerResult(isCorrect, correctAns) {
  quiz.awaitingNext = true;
  quiz.total += 1;
  if (isCorrect) quiz.correct += 1;
  var fb = document.getElementById("quizFeedback");
  var displayAns = Array.isArray(correctAns) ? correctAns[0] : correctAns;
  if (isCorrect) {
    fb.textContent = "정답이에요! 🎉";
    fb.className = "quiz-feedback ok";
  } else {
    fb.textContent = "아쉬워요! 정답은 " + displayAns + " 예요";
    fb.className = "quiz-feedback no";
  }
  if (quiz.mode === "count") updateProgressBarCount();
  setTimeout(function () {
    if (quiz.mode === "time" && Date.now() >= quiz.endAt) { finishQuiz(); return; }
    nextProblem();
  }, 1000);
}

/* ---------- 결과 처리 ---------- */
function finishQuiz() {
  if (quiz.timerHandle) clearInterval(quiz.timerHandle);
  var elapsedSec = Math.round((Date.now() - quiz.startTime) / 1000);
  var accuracy = quiz.total > 0 ? Math.round((quiz.correct / quiz.total) * 100) : 0;

  var earned = 0;
  if (quiz.total > 0 && accuracy >= 70) earned += 1;
  if (accuracy === 100) earned += 1;
  if (earned > 0) addStickers(currentProfile.id, earned);

  saveRecordEntry(currentProfile.id, {
    date: new Date().toISOString(),
    subject: quiz.subject,
    level: quiz.level,
    mode: quiz.mode,
    targetValue: quiz.targetValue,
    correct: quiz.correct,
    total: quiz.total,
    elapsedSec: elapsedSec
  });

  document.getElementById("resultScore").textContent = quiz.correct + " / " + quiz.total;
  document.getElementById("resultDetail").textContent =
    SUBJECT_LABEL[quiz.subject] + " · " + quiz.level + "단계 · 정답률 " + accuracy + "% · " +
    Math.floor(elapsedSec / 60) + "분 " + (elapsedSec % 60) + "초";
  document.getElementById("resultEmoji").textContent = accuracy >= 90 ? "🏆" : accuracy >= 70 ? "🎉" : "💪";

  var stickerBox = document.getElementById("resultStickers");
  stickerBox.innerHTML = "";
  for (var i = 0; i < earned; i++) {
    var s = document.createElement("div");
    s.className = "sticker earned";
    s.textContent = "⭐";
    stickerBox.appendChild(s);
  }
  showScreen("screen-result");
}
function retrySameSetup() {
  showScreen("screen-quiz");
  quiz.correct = 0; quiz.total = 0; quiz.startTime = Date.now(); quiz.usedWords = [];
  document.getElementById("quizProgressBar").style.width = "0%";
  if (quiz.mode === "time") {
    quiz.endAt = Date.now() + quiz.targetValue * 60 * 1000;
    quiz.timerHandle = setInterval(updateQuizTimer, 500);
  }
  nextProblem();
}

/* ---------- 기록 화면 ---------- */
function goToRecords() {
  var records = getRecords(currentProfile.id);
  var totalSessions = records.length;
  var totalCorrect = 0, totalProblems = 0;
  records.forEach(function (r) { totalCorrect += r.correct; totalProblems += r.total; });
  var avgAcc = totalProblems > 0 ? Math.round((totalCorrect / totalProblems) * 100) : 0;

  var summary = document.getElementById("recordSummary");
  summary.innerHTML =
    '<div class="record-box"><div class="num">' + totalSessions + '</div><div class="lbl">학습 횟수</div></div>' +
    '<div class="record-box"><div class="num">' + totalProblems + '</div><div class="lbl">푼 문제 수</div></div>' +
    '<div class="record-box"><div class="num">' + avgAcc + '%</div><div class="lbl">평균 정답률</div></div>' +
    '<div class="record-box"><div class="num">' + getStickerCount(currentProfile.id) + '</div><div class="lbl">획득 스티커</div></div>';

  var log = document.getElementById("recordLog");
  log.innerHTML = "";
  if (records.length === 0) {
    log.innerHTML = '<div class="empty-state">아직 학습 기록이 없어요. 문제를 풀어보세요!</div>';
  } else {
    records.slice(0, 30).forEach(function (r) {
      var item = document.createElement("div");
      item.className = "record-log-item";
      var d = new Date(r.date);
      var dateStr = (d.getMonth() + 1) + "/" + d.getDate() + " " +
        (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" +
        (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
      item.innerHTML =
        '<div><div class="rl-subject">' + SUBJECT_LABEL[r.subject] + ' · ' + r.level + '단계</div>' +
        '<div class="rl-date">' + dateStr + '</div></div>' +
        '<div>' + r.correct + ' / ' + r.total + '</div>';
      log.appendChild(item);
    });
  }
  showScreen("screen-records");
}

/* ---------- 초기 진입 ---------- */
window.onload = function () {
  var lastId = localStorage.getItem(STORAGE_LAST_PROFILE);
  var profiles = loadProfiles();
  var last = profiles.filter(function (p) { return p.id === lastId; })[0];
  if (last) {
    selectProfile(last.id);
  } else {
    goToProfileSelect();
  }
};
