<template>
  <b-container>
    <b-row class="text-center">
      <b-col
        ><h1>{{ problemString }}{{ currentAnswer }}</h1></b-col
      >
    </b-row>
    <b-row class="text-center my-3">
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('7')">7</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('8')">8</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('9')">9</b-button>
      </b-col>
      <b-col>
        <b-button class="w-100" @click="doNothing">/</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center my-3">
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('4')">4</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('5')">5</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('6')">6</b-button>
      </b-col>
      <b-col>
        <b-button class="w-100" @click="doNothing">*</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center my-3">
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('1')">1</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('2')">2</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('3')">3</b-button>
      </b-col>
      <b-col>
        <b-button class="w-100" @click="doNothing">-</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center my-3">
      <b-col>
        <b-button class="w-100" @click="erase">&lt;</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" class="w-100" @click="add('0')">0</b-button>
      </b-col>
      <b-col>
        <b-button variant="success" class="w-100" @click="check">=</b-button>
      </b-col>
      <b-col>
        <b-button class="w-100" @click="doNothing">+</b-button>
      </b-col>
    </b-row>
    <b-alert variant="success" v-model="showSuccess" dismissible="true"
      >Correct</b-alert
    >
    <b-alert variant="danger" v-model="showFailure" dismissible="true"
      >Wrong</b-alert
    >
  </b-container>
</template>

<script setup lang="ts">
import { BAlert, BButton, BContainer, BRow, BCol } from "bootstrap-vue-next";
import type { ComputedRef, Ref } from "vue";
import { computed, onMounted, ref, watch } from "vue";

import generateProblem from "@/problemGenerator";
import type { Problem } from "@/classes/Problem";

const problem: Ref<Problem | undefined> = ref();

const problemString: ComputedRef<string> = computed(() => {
  if (typeof problem.value !== "undefined") {
    return `${problem.value.x} ${problem.value.op} ${problem.value.y} = `;
  } else {
    return "";
  }
});

const currentAnswer: Ref<number | undefined> = ref();

function newProblem() {
  problem.value = generateProblem();
  currentAnswer.value = undefined;
}

function add(numString: string) {
  const currentNumberString: string = `${currentAnswer.value ?? ""}`;
  const newNumberString = currentNumberString + numString;
  currentAnswer.value = parseInt(newNumberString);
}

function erase() {
  const currentNumberString: string = `${currentAnswer.value ?? ""}`;
  if (currentNumberString.length > 1) {
    currentAnswer.value = parseInt(currentNumberString.substring(0, currentNumberString.length - 1))
  } else {
    currentAnswer.value = undefined;
  }
}

const showSuccess: Ref<boolean> = ref(false);

watch(
  () => showSuccess.value,
  (newVal, oldVal) => {
    if (!newVal && oldVal) {
      newProblem();
    }
  }
);

const showFailure: Ref<boolean> = ref(false);

watch(
  () => showFailure.value,
  (newVal, oldVal) => {
    if (!newVal && oldVal) {
      newProblem();
    }
  }
);

function check() {
  if (
    typeof problem.value !== "undefined" &&
    typeof currentAnswer.value !== "undefined"
  ) {
    if (problem.value?.answer === currentAnswer.value) {
      showSuccess.value = true;
    } else {
      showFailure.value = true;
    }
  }
}

function doNothing() {
  // Do nothing...
}

onMounted(() => newProblem());
</script>
