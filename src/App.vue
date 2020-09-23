<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;  
    font-family: 'Avenir', Arial, Helvetica, sans-serif;  
  }
  #app{
    display: grid;
  }
</style>
