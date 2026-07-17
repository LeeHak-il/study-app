/* ============================================================
   data.js — 콘텐츠 데이터 뱅크 (v1.0)
   - 국어 낱말게임(초성퀴즈) 단어 뱅크
   - 영어 단어 퀴즈 뱅크
   - 수학 문제 생성기
   - 구구단 게임 생성기
   ============================================================ */

/* ---------- 국어: 초성 퀴즈 단어 뱅크 (난이도 1~5) ---------- */
var KOREAN_WORDS = {
  1: [
    { word: "사과", hint: "빨갛고 동그란 과일" },
    { word: "학교", hint: "공부하러 가는 곳" },
    { word: "친구", hint: "함께 노는 사람" },
    { word: "구름", hint: "하늘에 떠 있는 것" },
    { word: "나무", hint: "뿌리와 잎이 있는 식물" },
    { word: "우산", hint: "비 올 때 쓰는 것" },
    { word: "책상", hint: "공부할 때 쓰는 가구" },
    { word: "강아지", hint: "멍멍 짖는 동물" },
    { word: "바다", hint: "짠물이 가득한 곳" },
    { word: "연필", hint: "글씨 쓰는 도구" }
  ],
  2: [
    { word: "무지개", hint: "비 온 뒤 하늘에 뜨는 일곱 빛깔" },
    { word: "도서관", hint: "책을 빌리는 곳" },
    { word: "냉장고", hint: "음식을 차갑게 보관하는 가전제품" },
    { word: "달리기", hint: "빠르게 뛰는 운동" },
    { word: "눈사람", hint: "겨울에 눈으로 만드는 것" },
    { word: "자전거", hint: "두 바퀴로 타는 탈것" },
    { word: "놀이터", hint: "그네와 미끄럼틀이 있는 곳" },
    { word: "김밥", hint: "밥과 재료를 김에 말아 만든 음식" },
    { word: "달걀", hint: "닭이 낳는 것" },
    { word: "안경", hint: "눈이 나쁠 때 쓰는 것" }
  ],
  3: [
    { word: "대한민국", hint: "우리나라의 이름" },
    { word: "곤충채집", hint: "여름방학 숙제로 자주 하는 것" },
    { word: "온도계", hint: "온도를 재는 도구" },
    { word: "저금통", hint: "동전을 모으는 통" },
    { word: "태극기", hint: "우리나라 국기" },
    { word: "화산폭발", hint: "산에서 용암이 터져 나오는 현상" },
    { word: "지구본", hint: "지구 모양을 본떠 만든 모형" },
    { word: "탐험가", hint: "새로운 곳을 찾아다니는 사람" },
    { word: "현미경", hint: "아주 작은 것을 크게 보는 도구" },
    { word: "박물관", hint: "옛날 물건을 전시하는 곳" }
  ],
  4: [
    { word: "광합성", hint: "식물이 빛으로 양분을 만드는 과정" },
    { word: "삼각형", hint: "세 개의 변으로 이루어진 도형" },
    { word: "온실효과", hint: "지구가 점점 따뜻해지는 현상" },
    { word: "분수식", hint: "분자와 분모로 이루어진 수" },
    { word: "민주주의", hint: "국민이 나라의 주인이 되는 정치 제도" },
    { word: "생태계", hint: "생물과 환경이 서로 영향을 주고받는 체계" },
    { word: "화석연료", hint: "석탄, 석유처럼 옛날 생물로 만들어진 연료" },
    { word: "미세먼지", hint: "공기 중에 떠다니는 아주 작은 먼지" },
    { word: "재활용품", hint: "다시 사용할 수 있도록 만든 물건" },
    { word: "역사유적", hint: "옛날 사람들이 남긴 건축물이나 장소" }
  ],
  5: [
    { word: "지속가능성", hint: "환경을 지키며 오래 유지하는 성질" },
    { word: "인공지능", hint: "사람처럼 생각하도록 만든 컴퓨터 기술" },
    { word: "다문화사회", hint: "여러 나라의 문화가 함께 어울려 사는 사회" },
    { word: "기후변화", hint: "지구의 날씨 패턴이 크게 바뀌는 것" },
    { word: "헌법재판소", hint: "법이 헌법에 맞는지 판단하는 기관" },
    { word: "생물다양성", hint: "여러 종류의 생물이 함께 존재하는 정도" },
    { word: "정보통신망", hint: "정보를 주고받는 통신 연결망" },
    { word: "경제성장률", hint: "경제가 얼마나 성장했는지 나타내는 비율" },
    { word: "국제기구", hint: "여러 나라가 함께 만든 조직" },
    { word: "환경오염", hint: "자연이 더러워지고 훼손되는 것" }
  ]
};

