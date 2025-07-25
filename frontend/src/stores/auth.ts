import { authService } from "@src/service";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
    state: (): any => ({
        token: null,
        user: null,
        organization: null,
        loading: false,
        isAuthenticated: false,
    }),

    actions: {
      setLoading(value: boolean) {
        this.loading = value;
      },
      getCurrentUser() {
        return this.user;
      },
      async handleSuccessfulLogin(response: any) {
          const tokenCookie = useCookie("auth_token", {
              httpOnly: import.meta.server,
              secure: false,
              sameSite: "strict",
              path: "/",
              maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          const expiryCookie = useCookie<number>("auth_token_expiry", {
              httpOnly: import.meta.server,
              secure: false,
              sameSite: "strict",
              path: "/",
              maxAge: 60 * 60 * 10, // 10hrs
          });

          const expiryTimestamp = Math.floor(Date.now() / 1000) + (3600 * 10);

          tokenCookie.value = response.data.token;
          expiryCookie.value = expiryTimestamp;

          this.token = response.data.token;
          this.isAuthenticated = true;
          await nextTick();
          window.location.href = "/admin";
      },

      async logout() {
        const tokenCookie = useCookie<string | null>("auth_token");
        const expiryCookie = useCookie("auth_token_expiry");
        tokenCookie.value = null;
        expiryCookie.value = null;
        await nextTick();
        window.location.href = "/";
      },

      checkLogin() {
        const tokenCookie = useCookie<string | null>("auth_token");
        const expiryCookie = useCookie("auth_token_expiry");
        if (tokenCookie.value && expiryCookie.value) {
          const currentTimestamp = Math.floor(Date.now() / 1000);
          this.user = jwtDecode(tokenCookie.value); 
          return (Number(expiryCookie.value) > currentTimestamp);
        }
        return false;
      },

      async initializeMiddlewareAuth() {
        const tokenCookie = useCookie<string | null>("auth_token");
        const expiryCookie = useCookie("auth_token_expiry");

        const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

        if (tokenCookie.value && Number(expiryCookie.value) > currentTimestamp ) {
            this.token = tokenCookie.value;
            this.isAuthenticated = true;
        } else {
            this.resetAuthState();
        }

        return this.isAuthenticated;
      },

      async login(data: any, loadingFun: any, responseFun: any, errorFun: any) {
            this.user = null;
            this.token = null;

            await handleApiCall(
                () => authService.login({...data}),
                loadingFun,
                async (response) => {
                    responseFun(response)
                    await this.handleSuccessfulLogin(response);
                },
                async (error) => {
                    errorFun(error);
                }
            );
        },
    }
});