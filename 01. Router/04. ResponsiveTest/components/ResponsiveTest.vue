<template>
  <div class="world">
      <div @click="onClickChange" id="screen" :class=state><p>{{message}}</p></div>
      <div class="info" v-if="average.length">
          <span>{{average.length}}회 </span>
          <p>평균 : {{GETAVERAGE.toFixed(2)}}초</p>
          <button @click="onClickReset" class="fas fa-redo"></button>
      </div>
  </div>
</template>

<script>
let startTime = null
let endTime = null
let timeout = null
export default {
    data(){
        return{
            state:"waiting",
            average:[],
            message:"클릭해서 시작하세요"
        }
    },
    computed:{
        GETAVERAGE(){
            return (this.average.reduce((a,b)=>(a+b),0) / this.average.length) * 0.001
        }
    },
    methods:{
        onClickChange(){
            if(this.state === "waiting"){
                this.state = "ready"
                this.message = "노란으로 바뀌면 클릭하세요"
                timeout = setTimeout(()=>{
                    startTime = Date.now()
                    this.message = "지금 클릭하세요!"
                    this.state = "now"
                }, (Math.random()*1000) + 2000)
            }else if(this.state === "ready"){
                this.message = "너무 성급하셨네요, 다시 시작하세요"
                this.state = "waiting"
            }else if(this.state === "now"){
                this.state = "waiting"
                this.message = "클릭해서 시작하세요"
                endTime = Date.now()
                this.average.push(endTime - startTime)
            }
        },
        onClickReset(){
            this.state = "waiting";
            this.average = [];
            this.message = "클릭해서 시작하세요";
            clearTimeout(timeout)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/index.scss'
</style>>

