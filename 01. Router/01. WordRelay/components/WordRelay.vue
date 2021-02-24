<template>
  <div class="world">
      <div class="container">
          <div class="mainWord">{{word}}</div>
          <form @submit.prevent="onSubmitForm">
              <input type="text" ref="inputRef" v-model="answer">
              <button type="submit" class="fas fa-check"></button>
          </form>
          <div :class="{result : isCorrect}">{{result}}</div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            word:'우병우',
            answer:'',
            result:'',
            isCorrect:null
        }
    },
    methods:{
        onSubmitForm(){
            if(this.word[this.word.length - 1] === this.answer[0]){
                this.word = this.answer
                this.answer = ''
                this.result = "계속하세요"
                this.isCorrect = true
            }else{
                this.answer = ''
                this.result = "다시한번 생각해보세요"
                this.isCorrect = false
            }
        }
    }
}
</script>

<style lang="scss">
    @import '../style/index.scss';
</style>