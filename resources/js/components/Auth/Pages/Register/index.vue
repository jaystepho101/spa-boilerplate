<template>
  <form>

    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      type="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="confirm"
      :error-messages="passwordErrors"
      label="Confirm Password"
      type="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-btn
       :loading="loading"
       :disabled="loading"
       color="primary"
       @click.native="loader = 'loading'"
       @click="submit"
     >
       Register
     </v-btn>

    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  import { isEmpty } from 'lodash'
  export default {
    mixins: [validationMixin],
    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      password: { required },
    },

    data: () => ({
      name: '',
      email: '',
      password: '',
      confirm: '',
      loading: false,
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },

    methods: {
      ...mapActions({
        register: 'auth/register'
      }),
      submit () {
        this.$v.$touch()
          this.loading = true
          this.register({

               payload: {

                 name: this.name,
                 email: this.email,
                 password: this.password,
                 password_confirmation: this.confirm,

               },

               context: this

             }).then(() => {

               this.loading = false

               localforage.getItem('intended').then((name) => {

                 if (isEmpty(name)) {
                   this.$router.replace({ name: 'dashboard' })
                   return
                 }

                   this.$router.replace({ name: name })
                 })

             }).catch((error) => {
             })
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.password = ''
      }
    }
  }
</script>
