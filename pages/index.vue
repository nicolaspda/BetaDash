<template>
  <div
    class="flex justify-center items-center"
    style="height: 100vh"
  >
    <Card
      style="width: 460px"
      class="p-5"
    >
      <template #title>
        <img
          src="https://i.postimg.cc/DyWW65wL/dina-logo.png"
          width="180"
          class="flex mr-6 pb-3 mb-2"
        />
      </template>
      <template #content>
        <span class="block mb-5">Acesse sua conta:</span>
        <div class="flex items-center gap-1 mb-3">
          <label
            for="username"
            class="font-semibold w-24"
            >Usuário</label
          >
          <div :class="inputFocusEmail === true ? animation : 'h-8'"></div>
          <InputText
            id="username"
            class="w-full"
            autocomplete="off"
            v-model="email"
            @focus="changeFocus('email')"
          />
        </div>
        <div class="flex items-center gap-1 mb-5">
          <label
            for="password"
            class="font-semibold w-24"
          >
            Senha
          </label>
          <div :class="inputFocusPass === true ? animation : 'h-8'"></div>
          <Password
            v-model="password"
            fluid
            :feedback="false"
            @focus="changeFocus('password')"
            toggleMask
            class="w-full"
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between items-center">
          <div>
            <a
              href="https://www.dinamize.com.br/"
              class="text-xs"
              >Esqueci minha senha
            </a>
          </div>
          <div class="flex justify-content-end gap-2">
            <Toast />
            <Button
              type="password"
              label="Entrar"
              @click="handleLogin"
            ></Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<script>
import Toast from "primevue/toast";
import { useAuthStore } from "~/stores/index";

export default {
  data() {
    return {
      animation:
        "h-8 !w-1 bg-indigo-400 animate-scalein animation-duration-200 rounded-md",
      inputFocusEmail: false,
      inputFocusPass: false,
      email: null,
      password: null,
    };
  },
  methods: {
    /*função que anima a tabulação dos inputs*/
    changeFocus(clicked) {
      if (clicked === "email") {
        this.inputFocusEmail = true;
        this.inputFocusPass = false;
      } else if (clicked === "password") {
        this.inputFocusEmail = false;
        this.inputFocusPass = true;
      }
    },
    /*função que testa o login*/
    async handleLogin() {
      const credentials = {
        user: this.email,
        password: this.password,
        client_code: "315164",
      };
      try {
        const response = await $fetch(
          "https://proxy.cors.sh/https://api.dinamize.com/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              "x-cors-api-key": "temp_4be2c4562bb040588f036493d162b34f",
              "Access-Control-Allow-Headers": "x-requested-with",
              Accept: "application/json",
            },
            body: credentials,
          }
        );
        if (response.code_detail == "Sucesso") {
          console.log("sucesso");

          //Adiciona no store e redireciona após o login
          const authStore = useAuthStore();
          authStore.alterLogin(response.body["auth-token"]);
          this.$router.push("/Loading");
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Atenção",
            detail: response.code_detail,
            life: 3000,
          });
          console.log("Falha");
        }
      } catch (error) {
        console.error("Login falhou:", error);
      }
    },
  },
};
</script>
