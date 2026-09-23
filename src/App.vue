<template>
  <div id="app">
    <header>
      <button class="mobile-only burger" @click="menuOpen = true"></button>
      <router-link to="/">
        <img alt="clever keys logo" class="logo mobile-only" src="../public/site_images/logo_small.png" />
      </router-link>
      <nav class="desktop-only">
        <div :class="['nav-center', { 'small': navSmall }]">
          <router-link to="/" class="logo">
            <img alt="home page" src="../public/site_images/logo_small.png" />
          </router-link>
          <router-link to="/book"> {{ text.books }} </router-link>
          <router-link to="/learn"> {{ text.learn }} </router-link>
          <router-link to="/schools"> {{ text.school }} </router-link>
          <router-link to="/shop"> {{ text.shop }} </router-link>
          <router-link to="/contact"> {{ text.contact }} </router-link>
        </div>
      </nav>
      <nav
        class="mobile-only"
        :class="{open: menuOpen}"
        @click="menuOpen = false"
      >
        <router-link to="/"> {{ text.home }} </router-link>
        <router-link to="/book"> {{ text.books }} </router-link>
        <router-link to="/learn"> {{ text.learn }} </router-link>
        <router-link to="/schools"> {{ text.school }} </router-link>
        <router-link to="/shop"> {{ text.shop }} </router-link>
        <router-link to="/contact"> {{ text.contact }} </router-link>
      </nav>
    </header>
    <div class="page-container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  @import './vars';
  @import './global';

  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
    margin: 0 auto;
    background: #fff;

    nav.desktop-only {
      text-align: center;
      box-shadow: 0 0 10px #0005;
      background:
        linear-gradient(
          to right,
          $c-active-1-l 0%,
          $c-active-1-l 50%,
          $c-active-5-l 51%,
          $c-active-5-l 100%
        ) left bottom / 100% 6px no-repeat,
        #fff;

      .nav-center {
        position: relative;
        z-index: 5;
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding: 6px 0;
        max-width: #{$w-max + ($p-lg * 2)};
        flex-wrap: nowrap;
        justify-content: space-between;
        background:
          linear-gradient(
            to right,
            $c-active-1-l 100px,
            $c-active-2-l,
            $c-active-3-l,
            $c-active-4-l,
            $c-active-5-l calc(100% - 100px)
          ) left bottom / 100% 6px no-repeat,
          #fff;

        &.small {
          .logo {
            height: 60px;
            margin-top: -12px;

            img {
              width: 210px;
            }
          }
        }

        a {
          @include f-large;
          position: relative;
          width: 16%;
          height: 25px;
          padding: 18px 0;
          text-decoration: none;
          transition: font-size 0.5s;

          &:nth-child(3) {
            margin-right: 20px;
          }

          &:before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            opacity: 0;
            z-index: -10;
            background-position: center;
            background-repeat: no-repeat;
            transition: opacity 0.5s;
          }
          &:nth-child(2):before { background-image: url('./assets/nav_bg_1.png'); };
          &:nth-child(3):before { background-image: url('./assets/nav_bg_2.png'); };
          &:nth-child(4):before { background-image: url('./assets/nav_bg_3.png'); };
          &:nth-child(5):before { background-image: url('./assets/nav_bg_4.png'); };
          &:nth-child(6):before { background-image: url('./assets/nav_bg_5.png'); };

          &.logo {
            width: 25%;
            height: 86px;
            margin: -6px 0 0 24px;
            cursor: pointer;
            transition:
              height 0.2s,
              margin-top 0.2s;

            img {
              width: 265px;
              transition: width 0.3s;
            }
          }

          &:hover, 
          &.router-link-active {
            font-size: $f-size-xl;
          }

          &:hover:before,
          &.router-link-active:before {
            opacity: 0.8;
            transition: opacity 0.3s;
          }
        }
      }
    }

    button.burger {
      position: absolute;
      top: 41px;
      left: $p-md;
      z-index: 20;
      width: 36px;
      height: 32px;
      border: none;
      box-shadow: none;

      &:before, 
      &:after {
        content: '';
        position: absolute;
        top: 2px;
        bottom: 2px;
        left: 0;
        right: 0;
        border: solid #aaa;
        border-width: 4px 0;
        border-radius: 4px;
      }

      &:after {
        top: calc(50% - 2px);
        border-bottom-width: 0;
        border-radius: 0;
      }
    }

    $ani-nav: 0.5s;
    .logo.mobile-only {
      margin: 6px 0 -4px 20vw;
      max-width: 80vw;
    }
    nav.mobile-only {
      position: fixed;
      z-index: 100;
      top: 0;
      left: -200px;
      bottom: 0;
      width: 200px;
      padding-top: $p-lg;
      background: #fff;
      transition: left $ani-nav;

      a {
        @include f-large;
        display: block;
        padding: $p-sm $p-lg;
        text-align: left;
        text-decoration: none;

        &.router-link-active:not(:first-child),
        &.router-link-exact-active {
          background-repeat: no-repeat;
          background-position: center;
          text-align: center;
          &:nth-child(1) { background-image: url('./assets/nav_bg_5.png'); };
          &:nth-child(2) { background-image: url('./assets/nav_bg_1.png'); };
          &:nth-child(3) { background-image: url('./assets/nav_bg_2.png'); };
          &:nth-child(4) { background-image: url('./assets/nav_bg_3.png'); };
          &:nth-child(5) { background-image: url('./assets/nav_bg_4.png'); };
          &:nth-child(6) { background-image: url('./assets/nav_bg_5.png'); };
        }
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 200px;
        bottom: 0;
        width: 0;
        z-index: -1;
        background: #0000;
        transition:
          background $ani-nav,
          width 0s linear $ani-nav;
      }

      &.open {
        left: 0;

        &:before {
          width: 100vw;
          background: #0008;
          transition:
            background $ani-nav;
        }
      }
    }
  }

  @media (max-width: $w-mob) {
    header {
      top: 0px;
      box-shadow: 0 0 10px #0003;
      background:
        linear-gradient(
          to right,
          $c-active-1-l,
          $c-active-2-l,
          $c-active-3-l,
          $c-active-4-l,
          $c-active-5-l
        ) left bottom / 100% 4px no-repeat,
        #fff;
    }
  }
</style>

<script>
  export default {
    data: function () {
      return {
        navSmall: false,
        menuOpen: false
      }
    },
    created () {
      window.addEventListener(
        'scroll',
        () => this.navSmall = window.scrollY > 30
      );
      this.text = this.$siteContent.textContent.nav;
    },
  }
</script>

