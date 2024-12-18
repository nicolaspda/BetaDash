<template>
  <div class="flex justify-center items-center" style="height: 100vh">
    <Card style="width: 460px" class="p-5">
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
          <label for="username" class="font-semibold w-24">Usuário</label>
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
          <label for="password" class="font-semibold w-24"> Senha </label>
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
            <a href="https://www.dinamize.com.br/" class="text-xs"
              >Esqueci minha senha
            </a>
          </div>
          <div class="flex justify-content-end gap-2">
            <NuxtLink to="/Loading">
              <Button
                type="password"
                label="Entrar"
                @click="visible = false"
              ></Button>
            </NuxtLink>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animation:
        'h-8 !w-1 bg-indigo-400 animate-scalein animation-duration-200 rounded-md',
      inputFocusEmail: false,
      inputFocusPass: false,
      email: null,
      password: null,
    };
  },
  methods: {
    /*função que anima a tabulação dos inputs*/
    changeFocus(clicked) {
      if (clicked === 'email') {
        this.inputFocusEmail = true;
        this.inputFocusPass = false;
      } else if (clicked === 'password') {
        this.inputFocusEmail = false;
        this.inputFocusPass = true;
      }
    },
  },
};
</script>
