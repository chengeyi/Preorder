<template>
    <div class="navContainer">
        <div>
            <i class="zi zi_jujia"></i>
        </div>
        <div>
            <i class="zi zi_envelopeBold"></i>
        </div>
        <div>
            <i class="zi zi_addressBook"></i>
        </div>
        <div>
            <i class="zi zi_tasks"></i>
        </div>
        <div>
            <i class="zi zi_suitcase"></i>
        </div>
        <div>
            <i class="zi zi_signal"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        methods:{

        }
    }
</script>

<style lang="less" scoped>
    .navContainer{
        border-radius: 10px;
        width: 70px;
        background-color: rgb(163, 163, 163);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .navContainer div{
        width: 60px;
        height: 60px;
        border-radius: 10px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .navContainer .zi_tasks{
        width: 60px;
        height: 60px;
        border-radius: 10px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #FFFFFF;
    }

    .navContainer div:hover{
        background: #ffffff;
    }

    .zi{
        font-size: 45px;
    }

</style>