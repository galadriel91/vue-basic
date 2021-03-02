<template>
  <div class="world">
      <div class="container">
        <div class="playerContainer">
            <img src="../assets/question.jpg" alt="" v-if="!playerType">
            <img :src=playerPath alt="" v-else>
            <h2>PLAYER</h2>
          <div class="heartWrap">
            <img v-for="(life , i) in lifeOfPlayer" src="../assets/heart.jpg" alt="" :key="i">
            <img v-for="(life , i) in 3 - lifeOfPlayer" src="../assets/broken-heart.jpg" alt="" :key="i">
          </div>
          <div class="choiceWrap">
            <label for="fire">
                <input type="radio" id="fire" v-model="playerType" value="fire">
                불
            </label>
            <label for="water">
                <input type="radio" id="water" v-model="playerType" value="water">
                물
            </label>
            <label for="leaf">
                <input type="radio" id="leaf" v-model="playerType" value="leaf">
                풀
            </label>
          </div>
          <div class="btns">
              <button class="checkBtn" @click="onClickCheck">선택완료</button>
          </div>
        </div>
        <div class="counter">
            {{counter}}
        </div>
        <div class="cpuContainer">
            <img src="../assets/question.jpg" alt="" v-if="!cpuType">
            <img :src=cpuPath alt="" v-else>
            <h2>CPU</h2>
          <div class="heartWrap">
            <img v-for="(life , i) in lifeOfCpu" src="../assets/heart.jpg" alt="" :key="i">
            <img v-for="(life , i) in 3 - lifeOfCpu" src="../assets/broken-heart.jpg" alt="" :key="i">
          </div>
          <div>
            생각중 ... 
          </div>
          <div class="btns">
              <button>선택완료</button>
          </div>
        </div>
      </div>
      <ul>
          <li v-for="(log,i) in logs" :key="i">{{log}}</li>
      </ul>
  </div>
</template>

<script>
let interval = null
export default {
    data(){
        return{
            playerType:null,
            cpuType:null,
            counter:3,
            lifeOfPlayer:3,
            lifeOfCpu:3,
            logs:[]
        }
    },
    methods:{
        onClickCheck(){
            if(this.playerType !== null){
                interval = setInterval(() => {
                this.counter--
                if(this.counter === 0){
                    clearInterval(interval)
                    this.checkWinner()
                }
            }, 1000);
            }else{
                alert("속성을 선택해주세요")
            }
        },
        checkWinner(){
            let cpuPick = Math.random()
            if(cpuPick <= 0.33){
                this.cpuType = "fire"
            }else if(cpuPick <=0.66){
                this.cpuType = "water"
            }else{
                this.cpuType = "leaf"
            }
            if(this.playerType === "fire" && this.cpuType === "water"){
                this.lifeOfPlayer--
            }else if(this.playerType === "water" && this.cpuType === "leaf"){
                this.lifeOfPlayer--
            }else if(this.playerType === "leaf" && this.cpuType === "fire"){
                this.lifeOfPlayer--
            }else if(this.playerType === "water" && this.cpuType === "fire"){
                this.lifeOfCpu--
            }else if(this.playerType === "leaf" && this.cpuType === "water"){
                this.lifeOfCpu--
            }else if(this.playerType === "fire" && this.cpuType === "leaf"){
                this.lifeOfCpu--
            }
            this.counter = 3
            let log = `My Type is ${this.playerType} , Cpu Type is ${this.cpuType}`
            this.logs.unshift(log)
        }
    },
    computed:{
        playerPath(){
            return require(`../assets/${this.playerType}.png`)
        },
        cpuPath(){
            return require(`../assets/${this.cpuType}.png`)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/index.scss'
</style>