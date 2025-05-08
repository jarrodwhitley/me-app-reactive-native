interface Content {
  month: number;
  day: string;
  title: string;
  keyverse_morning: string;
  keyverse_evening: string;
  body_morning: string;
  body_evening: string;
}

interface SelectedContent {
  title: string;
  keyverse: string;
  body: string;
}

declare module 'content.json' {
  const content: Content[];
  export default content;
}

export type { Content, SelectedContent };
