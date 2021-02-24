<template>
  <div class="world">
    <div class="container">
      <div>
        <span class="randomNumber">{{first}}</span> 
        X 
        <span class="randomNumber">{{second}}</span>
        =
        ?
      </div>
      <form @submit.prevent="onSubmitForm">
        <input type="text" v-model="answer" ref="inputRef">
        <button type="submit" class="fas fa-check"></button>
      </form>
      <div v-if="result" :class="{result : isCorrect}">{{result}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      first: Math.ceil(Math.random() * 9) , 
      second: Math.ceil(Math.random() * 9),
      answer:'',
      result:'',
      isCorrect : null
    }
  },
  methods:{
    onSubmitForm(){
      if(this.first * this.second === parseInt(this.answer)){
        this.first = Math.ceil(Math.random() * 9);
        this.second = Math.ceil(Math.random() * 9);
        this.answer = '',
        this.result = "정답입니다."
        this.isCorrect = true
        this.$refs.inputRef.focus()
      }else{
        this.answer = '',
        this.result = "다시한번 생각하세요"
        this.isCorrect = false
        this.$refs.inputRef.focus()
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../style/index.scss';
</style>