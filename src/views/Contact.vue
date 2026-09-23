<template>
  <main class="view-contact">
    <h1>{{ text.title }}</h1>
    <p v-html="text.intro"></p>

    <form @submit="sendForm($event)" ref="contactForm">
      <input type="hidden" name="contact_number">
      <label for="contact_name">{{ text.labelName }}</label>
      <input
        id="contact_name"
        name="contact_name" 
        type="text"
        v-model="values.name"
        :disabled="!canSend"
      />

      <label for="contact_mail">{{ text.labelMail }}</label>
      <input
        id="contact_mail"
        name="contact_mail"
        v-model="values.mail"
        :disabled="!canSend"
      />

      <label for="contact_message">{{ text.labelMessage }}</label>
      <textarea
        id="contact_message"
        name="contact_message"
        v-model="values.message"
        :disabled="!canSend"
      ></textarea>

      <div :class="['status', { 'open': !!status }]">
        <span v-if="status === 'success'" v-html="text.messageSuccess"></span>
        <span v-if="status === 'fail'" v-html="text.messageFail"></span>
      </div>

      <button
        class="primary c-contact"
        :disabled="true"
      >
        {{ text.btnSend }}
      </button>
    </form>
  </main>
</template>


<style lang="scss">
  @import '../vars.scss';

  .view-contact {
    a {
      color: $c-font;
    }

    form {
      margin: -$p-md $p-md $p-md;

      input:not([type="submit"]),
      label,
      textarea {
        display: block;
        width: 360px;
        max-width: calc(100% - #{$p-lg});
        @include f-body;
      }

      label {
        padding: $p-md $p-sm $p-sm;
      }

      input,
      textarea {
        padding: $p-xs $p-sm;
      }

      textarea {
        height: 100px;
      }

      button {
        margin-top: $p-lg;
      }
    }

    .status {
      margin-top: $p-md;
    }

    @media (max-width: $w-mob) {
      form {
        margin: 0 0 $p-md;

        button {
          width: 100%;
        }
      }
    }
  }
</style>

<script>
  import Vue from 'vue';
  import emailjs from 'emailjs-com';

  export default {
    name: 'ViewContact',
    data: function() {
      return {
        canSend: false,
        status: '',
        values: {
          name: '',
          mail: '',
          message: ''
        }
      }
    },
    created: function() {
      this.canSend = true;
      this.text = this.$siteContent.textContent.contact;
    },
    methods: {
      sendForm: function(event) {
        event.preventDefault();
        
        if (this.canSend) {
          let comp = this;
          this.$refs.contactForm.contact_number.value = Math.floor(Math.random() * 100000);

          if (PROD) {
            emailjs
              .sendForm('contact_service_keys', 'contact_form', this.$refs.contactForm)
              .then(function() {
                comp.status = 'success';
                this.resetForm();
              }, function(error) {
                comp.status = 'fail'
              });
          } else {
            comp.status = 'success';
            this.resetForm();
          }
          this.canSend = false;
        }
      },
      resetForm: function() {
        Vue.set(this.values, 'name', '');
        Vue.set(this.values, 'mail', '');
        Vue.set(this.values, 'message', '');
      }
    }
  }
</script>
