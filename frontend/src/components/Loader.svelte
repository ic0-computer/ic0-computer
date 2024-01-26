<script lang="ts">
  export let type = "classic";
</script>

<div class="{type}-loader"></div>

<style>
  .spinner-loader {
    border: 16px solid #000000;
    border-top: 12px solid #662584;
    border-right: 12px solid #ee1f7a;
    border-bottom: 12px solid #2aabe3;
    border-left: 12px solid #faaf3d;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .stretch-loader {
    width: 80px;
    height: 12px;
    background: linear-gradient(to right, #662584, #ee1f7a, #2aabe3, #f05b24, #faaf3d);
    border-radius: 6px;
    animation: stretch 1.5s ease-in-out infinite;
  }

  @keyframes stretch {
    0%, 100% { width: 80px; }
    50% { width: 120px; }
  }

  .classic-loader {
    position: absolute;
    border: 30px solid #000000;
    right: 50%; top: 50%;
    border-radius: 50%;
    transform: translate(50%,-50%) rotate(45deg);
    animation: load 30s ease infinite;
  }

  @keyframes load {
    0%   , 1.28%  { border-color: #000000 #000000 #000000 #000000 }
    1.29%, 2.56%  { border-color: #662584 #000000 #000000 #000000 }
    2.57%, 3.85%  { border-color: #662584 #ee1f7a #000000 #000000 }
    3.86%, 5.13%  { border-color: #662584 #ee1f7a #2aabe3 #000000 }
    5.14%, 6.41%  { border-color: #662584 #ee1f7a #2aabe3 #faaf3d }
    6.42%, 7.69%  { border-color: #000000 #ee1f7a #2aabe3 #faaf3d }
    7.70%, 8.97%  { border-color: #000000 #000000 #2aabe3 #faaf3d }
    8.98%, 10.26% { border-color: #000000 #000000 #000000 #faaf3d }
    10.27%, 11.54%{ border-color: #000000 #000000 #000000 #000000 }
    11.55%, 12.82%{ border-color: #f05b24 #000000 #000000 #000000 }
    12.83%, 14.10%{ border-color: #f05b24 #662584 #000000 #000000 }
    14.11%, 15.38%{ border-color: #f05b24 #662584 #ee1f7a #000000 }
    15.39%, 16.67%{ border-color: #f05b24 #662584 #ee1f7a #2aabe3 }
    16.68%, 17.95%{ border-color: #000000 #662584 #ee1f7a #2aabe3 }
    17.96%, 19.23%{ border-color: #000000 #000000 #ee1f7a #2aabe3 }
    19.24%, 20.51%{ border-color: #000000 #000000 #000000 #2aabe3 }
    20.52%, 21.79%{ border-color: #000000 #000000 #000000 #000000 }
    21.80%, 23.08%{ border-color: #faaf3d #000000 #000000 #000000 }
    23.09%, 24.36%{ border-color: #faaf3d #f05b24 #000000 #000000 }
    24.37%, 25.64%{ border-color: #faaf3d #f05b24 #662584 #000000 }
    25.65%, 26.92%{ border-color: #faaf3d #f05b24 #662584 #ee1f7a }
    26.93%, 28.21%{ border-color: #000000 #f05b24 #662584 #ee1f7a }
    28.22%, 29.49%{ border-color: #000000 #000000 #662584 #ee1f7a }
    29.50%, 30.77%{ border-color: #000000 #000000 #000000 #ee1f7a }
    30.78%, 32.05%{ border-color: #000000 #000000 #000000 #000000 }
    32.06%, 33.33%{ border-color: #2aabe3 #000000 #000000 #000000 }
    33.34%, 34.62%{ border-color: #2aabe3 #faaf3d #000000 #000000 }
    34.63%, 35.90%{ border-color: #2aabe3 #faaf3d #f05b24 #000000 }
    35.91%, 37.18%{ border-color: #2aabe3 #faaf3d #f05b24 #662584 }
    37.19%, 38.46%{ border-color: #000000 #faaf3d #f05b24 #662584 }
    38.47%, 39.74%{ border-color: #000000 #000000 #f05b24 #662584 }
    39.75%, 41.03%{ border-color: #000000 #000000 #000000 #662584 }
    41.04%, 42.31%{ border-color: #000000 #000000 #000000 #000000 }
    42.32%, 43.59%{ border-color: #ee1f7a #000000 #000000 #000000 }
    43.60%, 44.87%{ border-color: #ee1f7a #2aabe3 #000000 #000000 }
    44.88%, 46.15%{ border-color: #ee1f7a #2aabe3 #faaf3d #000000 }
    46.16%, 47.44%{ border-color: #ee1f7a #2aabe3 #faaf3d #f05b24 }
    47.45%, 48.72%{ border-color: #000000 #2aabe3 #faaf3d #f05b24 }
    48.73%, 50.00%{ border-color: #000000 #000000 #faaf3d #f05b24 }
    50.01%, 51.28%{ border-color: #000000 #000000 #000000 #f05b24 }
    51.29%, 52.56%{ border-color: #000000 #000000 #000000 #000000 }
    52.57%, 53.85%{ border-color: #000000 #000000 #000000 #000000 }
    53.86%, 55.13%{ border-color: #662584 #000000 #000000 #000000 }
    55.14%, 56.41%{ border-color: #662584 #ee1f7a #000000 #000000 }
    56.42%, 57.69%{ border-color: #662584 #ee1f7a #2aabe3 #000000 }
    57.70%, 58.97%{ border-color: #662584 #ee1f7a #2aabe3 #faaf3d }
    58.98%, 60.26%{ border-color: #662584 #ee1f7a #2aabe3 #faaf3d }
    60.27%, 61.54%{ border-color: #000000 #ee1f7a #2aabe3 #faaf3d }
    61.55%, 62.82%{ border-color: #000000 #000000 #2aabe3 #faaf3d }
    62.83%, 64.10%{ border-color: #000000 #000000 #000000 #faaf3d }
    64.11%, 65.38%{ border-color: #000000 #000000 #000000 #faaf3d }
    65.39%, 66.67%{ border-color: #000000 #000000 #000000 #000000 }
    66.68%, 67.95%{ border-color: #faaf3d #000000 #000000 #000000 }
    67.96%, 69.23%{ border-color: #faaf3d #f05b24 #000000 #000000 }
    69.24%, 70.51%{ border-color: #faaf3d #f05b24 #662584 #000000 }
    70.52%, 71.79%{ border-color: #faaf3d #f05b24 #662584 #ee1f7a }
    71.80%, 73.08%{ border-color: #000000 #f05b24 #662584 #ee1f7a }
    73.09%, 74.36%{ border-color: #000000 #000000 #662584 #ee1f7a }
    74.37%, 75.64%{ border-color: #000000 #000000 #000000 #ee1f7a }
    75.65%, 76.92%{ border-color: #000000 #000000 #000000 #000000 }
    76.93%, 78.21%{ border-color: #2aabe3 #000000 #000000 #000000 }
    78.22%, 79.49%{ border-color: #2aabe3 #faaf3d #000000 #000000 }
    79.50%, 80.77%{ border-color: #2aabe3 #faaf3d #f05b24 #000000 }
    80.78%, 82.05%{ border-color: #2aabe3 #faaf3d #f05b24 #662584 }
    82.06%, 83.33%{ border-color: #000000 #faaf3d #f05b24 #662584 }
    83.34%, 84.62%{ border-color: #000000 #000000 #f05b24 #662584 }
    84.63%, 85.90%{ border-color: #000000 #000000 #000000 #662584 }
    85.91%, 87.18%{ border-color: #000000 #000000 #000000 #000000 }
    87.19%, 88.46%{ border-color: #ee1f7a #000000 #000000 #000000 }
    88.47%, 89.74%{ border-color: #ee1f7a #2aabe3 #000000 #000000 }
    89.75%, 91.03%{ border-color: #ee1f7a #2aabe3 #faaf3d #000000 }
    91.04%, 92.31%{ border-color: #ee1f7a #2aabe3 #faaf3d #f05b24 }
    92.32%, 93.59%{ border-color: #000000 #2aabe3 #faaf3d #f05b24 }
    93.60%, 94.87%{ border-color: #000000 #000000 #faaf3d #f05b24 }
    94.88%, 96.15%{ border-color: #000000 #000000 #000000 #f05b24 }
    96.16%, 97.44%{ border-color: #000000 #000000 #000000 #000000 }
    97.45%, 98.72%{ border-color: #000000 #000000 #000000 #000000 }
    98.73%, 100%  { border-color: #000000 #000000 #000000 #000000 }
  }
</style>
