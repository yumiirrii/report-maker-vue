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
    },
    deleteProjectAndTasks(project) {
      this.report.projectList = new Set([...this.report.projectList].filter(p => p !== project));
      this.report.doneTaskMapList = this.report.doneTaskMapList.map(doneTaskMap => {
        doneTaskMap.forEach((value, key) => {
          if (key === project) {
            doneTaskMap.delete(key);
          }
        })
      })
      this.report.planningTaskMapList = this.report.planningTaskMapList.map(planningTaskMap => {
        planningTaskMap.forEach((value, key) => {
          if (key === project) {
            planningTaskMap.delete(key);
          }
        })
      })
    },    
    reset() {
      this.$reset();
    }
  }
})