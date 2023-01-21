import type { Op } from "@/models/Op";
import type { Problem } from "@/classes/Problem";

export default function generateProblem(): Problem {
  const op = chooseOp();
  const x = chooseInt(1, 9);
  const y = chooseInt(1, 9);
  switch (op) {
    case "+":
      return problem(x, y, "+", x + y);
    case "-":
      return problem(x + y, x, "-", y);
    case "*":
      return problem(x, y, "*", x * y);
    case "/":
      return problem(x * y, x, "/", y);
  }
}

function problem(x: number, y: number, op: Op, answer: number): Problem {
  return { x, y, op, answer };
}

function chooseOp(): Op {
  const r = Math.random();
  if (r < 0.25) {
    return "+";
  } else if (r < 0.5) {
    return "-";
  } else if (r < 0.75) {
    return "*";
  } else {
    return "/";
  }
}

function chooseInt(min: number, max: number) {
  return Math.floor((max - min) * Math.random() + min);
}
