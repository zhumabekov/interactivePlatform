<template>
  <section>
    <div v-if="loaded">
     <div class="intro">
      <div class="video">
        <video class="video-media" src="../assets/videobg.mp4" muted autoplay loop></video>
      </div>
     </div>
     <div class="wrapper">
       <div class="title">
         <span>Цель курса:</span>
         {{lectionData.lesson.name}}
       </div>
       <div class="content">
         <span>Задачи курса:</span>
         {{lectionData.lesson.description}}
       </div>
       <button class="lecture__test_btn" @click.prevent="familiarized()">{{lectionData.passed == lectionData.total ? "Назад" : "Ознакомиться"}}</button>
     </div>
    </div>
    <div class="loadingFon" v-else>Loading...</div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'InfoCart',
  props: ['id'],
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['lectionData'])
  },
  methods: {
    ...mapActions(['getLectionData', 'sendFamiliarize']),
    familiarized() {
      this.sendFamiliarize({lessonStatId: this.lectionData.id})
      .then((resp)=>{
        if(resp.data){
          this.$router.push('/lection')
        }else{
          this.$router.push('/lection')
        }
      })
    }
  },
  mounted() {
    this.getLectionData(this.id)
      .then((resp)=>{
        if(resp.data){
          this.loaded = true;
        }
      })
    if (!localStorage.getItem('userAttemptId')){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  section{
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #f8f8f8;
    overflow: auto;
  }
  .loadingFon{
    display: grid;
    justify-content: center;
    align-content: center;
    line-height: 100vh;
  }
  .intro{
    width: 100%;
    height: 40vh;
    background: url("../assets/bg.jpg") center no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }
  .intro::after{
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .video{
    position: relative;
    z-index: 1;
  }
  .video-media{
    width: 100%;
    height: auto;
    position: absolute;
    top: -5em;
    left: 0;
  }
  .wrapper{
    width: 90%;
    margin: 0 auto;
    display: grid;
    padding: 1em;
    grid-row-gap: 2em;
    font-size: .95em;
  }
  .title span{
    color: #1769aa;
    font-weight: bold;
    font-size: 1.25em;
  }
  .content span{
    color: #ff9100;
    font-weight: bold;
    font-size: 1.25em;
  }
  .lecture__test_btn{
    align-self: start;
    justify-self: start;
    background-color: #00a189;
    padding: .7em 3.5em;
    margin-top: 2em;
    border-radius: 3px;
    color: #fff;
    border: 2px solid #00a189;
    font-size: 1em;
  }
  .lecture__test_btn:hover{
    background-color: #f8f8f8;
    color: #00a189;
    transition: all .5s;
    cursor: pointer;
  }
  ol{
    margin-left: 1em;
  }
  @media screen and (min-width:2000px){
    .video-media{
      top: -10em;
    }
  }
  @media screen and (max-width:1000px){
    .video-media{
      top: 0;
    }
  }
</style>