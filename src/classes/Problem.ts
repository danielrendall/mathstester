import type { Op } from "@/models/Op";

export type Problem = {
  x: number;
  y: number;
  op: Op;
  answer: number;
};
