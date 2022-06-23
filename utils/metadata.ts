export type Sections = keyof typeof sections;
const sections = {
  main: "นโยบายหลัก",
  affairs: "ฝ่ายกิจการนักเรียน",
  academic: "ฝ่ายวิชาการ",
  sports: "ฝ่ายกีฬาและนันทนาการ",
  environment: "ฝ่ายสิ่งแวดล้อม",
  information: "ฝ่ายสารสนเทศ",
};

const isSectionValid = (section: string | string[]): section is Sections => {
  return typeof section === "string" && Object.keys(sections).includes(section);
};

const pageDescription: Record<string, string> = {
  "/about":
    "ทุกเรื่องราวเกี่ยวกับภคภ1ส มีคำตอบอยู่ที่นี่ ตั้งแต่สโมสรฟุตบอลที่ชอบ ยันเหตุผลที่ลงเลือกตั้ง",
  "/policy":
    "นโยบายของเรามุ่งเน้นการมีส่วนร่วมของนักเรียนเป็นสำคัญ มาช่วยกันพัฒนาโรงเรียนของเรากันเถอะ !",
  "/survey":
    "เสียงของทุกคนมีค่า มาแสดงความคิดเห็นต่อนโยบายของภคภ1ส เพื่อร่วมกำหนดทิศทางของโรงเรียนไปด้วยกัน",
  "/": "ยินดีต้อนรับสู่เว็บไซต์ที่รวบรวมข้อมูลและนโยบายทั้งหมดของภคภ1ส",
};

const getPageDescription = (pathname: string) => {
  for (let page in pageDescription) {
    if (pathname.startsWith(page)) {
      return pageDescription[page];
    }
  }
};

const FB_URL = "https://www.facebook.com/profile.php?id=100009240238831";
const IG_PERSONAL_URL = "https://www.instagram.com/pakapas_oat";
const IG_CANDIDATE_URL = "https://www.instagram.com/pakapas.the1";

export {
  sections,
  isSectionValid,
  FB_URL,
  IG_PERSONAL_URL,
  IG_CANDIDATE_URL,
  pageDescription,
  getPageDescription,
};
