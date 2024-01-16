<div class="back">
    <span class="loader"></span>
</div>
    
<style>
.back {
    z-index: 9;
    position: absolute;
    background-color: #000000;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
}

.loader {
    position: absolute;
    border: 30px solid #000000;
    right: 50%; top: 50%;
    border-radius: 50%;
    transform: translate(50%,-50%) rotate(45deg);
    animation: load 4s ease infinite;
}

@keyframes load {
    0%  , 12%  { border-color: #000000 #000000 #000000 #000000 }
    13% , 25%  { border-color: #662584 #000000 #000000 #000000 }
    26% , 37%  { border-color: #662584 #ee1f7a #000000 #000000 }
    38% , 50%  { border-color: #662584 #ee1f7a #2aabe3 #000000 }
    51% , 62%  { border-color: #662584 #ee1f7a #2aabe3 #faaf3d }
    63% , 75%  { border-color: #000000 #ee1f7a #2aabe3 #faaf3d }
    76% , 87%  { border-color: #000000 #000000 #2aabe3 #faaf3d }
    88% , 100% { border-color: #000000 #000000 #000000 #faaf3d }
}
</style>