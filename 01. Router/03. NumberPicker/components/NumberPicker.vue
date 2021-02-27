<template>
  <div class="world">
    <div v-if="start" class="startWrap">
        <h2>버튼을 눌러서 시작하세요!</h2>
        <button class="fas fa-mouse" @click="onPickBall"></button>
    </div>
    <div v-else>
        <ul>
            <NumberBall v-for="(v,i) in pickball" :key="i" :ball="v"/>
        </ul>
        <div v-if="bonus" class="bonus">
            <p>보너스!</p>
            <NumberBall :ball="bonus"/>
            <button class="fas fa-redo" @click="onRepickBall"></button>
        </div>
    </div>
  </div>
</template>

<script>
const getBall = () => {
    const candidate = Array(45).fill('').map((v,i)=> v=i+1);
    const shupple = [];
    while(0<candidate.length){
        const choie = candidate.splice(Math.floor(Math.random()*candidate.length) ,1)[0]
        shupple.push(choie)
    }
    const bonus = shupple[shupple.length - 1]
    return [...shupple.slice(0,6) , bonus]
}
import NumberBall from './NumberBall'
let timeout = []
export default {
    components:{
        NumberBall,
    },
    data(){
        return{
            prizeBall : getBall(),
            pickball : [],
            bonus : '',
            redo: false,
            start:true
        }
    },
    methods:{
        onPickBall(){
            this.start = false
            for(let i =0 ; i < 6; i++){
                timeout[i] = setTimeout(() => {
                    this.pickball.push(this.prizeBall[i])
                }, (i+1) * 1000);
            }
            timeout[6] = setTimeout(() => {
                this.bonus = this.prizeBall[this.prizeBall.length - 1]
                this.redo = true
            }, 7000);
        },
        onRepickBall(){
            this.prizeBall = getBall();
            this.pickball = []
            this.bonus = false
            this.redo = false
            this.onPickBall()
        }
    },
    beforeDestroy(){
        timeout.forEach(v=>clearTimeout(v))
    }
}
</script>

<style lang="scss" scoped>
    @keyframes mouseUpAndDown {
        0%{
            transform: translateY(-10px);
        }
        100%{
            transform: translateY(10px);
        }
    }
    .world , .bonus{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    button{
        cursor: pointer;
        margin-top: 20px;
        font-size: 30px;
        color: #000;
        animation: mouseUpAndDown 1s infinite alternate;
        background: none;
    }
    .world{
        height: 100vh;
        .startWrap{
            text-align: center;
            h2{
                font-size: 17px;
                font-weight: bold;
                color: #000;
            }
        }
        .bonus{
            color: #000;
            p{
                margin: 20px 0 10px;
                font-size: 16px;
            }
        }
    }
</style>