export interface User {
  id: string;
  nickname: string;
  avatarUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  content: string;
  /** 목록 카드 한 줄 소개 (없으면 content) */
  summary?: string;
  photos: string[];
  authorId: string;
  /** epoch ms */
  createdAt: number;
}

const unsplash = (id: string, w = 1080) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=${w}`;

// design.pen 이미지 (01 메인 · 02 상세 · 04 로그인)
export const photos = {
  kalguksu: unsplash("1790703290407-c9b1495fab1b"),
  sujebi: unsplash("1623961989102-645c3e3d6b16"),
  dakgalbi: unsplash("1624420786331-e5a427e5972d"),
  pajeon: unsplash("1720499035798-e7706e507eb1"),
  baekban: unsplash("1616656899767-e11ba3872176"),
  wonton: unsplash("1763994685090-c0927ff195d1"),
  avatar: unsplash("1658678530179-5bc957a1e315", 200),
};

/** 시드 기준 시각 — 서버 프리렌더와 첫 하이드레이션이 같은 값을 쓰도록 고정 */
export const SEED_NOW = Date.UTC(2026, 9, 23, 3, 0);
const HOUR = 3_600_000;
const DAY = 24 * HOUR;

export const ME_ID = "u-weekend";

export const users: User[] = [
  { id: ME_ID, nickname: "주말드라이버", avatarUrl: photos.avatar },
  { id: "u-guromom", nickname: "구로맘" },
  { id: "u-explorer", nickname: "맛집탐험가" },
  { id: "u-eatout", nickname: "오늘도외식" },
];

const designed: Restaurant[] = [
  {
    id: "gwangmyeong-kalguksu",
    name: "광명 할매 손칼국수",
    address: "경기 광명시 광명로 123번길 8",
    content:
      "토요일 점심에 아이들이랑 다녀왔어요. 할머니가 매일 아침 직접 반죽해서 미는 면이라 쫄깃함이 남달라요.\n\n추천 메뉴는 바지락 칼국수(9,000원)와 감자전이에요. 국물이 맑은데도 진해서 아이들도 한 그릇씩 비웠어요. 가게 뒤편에 차 10대쯤 세울 수 있는 주차장이 있어서 차로 가기 편해요.",
    summary: "매일 아침 직접 미는 면이 쫄깃해요. 바지락 국물 진하고 주차장 넓어요.",
    photos: [photos.kalguksu, photos.wonton, photos.pajeon, photos.baekban],
    authorId: ME_ID,
    createdAt: SEED_NOW - 2 * HOUR,
  },
  {
    id: "siheung-sujebi",
    name: "시흥 갯골 바지락 수제비",
    address: "경기 시흥시 동서로 287",
    content: "갯골공원 산책하고 들르기 딱 좋아요. 아이용 덜 매운 메뉴도 있어요.",
    photos: [photos.sujebi],
    authorId: "u-guromom",
    createdAt: SEED_NOW - DAY,
  },
  {
    id: "wonmi-dakgalbi",
    name: "원미동 골목 숯불 닭갈비",
    address: "경기 부천시 원미구 부일로 45",
    content: "골목 안쪽이라 모르면 못 찾는 곳. 숯불 향이 확실히 달라요.",
    photos: [photos.dakgalbi],
    authorId: "u-explorer",
    createdAt: SEED_NOW - 2 * DAY,
  },
  {
    id: "daebudo-pajeon",
    name: "대부도 바다향 해물파전",
    address: "경기 안산시 단원구 대부황금로 17",
    content: "바다 보면서 먹는 해물파전. 주말 점심엔 30분쯤 기다려요.",
    photos: [photos.pajeon],
    authorId: "u-eatout",
    createdAt: SEED_NOW - 3 * DAY,
  },
  {
    id: "gungpyeong-baekban",
    name: "궁평항 옆 작은 백반집",
    address: "경기 화성시 서신면 궁평항로 1049",
    content: "회센터 말고 바로 옆 백반집이 진짜예요. 반찬이 12가지 나와요.",
    photos: [photos.baekban],
    authorId: ME_ID,
    createdAt: SEED_NOW - 5 * DAY,
  },
];

// 무한 스크롤 시연용 추가 글 — 이미지는 디자인 자산 재사용
const extra: [string, string, string, keyof typeof photos][] = [
  ["오류동 시장 잔치국수", "서울 구로구 오류동 경인로 20길 5", "시장 구경하고 먹는 3,500원 잔치국수. 멸치 육수가 진해요.", "kalguksu"],
  ["안양천 옆 수제비 맛집", "서울 영등포구 양평로 30", "자전거 타고 들르기 좋아요. 감자 수제비가 쫀득해요.", "sujebi"],
  ["광명동굴 앞 닭갈비", "경기 광명시 가학로 85번길 12", "동굴 구경 후에 가족끼리 가기 좋아요. 주차 편해요.", "dakgalbi"],
  ["오이도 빨간등대 전집", "경기 시흥시 오이도로 175", "노을 보면서 먹는 굴전이 일품이에요.", "pajeon"],
  ["제부도 바다 정식", "경기 화성시 서신면 제부로 290", "물때 맞춰 들어가야 해요. 생선구이 정식 추천.", "baekban"],
  ["가산 골목 완탕면", "서울 금천구 가산로 99", "점심시간 지나면 한산해요. 완탕이 큼직해요.", "wonton"],
  ["부천 상동 칼제비", "경기 부천시 상동로 120", "칼국수와 수제비를 한 그릇에. 김치가 맛있어요.", "kalguksu"],
  ["물왕저수지 닭볶음탕", "경기 시흥시 동서로 857", "저수지 드라이브 코스 끝에 있어요. 2인분도 넉넉해요.", "dakgalbi"],
  ["탄도항 해물칼국수", "경기 안산시 단원구 선감로 50", "누에섬 산책 후 따끈한 국물 한 그릇.", "sujebi"],
  ["의왕 왕송호수 백반", "경기 의왕시 왕송호수로 300", "레일바이크 타고 나서 먹기 좋아요. 반찬 리필 돼요.", "baekban"],
  ["개봉동 숨은 파전집", "서울 구로구 개봉로 3길 14", "막걸리 없이도 파전만으로 충분해요.", "pajeon"],
  ["소래포구 완탕 국수", "인천 남동구 소래역로 12", "포구 구경 후 간단하게 먹기 좋아요.", "wonton"],
  ["수리산 아래 칼국수", "경기 군포시 수리산로 66", "등산객 맛집. 보리밥이 같이 나와요.", "kalguksu"],
  ["궁동 주택가 닭갈비", "서울 구로구 궁동 연동로 18", "동네 주민만 아는 곳이라 조용해요.", "dakgalbi"],
  ["월곶 포구 바지락죽", "경기 시흥시 월곶해안로 40", "아침 일찍 열어요. 아이들도 잘 먹어요.", "sujebi"],
  ["남한산성 닭백숙", "경기 광주시 남한산성면 산성로 731", "산성 한 바퀴 돌고 먹는 백숙이 최고예요.", "baekban"],
  ["영종도 해변 해물전", "인천 중구 마시란로 22", "바다 보면서 먹는 해물전. 주차장 넓어요.", "pajeon"],
  ["철산동 새벽 국숫집", "경기 광명시 철산로 30", "새벽 6시부터 열어요. 출근 전에 한 그릇.", "wonton"],
  ["화성 공룡알 화석지 국수", "경기 화성시 송산면 공룡로 659", "아이들 체험 후 들르기 좋아요.", "kalguksu"],
];
const others = ["u-guromom", "u-explorer", "u-eatout"];

export const seedRestaurants: Restaurant[] = [
  ...designed,
  ...extra.map(([name, address, content, photo], i) => ({
    id: `seed-${i + 1}`,
    name,
    address,
    content,
    photos: [photos[photo]],
    // 내 글은 첫 추가 글 1개만 (05 마이 페이지: 3곳)
    authorId: i === 0 ? ME_ID : others[i % others.length],
    createdAt: SEED_NOW - (6 + i) * DAY,
  })),
];

/** 주소 검색 시연 데이터 (카카오 로컬 API 대체) */
export const addressBook = [
  ...designed.map((r) => r.address),
  "서울 구로구 구로중앙로 152",
  "서울 구로구 디지털로 300",
  "서울 금천구 시흥대로 291",
  "경기 광명시 오리로 613",
  "경기 부천시 길주로 210",
  "경기 안산시 단원구 화랑로 387",
  "인천 남동구 소래역로 12",
];
