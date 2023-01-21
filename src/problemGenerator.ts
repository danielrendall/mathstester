import type { Op } from "@/models/Op";

export default function generateProblem(): string {

    const op = chooseOp()
    const x = chooseInt(1, 9)
    const y = chooseInt(1, 9)
    switch (op) {
        case "+":
            return `${x} + ${y} = ${x + y}`
        case "-":
            return `${x + y} - ${x} = ${y}`
        case "*":
            return `${x} * ${y} = ${x * y}`
        case "/":
            return `${x * y} / ${x} = ${y}`
    }
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
    return Math.floor((max - min) * Math.random() + min)
}