/* ---------- 영어: 단어 뜻 맞추기 뱅크 (난이도 1~5) ---------- */
var ENGLISH_WORDS = {
  1: [
    { word: "apple", meaning: "사과" }, { word: "book", meaning: "책" },
    { word: "cat", meaning: "고양이" }, { word: "dog", meaning: "개" },
    { word: "egg", meaning: "달걀" }, { word: "fish", meaning: "물고기" },
    { word: "house", meaning: "집" }, { word: "milk", meaning: "우유" },
    { word: "sun", meaning: "태양" }, { word: "tree", meaning: "나무" }
  ],
  2: [
    { word: "school", meaning: "학교" }, { word: "friend", meaning: "친구" },
    { word: "family", meaning: "가족" }, { word: "morning", meaning: "아침" },
    { word: "window", meaning: "창문" }, { word: "flower", meaning: "꽃" },
    { word: "bicycle", meaning: "자전거" }, { word: "weather", meaning: "날씨" },
    { word: "kitchen", meaning: "부엌" }, { word: "holiday", meaning: "휴일" }
  ],
  3: [
    { word: "library", meaning: "도서관" }, { word: "science", meaning: "과학" },
    { word: "history", meaning: "역사" }, { word: "musician", meaning: "음악가" },
    { word: "hospital", meaning: "병원" }, { word: "airport", meaning: "공항" },
    { word: "customer", meaning: "손님" }, { word: "vegetable", meaning: "채소" },
    { word: "adventure", meaning: "모험" }, { word: "language", meaning: "언어" }
  ],
  4: [
    { word: "environment", meaning: "환경" }, { word: "community", meaning: "공동체" },
    { word: "government", meaning: "정부" }, { word: "temperature", meaning: "온도" },
    { word: "experiment", meaning: "실험" }, { word: "continent", meaning: "대륙" },
    { word: "population", meaning: "인구" }, { word: "technology", meaning: "기술" },
    { word: "instrument", meaning: "악기, 도구" }, { word: "discovery", meaning: "발견" }
  ],
  5: [
    { word: "civilization", meaning: "문명" }, { word: "atmosphere", meaning: "대기" },
    { word: "responsibility", meaning: "책임감" }, { word: "communication", meaning: "의사소통" },
    { word: "independence", meaning: "독립" }, { word: "geography", meaning: "지리학" },
    { word: "opportunity", meaning: "기회" }, { word: "achievement", meaning: "성취" },
    { word: "consequence", meaning: "결과" }, { word: "imagination", meaning: "상상력" }
  ]
};

/* ---------- 유틸 ---------- */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

/* ---------- 수학 문제 생성기 (난이도 1~5) ---------- */
function generateMathProblem(level) {
  var a, b, c, q, ans, ops;
  switch (level) {
    case 1: // 1자리 덧셈/뺄셈 (받아올림 없음)
      ops = shuffleArray(["+", "-"])[0];
      if (ops === "+") {
        a = randInt(1, 5); b = randInt(1, 4 - (a > 5 ? 0 : 0));
        a = randInt(1, 8); b = randInt(1, 9 - a);
        q = a + " + " + b; ans = a + b;
      } else {
        a = randInt(2, 9); b = randInt(1, a);
        q = a + " - " + b; ans = a - b;
      }
      break;
    case 2: // 2자리 덧셈/뺄셈 (받아올림 포함)
      ops = shuffleArray(["+", "-"])[0];
      a = randInt(10, 99); b = randInt(10, 99);
      if (ops === "-" && b > a) { var t = a; a = b; b = t; }
      q = a + " " + ops + " " + b; ans = ops === "+" ? a + b : a - b;
      break;
    case 3: // 2자리x1자리 곱셈 / 나눗셈(나머지 없음)
      ops = shuffleArray(["*", "/"])[0];
      if (ops === "*") {
        a = randInt(10, 50); b = randInt(2, 9);
        q = a + " × " + b; ans = a * b;
      } else {
        b = randInt(2, 9); ans = randInt(2, 20); a = b * ans;
        q = a + " ÷ " + b; 
      }
      break;
    case 4: // 3자리 덧셈/뺄셈, 2자리x2자리 곱셈
      ops = shuffleArray(["+", "-", "*"])[0];
      if (ops === "*") {
        a = randInt(11, 30); b = randInt(11, 30);
        q = a + " × " + b; ans = a * b;
      } else {
        a = randInt(100, 999); b = randInt(100, 999);
        if (ops === "-" && b > a) { var t2 = a; a = b; b = t2; }
        q = a + " " + ops + " " + b; ans = ops === "+" ? a + b : a - b;
      }
      break;
    case 5: // 혼합 연산 (괄호, 나머지 있는 나눗셈)
      var pattern = randInt(1, 3);
      if (pattern === 1) {
        a = randInt(2, 12); b = randInt(2, 12); c = randInt(1, 20);
        q = "(" + a + " + " + b + ") × " + c;
        ans = (a + b) * c;
      } else if (pattern === 2) {
        a = randInt(20, 99); b = randInt(2, 9);
        q = a + " ÷ " + b + " (몫을 정수로, 나머지는 버림)";
        ans = Math.floor(a / b);
      } else {
        a = randInt(50, 300); b = randInt(2, 20); c = randInt(2, 20);
        q = a + " - " + b + " × " + c;
        ans = a - b * c;
      }
      break;
  }
  return { question: q, answer: ans };
}

