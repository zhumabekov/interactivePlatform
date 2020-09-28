<template>
  <section>
    <div class="wrapper" v-if="loaded">
      <router-link :to="(lection.lesson.type === 3) ? '/infoblock/'  + lection.id : (lection.lesson.type === 2) ? '/infocart/'  + lection.id : '/lectureblock/' + lection.id" class="inform_block" v-for="(lection, index) of lections" :key="index">
        <div class="inform_block__img" :style="{'background-image': `url(http://176.119.159.61/fileitems/${lection.lesson.image.id}${lection.lesson.image.extension})`}"></div>
        <div class="inform_block__titile">{{index+1}} {{lection.lesson.name}}</div>
        <div class="inform_block__text"><span>{{lection.lesson.description}}</span></div>
        <div class="inform_block__progress_bar">
          <div class="percentage" :class="{stopAnimation: (lection.passed*(100/lection.total) == 100)}" :style="{'width' : lection.passed*(100/lection.total) + '%'}">{{(lection.passed*(100/lection.total)).toFixed()}} %</div>
        </div>
      </router-link>
    </div>
    <div class="loadingFon" v-else>Loading...</div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Section',
  data: () => {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['lections']),
  },
  methods: {
    ...mapActions(['getLections'])
  },
  mounted() {
    if (!localStorage.getItem('userAttemptId')){
      this.$router.push('/')
    }
    this.getLections()
      .then((resp)=>{
        if(resp.data){
          this.loaded = true;
        }
      })
  }
}
</script>

<style scoped>
  section{
    width: 100%;
    height: calc(100vh - 100px);
    background: url("../assets/bgSection.jpg") center no-repeat;
    background-size: cover;
    /* display: grid; */
    overflow: auto;
  }
  .loadingFon{
    width: 100%;
    height: calc(100vh - 100px);
    display: grid;
    justify-content: center;
    align-content: center;
  }
  .wrapper{
    width: 90%;
    margin: 0 auto;
    display: grid;
    padding: 1em;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    grid-auto-rows: minmax(180px, 200px);
  }
  .inform_block{
    cursor: pointer;
    display: grid;
    box-shadow: 0px 0px 10px -3px rgba(0,0,0,0.75);
    background-color: rgba(248, 248, 248, .8);
    border-radius: 5px;
    grid-column-gap: 1em;
    text-decoration: none;
    color: #1e3144;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 2fr 1fr;
    grid-template-areas: 
    "img title"
    "img descrip"
    "img progress_bar";
    transition: all .5s;
  }
  
  .inform_block__img{
    grid-area: img;
    overflow: hidden;
    /* background-image: url(http://176.119.159.61/api/FileItems/DownloadFile?FileItemId=80262383-ba77-48fc-8853-fa9824f510f6); */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .inform_block__titile{
    grid-area: title;
    display: grid;
    align-content: center;
    font-size: 1em;
    padding: .5em .5em .5em 0;
  }
  .inform_block__text{
    grid-area: descrip;
    font-size: 0.8em;
    padding-right: .5em;
    /* line-height: 1.2em; */
  }
  .inform_block__progress_bar{
    display: grid;
    align-content: center;
    grid-area: progress_bar;
  }
  .inform_block__progress_bar {
    position: relative;
    width: 98%;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0,0,0, .4), 0 -1px 1px #fff, 0 1px 0 #fff;
  }
  .inform_block__progress_bar .percentage {
    position: absolute;
    top: 1px; left: 1px; right: 1px;
    display: block;
    text-align: center;
    line-height: 30px;
    font-size: 0.8em;
    height: 100%;
    color: #fff;
    border-radius: 15px;
    background-color: #00a189;
    background-size: 30px 30px;
    background-image: linear-gradient(135deg, rgba(255,255,255, .15) 25%, transparent 25%, transparent 50%, rgba(255,255,255, .15) 50%, rgba(255,255,255, .15) 75%, transparent 75%, transparent); 
    animation: animate-stripes 3s linear infinite;
  }
  .inform_block__progress_bar .stopAnimation{
    animation: none;
    background-image: none;
  }
  @keyframes animate-stripes {
    0% { background-position: 0 0; }
    100% { background-position: 60px 0; }
  }
  @media screen and (max-width:500px){
    .wrapper{
      grid-template-columns: repeat(auto-fit, 100%);
      grid-auto-rows: minmax(180px, auto);
    }
    .inform_block{
      padding: 5px;
      text-align: center;
      grid-template-columns: 1fr;
      grid-template-rows: 250px 1fr 1fr 40px;
      grid-column-gap: 0;
      grid-template-areas: 
      "img"
      "title"
      "descrip"
      "progress_bar";
    }
  }
</style>
