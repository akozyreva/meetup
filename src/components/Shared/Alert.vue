<template>
    <div>
        <v-alert
                @input="onClose"
                dismissible
                type="error"
                :value="true"
        >
            {{ text }}
        </v-alert>
    </div>
</template>

<script>
    export default {
        props: ['text'],
        methods: {
            onClose() {
                this.$emit('dismissed')
            }
        }
    }
</script>