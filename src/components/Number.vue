<template>
  <div class="number">
      <span class="reduce" @click="reduce">-</span>
      <input type="text" class="value" :value="currentValue" @change="onChange">
      <span class="add" @click="add">+</span>
  </div>
</template>

<script>
export default {
    props: {
        value:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            currentValue:this.value
        }
    },
    methods: {
        reduce(){
            this.currentValue--;
            if(this.currentValue<=0){
                this.currentValue = 0
            }
            // console.log(this.currentValue)
        },
        add(){
            this.currentValue++
            // console.log(this.currentValue)
        },
        onChange(e){
            // console.log(e)
            let newValue = e.target.value
            newValue = newValue.trim()
            if(/\D*/g.test(newValue)){//只允许整数，没有负号，小数点
                e.target.value = this.currentValue
                // console.log("有非数字")
            }
            if(newValue<=0){
                this.currentValue = 0;
            }
        },
        updateValue(val){
            val = val<0?0:val
            this.currentValue = val
        }
    },
    watch: {
        value(val){
            this.updateValue(val)
        },
        currentValue(val){
            this.$emit('input',val)
            this.$emit('on-change',val)
        }
    },
    mounted () {
        this.updateValue(this.value)
    }
}
</script>

<style lang="less" scoped>
.number{
    color: #222222;
    font-weight: bold;
    .reduce{
        font-size: 0.20rem;
    }
    .value{
        display: inline-block;
        width: 30px;
        padding: 2px 0;
        margin: 0 5px;
        text-align: center;
        background-color:#ddd;
        color: #333333;
        border: none;
        outline: none;
    }
    .add{
        font-size: 0.20rem;
    }
}
</style>