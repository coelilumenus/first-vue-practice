<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'homeAccountancy' | localize}}</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
        <label for="email">{{'email' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">{{'emptyEmail' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'correctValue' | localize}}</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
        <label for="password">{{'password' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">{{'emptyPassword' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{'minLengthPassword'}} {{$v.password.$params.minLength.min}} {{'symbols' | localize}}</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name" :class="{invalid: $v.name.$dirty && !$v.name.required}" />
        <label for="name">{{'name' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{'enterName' | localize}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="isAgree" />
          <span>{{'ruleAgree' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'registration' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'haveAccount' | localize}}
        <router-link to="/login">{{'enter' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  metaInfo () {
    return {
      title: this.$title('registration')
    }
  },
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    isAgree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required },
    isAgree: { checked: v => v }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
