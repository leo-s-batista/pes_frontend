<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>SIGAXS</h1>
        <p>Sistema de Gerenciamento de Auxílio Social</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="login-form__row">
          <div class="label">
            E-mail
          </div>
          <div class="field">
            <input
              v-model="form.email"
              v-validate="'required|email'"
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <small>{{ errors.first('email') }}</small>
          </div>
        </div>

        <div class="login-form__row">
          <div class="label">
            Senha
          </div>
          <div class="field">
            <input
              v-model="form.senha"
              v-validate="'required'"
              name="senha"
              type="password"
              placeholder="Senha"
              @keyup.enter="handleLogin"
            />
            <small>{{ errors.first('senha') }}</small>
          </div>
        </div>

        <div class="login-form__row" v-if="error">
          <div class="error-message">
            <font-awesome-icon icon="exclamation-circle" />
            <span>{{ error }}</span>
          </div>
        </div>

        <div class="login-form__row">
          <button type="submit" :disabled="loading" class="login-button">
            <font-awesome-icon v-if="loading" icon="circle-notch" spin />
            <font-awesome-icon v-else icon="sign-in-alt" />
            <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        senha: ''
      },
      loading: false,
      error: null
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;
      
      const isValid = await this.$validator.validateAll();
      
      if (!isValid) {
        return false;
      }

      this.loading = true;
      this.error = null;

      try {
        await this.$store.dispatch('auth/login', this.form);
        this.$router.push('/');
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  @apply min-h-screen flex items-center justify-center bg-gray-100;
  padding: 20px;
}

.login-card {
  @apply bg-white rounded-lg shadow-lg;
  width: 100%;
  max-width: 400px;
  padding: 40px;
}

.login-header {
  @apply text-center mb-8;
  
  h1 {
    @apply text-3xl font-bold text-gray-800 mb-2;
  }
  
  p {
    @apply text-sm text-gray-600;
  }
}

.login-form {
  @apply grid gap-y-4;
  margin-top: 30px;

  &__row {
    @apply grid gap-y-1;
    
    .label {
      @apply uppercase text-xs font-medium text-gray-700;
    }
    
    .field {
      @apply grid gap-y-1;
      
      small {
        @apply text-xs text-red-500;
      }
    }
    
    .error-message {
      @apply flex items-center gap-x-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg;
      border: 1px solid #fca5a5;
    }
  }
}

.login-button {
  @apply w-full justify-center;
  height: 45px;
  font-size: 16px;
  
  &:disabled {
    @apply opacity-50 cursor-not-allowed;
    
    &:hover {
      transform: none;
    }
  }
}
</style>

