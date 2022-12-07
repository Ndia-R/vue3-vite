export type AptitudeTest = {
  id: number;
  user: {
    id: string;
    name: string;
    kana: string;
  };
  test: {
    id: number;
    name: string;
    score: number;
  };
};

export type CreateAptitudeTestDto = {
  userId: string;
  testId: number;
  score: number;
};
