<template>
  <div class="main">
    <!--Logo Nav-->
    <nav class="nav w-full pt-5 pl-5">
      <img
        src="E:\Projetos\betaDash\assets\Dina-logo.jpeg"
        class="w-44"
      />
    </nav>
    <!--Controller Nav-->
    <div
      class="flex justify-between h-20 mx-64 mt-8 p-5 rounded-md shadow-sm bg-white text-2xl"
    >
      <div class="title flex items-center">
        Dashboard /
        <span class="text-primary font-bold">&nbsp;{{ btnSelected }} </span>
      </div>

      <div class="flex justify-end gap-2">
        <SelectButton
          v-model="time"
          :options="options"
          :allowEmpty="false"
        >
        </SelectButton>
      </div>
    </div>
    <div class="area flex mx-64">
      <!--Botões-->
      <div class="btns mt-5 flex flex-col gap-3">
        <Card
          v-for="(item, index) of value"
          :key="item.label"
          :class="[
            'z-20 hover:cursor-pointer ',
            btnSelected == item.label
              ? 'rounded-r-none shadow-[-2px_3px_2px_0px_rgba(0,0,0,0.1),-1px_1px_2px_-1px_rgba(0,0,0,0.1)]'
              : 'mr-2 w-64 h-24 hover:shadow-md transition-shadow',
          ]"
          @click="DisplayContent(item)"
        >
          <template #content>
            <div class="flex justify-between items-center">
              <!--Ícone-->
              <span class="w-8 h-8 inline-flex justify-center items-center">
                <i
                  :class="
                    btnSelected == item.label
                      ? item.icon + ' text-primary'
                      : item.icon
                  "
                />
              </span>
              <!--Title-->
              <div class="flex flex-col">
                <span
                  :class="
                    btnSelected == item.label
                      ? 'dark:text-surface-400 text-sm text-primary'
                      : 'text-surface-500 dark:text-surface-400 text-sm'
                  "
                  >{{ item.label }}</span
                >
                <!--Valor-->
                <span
                  :style="{
                    fontSize: '1.5rem',
                    fontWeight: btnSelected == item.label ? 'bold' : 'normal',
                  }"
                >
                  {{ item.value }}
                </span>
              </div>
              <div class="arrow">
                <span
                  :class="
                    btnSelected == item.label
                      ? ''
                      : 'pi pi-angle-right text-primary font-bold'
                  "
                ></span>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <!--Conteúdo principal-->
      <div class="content h-screen w-screen mt-5">
        <Card
          :class="
            btnSelected == 'Receita' || btnSelected == 'Sessões'
              ? 'h-full rounded-l-none z-10'
              : ''
          "
        >
          <template #title>{{ btnSelected }}</template>
          <template #content>
            <div v-if="btnSelected == 'Sessões'"></div>
            <div v-if="btnSelected == 'Contatos'">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
            <div v-if="btnSelected == 'Envios'">
              <Envios />
            </div>
            <div v-if="btnSelected == 'Receita'"></div>
          </template>
        </Card>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnSelected: "Sessões",
      time: "7 dias",
      options: ["7 dias", "30 dias", "2 meses"],
      value: [
        {
          label: "Sessões",
          value: 25,
          icon: "pi pi-globe text-xl",
        },
        {
          label: "Contatos",
          value: 15,
          icon: "pi pi-users text-xl",
        },
        {
          label: "Envios",
          value: 20,
          icon: "pi pi-send text-xl",
        },
        {
          label: "Receita",
          value: 10,
          icon: "pi pi-dollar text-xl",
        },
      ],
    };
  },
  methods: {
    DisplayContent(item) {
      this.btnSelected = item.label;
    },
  },
};
</script>
<style></style>
