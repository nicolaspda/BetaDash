<template>
  <div class="main flex flex-col p-2 mt-2">
    <ContatosDonut />
    <hr />
    <div class="evolve py-8">
      <p class="text-lg font-semibold text-black">Evolução da base</p>
      <ContatosEvolve />
    </div>
    <hr />
    <div class="temporal py-8">
      <p class="text-lg font-semibold text-black">Progressão de contatos</p>
      <ContatosTemporal />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
