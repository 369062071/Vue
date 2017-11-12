<template lang="html">
    <div class="header">
        <button @click="submit">提交</button>
    </div>
</template>

<script type="text/ecmascript-6">
    import Bus from '../bus'
    export default {
        data() {
            return {
                msg: '124'
            }
        },
        methods: {
            submit () {
                Bus.$emit("addBar",this.msg)
            }
        }
    }
</script>

<style type="text/css" scoped>
</style>
