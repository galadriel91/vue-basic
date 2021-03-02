<template>
  <div class="world">
      <!-- <div id="screen" :style="{background: `url(/rsp.png) ${rspCode} -100px`}"> -->
      <div class="screen" :style="{background:`url(${require('../assets/rsp.png')})no-repeat ${rspCode} -100px`}"></div>
      <div>
          <button @click="onClickBtn('가위')">r</button>
          <button @click="onClickBtn('바위')">s</button>
          <button @click="onClickBtn('보')">p</button>
      </div>
      <div>
          <span>점수</span>
      </div>
  </div>
</template>

<script>

const rspCode = {
    바위 : "0px",
    보 : "-320px",
    가위 : "-630px"
}
let interval = null


export default {
    data(){
        return{
            rspCode : rspCode.바위,
            score: 0,

        }
    },
    methods:{
        changeScreen(){
            if(this.rspCode === rspCode.바위){
                this.rspCode = rspCode.보
            }else if(this.rspCode === rspCode.보){
                this.rspCode = rspCode.가위
            }else if(this.rspCode === rspCode.가위){
                this.rspCode = rspCode.바위
            }
        },
        onClickBtn(value){
            console.log(value)
            clearInterval(interval)
            setTimeout(interval, 1000);
        }
    },
    mounted(){
        interval = setInterval(this.changeScreen, 100);
    },

}
</script>

<style lang="scss" scoped>
    @import '../styles/index.scss'
</style>