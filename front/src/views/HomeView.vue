<template lang="pug">
.card.card-body.m-4(v-if='!user.email')
  button.btn.btn-primary(@click='clickHandler') Iniciar sesion con Google
.card.card-body.m-4(v-else)
  h5 Bienvenido, {{ user.first_name }}
  
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { oauthSignIn, useUser } from "@/composables/auth";

export default defineComponent({
  name: 'HomeView',

  setup() {
    const user = useUser();
    return {
      clickHandler: () => {
        oauthSignIn();
      },
      user
    };
  }
});
</script>
