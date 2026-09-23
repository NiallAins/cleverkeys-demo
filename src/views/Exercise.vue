<template>
  <main class="view-exercise">
    <routerLink :to="'/learn/worksheet'" tag="button" class="primary btn-back">
      <span>&lt; </span>
      {{ text.exerciseBtnBack }}
    </routerLink>
    <h1>{{ text.exerciseTitlePage }} {{ page.page }}: {{ page.title }}</h1>
    <p>{{ text.exerciseText }}</p>
    <div class="image">
      <img v-if="gifUrl" :src="gifUrl" />
    </div>
  </main>
</template>


<style scoped lang="scss">
  @import '../vars.scss';

  .view-exercise {
    .image {
      img {
        display: block;
        max-width: $w-max * 0.8;
        max-height: $w-max / 1.75;
        margin: 0 auto;
      }
    }

    .btn-back {
      padding: 0 0 5px;
      width: 210px;
      margin-left: -$p-sm;
      margin-bottom: $p-lg;

      span {
        @include f-title;
        line-height: 46px;
      }
    }

    @media (max-width: $w-mob) {
      padding-bottom: $p-lg;
      
      .btn-back {
        margin-left: 0;
        width: 100%;
      }

      .image img {
        max-width: 100%;
        width: 100%;
      }
    }
  }
</style>

<script>
  export default {
    name: 'ViewExercise',
    props: [
      'pageNum'
    ],
    data: function() {
      return {
        page: { title: '' },
        prevPage: -1,
        nextPage: -1,
        gifUrl: ''
      }
    },
    created: function() {
      this.text = this.$siteContent.textContent.learn;
      this.loadImg();
    },
    watch: {
      pageNum: function() {
        this.loadImg();
      }
    },
    methods: {
      loadImg: function() {
        let num = parseInt(this.pageNum);
        let page = this.$siteContent.worksheetData.find(p => p.page === num);
        if (page) {
          this.page = page;
          this.prevPage = num - 1;
          this.nextPage = (num + 1) % this.$siteContent.worksheetData.length;
          this.gifUrl = require(`../../public/worksheets/${page.image}`);
        } else {
          this.$router.push({ path: '/learn' });
        }
      }
    }
  }
</script>
