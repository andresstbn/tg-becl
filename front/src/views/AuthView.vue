<template lang="pug">
//- .card.card-body {{ $route.hash }}
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "@/api";
export default defineComponent({
  name: "HomeView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const getToken = async (obj: GoogleAuthResponse) => {
      // console.log("getToken", obj);
      const response = await post("rest-auth/google/", {
        access_token: obj.access_token,
      });
      // console.log("response", response);
      store.commit("setToken", response.key);
      store.dispatch("getCurrentUser");
      router.push({path: '/'})
      // console.log("Response", response);
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
    const urlParams = new URLSearchParams(route.hash.slice(1));

    for (const key of keys) {
      const value = urlParams.get(key);
      if (value) obj[key] = value;
    }

    onMounted(() => {
      if (obj.access_token) getToken(obj);
    });
  },
});
</script>
