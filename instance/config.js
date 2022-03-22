// *export const MACHINE_ARR = ["64", "91", "92", "93", "94", "110", "111", "112", "253"]
//! 111, 112 removed due to lack of credental
export const MACHINE_ARR = {
    "50":{
      scripts: []
    },
    "64":{
        scripts: ["backend"]
    },
    "91":{
      scripts: ["g5", "g7"]
    },
    "92":{
      scripts: ["g4", "g6"]
    },
    "93":{
      scripts: ["g2", "g3"]
    },
    "94":{
      scripts: ["t1", "t2"]
    },
    "110":{
      scripts: ["highcharts_server", "flask_server", "beat_celery", "worker_celery"]
    },
    "111":{
      scripts: ["olivia-screen"]
    },
    // "112":{
    //   scripts: []
    // },
    "253":{
      scripts: [ "highcharts_server", "flask_server", "beat_celery", "worker_celery"]
    },
    
  }