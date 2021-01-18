<template>
  <div class="pullup-container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <slot></slot>
      <slot name="footer">
          <div class="load-more" v-if="state===1">{{loadTips.loadMoreText}}</div>
          <div class="loading" v-if="state===2">{{loadTips.loadingText}}</div>
          <div class="no-more-load" v-if="state===3">{{loadTips.noMoreText}}</div>
      </slot>
  </div>
</template>

<script>
export default {
    name:"PullUpLoad",
    props: {
        parentPullUpState:{
            type:Number,
            default:0
        }
    },
    data () {
        return {
            state:this.parentPullUpState,//上拉状态0:加载更多，1：正在加载。。。，2：没有更多数据了。
            loadTips:{
                loadMoreText:"上拉加载更多",
                loadingText:"正在加载...",
                noMoreText:"没有更多数据了。"
            },
            isLoading:false,//是否正在加载
            startX:0,
            startY:0,
            endX:0,
            endY:0,
            direction:{
                0:"none",
                1:"up",
                2:"down",
                3:"left",
                4:"down"
            }
        }
    },
    methods: {
        //监听touchstart事件，记录触摸点再页面的x，y坐标
        onTouchStart(event){
            this.startX = event.touches[0].pageX
            this.startY = event.touches[0].pageY
        },
        //监听touchmove事件，判断滑动方向，
        onTouchMove(event){
            this.endX = event.changedTouches[0].pageX
            this.endY = event.changedTouches[0].pageY
            const direction = this.direction[this.getDirection(this.startX,this.startY,this.endX,this.endY)]
            if(direction==='up'){//上拉
                this.scrollToEnd()//判断是否到页面底部
            }
        },
        onTouchEnd(){
            
        },
        scrollToEnd(e){
            //视口高度
            const viewHeight = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
            //滚动高度
            const scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop

            //页面高度
            const pageHeight = document.documentElement.scrollHeight||document.body.scrollHeight

            //视口高度+滚动高度>页面高度，到底部了
            if(viewHeight + scrollTop >= pageHeight){
                if(this.state!==3&&!this.isLoading){//还可以加载并且此时没有在加载中
                    if(this.state!==0)
                    this.state=2;
                    this.isLoading = true;
                    this.$emit("pullUp",this.loadDone)
                }
                
                
            }
        },
        loadDone(){
            this.state = 1;
            this.isLoading = false
        },
        //根据坐标返回滑动方向
        getDirection(startX,startY,endX,endY){
            const dy = startY-endY;
            const dx = endX-startX;
            const angle = this.getAngle(dy,dx)
            let direction = 0;

            if(Math.abs(dy)<2&&Math.abs(dx)<2){
                return direction =0;
            }
            if(angle>=-45&&angle<45){
                direction = 4//右
            }else if(angle>=45&&angle<135){
                direction =1//上
            }else if(angle>=-135&&angle<-45){
                direction = 2//下
            }else if(angle>=135&&angle<=180||angle>=-180&&angle<-135){
                direction = 3//左
            }
            return direction;
        },
        //返回角度
        getAngle(dy,dx){
            return Math.atan2(dy,dx)*180/Math.PI

        }
    },
    watch: {
        parentPullUpState(curVal,oldVal){
            this.state = curVal
        }
    }
}
</script>

<style lang="less" scoped>
.pullup-container{
    .load-more,
    .loading,
    .no-more-load{
        text-align: center;
        font-size: 0.14rem;
        color: #bbbbbb;
    }
}
</style>