/* ---------- 구구단 게임 생성기 (난이도 1~5) ---------- */
function getGugudanRange(level) {
  if (level === 1) return [2, 3, 4];
  if (level === 2) return [2, 3, 4, 5, 6];
  if (level === 3) return [2, 3, 4, 5, 6, 7, 8, 9];
  if (level === 4) return [2, 3, 4, 5, 6, 7, 8, 9];
  return [2, 3, 4, 5, 6, 7, 8, 9];
}
function generateGugudanProblem(level) {
  var range = getGugudanRange(level);
  var a = range[randInt(0, range.length - 1)];
  var b = randInt(1, 9);
  // 난이도 5: 곱셈/역산(나눗셈) 혼합
  if (level === 5 && Math.random() < 0.5) {
    var product = a * b;
    return { question: product + " ÷ " + a + " = ?", answer: b };
  }
  return { question: a + " × " + b + " = ?", answer: a * b };
}

/* ---------- 낱말/영어 퀴즈용 보기 만들기 (오답 3개 + 정답 1개) ---------- */
function buildChoices(correctMeaning, allBank) {
  var pool = [];
  for (var lvl in allBank) {
    allBank[lvl].forEach(function (item) {
      var m = item.meaning !== undefined ? item.meaning : item.word;
      if (m !== correctMeaning && pool.indexOf(m) === -1) pool.push(m);
    });
  }
  var wrongs = shuffleArray(pool).slice(0, 3);
  var choices = shuffleArray(wrongs.concat([correctMeaning]));
  return choices;
}

/* ============================================================
   요정이 챗봇 응답 데이터 (규칙 기반, 실제 AI 아님)
   - 키워드 매칭으로만 동작하는 안전한 스크립트 챗봇
   - 우선순위가 높은 카테고리부터 순서대로 검사
   ============================================================ */
