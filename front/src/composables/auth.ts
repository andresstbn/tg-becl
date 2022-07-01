import store from '@/store'
import { User } from '@/types'
import { computed, ComputedRef } from 'vue'

const base = process.env.VUE_APP_URL;
const protocol = process.env.VUE_APP_PROTOCOL;
const redirect_url = `${protocol}://${base}/auth/`;

export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);


  // Parameters to pass to OAuth 2.0 endpoint.
  const params = {
    client_id:
      "1004016239842-r6ermhv9ubqhu904v66tb3lr77bd0tnb.apps.googleusercontent.com",
    redirect_uri: redirect_url,
    response_type: "token",
    scope: "email",
    // include_granted_scopes: "true",
    state: "pass-through value",
  } as const;

  // Add form parameters as hidden input values.
  for (const p in params) {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p as keyof typeof params]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

export const useUser = (): ComputedRef<User> => {
  return computed(() => store.state.user)
}

export const logout = () => {
  store.dispatch('logout')
}
  