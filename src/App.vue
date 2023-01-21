<template>
  <b-container>
    <b-row class="text-center">
      <b-col> {{ problemString }}{{ currentAnswer }} </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button @click="add('7')">7</b-button>
      </b-col>
      <b-col>
        <b-button @click="add('8')">8</b-button>
      </b-col>
      <b-col>
        <b-button @click="add('9')">9</b-button>
      </b-col>
      <b-col>
        <b-button @click="doNothing">/</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button @click="add('4')">4</b-button>
      </b-col>
      <b-col>
        <b-button @click="add('5')">5</b-button>
      </b-col>
      <b-col>
        <b-button @click="add('6')">6</b-button>
      </b-col>
      <b-col>
        <b-button @click="doNothing">*</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button @click="add('1')">1</b-button>
      </b-col>
      <b-col>
        <b-button @click="add('2')">2</b-button>
      </b-col>
      <b-col>
        <b-button @click="add('3')">3</b-button>
      </b-col>
      <b-col>
        <b-button @click="doNothing">-</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col> </b-col>
      <b-col>
        <b-button @click="add('0')">0</b-button>
      </b-col>
      <b-col>
        <b-button @click="check">=</b-button>
      </b-col>
      <b-col>
        <b-button @click="doNothing">+</b-button>
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
