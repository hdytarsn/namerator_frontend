<template>
  <div
      id="wrapper"
      ref="wrapper"
      :style="{width: 'auto', height: container_height+'px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', 'alignItems': 'center'}"
  >
    <div
        id="container"
        :style="{width: container_width+'px', height: container_height+'px', paddingTop: padding+'px', margin: '0 auto', boxSizing: 'border-box'}"
    >

      <div
          class="item"
          :style="{width: inner_size+'px', height: inner_size+'px', paddingLeft: padding+'px', paddingRight: padding+'px', float: 'left', direction: 'ltr', position: 'relative'}"
      >
        <div
            :style="{textAlign:'center',width: inner_size+'px', height: inner_size+'px', lineHeight: inner_size+'px', position: 'absolute', fontSize: number_font_size+'px',fontWeight:'700'}">
          {{ factor * seconds }}
        </div>
        <svg
            :width="inner_size"
            :height="inner_size"
            xmlns="http://www.w3.org/2000/svg"
        >
          <circle
              :r="r"
              :cy="cx"
              :cx="cy"
              :stroke-width="strokeWidth"
              :fill="fillColor"
          />
          <circle
              :transform="'rotate(-90, '+cx+', '+cy+')'"
              :style="{strokeDasharray: stroke_dasharray_second, strokeDashoffset: stroke_dashoffset_second}"
              class="circle_animation"
              :r="r"
              :cy="cx"
              :cx="cy"
              :stroke-width="strokeWidth"
              :stroke="strokeColor"
              fill="transparent"
          />
        </svg>
        <div v-if="label" :style="{fontSize: label_font_size+'px',textAlign:'center',marginTop:'10px'}">
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    initialValue: {
      type: Number,
      required: true,
      default: 10
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    strokeColor: {
      type: String,
      default: "#acdb28"
    },
    underneathStrokeColor: {
      type: String,
      default: "#eee"
    },
    fillColor: {
      type: String,
      default: 'none'
    },
    size: {
      type: Number,
      default: 0
    },
    padding: {
      type: Number,
      default: 5
    },
    label: {
      type: String,
      default: ""
    },
    steps: {
      type: Number,
      default: undefined
    },
    paused: {
      type: Boolean,
      default: false
    },
    runCountDown: {
      type: Boolean,
      default: true,
      description: 'if true this option,countdowns not run, only shows given value'
    },

  },
  data() {
    return {
      isMounted: false,
      value: this.initialValue,
      labelFontRatio: 0.15,
      numberFontRatio: 0.3,
      baseTime: 0,
    };
  },
  computed: {
    seconds_step() {
      return this.steps ? (Math.max(this.steps, this.initialValue)) : this.initialValue
    },
    seconds() {
      return this.value
    },
    factor() {
      return this.value >= 0 ? 1 : -1
    },
    circle_length() {
      return 2 * Math.PI * this.r
    },
    second_step_length() {
      return this.circle_length / this.seconds_step
    },
    stroke_dasharray_second() {
      return this.circle_length
    },
    stroke_dashoffset_second() {
      return this.circle_length - this.seconds * this.second_step_length;
    },
    cx() {
      return this.inner_size / 2;
    },
    cy() {
      return this.inner_size / 2;
    },
    r() {
      return (this.inner_size - this.strokeWidth) / 2;
    },
    inner_size() {
      return this.circle_size - this.padding * 2;
    },
    circle_size() {
      const size = this.size === 0 && this.isMounted ? this.$refs.wrapper.parentElement.clientHeight : this.size;
      return this.has_label ? size - size * this.labelFontRatio : size;
    },
    container_height() {
      return this.size === 0 && this.isMounted ? this.$refs.wrapper.parentElement.clientHeight : this.size;
    },
    container_width() {
      return this.inner_size + this.padding * 2;
    },
    has_label() {
      return this.label !== "";
    },
    label_font_size() {
      return this.circle_size * this.labelFontRatio;
    },
    number_font_size() {
      return this.circle_size * this.numberFontRatio;
    }
  },
  methods: {
    notifyChange() {
      let output = {value: this.value};
      this.$emit('update', output);
    },
    updateTime(seconds) {
      if (this.value)
        this.value += seconds;
      if (this.value < 0) {
        this.$emit('finish')
      }
    },
    updateManuel(seconds) {
      //updates time value visually,countdown actually not works, works with runCountDown=false
      this.value = seconds;
    }
  },
  watch: {
    seconds() {
      this.notifyChange();
    },
  },
  mounted: function () {
    this.isMounted = true;
    if (this.runCountDown) {
      this.$nextTick(() => {
        if (this.value) {
          const interval = setInterval(function () {
            if (this.paused) {
              return;
            }
            const delta = 1;
            this.value -= delta;
            if (this.value === 0) {
              this.$emit('finish');
            }
            if (this.value <= 0) {
              this.value = this.initialValue;
              //clearInterval(interval);
            }
          }.bind(this), 1000);
        }
      });
    }
  }
}
</script>

<style scoped>
circle {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
</style>