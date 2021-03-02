<template>
  <div class="world">
      <div class="screen" :style="{background:`url(${require('../assets/rsp.png')})no-repeat ${rspCode} -100px`}"></div>
      <div class="btnWrap">
          <button @click="onClickBtn('가위')" class="far fa-hand-scissors"></button>
          <button @click="onClickBtn('바위')" class="far fa-hand-rock"></button>
          <button @click="onClickBtn('보')" class="far fa-hand-paper"></button>
      </div>
      <div class="infoWrap">
          <span>Score : {{score}} 점</span>
          <p>{{message}}</p>
          <button class="fas fa-redo" @click="onClickReset" v-if="message"></button>
      </div>
  </div>
</template>

<script>

const rspCode = {
    바위 : "0px",
    보 : "-321px",
    가위 : "-631px"
}

const scoreTable = {
    바위 : 1,
    보 : 0,
    가위 : -1
}



const cpuChoice = (value) => {
    return Object.entries(rspCode).find(v=>{
        if(v[1] === value){
            return v[0]
        }
    })[0]
}



let interval = null


export default {
    data(){
        return{
            rspCode : rspCode.바위,
            score: 0,
            message:""

        }
    },
    methods:{
        changeScreen(){
            interval = setInterval(()=>{
                if(this.rspCode === rspCode.바위){
                this.rspCode = rspCode.보
                }else if(this.rspCode === rspCode.보){
                    this.rspCode = rspCode.가위
                }else if(this.rspCode === rspCode.가위){
                    this.rspCode = rspCode.바위
                }
            },100)
        },
        onClickBtn(value){
            const playerPick = scoreTable[value]
            const cpuPick = scoreTable[cpuChoice(this.rspCode)]
            const diff = playerPick - cpuPick

            if([-1,2].includes(diff)){
                this.score++
                this.message = "플레이어 승리!"
            }else if([1,-2].includes(diff)){
                this.score--
                this.message = "플레이어 패배"
            }else{
                this.message = "비겼습니다"
            }
            clearInterval(interval)
            setTimeout(this.changeScreen , 1500)
        },
        onClickReset(){
            this.rspCode = rspCode.바위,
            this.score= 0,
            this.message=""
        }
    },
    mounted(){
       this.changeScreen()
    },
    beforeDestroy(){
        clearInterval(interval)
    }

}
</script>

<style lang="scss" scoped>
    @import '../styles/index.scss'
</style>