<template>
  <li :style="{background:styleBackground}">{{ball}}</li>
</template>

<script>
export default {
    props:{
        ball:{
            type:Number,
            required:true
        }
    },
    computed:{
        styleBackground(){
            let background = null
            if(this.ball < 10){
                background = "#fa1e0e"
            }else if(this.ball < 20){
                background = "#ffbe0f"
            }
            else if(this.ball < 30){
                background = "#8ac4d0"
            }
            else if(this.ball < 40){
                background = "#beca5c"
            }else{
                background = "#ffd880"
            }
            return background
        }
    }
}
</script>

<style lang="scss" scoped>
    li{
        @media screen and (max-width:1080px) {
            margin: 0 5px;
        }
        display: inline-block;
        margin: 0 10px;
        width: 40px;
        height: 40px;
        border: 1px solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        font-weight: bold;
        color: #000;
    }
</style>