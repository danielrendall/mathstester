<template>
  <b-container>
    <b-row class="text-center">
      <b-col>
        {{ problem }}
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button @click="newProblem">7</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">8</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">9</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">/</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button @click="newProblem">4</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">5</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">6</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">*</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button @click="newProblem">1</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">2</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">3</b-button>
      </b-col>
      <b-col>
        <b-button @click="newProblem">-</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>

      </b-col>
      <b-col>
        <b-button @click="newProblem">0</b-button>
      </b-col>
      <b-col>

      </b-col>
      <b-col>
        <b-button @click="newProblem">+</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import { BButton, BContainer, BRow, BCol } from "bootstrap-vue-next";
import type {Ref} from "vue";
import {ref} from "vue";

import generateProblem from "@/problemGenerator";

const problem: Ref<string> = ref('')

function newProblem() {
  problem.value = generateProblem()
}

</script>
