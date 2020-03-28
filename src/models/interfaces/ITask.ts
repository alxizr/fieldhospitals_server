enum TaskStatus {
  Done = "Done",
  OnGoing = "OnGoing",
  Future = "Future"
}

export interface ITask {
  taskType: string;
  taskResponsibility: string;
  taskDeadline: Date;
  //status: TaskStatus;
  status: "Done" | "OnGoing" | "Future";
}

/*

let t: ITask = <ITask>Object();
// method 1
t.status = "Future"

// method 2 
t.status = TaskStatus.OnGoing

*/
