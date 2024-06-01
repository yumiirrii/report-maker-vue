import { defineStore } from 'pinia';

export const useReportStore = defineStore('report', {
  state: () => ({
    currentStep: 'input',
    report: {
      week: '',
      projectList: [],
      doneTaskMapList: [],
      planningTaskMapList: [],
      summary: ''
    },
    isWeekSubmitted : false,
    isWeekModify : false
  }),
  // actions: {
  //   nextStep() {
  //     this.currentStep = 'confirm';
  //   },
  //   reset() {
  //     this.currentStep = 'weekInput';
  //     this.report = {
  //       week: '',
  //       projectList: [],
  //       doneTaskMapList: [],
  //       planningTaskMapList: [],
  //       summary: ''
  //     }
  //   }
  // }
})