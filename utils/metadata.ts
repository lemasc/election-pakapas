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

const FB_URL = "https://www.facebook.com/profile.php?id=100009240238831";
const IG_PERSONAL_URL = "https://www.instagram.com/pakapas_oat";
const IG_CANDIDATE_URL = "https://www.instagram.com/pakapas.the1";

export { sections, isSectionValid, FB_URL, IG_PERSONAL_URL, IG_CANDIDATE_URL };
