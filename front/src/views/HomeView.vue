<template lang="pug">
.card.card-body.m-4
  | Hola, mundo
  button.btn.btn-primary(@click='clickHandler') Iniciar sesion con Google
</template>


<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { oauthSignIn } from "@/lib/authutils";

export default defineComponent({
  name: 'HomeView',
  // components: {
  //   HelloWorld,
  // },
  setup() {
    return {
      clickHandler: () => {
        oauthSignIn();
      },
    };
  }
});
</script>
