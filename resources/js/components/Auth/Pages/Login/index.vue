<template>
  <form>

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

    <v-btn
       :loading="loading"
       :disabled="loading"
       color="primary"
       @click.native="loader = 'loading'"
       @click="submit"
     >
       Log in
     </v-btn>

    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { isEmpty } from 'lodash'
  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      password: { required },
    },

    data: () => ({
      email: '',
      password: '',
      loader: null,
      loading: false,
    }),

    computed: {
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
        login: 'auth/login'
      }),
      submit () {
        this.$v.$touch()
        this.loading = true
        this.login({

             payload: {

             email: this.email,
             password: this.password,

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
        this.email = ''
        this.password = ''
      }
    }
  }
</script>
