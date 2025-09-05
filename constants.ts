
import type { AngleCategory } from './types';

export const ANGLE_CATEGORIES: AngleCategory[] = [
  {
    title: "📏 زوايا القرب (Distance Shots)",
    angles: [
      { name: "اللقطة القريبة", prompt: "A very close-up shot of the subject in the image." },
      { name: "اللقطة الكاملة", prompt: "A full shot of the subject in the image, showing the entire body from head to toe." },
      { name: "اللقطة البعيدة", prompt: "A long shot of the subject in the image, showing the subject in their surrounding environment." },
    ],
  },
  {
    title: "📐 زوايا الاتجاه (Angles by Position)",
    angles: [
      { name: "الأمامية", prompt: "A front view shot of the subject in the image." },
      { name: "الجانبية", prompt: "A side view (profile) shot of the subject in the image." },
      { name: "ثلاثة أرباع", prompt: "A three-quarter view shot of the subject in the image." },
      { name: "الخلفية", prompt: "A back view shot of the subject in the image." },
    ],
  },
  {
    title: "⬆️⬇️ زوايا الارتفاع (High & Low Angles)",
    angles: [
      { name: "زاوية عالية", prompt: "A high-angle shot of the subject, looking down on them." },
      { name: "عين الطائر", prompt: "A bird's eye view shot, directly from above the subject." },
      { name: "الفوقية", prompt: "An overhead shot, directly from above, often focusing on objects or layout." },
      { name: "زاوية منخفضة", prompt: "A low-angle shot of the subject, looking up at them." },
      { name: "عين الدودة", prompt: "A worm's eye view shot, from ground level looking straight up." },
    ],
  },
  {
    title: "🎭 زوايا خاصة للتأثير (Special Effect Angles)",
    angles: [
      { name: "الزاوية المائلة", prompt: "A Dutch angle shot of the image, with a tilted camera." },
      { name: "السيلويت/الظل", prompt: "A silhouette shot of the subject against a bright background." },
      { name: "الانعكاس", prompt: "A reflection shot, showing the subject's reflection in a surface like water or a mirror." },
      { name: "من فوق الكتف", prompt: "An over-the-shoulder shot, framed from behind a person looking at the subject." },
      { name: "منظور العين", prompt: "A point-of-view (POV) shot, as if seeing through the subject's eyes." },
      { name: "تفصيلة مقربة", prompt: "An extreme close-up or detail shot of a specific feature of the subject." },
    ],
  },
];
