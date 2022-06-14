<template lang="pug">
.card.card-body {{ $route.hash }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { post } from "@/api";
export default defineComponent({
  name: "HomeView",
  setup() {
    const route = useRoute();
    const store = useStore();

    console.log(route.hash.slice(1));
    const urlParams = new URLSearchParams(route.hash.slice(1));

    const getToken = async (obj: GoogleAuthResponse) => {
      const response = await post("rest-auth/google/", {
        access_token: obj.access_token,
      });
      console.log('response', response)
      store.commit("setToken", response.key);
      store.dispatch("getCurrentUser");

      console.log("Response", response);
    };

    const keys = [
      "state",
      "access_token",
      "token_type",
      "expires_in",
      "scope",
      "authuser",
      "hd",
      "prompt",
    ] as const;

    type GoogleAuthResponse = Record<typeof keys[number], string>;
    const obj = {} as GoogleAuthResponse;
    for (const key of keys) {
      const value = urlParams.get(key);
      if (value) obj[key] = value;
    }

    getToken(obj);
  },
});
</script>
