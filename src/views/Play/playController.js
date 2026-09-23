import Vue from 'vue';

export default {
  name: 'ViewPlay',
  props: [
    'songUrl'
  ],
  data: function() {
    return {
      keys: [],
      playing: false,
      audio: null,
      caretPosition: 0,
      beatDuration: 100,
      mobileScale: {}
    }
  },
  created: function() {
    // scale for mobile
    if (window.innerWidth < 1000) {
      const
        scale = window.innerWidth / 1100,
        trans = Math.floor(((100 - (100 / scale)) / 2) * 100) / 100;
      this.mobileScale = {
        width: Math.floor(100 / scale) + '%',
        transform: `scale(${scale}, ${scale}) translate(${trans}%, ${trans}%)`
      };
    }

    // Load data
    this.songUrl = this.songUrl.toLowerCase();
    const loadedSong = this.$siteContent.songData.find(s => s.url === this.songUrl);
    if (!loadedSong) {
      this.song = [];
      this.text = {};
      this.$router.push({ path: '/learn' });
      return;
    }

    // Consts
    this.caretStart = 170;
    this.text       = this.$siteContent.textContent.learn;  
    this.songTitle  = loadedSong.name;
    this.offset     = loadedSong.offset || 0,
    this.bpm        = loadedSong.bpm ? 1 / (loadedSong.bpm / 6000) : 600;
    this.timeSig    = loadedSong.time || 4,
    this.audio      = new Audio(`song_files/${this.songUrl}.mp3`);
    this.song = loadedSong.notes.map(note => ({
      note: note.n || 'R',
      octave: note.o || 4,
      sharp: note.s || false,
      duration: note.d || 1,
      lyric: note.l || '',
    }));

    // Non-reacitve variables
    this.caretPosition = this.caretStart - (this.timeSig === 3 ? 110 : 90);
    this.timeouts = [];
    this.beatDuration = this.bpm;
    this.audioReady = false
    this.audio.oncanplaythrough = () => this.audioReady = true;

    // Space to play
    document.body.onkeydown = e => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.playing ? this.stop() : this.play();
      }
    }

    // Create keyboard
    const
      noteStart = 'C',
      octaveStart = 3,
      keys = 25;
    let
      current = noteStart.charCodeAt(0),
      isSharp = false,
      octave = octaveStart;
    for (let i = 0; i < keys; i++) {
      this.keys.push({
        note: String.fromCharCode(current),
        sharp: isSharp,
        octave: octave,
        active: false
      });
      if (isSharp || current === 66 || current === 69) {
        if (current < 71) {
          current += 1;
        } else {
          current = 65;
          octave += 1;
        }
        isSharp = false;
      } else {
        isSharp = true;
      }
    }
  },
  destroyed: function() {
    this.stop();
  },
  methods: {
    play: function() {
      // Delay start until audio is loaded
      if (this.audioReady) {
        this.playSong();
      } else {
        this.audio.oncanplaythrough = this.playSong;
      }
    },
    stop: function() {
      this.playing = false;
      this.timeouts.forEach(t => clearTimeout(t));
      this.timeouts = [];
      this.keys.forEach(k => k.active = false);
      this.song.forEach(n => n.active = false);
      this.caretPosition = this.caretStart - (this.timeSig === 3 ? 110 : 90);
      this.audio.pause();
      this.audio.currentTime = 0;
      this.$refs.scrollContain.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    playSong() {
      this.audio.playbackRate = this.beatDuration / this.bpm;
      this.playing = true;
      // Count in
      this.timeouts.push(setTimeout(
        () => {
          this.caretPosition = this.caretStart;
          this.caretInterval =
            this.timeouts.push(setInterval(
              () => {
                if (this.caretPosition > 800) {
                  this.caretPosition = this.caretStart;
                  this.$refs.scrollContain.scrollTo({
                    top: this.$refs.scrollContain.scrollTop + 237,
                    left: 0,
                    behavior: 'smooth'
                  });
                } else {
                  this.caretPosition += Math.floor(400 / this.timeSig);
                }
              },
              this.beatDuration
            ));
          // Offset audio if needed
          this.timeouts.push(setTimeout(
            () => this.audio.play(),
            this.offset * this.beatDuration
          ));
          this.playNote(0);
        },
        this.timeSig * this.beatDuration
      ));
    },
    playNote(currentNote) {
      if (currentNote >= this.song.length) {
        this.stop();
      } else {
        const noteObj = this.song[currentNote];
        if (noteObj.note !== 'R') {
          let key = this.keys.findIndex(k =>
            noteObj.note === k.note &&
            noteObj.sharp === k.sharp &&
            noteObj.octave === k.octave
          );
          Vue.set(this.keys[key], 'active', true);
          Vue.set(noteObj, 'active', true);
        }
        this.timeouts.push(setTimeout(
          () => this.playNote(currentNote + 1),
          noteObj.duration * this.beatDuration
        ));
        this.timeouts.push(setTimeout(
          () => {
            this.keys.forEach(k => k.active = false);
            this.song.forEach(n => n.active = false);
          },
          (noteObj.duration * this.beatDuration) - 100
        ));
      }
    }
  }
}