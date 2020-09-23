import Vue from 'vue'
import VueRouter from 'vue-router'
import Section from '@/components/Section'
import Lection from '@/components/Lection'
import InfoCart from '@/components/InfoCart'
import LectureBlock from '@/components/LectureBlock'

Vue.use(VueRouter)

  const routes = [
    { path: '', name: 'home', component: Section },
    { path: '/lection', name: 'lection', component: Lection },
    { path: '/infocart', name: 'infocart', component: InfoCart },
    { path: '/lectureblock/:id', props:true, name: 'lectureblock', component: LectureBlock },
    { path: '*', redirect: { name: 'home' } }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 
