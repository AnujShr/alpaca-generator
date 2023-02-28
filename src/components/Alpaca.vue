<template>
  <h1 class="font-bold text-5xl uppercase m-10 ml-0">Alpaca Generator</h1>
  <div class="flex space-x-32">
    <div class="flex flex-col">
      <div ref="alpaca" class="relative block max-w-lg mb-5">
        <img v-for="item in Object.keys(options)"
             :key="item"
             :src="`/assets/${item}/${selected[item]}.png`"
             class="absolute top-0 left-0 z-10"
             :class="{'relative' : item === 'backgrounds'}"
             :alt="item">
      </div>
      <div class="flex gap-10">
        <button
            @click="randomize"
            class="bg-white font-bold border-2 border-black  uppercase px-8 py-2 text-black leading-loose border-style">
          Randomize
        </button>
        <button
            class="bg-white font-bold border-2 border-black  uppercase px-8 py-2 text-black leading-loose border-style"
            @click="download">
          Download
        </button>
      </div>
    </div>
    <div class="max-w-lg">
      <div class="font-bold mb-4 uppercase">Accessorize the Alpaca's</div>
      <div class="mb-10">
        <button v-for="item in Object.keys(options)"
                :key="item"
                class="button-style capitalize border-style"
                :class="{active: selectedOption === item}"
                @click="selectedOption = item"
        >{{ item }}
        </button>
      </div>
      <div>
        <div class="font-bold leading-loose uppercase mb-4 ">Style</div>
        <button v-for="style in Object.keys(options[selectedOption])" :key="style"
                :class="{active: selected[selectedOption]=== style }"
                class="button-style capitalize border-style"
                @click="selected[selectedOption] = style"
        >
          {{ style }}
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import {accesorize} from "../configs/config.js";
import {computed, ref} from "vue";
import domtoimage from "dom-to-image-more";


const selectedOption = ref('backgrounds')
let options = ref(accesorize)

const selected = ref({
  backgrounds: 'blue50',
  ears: 'default',
  eyes: 'default',
  hair: 'default',
  leg: 'default',
  mouth: 'default',
  neck: 'default',
  accessories: 'glasses',
  nose: 'default',
})

const borderStyle = computed(() => options.value['backgrounds'][selected.value['backgrounds']]);

const alpaca = ref(null)
const download = () => {
  domtoimage
      .toJpeg(alpaca.value, {quality: 0.95})
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "alpaca.jpeg";
        link.href = dataUrl;
        link.click();
      });
}
const getRandomValues = (obj) => {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];
}
const randomize = () => {
  for (const key in selected.value) {
    let toRandomize = options.value[key];
    if (key === 'backgrounds') {
      toRandomize = Object.keys(options.value['backgrounds']);
    }
    selected.value[key] = getRandomValues(toRandomize)
  }
}

</script>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background: v-bind(borderStyle) !important;;
  @apply text-white
}

.button-style {
  @apply border-2 mb-2 px-8 py-2 bg-white rounded-3xl font-bold leading-loose  mr-2
}

.border-style {
  border-color: v-bind(borderStyle);
}
</style>