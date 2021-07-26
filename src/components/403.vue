<template>
    <div  style="height: 70vh" id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div class="container">
                        <div class="row mt-5 justify-content-center">
                            <div class="col-lg-6">
                                <div class="text-center mt-4">
                                    <h1 class="display-1">403</h1>
                                    <p class="lead">sin autorizacion</p>
                                    <p>su acceso a esta area no esta permitido.</p>
                                    <router-link to="/">
                                        <i class="fas fa-arrow-left me-1"></i>
                                        regresar al inicio
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
           
        </div>
        <button @click="alert"></button>
</template>
<script>
export default {
    setup(){
        function alert() {
          let  array = 40000
            for (let i = 0; i < array; i++) {
               console.log('hola')
                
            }
        }
        return{alert}
    }
}
</script>