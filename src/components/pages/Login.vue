<script>
import RequestView from './RequestView';

export default {
  components: {
    RequestView,
  },
  data() {
    return {
      userLogin: {
        username: '',
        password: '',
      },
    };
  },
};

</script>

<template>
  <div>
    <request-view :active="true" />
    <div class="container">
      <div class="my-account">
        <div class="tabs-container">
          <div class="tab-content" id="tab1">
            <form method="post" class="login">
              <p class="form-row form-row-wide">
                <label for="username">Username:
                  <i class="ln ln-icon-Male" />
                  <input v-model="userLogin.username"
                         type="text"
                         class="input-text"
                  >
                </label>
              </p>
              <p class="form-row form-row-wide">
                <label for="password">Password:
                  <i class="ln ln-icon-Lock-2" />
                  <input v-model="userLogin.password"
                         class="input-text"
                         type="password" name="password"
                         id="password"
                  >
                </label>
              </p>
              <p class="form-row">
                <input @click.prevent="submitLogin"
                       type="submit"
                       class="button border fw margin-top-10"
                       name="login"
                       value="Login"
                >
                <label for="rememberme" class="rememberme">
                  <input name="rememberme"
                         type="checkbox"
                         id="rememberme"
                         value="forever"
                  >
                  Remember Me
                </label>
              </p>
              <p class="lost_password">
                <a href="#">Lost Your Password?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