var MASCOT_CATEGORIES = [
  {
    name: "greeting",
    keywords: ["안녕", "하이", "헬로", "반가워"],
    replies: [
      "안녕! 나는 공부요정이야 🧚 오늘도 만나서 반가워!",
      "안녕하세요! 오늘 하루도 힘차게 시작해볼까?",
      "하이하이! 요정이가 기다리고 있었어 ✨"
    ]
  },
  {
    name: "bye",
    keywords: ["안녕히", "잘가", "빠이", "다음에 봐", "또 만나"],
    replies: [
      "다음에 또 놀러 와! 안녕~ 👋",
      "잘가! 오늘도 애썼어, 다음에 또 봐!",
      "빠이빠이! 요정이가 기다리고 있을게 🧚"
    ]
  },
  {
    name: "thanks",
    keywords: ["고마워", "고맙", "땡큐"],
    replies: [
      "천만에! 언제든 불러줘 😊",
      "그렇게 말해주니 요정이도 기분 좋다!",
      "고맙긴, 우리 계속 같이 공부하자!"
    ]
  },
  {
    name: "topic_kamen_rider",
    keywords: ["가면라이더", "라이더"],
    replies: [
      "가면라이더 좋아하는구나! 요즘은 '가면라이더 젯츠'가 방영 중이래. 어떤 라이더를 제일 좋아해?",
      "가면라이더는 1971년부터 이어져 온 정말 오래된 시리즈래! 새로운 라이더가 나올 때마다 신기하지 않아?",
      "변신 벨트로 변신하는 장면 볼 때마다 두근두근하지! 나도 구경하고 싶다 😄"
    ]
  },
  {
    name: "topic_power_rangers",
    keywords: ["파워레인저", "전대"],
    replies: [
      "파워레인저 팬이구나! 요즘은 '파워레인저 넘버원포스'가 방영 중이래. 어떤 색 레인저가 제일 멋있어?",
      "다섯 명이 힘을 합쳐서 커다란 로봇으로 합체하는 장면이 제일 신나지?",
      "파워레인저는 일본 슈퍼전대 시리즈를 미국에서 새롭게 만든 거래, 신기하지!"
    ]
  },
  {
    name: "topic_roblox",
    keywords: ["로블록스", "로블럭스"],
    replies: [
      "로블록스 하는구나! 요즘 피쉬잇이랑 블록스피스, 입양하세요 같은 게임이 인기가 많대. 뭐 하고 놀아?",
      "로블록스에서 친구들이랑 같이 놀 때가 제일 재밌지! 그런데 낯선 사람이 이상한 말을 걸면 꼭 부모님께 먼저 말씀드리는 게 좋아.",
      "브룩헤븐이나 99 나이트 인 더 포레스트도 인기가 많다던데, 해봤어?"
    ]
  },
  {
    name: "compliment_mascot",
    keywords: ["귀여워", "예쁘다", "좋아해", "최고야"],
    replies: [
      "히히 고마워! 나도 너가 최고라고 생각해 ⭐",
      "정말?! 요정이 기분이 하늘을 날아갈 것 같아!",
      "너가 그렇게 말해주니 오늘 하루가 행복해졌어!"
    ]
  },
  {
    name: "feeling_tired",
    keywords: ["힘들어", "지쳤", "피곤", "하기싫", "귀찮"],
    replies: [
      "많이 힘들었구나. 잠깐 쉬었다가 다시 해도 괜찮아!",
      "오늘은 조금만 해도 충분해. 무리하지 마!",
      "힘든 날도 있는 법이야. 물 한 잔 마시고 다시 해볼까?"
    ]
  },
  {
    name: "feeling_hard",
    keywords: ["어려워", "모르겠", "못하겠", "틀렸", "실수"],
    replies: [
      "틀려도 괜찮아! 틀리면서 배우는 거야 💪",
      "어려운 문제는 난이도를 한 단계 낮춰서 연습해봐도 좋아!",
      "천천히 해도 돼. 요정이는 너를 응원하고 있어!"
    ]
  },
  {
    name: "feeling_good",
    keywords: ["재밌", "신나", "좋아", "잘했", "최고", "이겼"],
    replies: [
      "우와 신난다! 그 기분 그대로 계속 가보자 🎉",
      "잘하고 있어! 요정이도 덩달아 기분이 좋아지네!",
      "역시! 오늘 컨디션이 최고인가봐!"
    ]
  },
  {
    name: "how_are_you",
    keywords: ["뭐해", "잘 지내", "잘지내", "심심"],
    replies: [
      "나는 여기서 너 오기만 기다리고 있었지! 심심하면 문제 풀러 갈까?",
      "요정이는 오늘도 신나! 너는 오늘 기분이 어때?",
      "심심하면 낱말게임이나 구구단 게임 어때? 재밌을 거야!"
    ]
  },
  {
    name: "who_are_you",
    keywords: ["누구야", "이름이 뭐", "너는 누구"],
    replies: [
      "나는 공부요정이야! 네가 공부할 때 옆에서 응원해주는 친구지 🧚",
      "요정이라고 불러줘! 앞으로 잘 부탁해!"
    ]
  },
  {
    name: "subject_math",
    keywords: ["수학", "덧셈", "뺄셈", "곱셈", "나눗셈"],
    replies: [
      "수학이 궁금하구나! 홈 화면에서 수학 카드를 눌러봐 ➕",
      "수학은 매일 조금씩 하면 실력이 쑥쑥 늘어! 한번 도전해볼까?"
    ]
  },
  {
    name: "subject_korean",
    keywords: ["국어", "낱말", "초성"],
    replies: [
      "낱말게임 좋아! 초성 힌트 보고 낱말 맞히는 재미가 쏠쏠하지 🔤",
      "국어 낱말게임에서 새로운 단어를 많이 배워보자!"
    ]
  },
  {
    name: "subject_english",
    keywords: ["영어", "english"],
    replies: [
      "영어 단어 공부하러 갈까? 4지선다라서 어렵지 않을 거야 🔠",
      "영어는 매일 몇 개씩만 외워도 금방 늘어!"
    ]
  },
  {
    name: "subject_gugudan",
    keywords: ["구구단"],
    replies: [
      "구구단 게임 재밌지! 빠르게 풀다 보면 저절로 외워져 🎮",
      "구구단은 반복이 최고야. 오늘도 한 판 해볼까?"
    ]
  }
];

var MASCOT_FALLBACK = [
  "오호, 그렇구나! 오늘은 어떤 과목을 공부해볼까?",
  "재밌는 이야기네! 우리 문제 풀면서 더 이야기하자 😊",
  "그렇구나! 요정이는 항상 네 편이야. 힘내자!",
  "음... 그건 선생님이나 부모님이랑 이야기해보는 것도 좋을 것 같아. 우리는 같이 공부하는 거 어때?"
];

var MASCOT_DYNAMIC_KEYWORDS = {
  sticker: ["스티커", "몇 개 모았", "몇개 모았"],
  recommend: ["뭐 할까", "뭐할까", "추천해줘", "뭐 공부", "뭐공부", "무슨 공부"]
};
