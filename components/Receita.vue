<template>
  <div class="main flex flex-col p-2 mt-2 animate-fadein animate-duration-300">
    <div class="py-8">
      <p class="text-lg text-black">Receita total</p>
      <ReceitaBuyers />
    </div>
    <hr />
    <div class="py-8">
      <p class="text-lg text-black">Taxa de Impacto (E-mail)</p>
      <ReceitaImpact />
    </div>
    <hr />
    <div class="py-8">
      <p class="text-lg text-black">Evolução temporal do impacto (E-mail)</p>
      <ReceitaTemporalImpact />
    </div>
    <div class="py-8">
      <p class="text-lg text-black">Itens mais comprados</p>
      <ReceitaProducts />
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
