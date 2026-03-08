<script setup>
let props = defineProps({valueButton: String})
</script>

<template>
    <button> {{ props.valueButton }} </button>
</template>

<style scoped>
button{
    padding: 15px 20px;
    margin: 10px;
    background-color: #5250c5;
    border: none;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
}
</style>