import { createRouter, createWebHistory } from 'vue-router';
import Top from '@/components/Top.vue';
import WeekInput from '@/components/WeekInput.vue';
import SummaryInput from '@/components/SummaryInput.vue';
import Confirm from '@/components/Confirm.vue';
import Search from '@/components/Search.vue';
import Detail from '@/components/Detail.vue';

const routes = [
  { 
    path: '/',
    name: 'Top',
    component: Top
  },
  { 
    path: '/input',
    name: 'Input',
    component: WeekInput
  },
  { 
    path: '/input/summary',
    name: 'Summary',
    component: SummaryInput
  },
  { 
    path: '/input/confirm',
    name: 'Confirm',
    component: Confirm
  },
  { 
    path: '/search',
    name: 'Search',
    component: Search
  },
  { 
    path: '/search/:reportId',
    name: 'Detail',
    component: Detail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;