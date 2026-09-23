<template>
  <main class="view-learn">
    <template v-if="!type">
      <div class="home-text">
        <h2>
          {{ textHome.learnTitle }}
        </h2>
        <div class="img">
          <img class="wide" src="../../public/site_images/hand.png" />
        </div>
        <p v-html="textHome.learnDesc"></p>
        <div class="btns">
          <router-link to="/learn/worksheet" tag="button" class="secondary">{{ textHome.learnBtnWorksheets }}</router-link>
          <router-link to="/learn/play" tag="button" class="secondary"> {{ textHome.learnBtnPlay }}</router-link>
        </div>
      </div>
    </template>

    <template v-if="type === 'worksheet'">
      <h1>{{ text.exerciseTitle }}</h1>
      <p v-html="text.exerciseIntro"></p>
      <table>
        <tr>
          <th>{{ text.exerciseListPage }}</th>
          <th>{{ text.exerciseLabelList }}</th>
        </tr>
        <router-link 
          v-for="page in pages"
          :key="page.page" 
          :to="'/learn/worksheet/' + page.page"
          tag="tr"
          role="link"
        >
          <td>{{ page.page }}</td>
          <td>{{ page.title }}</td>
        </router-link>
      </table>
    </template>

    <template v-if="type === 'play'">
      <h1>{{ text.playTitle }}</h1>
      <p v-html="text.playIntro"></p>
      <ul>
        <li>{{ text.playListSongs }}</li>
        <router-link 
          v-for="song in songs"
          :key="song.url" 
          :to="'/learn/play/' + song.url"
          tag="li"
          role="link"
        >
          {{ song.name }}
        </router-link>
      </ul>
    </template>
  </main>
</template>


<style scoped lang="scss">
  @import '../vars.scss';

  .view-learn {
    .home-text {
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
        width: 360px;
        margin: $p-md $p-xxl $p-sm 0;
      }
    }

    table {
      width: 100%;
      margin-top: $p-lg;
      border-collapse: collapse;
      
      tr {
        width: 100%;
        cursor: pointer;
        transition:
          font-size 0.3s,
          border-color 0.3s;

        &:hover td:last-child {
          font-size: $f-size-xl;
          border-color: white;

          &:before {
            opacity: 0.8;
            transition: opacity 0.3s;
          }
        }
      }

      th, td {
        border: 1px solid #0000;
        border-radius: 0 $w-br $w-br 0;
        text-align: left;
        font-size: $f-size-lg;
        padding: $p-sm $p-xl;

        &:first-child {
          width: 50px;
          text-align: center;
          font-family: $f-title;
          font-weight: bold;
        }

        &:last-child {
          padding-left: 70px;
          width: 360px;
          border-left-width: 0;
          transition: all 0.2s;
          position: relative;
          z-index: 10;
          float: left;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            opacity: 0;
            z-index: -10;
            background-image: url('../assets/btn_bg_2.png');
            background-position: 0;
            background-repeat: no-repeat;
            transition: opacity 0.5s;
          }
        }
      }

      th {
        font-family: $f-title;
        padding-bottom: 10px;
        font-size: 26px;
      }
    }

    ul {
      margin-top: $p-lg;

      li {
        list-style: none;

        &:first-child {
          @include f-title;
          padding-bottom: $p-md;
        }

        &:not(:first-child) {
          $ani-dur: 0.3s;
          float: left;
          position: relative;
          z-index: 10;
          width: 300px;
          padding: $p-sm $p-xl $p-sm 0;
          margin-left: -$p-lg;
          text-indent: 60px;
          cursor: pointer;
          transition:
            font-size $ani-dur,
            border-color $ani-dur,
            text-indent $ani-dur;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            opacity: 0;
            z-index: -10;
            background-image: url('../assets/btn_bg_2.png');
            background-position: center;
            background-repeat: no-repeat;
            transition: opacity $ani-dur;
          }

          &:hover {
            font-size: $f-size-lg;

            &:nth-child(2) {
              font-size: 17px;
              text-indent: 55px;
            }

            &:before {
              opacity: 0.8;
            }
          }
        }
      }
    }

    @media (max-width: $w-mob) {      
      .home-text {
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

      table {
        margin: -$p-sm 0 $p-xl;

        th, td {
          &, &:first-child, &:last-child {
            width: unset;
            padding: $p-md $p-sm;
          }
        }

        th {
          font-size: $f-size-xl;
        }
      }

      ul {
        padding-left: 0;
        padding-bottom: $p-xl;
        overflow: visible;

        li {
          margin-left: 0;
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'ViewLearn',
    props: [
      'type'
    ],
    created: function() {
      this.textHome = this.$siteContent.textContent.home;
      this.text = this.$siteContent.textContent.learn;
      this.pages = this.$siteContent.worksheetData;
      this.songs = this.$siteContent.songData;
    }
  }
</script>
