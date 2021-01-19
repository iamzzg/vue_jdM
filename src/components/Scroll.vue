<template>
  <div
    class="scroll-container"
    ref="container"
    @touchstart="ontouchstart"
    @touchmove="ontouchmove"
    @touchend="ontouchend"
  >
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "vertical",
    },
  },
  data() {
    return {
      container: null, //外部容器
      content: null, //内容容器
      startX: 0, //开始坐标
      startY: 0,
      endX: 0, //结束坐标
      endY: 0,
      dy: 0, //整个触摸的x，y轴变化量
      dx: 0,
      translateX: 0, //translate的值
      translateY: 0,
      maxScrollTop: 0, //内容容器-外部容器的值，判断translate是否到下边界
      maxScrollLeft: 0,
    };
  },
  methods: {
    //获取内部容器translate的值
    getTranslateVal() {
      let translate = window
        .getComputedStyle(this.content)
        ["transform"].toString();
      translate = translate.slice(7);
      let translateX = parseFloat(translate.split(",")[4]),
        translateY = parseFloat(translate.split(",")[5]);
      return {
        translateX: translateX || 0,
        translateY: translateY || 0,
      };
    },
    init() {
      //思路：记录触摸过程中x,y的增量，利用css3的translate来做动画和transition来做动画，并且禁止滚动条和mousewheel事件，滚动完全由translate来控制
      this.container = this.$refs.container; //外部容器
      this.content = this.$refs.content;
      //   console.log(this.container)
      //   console.log(this.content)
    },
    //监听滚轮事件，阻止默认行为，即禁止可以通过滚轮滚动内容
    onMouseWheel(e) {
      e.preventDefault();
    },
    ontouchstart(e) {
      // console.log('触摸开始')
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.translateX = this.getTranslateVal(this.content).translateX;
      this.translateY = this.getTranslateVal(this.content).translateY;

      this.maxScrollTop =
        this.content.scrollHeight - this.container.clientHeight; //下拉到底部的translateY值
      this.maxScrollLeft =
        this.content.scrollWidth - this.container.clientWidth; //左滑到右边界的translateX值
    },
    ontouchmove(e) {
      e.preventDefault();
      this.endX = e.changedTouches[0].clientX;
      this.endY = e.changedTouches[0].clientY;
      this.dx = this.endX - this.startX;
      this.dy = this.endY - this.startY;

      //1、水平滚动
      if (this.direction === "horizontal") {
        if (this.dx > 0 && this.dx < 200) {
          //向右滑动，限制滑动距离一次最多200px
          if (this.translateX >= 0) {
            //到左边缘
            this.content.style.transition = "none";
            this.content.style.transform = `translateX(${this.dx}px)`;
          } else {
            this.content.style.transform = `translateX(${
              this.translateX + this.dx
            }px)`;
          }
        }

        if (this.dx < 0 && this.dx > -200) {
          //左滑
          this.content.style.transition = "none";
          this.content.style.transform = `translateX(${
            this.translateX + this.dx
          }px)`;
        }

        //2、垂直滚动
      } else if (this.direction === "vertical") {
        if (this.dy > 0 && this.dy < 200) {
          //向下滑动
          if (this.translateY >= 0) {
            //到顶部
            this.content.style.transition = "none";
            this.content.style.transform = `translateY(${this.dy}px)`;
          } else {
            this.content.style.transform = `translateY(${
              this.translateY + this.dy
            }px)`;
          }
        }

        if (this.dy < 0 && this.dy > -200) {
          //上拉
          this.content.style.transition = "none";
          this.content.style.transform = `translateY(${
            this.translateY + this.dy
          }px)`;
        }
      }
    },
    ontouchend(e) {
      //1、水平滚动
      if (this.direction === "horizontal") {
        this.endX = e.changedTouches[0].clientX;
        this.dx = this.endX - this.startX;

        this.translateX += this.dx;
        if (this.translateX >= 0 || this.maxScrollLeft <= 0) {
          //左滑回弹,maxScrollTop<=0说明容器内的内容高度不超过容器，此时都应回到translateY：0px
          this.content.style.transition = "transform .3s";
          this.content.style.transform = "translateX(0px)";
          this.translateX = 0;
        }

        if (
          this.maxScrollLeft > 0 &&
          Math.abs(this.translateX) > this.maxScrollLeft
        ) {
          //底部上拉回弹
          this.content.style.transition = "transform .3s";
          this.content.style.transform = `translateX(${-this.maxScrollLeft}px)`;
        }

        //2、垂直滚动
      } else if (this.direction === "vertical") {
        this.endY = e.changedTouches[0].clientY;
        this.dy = this.endY - this.startY;

        this.translateY += this.dy;
        if (this.translateY >= 0 || this.maxScrollTop <= 0) {
          // console.log(this.maxScrollTop);
          //顶部下拉回弹,maxScrollTop<=0说明容器内的内容高度不超过容器，此时都应回到translateY：0px
          this.content.style.transition = "transform .3s";
          this.content.style.transform = "translateY(0px)";
          this.translateY = 0;
        }

        if (
          this.maxScrollTop > 0 &&
          Math.abs(this.translateY) > this.maxScrollTop
        ) {
          //底部上拉回弹
          this.content.style.transition = "transform .3s";
          this.content.style.transform = `translateY(${-this.maxScrollTop}px)`;
        }
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
}

.scroll-container {
  width: 100%;
  /* background-color: skyblue; */
  overflow: auto;
  box-sizing: border-box;
  position: relative;
}

.scroll-container::-webkit-scrollbar {
  display: none !important;
  width: 0;
  height: 0;
}
</style>