<template>
  <main class="view-book articles">
    <article v-if="!type" class="condense">
      <div class="home">
        <h2>
          {{ textBook.bookTitle }}
        </h2>
        <p v-html="textBook.bookDesc"></p>
        <div class="btns">
          <router-link to="/book/piano" tag="button" class="secondary">{{ textBook.bookBtnPiano }}</router-link>
          <router-link to="/book/keyboard" tag="button" class="secondary">{{ textBook.bookBtnKeyboard }}</router-link>
        </div>
      </div>
      <div class="img home desktop-only">
        <img class="small" src="../../public/site_images/General_Cover_Art.png" />
      </div>
    </article>

    <template v-if="type">
      <article>
        <h2>
          {{ text.topTitle }}
        </h2>
        <p v-html="text.topText"></p>
      </article>

      <article>
        <h2>
          {{ text.introTitle }}
        </h2>
        <p v-html="text.introText" class="has-img"></p>
        <div class="img">
          <img src="../../public/site_images/Introduction_Cover_Art.png" />
          <router-link to="/shop" tag="button" class="primary c-book">{{ textGen.btnBuyNow }}</router-link>
        </div>
      </article>

      <article v-if="this.type === 'keyboard'">
        <h2>
          {{ text.beginTitle }}
        </h2>
        <p v-html="text.beginText" class="has-img"></p>
        <div class="img">
          <img src="../../public/site_images/Beginner_Keyboard_Cover_Art.png" />
          <router-link to="/shop" tag="button" class="primary c-book">{{ textGen.btnBuyNow }}</router-link>
        </div>
      </article>

      <article class="condense">
        <h2 v-if="this.type === 'piano'">
          {{ text.beginTitle }}
          <em>{{ text.beginText }}</em>
        </h2>
        <h2>
          {{ text.interTitle }}
          <em>{{ text.interText }}</em>
        </h2>
        <h2>
          {{ text.advancedTitle }}
          <em>{{ text.advancedText }}</em>
        </h2>
      </article>
    </template>

    <article>
      <h2>
        {{ textGen.diffTitle }}
      </h2>
      <p v-html="textGen.diffText"></p>
    </article>    
  </main>
</template>


<style scoped lang="scss">
  @import '../vars.scss';

  .view-book {
    article {
      display: flex;
      flex-wrap: wrap;

      .home {
        width: 70%;

        p, div, h2 {
          width: 100%;
        }

        button {
          width: calc(50% - #{$p-xxl});
          margin: $p-md $p-xxl 0 0;
        }
      }

      &.condense {
        padding-bottom: $p-lg;
      }

      h2 {
        width: 100%;

        em {
          display: inline-block;
          font-size: $f-size;
          font-family: $f-prim;
          transform: translateY(-2px);
        }
      }

      p.has-img {
        width: 70%;
      }

      .img {
        width: calc(30% - #{$p-md * 2});
        margin-top: -40px;
        padding: 0 $p-md;
        text-align: center;

        &.home {
          margin-top: 0;
        }

        img {
          width: 230px;
          max-width: 90%;
        }

        button {
          width: 90%;
          margin-top: $p-sm;
        }
      }
    }

    @media (max-width: $w-mob) {
      padding: 0;
      width: 100%;

      article {
        padding-bottom: $p-lg;
        
        h2,
        .img,
        .home,
        .btn,
        p.has-img {
          width: 100%;

          button {
            width: 100%;
          }

          img {
            width: 90%;
            margin-top: $p-lg;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'ViewBook',
    props: [
      'type'
    ],
    data: function() {
      return {
        text: null,
        textDiff: null,
        textBook: null
      }
    },
    created: function() {
      this.update();
    },
    watch: {
      type: function() {
        this.update();
      }
    },
    methods: {
      update() {
        this.text = this.$siteContent.textContent.book[this.type];
        this.textGen = this.$siteContent.textContent.book.general;
        this.textBook = this.$siteContent.textContent.home;
      }
    }
  }
</script>
