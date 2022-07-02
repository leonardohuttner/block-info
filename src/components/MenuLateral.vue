<template>
    <q-list>
        <q-item :to="link" exact clickable v-ripple>
            <q-item-section avatar>
                <q-icon :name="icon" />
            </q-item-section>
            <q-item-section>
                <q-item-label>{{title}}</q-item-label>
                <q-item-label caption>{{caption}}</q-item-label>    
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import { defineComponent,ref } from "vue";


export default defineComponent({
name: "MenuLateral",
props: {
    title: {
        type: String,
        required: true
    },

    caption: {
        type: String,
        default: ''
    },

    link: {
        type: String,
        default: '#'
    },

    icon: {
        type: String,
        default: ''
    }
}
});
</script>

<style>

</style>