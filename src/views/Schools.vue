<template>
  <main class="view-schools">
    <h1>{{ text.title }}</h1>
    <p v-html="text.intro"></p>

    <section v-for="school in schools">
      <h2>{{ school.name }}</h2>
      <table>
        <tr>
          <td v-if="school.location">{{ text.location }}</td>
          <td>{{ school.location }}</td>
        </tr>
        <tr v-if="school.site">
          <td>{{ text.site }}</td>
          <td><a v-if="school.site" :href="school.site">{{ school.site }}</a></td>
        </tr>
        <tr v-if="school.mail || school.phone">
          <td>{{ text.contact }}</td>
          <td v-if="school.mail">
            <a :href="'mailto:' + school.mail">{{ school.mail }}</a>
          </td>
          <td v-if="school.phone" class="desktop-only">
            <a :href="'tel:' + school.phone">{{ school.phone }}</a>
          </td>
        </tr>
        <tr class="mobile-only">
          <td></td>
          <td v-if="school.phone">
            <a :href="'tel:' + school.phone">{{ school.phone }}</a>
          </td>
        </tr>
      </table>
      <p>
        <span v-html="school.desc"></span>
      </p>
    </section>
  </main>
</template>


<style scoped lang="scss">
  @import '../vars.scss';

  .view-schools {
    h1 {
      margin-bottom: 0;
    }
    section {
      padding : $p-md $p-sm;

      &:not(:last-child) {
        border-bottom: 1px solid $c-border;
      }
    }

    h2 {
      @include f-larger;
    }

    td {
      padding: 0 $p-sm;
      
      &:first-child {
        padding: 0 $p-sm 0 0;
      }

      &:nth-child(3) {
        border-left: 1px solid $c-border;
      }
    }

    @media (max-width: $w-mob) {
      p {
        padding-left: 0;
      }
    }
  }
</style>

<script>
  export default {
    name: 'ViewSchools',
    created: function() {
      this.text = this.$siteContent.textContent.school;
      this.schools = this.$siteContent.schoolData;
    }
  }
</script>
