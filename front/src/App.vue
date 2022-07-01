<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-dark.bg-primary
  .container-fluid
    .navbar-brand UFPS
    button.navbar-toggler(data-bs-toggle='collapse' data-bs-target='#navbarCollapse')
    .collapse.navbar-collapse#navbarCollapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          a.nav-link Trabajos
  
    .d-flex.align-items-center(v-if='user.email')
      .text-light {{ user.first_name }} {{ user.last_name }}
      button.btn.btn-sm.btn-primary(@click='logout') Salir
    div(v-else)
      button.btn.btn-sm.btn-primary(@click='oauthSignIn') Iniciar Sesión

router-view
</template>

<style lang="scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import { useUser, logout, oauthSignIn } from "@/composables/auth";
export default defineComponent({
  setup() {
    const user = useUser();
    // watch(user, () =>
    return { user, logout, oauthSignIn };
  },
});
</script>
