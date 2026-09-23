<template>
  <main class="view-home articles">
    <article class="book">
      <div class="text">
        <h2>
          {{ text.bookTitle }}
        </h2>
        <div class="img">
          <img class="tall" src="../../public/site_images/General_Cover_Art.png" />
        </div>
        <p v-html="text.bookDesc"></p>
        <div class="btns">
          <router-link
            to="/book/piano"
            tag="button"
            role="link"
            class="secondary"
          >
            {{ text.bookBtnPiano }}
          </router-link>
          <router-link
            to="/book/keyboard"
            tag="button"
            class="secondary"
          >
            {{ text.bookBtnKeyboard }}
          </router-link>
        </div>
      </div>
    </article>

    <article>
      <div class="text">
        <h2>
          {{ text.learnTitle }}
        </h2>
        <div class="img">
          <img class="wide" src="../../public/site_images/hand.png" />
        </div>
        <p v-html="text.learnDesc"></p>
        <div class="btns">
          <router-link
            to="/learn/worksheet"
            tag="button"
            role="link"
            class="secondary"
          >
            {{ text.learnBtnWorksheets }}
          </router-link>
          <router-link
            to="/learn/play"
            tag="button"
            role="link"
            class="secondary"
          >
            {{ text.learnBtnPlay }}
          </router-link>
        </div>
      </div>
    </article>

    <div class="half-width">
      <article>
        <h2>
          {{ text.schoolTitle }}
        </h2>
        <p class="text">
          <span v-html="text.schoolDesc"></span>
          <div class="btns">
            <router-link
              to="/schools"
              tag="button"
              role="link"
              class="secondary"
            >
              {{ text.schoolBtn }}
            </router-link>
          </div>
        </p>
      </article>

      <article>
        <h2>
          {{ text.shopTitle }}
        </h2>
        <p class="text">
          <span v-html="text.shopDesc"></span>
          <div class="btns">
            <router-link
              to="/shop"
              tag="button"
              role="link"
              class="secondary"
            >
              {{ text.shopBtn }}
            </router-link>
          </div>
        </p>
      </article>
    </div>
  </main>
</template>


<style scoped lang="scss">
  @import '../vars.scss';

  .view-home {
    .half-width {
      overflow: hidden;
      max-width: #{$w-max + (2 * $p-lg)};
      margin: 0 auto;

      article {
        float: left;
        width: calc(50% - #{(2 * $p-lg) + ($p-md / 2) + $p-sm});
        margin-top: 0;

        &:first-child {
          margin-right: $p-md;
        }
      }

      .text {
        width: 100%;
        min-height: 52px;
      }

      .btns {
        padding: $p-sm 0;
        width: 100%;
        margin: 0 auto;
        text-align: center;

        button {
          float: unset;
          width: 80%;
          margin: 0;
          display: inline;
        }
      }
    }

    article {
      padding-bottom: $p-md;
      position: relative;

      h2 {
        margin-left: -$p-sm;
      }

      & > div {
        float: left;
      }

      .text {
        width: calc(100% - 230px);
      }

      .img {
        img {
          position: absolute;
          top: $p-lg;
          bottom: $p-lg;

          &.tall {
            height: 230px;
            right: $p-xxl;
          }

          &.wide {
            width: 190px;
            right: $p-xl;
          }
        }
      }

      button {
        float: left;
        width: calc(50% - #{$p-xxl});
        margin: $p-md $p-xxl $p-sm 0;
      }
    }

    @media (max-width: $w-mob) {
      article {
        h2 {
          margin-left: 0;
        }

        div {
          width: 100%;
        }

        img {
          display: block;
          margin: 0 auto;
        }

        .text, .img, button {
          position: static;
          float: unset;
          width: 100%;

          img {
            position: static;
            max-width: 100%;
          }
        }
      }

      .half-width article {
        width: calc(100% - #{$p-md});

        p, .btns {
          width: 100%;
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'ViewHome',
    created: function() {
      this.text = this.$siteContent.textContent.home;
    }
  }
</script>
