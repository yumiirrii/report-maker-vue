import { defineStore } from 'pinia';

export const useReportStore = defineStore('report', {
  state: () => ({
    report: {
      week: '',
      projectList: new Set(),
      doneTaskMapList: [],
      planningTaskMapList: [],
      summary: ''
    },
    isWeekSubmitted : false,
    isWeekModify : false
  }),
  actions: {
    addProjectList(project) {
      if (this.report.projectList.has(project)) {
        return false;
      } else {
        this.report.projectList.add(project);
        return true;
      }
    }
  }
})