<template>
  <main class="view-play">
    <routerLink :to="'/learn/play'" tag="button" class="primary btn-back">
      <span>&lt; </span>
      {{ text.playBtnBack }}
    </routerLink>
    <h1>{{ songTitle }}</h1>
    <p v-html="text.playInstruct"></p>
    <div class="controls">
      <button @click="playing ? stop() : play()" :class="['play secondary', {'stop': playing }]">
        {{ playing ? text.playBtnStop : text.playBtnPlay }}
      </button>
      <span class="label-speed">{{ text.playSpeed }}</span>
      <button
        @click="!playing ? beatDuration = bpm : ''"
        :class="['secondary speed', {'active': beatDuration === bpm}]"
      >
        {{ text.playSpeedNormal }}
      </button>
      <button
        @click="!playing ? beatDuration = bpm * 2 : ''"
        :class="['secondary speed', {'active': beatDuration !== bpm}]"
      >
        {{ text.playSpeedSlow }}
      </button>
    </div>
    <div
      class="applet-container"
      :style="mobileScale"
    >
      <div
        :class="[
          'caret',
          {
            'blink': playing && caretPosition < caretStart,
            'slow': beatDuration !== bpm
          }
        ]"
        :style="{
          left: caretPosition + 'px',
          opacity: playing ? 1 : 0,
          width: timeSig === 3 ? '133px' : '100px'
        }"
      ></div>
      <div class="staff-scroll-container" ref="scrollContain">
        <div :class="['staff', { 'threeFour': timeSig === 3 }]">
          <div
            v-for="note in song"
            :key="note.n"
            :class="[
              'note-container', 
              note.note,
              {
                note: true,
                eighth: note.duration === 0.5,
                half: note.duration === 2 || note.duration === 3,
                dotted: note.duration === 3,
                whole: note.duration === 4,
                bar: note.note === 'C',
                active: note.active
              }
            ]"
          >
            <div class="note">
              <div class="note-stem"></div>
              <div class="note-body"></div>
            </div>
            <div class="text">
              {{ note.lyric.replace('-', '') }}
            </div>
            <div class="dash" v-if="note.lyric[note.lyric.length - 1] === '-'">-</div>
          </div>
        </div>
      </div>
      <div class="board-container">
        <div class="board">
          <div
            v-for="key in keys"
            :key="key.note"
            :class="[
              'key',
              key.note,
              {
                'sharp': key.sharp,
                'active': key.active
              }
            ]"
          >
            <span>
              {{ key.sharp ? '' : key.note }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script src="./playController.js"></script>
<style scoped lang="scss" src="./playStyle.scss"></style>