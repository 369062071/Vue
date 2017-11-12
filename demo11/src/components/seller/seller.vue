<template lang="html">
    <div class="header">
        i am seller {{ msg }}
    </div>
</template>

<script type="text/ecmascript-6">
    import Bus from '../bus'
    export default {
        data(){
            return {
                msg:""
            }
        },
        created () {
            console.log(1)
            Bus.$on('addBar', value => {
                this.msg = value
            })
        }
    }
</script>

<style type="text/css" scoped>
</style>
