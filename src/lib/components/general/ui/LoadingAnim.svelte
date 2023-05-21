<div class="loading-container">
    <div class="loading-box bg-primary-500"></div>
    <div class="loading-box bg-primary-500"></div>
    <div class="loading-box bg-primary-500"></div>
  </div>



  <style>

.loading-container {
      width: 100px;
      height: 100px;
      position: relative;
      margin: 0 auto;
    }
    
    .loading-box {
      width: 20px;
      height: 20px;
      /* background-color: #000; */
      position: absolute;
      top: 0;
      right:50;
      animation: stack 0.6s infinite ease-in-out;
    }
    
    .loading-box:nth-child(1) {
      left: 0;
      animation-delay: 0s;
    }
    
    .loading-box:nth-child(2) {
      left: 30px;
      animation-delay: 0.2s;
    }
    
    .loading-box:nth-child(3) {
      left: 60px;
      animation-delay: 0.4s;
    }
    
    @keyframes stack {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }
  </style>