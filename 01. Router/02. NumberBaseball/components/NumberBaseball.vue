<template>
  <div class="world">
    <div class="container">
      <h3 class="title">4자리의 숫자를 넣어주세요</h3>
      <div class="result" v-if="result">{{result}}</div>
      <form action="" @submit.prevent="onSubmitForm">
        <input type="text" v-model="value" maxlength="4" minlength="4" ref="inputRef" @input="onChangeInput">
        <button type="submit" class="fas fa-check"></button>
      </form>
      <ul>
        <li v-for="(v,i) in tries" :key="i">
          <p>{{v.number}}</p>
          <div>
            <p>{{v.tries}}</p>
            <span>{{v.info}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

const getNumber = () => {
  const candidate = [1,2,3,4,5,6,7,8,9]
  const shupple = []
  for(let i=0 ; i<4; i++){
    const choice = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]
    shupple.push(choice)
  }
  return shupple
}
export default {
  data(){
    return{
      number:getNumber(),
      value:'',
      tries:[],
      result:''
    }
  },
  methods:{
    onChangeInput(){
      if(this.result){
        this.result = ''
      }
    },
    onSubmitForm(){
      if(this.number.join('') === this.value){
        this.number = getNumber()
        this.value = ""
        this.tries = []
        this.result = "정답입니다."
        this.$refs.inputRef.focus()
      }else{
        if(this.tries.length >= 9){
          this.result = `10번을 초과하여 실패하였습니다. 정답은${this.number}였습니다.`
          this.number = getNumber()
          this.value = ""
          this.tries = []
          this.$refs.inputRef.focus()
        }else{
          let strike = 0;
          let ball = 0;
          const valueArray = this.value.split('').map(v=>parseInt(v))
          for(let i = 0; i <4 ; i++){
            if(valueArray[i] === this.number[i]){
              strike++
            }else if(this.number.includes(valueArray[i])){
              ball++
            }
          }
          this.tries.unshift({
            number: this.tries.length + 1,
            tries:this.value,
            info:`${strike}스트라이크 ${ball}볼 입니다.`
          })
          this.value =''
          this.$refs.inputRef.focus()
        }
      }
    }
  }
}
</script>

<style lang="scss">
    @import '../styles/index.scss';
</style>