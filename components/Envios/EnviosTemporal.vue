<template>
  <div class="main temporal">
    <Tabs value="0">
      <TabList>
        <Tab value="0" class="flex items-center gap-2">
          <i class="pi pi-envelope" />
          <span class="font-bold whitespace-nowrap">Entrega</span>
        </Tab>
        <Tab value="1" class="flex items-center gap-2">
          <i class="pi pi-eye" />
          <span class="font-bold whitespace-nowrap">Visualização</span>
        </Tab>
        <Tab value="2" class="flex items-center gap-2">
          <i class="pi pi-link" />
          <span class="font-bold whitespace-nowrap">Cliques</span>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <EnviosTemporalEntrega />
        </TabPanel>
        <TabPanel value="1">
          <EnviosTemporalAbertura />
        </TabPanel>
        <TabPanel value="2">
          <EnviosTemporalCliques />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script>
export default {};
</script>

<style>
.p-tablist-tab-list {
  display: flex;
  justify-content: space-evenly;
}
</style>
