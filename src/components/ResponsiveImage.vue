<template>
    <picture>
        <source media="(max-width: 1023px)" :srcset="getSrc('mobile')">
        <img media="(min-width: 1024px)" :srcset="getSrc('desktop')">
    </picture>
</template>

<script>
export default {
    props: {
        src: {
            required: true
        }
    },
    methods: {
        getSrc(format) {
            if (typeof this.src === 'object') {
                return `${this.src[format]}`
            } else {
                return `/${format}/${this.src}`
            }
        }
    }
}
</script>