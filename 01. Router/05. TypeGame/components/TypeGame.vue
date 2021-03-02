<template>
  <div class="world">
    <div class="container">
        <div class="playerWrap">
            <div class="firstImage">
                <img src="../assets/question.jpg" alt="" v-if="!playerPick">
                <img :src=playerPath alt="" v-else>
            </div>
            <h2 class="title">PLAYER</h2>
            <div class="lifeWrap">
                <img v-for="(life,k) in playerLife" src="../assets/heart.jpg" alt="하트이미지" :key="k">
                <img v-for="(life,l) in 3 - playerLife" src="../assets/broken-heart.jpg" alt="하트이미지" :key="l">
            </div>
            <div class="choiceWrap">
                <button class="fas fa-fire" @click="onClickPick('fire')"></button>
                <button class="fas fa-leaf" @click="onClickPick('leaf')"></button>
                <button class="fas fa-tint" @click="onClickPick('water')"></button>
            </div> 
            <div class="infoWrap">
                <button @click="onClickCheck" v-if="ready">선택완료</button>
                <button v-else>기다리는중..</button>
            </div>
        </div>
        <div class="counter">{{counter}}</div>
        <div class="cpuWrap">
            <div class="firstImage">
                <img src="../assets/question.jpg" alt="" v-if="!cpuPick">
                <img :src=cpuPath alt="" v-else>
            </div>
            <h2 class="title">PLAYER</h2>
            <div class="lifeWrap">
                <img v-for="(life,i) in cpuLife" src="../assets/heart.jpg" alt="하트이미지" :key="i">
                <img v-for="(life,j) in 3 - cpuLife" src="../assets/broken-heart.jpg" alt="하트이미지" :key="j">
            </div>
            <div class="choiceWrap">
               <p>생각하는중..</p>
            </div> 
        </div>
    </div>
    <ul>
        <li></li>
    </ul>
  </div>
</template>

<script>
let interval = null
export default {
    data(){
        return{
            playerPick : null,
            playerLife :3,
            cpuPick: null,
            cpuLife:3,
            counter:3,
            winner:'',
            ready:true
        }
    },
    methods:{
        onClickPick(value){
            this.playerPick = value
        },
        onClickCheck(){
            if(this.playerPick !== null){
                this.cpuPick = null
                this.ready = false
                interval = setInterval(()=>{
                this.counter--
                    if(this.counter === 0){
                        this.whatCpuType()
                        clearInterval(interval)
                    }
                },1000)
            }else{
                alert('타입을 골라주세요!')
            }
        },
        whatCpuType(){
            let cpuType = Math.random()
            if(cpuType <= 0.33){
                this.cpuPick = 'fire'
            }else if(cpuType <= 0.66){
                this.cpuPick = "water"
            }else{
                this.cpuPick = "leaf"
            }
            if(this.playerPick === "fire" && this.cpuPick ==="leaf"){
                this.winner = "PLAYER"
                this.cpuLife--
            }else if(this.playerPick === "water" && this.cpuPick ==="fire"){
                this.winner = "PLAYER"
                this.cpuLife--
            }else if(this.playerPick === "leaf" && this.cpuPick ==="water"){
                this.winner = "PLAYER"
                this.cpuLife--
            }else if(this.playerPick === "fire" && this.cpuPick ==="water"){
                this.winner = "CPU"
                this.playerLife--
            }
            else if(this.playerPick === "leaf" && this.cpuPick ==="fire"){
                this.winner = "CPU"
                this.playerLife--
            }
            else if(this.playerPick === "water" && this.cpuPick ==="leaf"){
                this.winner = "CPU"
                this.playerLife--
            }else{
                this.winner ="DRAW!"
            }
            if(this.playerLife === 0){
                setTimeout(()=>{
                    confirm("플레이어님이 패배하였습니다.")
                    this.winner = ''
                    this.playerPick = null
                    this.playerLife = 3
                    this.cpuLife = 3
                    this.cpuPick = null
                    this.counter = 3
                },500)
            }else if(this.cpuLife === 0){
                setTimeout(()=>{
                    confirm("플레이어님이 승리하였습니다.")
                    this.winner = ''
                    this.playerPick = null
                    this.playerLife = 3
                    this.cpuLife = 3
                    this.cpuPick = null
                    this.counter = 3
                },500)
            }
            this.counter = 3
            this.ready = true
        }
    },
    computed:{
        playerPath(){
            return require(`../assets/${this.playerPick}.png`)
        },
        cpuPath(){
            return require(`../assets/${this.cpuPick}.png`)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/index.scss'
</style>