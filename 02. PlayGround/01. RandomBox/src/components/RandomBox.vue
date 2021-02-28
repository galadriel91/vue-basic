<template>
  <div class="world">
    <div class="container">
      <h3>1%의 뮤를 뽑아라</h3>
      <p>클릭해서 뽑아 보세요</p>
      <div class="randomScreen" @click="onClickScreen" :style="{backgroundImage:`url(${require('@/assets/imgs/'+pokeball+'.png')})`}"></div>
      <div>{{myRandomNumber}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      myRandomNumber : Math.ceil(Math.random()*99),
      mu:[],
      legend:[],
      fantasy:[],
      unique:[],
      common:[],
      pokeball : 'pokeball'
    }
  },
  methods:{
    onClickScreen(){
      if(this.myRandomNumber === 1){
        this.pokeball = '01'
      }else if(this.myRandomNumber <= 5){
        this.pokeball = '02'
      }else if(this.myRandomNumber <= 10){
        this.pokeball = `0${(Math.ceil(Math.random()*8) + 2)}` // 3~10
      }else if(this.myRandomNumber <= 30){
        this.pokeball = `0${(Math.ceil(Math.random()*10) + 10)}` // 11~20
      }else if(this.myRandomNumber <= 50){
        this.pokeball = `0${(Math.ceil(Math.random()*20) + Math.ceil(Math.random()*20))}` // 21~40
      }else{
        this.pokeball = `0${(Math.ceil(Math.random()*40) + Math.ceil(Math.random()*40))}` // 41~80
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/index.scss'
</style>